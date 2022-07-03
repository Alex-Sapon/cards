import {AxiosError} from 'axios';
import {AppThunk} from '../../components/app/store';
import {LoadingStatus} from '../setPass/set-pass-reducer';
import {ILoginParams, ILoginResponse, loginAPI} from './login-api';

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

export const setLoginData = (data: ILoginResponse) => ({
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

export const login = (data: ILoginParams): AppThunk => dispatch => {
    dispatch(setLoadStatus('loading'));

    loginAPI.login(data)
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

type LoginDataUserType = ILoginResponse & {
    isLoggedIn: boolean
    responseMessage: string | null
    status: LoadingStatus
};
