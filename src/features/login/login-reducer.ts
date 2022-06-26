import {AppThunk} from '../../components/app/store';
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
    errorMessage: null,
    isDisabled: false,
}

export type LoginStateType = typeof initialState;

export const loginReducer = (state: LoginStateType = initialState, action: LoginActions): LoginStateType => {
    switch (action.type) {
        case 'LOGIN/SET-LOGIN-DATA-USER':
            return {...state, ...action.data};
        case 'LOGIN/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.isLoggedIn};
        case 'LOGIN/SET-ERROR-MESSAGE':
            return {...state, errorMessage: action.error};
        case 'LOGIN/SET-IS-DISABLED':
            return {...state, isDisabled: action.isDisabled};
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
            dispatch(setLoginData(res.data));
            dispatch(setIsLoggedIn(true));
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
    | ReturnType<typeof setLoginData>
    | ReturnType<typeof setIsLoggedIn>
    | ReturnType<typeof setErrorMessage>
    | ReturnType<typeof setIsDisabled>;

type LoginDataUserType = ILoginResponse & {
    isLoggedIn: boolean
    errorMessage: string | null
    isDisabled: boolean
};
