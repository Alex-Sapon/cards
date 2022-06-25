import Button from '../../common/button/Button';
import {Form} from '../../common/form/Form';
import styles from './Login.module.css';
import {useFormik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import {Navigate, NavLink} from 'react-router-dom';
import {PATH} from '../../enums/path';
import {
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    IconButton,
    InputAdornment,
    InputLabel,
    TextField
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Input from '@mui/material/Input';
import React, {useState} from 'react';
import {ActionsType, AppStateType} from '../../components/app/store';
import {login} from './login-reducer';
import {ThunkDispatch} from 'redux-thunk';

type LoginErrorType = {
    email: string
    password: string
    rememberMe: boolean
}

export const useAppDispatch = () => useDispatch<ThunkDispatch<AppStateType, unknown, ActionsType>>();

export const Login = () => {
    const dispatch = useAppDispatch();

    const isLoggedIn = useSelector<AppStateType, boolean>(state => state.login.isLoggedIn);

    const [showPassword, setShowPassword] = useState<boolean>(false);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },

        onSubmit: values => {
            dispatch(login(values));
            formik.resetForm();
            formik.values.rememberMe = false;

        }
    })

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => event.preventDefault();

    const handleClickShowPassword = () => setShowPassword(!showPassword);

    if (isLoggedIn) {
        return <Navigate to={PATH.PROFILE}/>
    }

    return (
        <Form onSubmit={formik.handleSubmit} title={'Sign In'}>
            <FormGroup sx={{width: '30ch'}}>
                <TextField
                    label="Email"
                    variant="standard"
                    className={styles.input}
                    {...formik.getFieldProps('email')}
                />
                <FormControl variant="standard">
                    <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                    <Input
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {showPassword ? <Visibility/> : <VisibilityOff/>}
                                </IconButton>
                            </InputAdornment>
                        }
                        className={styles.input}
                        {...formik.getFieldProps('password')}
                    />
                </FormControl>
                <FormControlLabel
                    label="remember me"
                    sx={{mb: '2rem'}}
                    control={
                        <Checkbox
                            sx={{'&.Mui-checked': {color: '#9991c8'}}}
                            {...formik.getFieldProps('rememberMe')}
                        />}
                />
            </FormGroup>
            <NavLink className={styles.forgot_pass} to={PATH.RECOVERY_PASS}>Forgot Password</NavLink>
            <Button type="submit" className={styles.button}>login</Button>
            <div className={styles.text}>Don't have an account?</div>
            <NavLink className={styles.link} to={PATH.REGISTRATION}>Sign Up</NavLink>
        </Form>
    )
};