import {AppThunk} from '../../components/app/store';
import {ILoginParams, ILoginResponse, loginAPI} from './login-api';
import {AxiosError} from 'axios';

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
    errorMessage: null,
    isDisabled: false,
}

export type LoginStateType = typeof initialState;

export const loginReducer = (state: LoginStateType = initialState, action: LoginActions): LoginStateType => {
    switch (action.type) {
        case 'LOGIN/SET-LOGIN-USER':
            return {...state, ...action.data, isLoggedIn: true};
        case 'LOGIN/SET-ERROR-MESSAGE':
            return {...state, errorMessage: action.error};
        case 'LOGIN/SET-IS-DISABLED':
            return {...state, isDisabled: action.isDisabled};
        default:
            return state;
    }
};

export const setLogin = (data: ILoginResponse) => ({
    type: 'LOGIN/SET-LOGIN-USER',
    data,
} as const);

export const setErrorMessage = (error: string | null) => ({
    type: 'LOGIN/SET-ERROR-MESSAGE',
    error,
} as const);

export const setIsDisabled = (isDisabled: boolean) => ({
    type: 'LOGIN/SET-IS-DISABLED',
    isDisabled,
} as const);

export const login = (data: ILoginParams): AppThunk => dispatch => {
    dispatch(setIsDisabled(true));

    loginAPI.login(data)
        .then(res => {
            dispatch(setLogin(res.data));
        })
        .catch((e) => {
            const error = e.response ? e.response.data.error : (e.message + ', more details in the console');
            dispatch(setErrorMessage(error));
        })
        .finally(() => {
            dispatch(setIsDisabled(false));
        })
};

export type LoginActions =
    | ReturnType<typeof setLogin>
    | ReturnType<typeof setErrorMessage>
    | ReturnType<typeof setIsDisabled>;

type LoginDataUserType = ILoginResponse & {
    isLoggedIn: boolean
    errorMessage: string | null
    isDisabled: boolean
};
