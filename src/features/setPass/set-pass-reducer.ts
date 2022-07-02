import {authAPI, IUpdateDataPass} from '../../api/auth-api';
import {AppThunk} from '../../components/app/store';

const initialState: SetPassStateType = {
    isUpdatePassword: false,
    status: 'idle',
    responseMessage: null,
}

export const setPassReducer = (state: SetPassStateType = initialState, action: SetNewPassActions): SetPassStateType => {
    switch (action.type) {
        case 'SET-PASSWORD/UPDATE-PASSWORD':
            return {...state, isUpdatePassword: action.isUpdatePass};
        case 'SET-PASSWORD/SET-LOADING-STATUS':
            return {...state, status: action.status};
        case 'SET-PASSWORD/SET-RESPONSE-MESSAGE':
            return {...state, responseMessage: action.message};
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

export const setResponseMessage = (message: string | null) => ({
    type: 'SET-PASSWORD/SET-RESPONSE-MESSAGE',
    message,
} as const);

export const updateNewPassword = (data: IUpdateDataPass): AppThunk => dispatch => {
    dispatch(setLoadingStatus('loading'));

    authAPI.updatePass(data)
        .then(res => {
            dispatch(setNewPassword(true));
        })
        .catch((e) => {
            dispatch(setResponseMessage(e.message));
        })
        .finally(() => {
            dispatch(setLoadingStatus('idle'));
        })
}

export type SetNewPassActions =
    | ReturnType<typeof setNewPassword>
    | ReturnType<typeof setLoadingStatus>
    | ReturnType<typeof setResponseMessage>

export type SetPassStateType = {
    isUpdatePassword: boolean
    status: LoadingStatus
    responseMessage: string | null
}

export type LoadingStatus = 'idle' | 'loading' | 'succeeded' | 'failed';