import {AppThunk} from './store';
import {setIsLoggedIn, setLoginData} from '../features/login/login-reducer';
import {AxiosError} from 'axios';
import {authAPI} from '../api/auth-api';

const initialState: AppStateType = {
    isInitialized: false,
};

export const appReducer = (state: AppStateType = initialState, action: AppActionsType): AppStateType => {
    switch (action.type) {
        case 'APP/SET-INITIALIZE-APP':
            return {...state, isInitialized: action.isInitialized};
        default:
            return state;
    }
};

const setInitializeApp = (isInitialized: boolean) => ({
    type: 'APP/SET-INITIALIZE-APP',
    isInitialized,
} as const);

export const initializeApp = (): AppThunk => dispatch => {
    authAPI.me()
        .then((res) => {
            dispatch(setLoginData(res.data))
            dispatch(setIsLoggedIn(true));
        })
        .catch((e: AxiosError<{ error: string }, any>) => {
            const error = (e.response && e.response.data) ? e.response.data.error : e.message;

            console.log(error);
        })
        .finally(() => {
            dispatch(setInitializeApp(true));
        })
}

type AppStateType = {
    isInitialized: boolean
}

export type AppActionsType =
    | ReturnType<typeof setInitializeApp>;