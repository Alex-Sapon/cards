import Button from '../../common/button/Button';
import {Form} from '../../common/form/Form';
import styles from './Login.module.css';
import {useFormik} from 'formik';
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
import {AppStateType, useAppDispatch, useAppSelector} from '../../components/app/store';
import {login, setResponseMessage} from './login-reducer';
import FormHelperText from '@mui/material/FormHelperText';
import {AlertBar} from './AlertBar';
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';
import {LoadingStatus} from '../setPass/set-pass-reducer';

type LoginErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

const selectIsLoggedIn = (state: AppStateType): boolean => state.login.isLoggedIn;
const selectResponseMessage = (state: AppStateType): string | null => state.login.responseMessage;
const selectStatus = (state: AppStateType): LoadingStatus => state.login.status;

export const Login = () => {
    const dispatch = useAppDispatch();

    const isLoggedIn = useAppSelector(selectIsLoggedIn);
    const responseMessage = useAppSelector(selectResponseMessage);
    const status = useAppSelector(selectStatus);

    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        if (status === 'loading') {
            e.preventDefault();
        }
    };

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
            } else if (values.password.length <= 8) {
                errors.password = 'Password should be more than 8 symbols';
            }

            return errors;
        },
        onSubmit: values => {
            dispatch(login(values));
            formik.resetForm();
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
                <FormGroup sx={{width: '80%'}}>
                    <FormControl variant="standard" sx={{height: '71px', mb: '0.5rem'}}>
                        <InputLabel htmlFor="email">Email</InputLabel>
                        <Input
                            id="email"
                            fullWidth
                            disabled={status === 'loading'}
                            {...formik.getFieldProps('email')}
                        />
                        <FormHelperText sx={{color: 'red'}}>
                            {formik.touched.email && !!formik.errors.email && formik.errors.email}
                        </FormHelperText>
                    </FormControl>
                    <FormControl variant="standard" sx={{height: '71px', width: '100%'}}>
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            disabled={status === 'loading'}
                            endAdornment={
                                <InputAdornment position="end">
                                    {status === 'loading'
                                        ? <LoadingButton loading variant="text" sx={{minWidth: '24px'}}></LoadingButton>
                                        : <IconButton
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            className={styles.view}
                                        >
                                            {showPassword ? <Visibility/> : <VisibilityOff/>}
                                        </IconButton>}
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
                        sx={{mb: '1rem'}}
                        control={
                            <Checkbox
                                size="small"
                                checked={formik.values.rememberMe}
                                disabled={status === 'loading'}
                                sx={{'&.Mui-checked': {color: '#9991c8'}}}
                                {...formik.getFieldProps('rememberMe')}
                            />}
                    />
                </FormGroup>
                <NavLink className={styles.forgot_pass} to={PATH.RECOVERY_PASS} onClick={handleClick}>Forgot
                    Password</NavLink>
                <Button type="submit" className={styles.button} disabled={status === 'loading'}>Login</Button>
                <div className={styles.text}>Don't have an account?</div>
                <NavLink className={styles.link} to={PATH.REGISTRATION} onClick={handleClick}>Sign Up</NavLink>
            </Form>
            {responseMessage && <AlertBar message={responseMessage} closeAlert={() => setResponseMessage(null)}/>}
        </>
    )
};