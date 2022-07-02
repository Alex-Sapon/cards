import {AxiosError} from 'axios';
import {authAPI, LoginPayloadType, UserResponseType} from '../../api/auth-api';
import {AppThunk} from '../../app/store';
import {LoadingStatus} from '../setPass/set-pass-reducer';

const initialState: LoginDataUserType = {
    _id: '',
    email: '',
    name: '',
    avatar: '',
    publicCardPacksCount: 0,
    created: new Date(),
    updated: new Date(),
    isAdmin: false,
    verified: false,
    rememberMe: false,
    error: '',
    __v: 0,
    token: '',
    tokenDeathTime: 0,
    isLoggedIn: false,
    responseMessage: null,
    status: 'idle',
}

export type LoginStateType = typeof initialState;

export const loginReducer = (state: LoginStateType = initialState, action: LoginActions): LoginStateType => {
    switch (action.type) {
        case 'LOGIN/SET-LOGIN-DATA-USER':
            return {...state, ...action.data};
        case 'LOGIN/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.isLoggedIn};
        case 'LOGIN/SET-RESPONSE-MESSAGE':
            return {...state, responseMessage: action.message};
        case 'LOGIN/SET-STATUS':
            return {...state, status: action.status};
        default:
            return state;
    }
};

export const setLoginData = (data: UserResponseType) => ({
    type: 'LOGIN/SET-LOGIN-DATA-USER',
    data,
} as const);

export const setIsLoggedIn = (isLoggedIn: boolean) => ({
    type: 'LOGIN/SET-IS-LOGGED-IN',
    isLoggedIn,
} as const);

export const setResponseMessage = (message: string | null) => ({
    type: 'LOGIN/SET-RESPONSE-MESSAGE',
    message,
} as const);

export const setLoadStatus = (status: LoadingStatus) => ({
    type: 'LOGIN/SET-STATUS',
    status,
} as const);

export const login = (data: LoginPayloadType): AppThunk => dispatch => {
    dispatch(setLoadStatus('loading'));

    authAPI.login(data)
        .then(res => {
            dispatch(setLoginData(res.data));
            dispatch(setIsLoggedIn(true));
        })
        .catch((e: AxiosError<{error: string}>) => {
            const error = (e.response && e.response.data) ? e.response.data.error : e.message;

            dispatch(setResponseMessage(error));
        })
        .finally(() => {
            dispatch(setLoadStatus('idle'));
        })
};

export type LoginActions =
    | ReturnType<typeof setLoginData>
    | ReturnType<typeof setIsLoggedIn>
    | ReturnType<typeof setResponseMessage>
    | ReturnType<typeof setLoadStatus>;

type LoginDataUserType = UserResponseType & {
    isLoggedIn: boolean
    responseMessage: string | null
    status: LoadingStatus
};
