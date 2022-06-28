import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import {CSSProperties, useEffect} from 'react';
import {ActionsType, useAppDispatch} from '../../components/app/store';

type ErrorAlertType = {
    error: string | null
    closeErrorAlert: () => ActionsType
    alertWrapper?: CSSProperties
}

export const ErrorAlert = ({error, closeErrorAlert, alertWrapper}: ErrorAlertType) => {
    const dispatch = useAppDispatch();

    const handleCloseErrorBar = () => dispatch(closeErrorAlert.call(this));

    useEffect(() => {
        if (error) {
            setTimeout(() => {
                dispatch(closeErrorAlert.call(this));
            }, 5000)
        }
    }, [error, dispatch, closeErrorAlert]);

    return (
        <Stack sx={{width: '413px', margin: '2rem auto 0'}} spacing={2} style={alertWrapper}>
            <Alert severity="error" onClose={handleCloseErrorBar}>
                <AlertTitle sx={{alignItems: 'center', marginBottom: '0'}}>
                    <strong>{error}</strong>
                </AlertTitle>
            </Alert>
        </Stack>
    )
};