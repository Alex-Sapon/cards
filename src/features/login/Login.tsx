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
    InputLabel
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Input from '@mui/material/Input';
import React, {useState} from 'react';
import {ActionsType, AppStateType} from '../../components/app/store';
import {login} from './login-reducer';
import {ThunkDispatch} from 'redux-thunk';
import FormHelperText from '@mui/material/FormHelperText';
import {ErrorAlert} from './ErrorAlert';

type LoginErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

export const useAppDispatch = () => useDispatch<ThunkDispatch<AppStateType, unknown, ActionsType>>();

export const Login = () => {
    const dispatch = useAppDispatch();

    const isLoggedIn = useSelector<AppStateType, boolean>(state => state.login.isLoggedIn);
    const errorMessage = useSelector<AppStateType, string | null>(state => state.login.errorMessage);
    const isDisabled = useSelector<AppStateType, boolean>(state => state.login.isDisabled);

    const [showPassword, setShowPassword] = useState<boolean>(false);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        validate(values) {
            const errors: LoginErrorType = {};

            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }

            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password.length < 8) {
                errors.password = 'Password should be more than 2 symbols';
            }

            return errors;
        },
        onSubmit: values => {
            if (values.email && values.password) {
                dispatch(login(values));
                formik.resetForm();
            }
        }
    });

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => event.preventDefault();

    const handleClickShowPassword = () => setShowPassword(!showPassword);

    if (isLoggedIn) {
        return <Navigate to={PATH.PROFILE}/>
    }

    return (
        <>
            <Form onSubmit={formik.handleSubmit} title="Sign In">
                <FormGroup sx={{width: '35ch'}}>
                    <FormControl variant="standard" sx={{height: '71px', mb: '0.5rem'}}>
                        <InputLabel htmlFor="email">Email</InputLabel>
                        <Input id="email" fullWidth {...formik.getFieldProps('email')}/>
                        <FormHelperText sx={{color: 'red'}}>
                            {formik.touched.email && !!formik.errors.email && formik.errors.email}
                        </FormHelperText>
                    </FormControl>
                    <FormControl variant="standard" sx={{height: '71px'}}>
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        className={styles.view}
                                    >
                                        {showPassword ? <Visibility/> : <VisibilityOff/>}
                                    </IconButton>
                                </InputAdornment>
                            }
                            {...formik.getFieldProps('password')}
                        />
                        <FormHelperText sx={{color: 'red'}}>
                            {formik.touched.password && !!formik.errors.password && formik.errors.password}
                        </FormHelperText>
                    </FormControl>
                    <FormControlLabel
                        label="remember me"
                        sx={{mb: '2rem'}}
                        control={
                            <Checkbox
                                size="small"
                                sx={{'&.Mui-checked': {color: '#9991c8'}}}
                                {...formik.getFieldProps('rememberMe')}
                            />}
                    />
                </FormGroup>
                <NavLink className={styles.forgot_pass} to={PATH.RECOVERY_PASS}>Forgot Password</NavLink>
                <Button type="submit" className={styles.button} disabled={isDisabled}>login</Button>
                <div className={styles.text}>Don't have an account?</div>
                <NavLink className={styles.link} to={PATH.REGISTRATION}>Sign Up</NavLink>
            </Form>
            {errorMessage && <ErrorAlert/>}
        </>
    )
};