import {AppThunk} from '../../components/app/store';
import {registrationApi} from './registration-api';
import {AxiosError} from 'axios';

const initialState: RegisterStateType = {
    message: null,
    status: 'idle' as RequestStatusType,
    error: null
};

export const registrationReducer = (state: RegisterStateType = initialState, action: RegisterActionsType): RegisterStateType => {
    switch (action.type) {
        case 'REGISTER/SET-MESSAGE':
            return {...state, message: action.message};
        case 'REGISTER/SET-APP-STATUS':
            return {...state, status: action.status};
        case 'REGISTER/SET-APP-ERROR':
            return {...state, error: action.error};
        default:
            return state;
    }
};

//actions
export const setRegisterMessageAC = (message: string | null) => ({type: 'REGISTER/SET-MESSAGE', message} as const);
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'REGISTER/SET-APP-STATUS', status} as const);
export const setAppErrorAC = (error: string | null) => ({type: 'REGISTER/SET-APP-ERROR', error} as const);

//thunks
export const userRegisterTC = (email: string, password: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'));
    registrationApi.register(email, password)
        .then((res) => {
            if (res.data.addedUser) {
                dispatch(setRegisterMessageAC('You have successfully registered'));
                dispatch(setAppStatusAC('succeeded'));
            } else if (res.data.error) {
                dispatch(setAppErrorAC(res.data.error));
            } else {
                dispatch(setRegisterMessageAC('Some error occurred'));
            }
            dispatch(setAppStatusAC('failed'));
        })
        .catch((error: AxiosError<{ error: string }>) => {
            if (error.response) {
                if (error.response.data === undefined) {
                    dispatch(setAppErrorAC(error.message));
                } else {
                    dispatch(setAppErrorAC(error.response.data.error));
                }
            }
            dispatch(setAppStatusAC('failed'));
        });

};

//types
export type RegisterStateType = {
    message: string | null
    status: RequestStatusType
    error: string | null
}
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type RegisterActionsType =
    | ReturnType<typeof setRegisterMessageAC>
    | ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setAppErrorAC>


