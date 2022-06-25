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
}

export type LoginStateType = typeof initialState;

export const loginReducer = (state: LoginStateType = initialState, action: LoginActions): LoginStateType => {
    switch (action.type) {
        case 'LOGIN/SET-LOGIN-USER':
            return {...state, ...action.data, isLoggedIn: true};
        default:
            return state;
    }
};

export const setLogin = (data: ILoginResponse) => ({
    type: 'LOGIN/SET-LOGIN-USER',
    data,
} as const);

export const login = (data: ILoginParams): AppThunk => dispatch => {


    loginAPI.login(data)
        .then(res => {
            debugger
            dispatch(setLogin(res.data));
        })
        .catch((e: AxiosError) => {
            const error = e.response ? e.response.data : (e.message + ', more details in the console');
            console.log(error);
            console.log('Error: ', {...e});
        })
        .finally(() => {

        })
}

export type LoginActions = ReturnType<typeof setLogin>;

type LoginDataUserType = ILoginResponse & {
    isLoggedIn: boolean
    errorMessage: string | null
}
