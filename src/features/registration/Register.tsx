import Button from '../../common/button/Button';
import {Form} from '../../common/form/Form';
import styles from './Register.module.css';
import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {useFormik} from 'formik';
import {FormGroup, FormLabel} from '@mui/material';
import { NavLink } from 'react-router-dom';
import {PATH} from '../../enums/path';
import {useAppDispatch, useAppSelector} from '../../components/app/hooks';
import {userRegisterTC} from './registerReducer';


export const Register = () => {

    const dispatch = useAppDispatch()
    const status = useAppSelector(state => state.register.status)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Email is required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Password is required';
            } else if (values.password.length <= 7) {
                errors.password = 'Must be 8 characters or more symbols in password';
            }
            if (!values.confirmPassword) {
                errors.confirmPassword = 'Please, confirm your password';
            } else if (values.password !== values.confirmPassword) {
                errors.confirmPassword = 'Password is incorrect';
            }
            return errors;
        },
        onSubmit: values => {
            dispatch(userRegisterTC(values.email, values.password))
        },
    });

    const [showPassword, setShowPassword] = React.useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState<boolean>(false);


    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const handleClickShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <>
        <Form onSubmit={formik.handleSubmit} title={'Register'}>
            <FormGroup sx={{width: '35ch'}}>
                <FormControl sx={{height: '71px', mb: '0.5rem'}} variant="standard">
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <Input
                        {...formik.getFieldProps('email')}
                        id="email"
                        fullWidth
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.email &&
                    formik.errors.email ? <div style={{color: 'red'}}>{formik.errors.email}</div> : null}
                </FormControl>
                <FormControl sx={{height: '71px', mb: '0.5rem'}} variant="standard">
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input
                        {...formik.getFieldProps('password')}
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={handleClickShowPassword}
                                >
                                    {showPassword ? <VisibilityOff/> : <Visibility/>}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                    {formik.touched.password &&
                    formik.errors.password ? <div style={{color: 'red'}}>{formik.errors.password}</div> : null}
                </FormControl>
                <FormControl sx={{height: '71px', mb: '0.5rem'}} variant="standard">
                    <InputLabel htmlFor="confirmPassword">Confirm password</InputLabel>
                    <Input
                        {...formik.getFieldProps('confirmPassword')}
                        id="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={handleClickShowConfirmPassword}
                                >
                                    {showConfirmPassword ? <VisibilityOff/> : <Visibility/>}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                    {formik.touched.confirmPassword &&
                    formik.errors.confirmPassword ?
                        <div style={{color: 'red'}}>{formik.errors.confirmPassword}</div> : null}
                </FormControl>
                <div className={styles.button_group}>
                    <Button type={'submit'} disabled={status === 'loading'}>Register</Button>
                </div>
            </FormGroup>

            <NavLink style={{pointerEvents: status === 'loading' ? 'none': undefined}} className={styles.login} to={PATH.LOGIN} >Are you already registered?</NavLink>
        </Form>

        </>

    );
};

//types
type FormikErrorType = {
    email?: string
    password?: string
    confirmPassword?: string
}





