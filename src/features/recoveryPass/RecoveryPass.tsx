import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import Button from '../../common/button/Button';
import {Form} from '../../common/form/Form';
import { AppStateType, useAppDispatch } from '../../components/app/store';
import { PATH } from '../../enums/path';
import styles from './RecoveryPass.module.css';
import {FormControl, FormGroup, InputLabel} from '@mui/material';
import Input from '@mui/material/Input';
import FormHelperText from '@mui/material/FormHelperText';
import {ErrorAlert} from '../login/ErrorAlert';
import {forgotPass} from './recoveryPassReducer';

type RecoveryPasswordErrorType = {
    email?: string
}

export const RecoveryPass = () => {
    const dispatch = useAppDispatch();

    const isSendEmail = useSelector<AppStateType, boolean>(state => state.recoveryPass.isSendEmail);
    const errorMessage = useSelector<AppStateType, string | null>(state => state.login.errorMessage);
    const isDisabled = useSelector<AppStateType, boolean>(state => state.recoveryPass.isDisabled);

    const navigate = useNavigate();

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
            if (values.email) {
                dispatch(forgotPass(values.email));
                formik.resetForm();
            }
        }
    });

    return (
        <>
            <Form onSubmit={formik.handleSubmit} title='Forgot your password?'>
                <FormGroup sx={{width: '35ch'}}>
                    <FormControl variant="standard" sx={{height: '71px'}}>
                        <InputLabel htmlFor="email">Email</InputLabel>
                        <Input id="email" fullWidth {...formik.getFieldProps('email')}/>
                        <FormHelperText sx={{color: 'red'}}>
                            {formik.touched.email && !!formik.errors.email && formik.errors.email}
                        </FormHelperText>
                    </FormControl>
                </FormGroup>
                <div className={styles.title}>Enter your email address and we will send you further instructions</div>
                <Button type='submit' className={styles.button} disabled={false}>Send Instructions</Button>
                <div className={styles.subtitle}>Did you remember your password?</div>
                <NavLink className={styles.link} to={PATH.LOGIN}>Try logging in</NavLink>
            </Form>
            {false && <ErrorAlert/>}
        </>
    )
}