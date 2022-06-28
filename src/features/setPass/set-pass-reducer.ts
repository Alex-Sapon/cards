import {AppThunk} from '../../components/app/store';
import {IUpdateDataPass, setPasswordAPI} from './set-pass-api';

const initialState: SetPassStateType = {
    isUpdatePassword: false,
    status: 'idle',
    errorMessage: null,
}

export const setPassReducer = (state: SetPassStateType = initialState, action: SetNewPassActions): SetPassStateType => {
    switch (action.type) {
        case 'SET-PASSWORD/UPDATE-PASSWORD':
            return {...state, isUpdatePassword: action.isUpdatePass};
        case 'SET-PASSWORD/SET-LOADING-STATUS':
            return {...state, status: action.status};
        case 'SET-PASSWORD/SET-ERROR-MESSAGE':
            return {...state, errorMessage: action.error};
        default:
            return state;
    }
}

const setNewPassword = (isUpdatePass: boolean) => ({
    type: 'SET-PASSWORD/UPDATE-PASSWORD',
    isUpdatePass,
} as const);

const setLoadingStatus = (status: LoadingStatus) => ({
    type: 'SET-PASSWORD/SET-LOADING-STATUS',
    status,
} as const);

export const setErrorMessage = (error: string | null) => ({
    type: 'SET-PASSWORD/SET-ERROR-MESSAGE',
    error,
} as const);

export const updateNewPassword = (data: IUpdateDataPass): AppThunk => dispatch => {
    dispatch(setLoadingStatus('loading'));

    setPasswordAPI.updatePass(data)
        .then(res => {
            dispatch(setNewPassword(true));
        })
        .catch((e) => {
            dispatch(setErrorMessage(e.message));
        })
        .finally(() => {
            dispatch(setLoadingStatus('idle'));
        })
}

export type SetNewPassActions =
    | ReturnType<typeof setNewPassword>
    | ReturnType<typeof setLoadingStatus>
    | ReturnType<typeof setErrorMessage>

export type SetPassStateType = {
    isUpdatePassword: boolean
    status: LoadingStatus
    errorMessage: string | null
}

export type LoadingStatus = 'idle' | 'loading' | 'succeeded' | 'failed';