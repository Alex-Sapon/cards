import Button from '../../common/button/Button';
import {Form} from '../../common/form/Form';
import styles from './Login.module.css';
import {useFormik} from 'formik';
import {useDispatch} from 'react-redux';
import {NavLink} from 'react-router-dom';
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

type LoginErrorType = {
    email: string
    password: string
    rememberMe: boolean
}

export const Login = () => {
    const dispatch = useDispatch();

    const [showPassword, setShowPassword] = useState<boolean>(false);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },

        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
            formik.resetForm();
            formik.values.rememberMe = false;

        }
    })

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => event.preventDefault();

    const handleClickShowPassword = () => setShowPassword(!showPassword);



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