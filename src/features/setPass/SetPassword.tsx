import {useFormik} from 'formik';
import Button from '../../common/button/Button';
import {Form} from '../../common/form/Form';
import {AppStateType, useAppDispatch, useAppSelector} from '../../components/app/store';
import {PATH} from '../../enums/path';
import {FormControl, FormGroup, IconButton, InputAdornment, InputLabel} from '@mui/material';
import Input from '@mui/material/Input';
import FormHelperText from '@mui/material/FormHelperText';
import {AlertBar} from '../login/AlertBar';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import React, {useEffect, useState} from 'react';
import {Navigate, useParams} from 'react-router';
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';
import {LoadingStatus, setResponseMessage, updateNewPassword} from './set-pass-reducer';
import styles from './SetPassword.module.css';
import {initializeApp} from '../../components/app/app-reducer';

type SetPasswordErrorType = {
    password?: string
}

const selectIsUpdatePassword = (state: AppStateType): boolean => state.setPass.isUpdatePassword;
const selectStatus = (state: AppStateType): LoadingStatus => state.setPass.status;
const selectResponseMessage = (state: AppStateType): string | null => state.setPass.responseMessage;

export const SetPassword = () => {
    const dispatch = useAppDispatch();

    const {token} = useParams<'token'>();

    const [showPassword, setShowPassword] = useState<boolean>(false);

    const isUpdatePassword = useAppSelector(selectIsUpdatePassword);
    const status = useAppSelector(selectStatus);
    const responseMessage = useAppSelector(selectResponseMessage);

    const formik = useFormik({
        initialValues: {
            password: '',
        },
        validate(values) {
            const errors: SetPasswordErrorType = {};

            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password.length <= 8) {
                errors.password = 'Password should be more than 8 symbols';
            }

            return errors;
        },
        onSubmit: values => {
            if (values.password && token) {
                const data = {password: values.password, resetPasswordToken: token};

                dispatch(updateNewPassword(data));
                formik.resetForm();
            }
        }
    });

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => event.preventDefault();

    const handleClickShowPassword = () => setShowPassword(!showPassword);

    useEffect(() => {
        dispatch(initializeApp());
    }, []);

    if (isUpdatePassword) {
        return <Navigate to={PATH.LOGIN} />
    }

    return (
        <>
            <Form onSubmit={formik.handleSubmit} title="Create new password" formWrapper={styles.container}>
                <FormGroup sx={{width: '35ch'}}>
                    <FormControl variant="standard" sx={{height: '71px'}}>
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            disabled={status === 'loading'}
                            endAdornment={
                                <InputAdornment position="end">
                                    {status === 'loading'
                                        ? <LoadingButton loading variant="text" sx={{minWidth: '24px'}}></LoadingButton>
                                        :<IconButton
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            className={styles.view}
                                        >
                                            {showPassword ? <Visibility/> : <VisibilityOff/>}
                                        </IconButton>}
                                </InputAdornment>}
                            {...formik.getFieldProps('password')}
                        />
                        <FormHelperText sx={{color: 'red'}}>
                            {formik.touched.password && !!formik.errors.password && formik.errors.password}
                        </FormHelperText>
                    </FormControl>
                </FormGroup>
                <div className={styles.title}>Create new password and we will send you further instructions to email</div>
                <Button type="submit" className={styles.button} disabled={status === 'loading'}>Create new password</Button>
            </Form>
            {responseMessage && <AlertBar message={responseMessage} closeAlert={() => setResponseMessage(null)}/>}
        </>
    )
}