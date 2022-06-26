import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {AppStateType} from '../../components/app/store';
import {setErrorMessage} from './login-reducer';
import {useAppDispatch} from './Login';

export const ErrorAlert = () => {
    const dispatch = useAppDispatch();

    const errorMessage = useSelector<AppStateType, string | null>(state => state.login.errorMessage);

    const handleCloseErrorBar = () => dispatch(setErrorMessage(null));

    useEffect(() => {
        if (errorMessage) {
            setTimeout(() => {
                dispatch(setErrorMessage(null));
            }, 5000)
        }
    }, [errorMessage, dispatch]);

    return (
        <Stack sx={{width: '413px', margin: '2rem auto 0'}} spacing={2}>
            <Alert severity="error" onClose={handleCloseErrorBar}>
                <AlertTitle sx={{alignItems: 'center', marginBottom: '0'}}>
                    <strong>{errorMessage}</strong>
                </AlertTitle>
            </Alert>
        </Stack>
    )
};