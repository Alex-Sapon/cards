import {useFormik} from 'formik';
import {NavLink} from 'react-router-dom';
import Button from '../../common/button/Button';
import {Form} from '../../common/form/Form';
import {AppStateType, useAppDispatch, useAppSelector} from '../../components/app/store';
import {PATH} from '../../enums/path';
import styles from './RecoveryPass.module.css';
import {FormControl, FormGroup, InputAdornment, InputLabel} from '@mui/material';
import Input from '@mui/material/Input';
import FormHelperText from '@mui/material/FormHelperText';
import {AlertBar} from '../login/AlertBar';
import {forgotPass, setResponseMessage} from './recoveryPassReducer';
import React from 'react';
import {SendEmail} from './sendEmail/SendEmail';
import {LoadingStatus} from '../setPass/set-pass-reducer';
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';

type RecoveryPasswordErrorType = {
    email?: string
}

const selectIsSendEmail = (state: AppStateType): boolean => state.recoveryPass.isSendEmail;
const selectResponseMessage = (state: AppStateType): string | null => state.recoveryPass.responseMessage;
const selectStatus = (state: AppStateType): LoadingStatus => state.recoveryPass.status;

export const RecoveryPass = () => {
    const dispatch = useAppDispatch();

    const isSendEmail = useAppSelector(selectIsSendEmail);
    const responseMessage = useAppSelector(selectResponseMessage);
    const status = useAppSelector(selectStatus);

    const handleDisableClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        if (status === 'loading') {
            e.preventDefault();
        }
    }

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validate(values) {
            const errors: RecoveryPasswordErrorType = {};

            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }

            return errors;
        },
        onSubmit: values => {
            dispatch(forgotPass(values.email));
            formik.resetForm();
        }
    });

    if (isSendEmail) {
        return <SendEmail/>
    }

    return (
        <>
            <Form onSubmit={formik.handleSubmit} title="Forgot your password?">
                <FormGroup sx={{width: '35ch'}}>
                    <FormControl variant="standard" sx={{height: '71px'}}>
                        <InputLabel htmlFor="email">Email</InputLabel>
                        <Input
                            id="email"
                            fullWidth
                            disabled={status === 'loading'}
                            endAdornment={
                                <InputAdornment position="end">
                                    {status === 'loading' &&
                                        <LoadingButton loading variant="text" sx={{minWidth: '24px'}}></LoadingButton>}
                                </InputAdornment>
                            }
                            {...formik.getFieldProps('email')}
                        />
                        <FormHelperText sx={{color: 'red'}}>
                            {formik.touched.email && !!formik.errors.email && formik.errors.email}
                        </FormHelperText>
                    </FormControl>
                </FormGroup>
                <div className={styles.title}>Enter your email address and we will send you further instructions</div>
                <Button type="submit" className={styles.button} disabled={status === 'loading'}>Send instructions</Button>
                <div className={styles.subtitle}>Did you remember your password?</div>
                <NavLink className={styles.link} to={PATH.LOGIN} onClick={handleDisableClick}>Try logging in</NavLink>
            </Form>
            {responseMessage && <AlertBar message={responseMessage} closeAlert={() => setResponseMessage(null)}/>}
        </>
    )
};