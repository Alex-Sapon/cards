import {AxiosError} from 'axios';
import {authAPI, LoginPayloadType, UserResponseType} from '../../../api/auth-api';
import {AppThunk} from '../../../app/store';
import {setAppErrorAC, setAppStatusAC} from '../../../app/reducer/app-reducer';
import {setUpdateProfileAC} from '../../profile/reducer/profileReducer';

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
}

export type LoginStateType = typeof initialState;

export const loginReducer = (state: LoginStateType = initialState, action: LoginActionsType): LoginStateType => {
    switch (action.type) {
        case 'LOGIN/SET-LOGIN-DATA-USER':
            return {...state, ...action.data};
        case 'LOGIN/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.isLoggedIn};
        default:
            return state;
    }
};

//actions
export const setLoginData = (data: UserResponseType) => ({type: 'LOGIN/SET-LOGIN-DATA-USER', data,} as const);
export const setIsLoggedIn = (isLoggedIn: boolean) => ({type: 'LOGIN/SET-IS-LOGGED-IN', isLoggedIn,} as const);

//thunks
export const login = (data: LoginPayloadType): AppThunk => dispatch => {
    dispatch(setAppStatusAC('loading'));

    authAPI.login(data)
        .then(res => {
            dispatch(setLoginData(res.data));
            dispatch(setUpdateProfileAC(res.data))
            dispatch(setIsLoggedIn(true));
        })
        .catch((e: AxiosError<{error: string}>) => {
            const error = (e.response && e.response.data) ? e.response.data.error : e.message;
            dispatch(setAppErrorAC(error));
        })
        .finally(() => {
            dispatch(setAppStatusAC('idle'));
        })
};

//types
export type LoginActionsType =
    | ReturnType<typeof setLoginData>
    | ReturnType<typeof setIsLoggedIn>
export type LoginDataUserType = UserResponseType & {
    isLoggedIn: boolean
};
