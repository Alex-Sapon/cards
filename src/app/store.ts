import {applyMiddleware, combineReducers, legacy_createStore as createStore} from 'redux';
import {ProfileActionsType, profileReducer} from '../features/profile/profileReducer';
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {LoginActions, loginReducer} from '../features/login/login-reducer';
import {RegisterActionsType, registrationReducer} from '../features/registration/registrationReducer';
import {SetNewPassActions, setPassReducer} from '../features/setPass/set-pass-reducer';
import {recoveryPassReducer, RecPassActions} from '../features/recoveryPass/recoveryPassReducer';
import {AppActionsType, appReducer} from './app-reducer';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';


const rootReducer = combineReducers({
    app: appReducer,
    profile: profileReducer,
    login: loginReducer,
    setPass: setPassReducer,
    recoveryPass: recoveryPassReducer,
    register: registrationReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppStateType = ReturnType<typeof rootReducer>;

export type ActionsType =
    | LoginActions
    | AppActionsType
    | ProfileActionsType
    | RecPassActions
    | SetNewPassActions
    | RegisterActionsType;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, ActionsType>;

export type AppDispatch = ThunkDispatch<AppStateType, unknown, ActionsType>;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector;

// @ts-ignore
window.store = store;