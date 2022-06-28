import {AppThunk} from './store';
import {appAPI} from './app-api';
import {setErrorMessage, setIsLoggedIn, setLoginData} from '../../features/login/login-reducer';

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
    appAPI.me()
        .then(res => {
            dispatch(setLoginData(res.data));
            dispatch(setIsLoggedIn(true));
        })
        .catch((e) => {
            const error = e.response ? e.response.data.error : (e.message + ', more details in the console');
            dispatch(setErrorMessage(error));
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