import {applyMiddleware, combineReducers, legacy_createStore as createStore} from 'redux';
import {ProfileActions, profileReducer} from '../../features/profile/profileReducer';
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {LoginActions, loginReducer} from '../../features/login/login-reducer';
import {RegisterActionsType, registrationReducer} from '../../features/registration/registrationReducer';
import {SetNewPassActions, setPassReducer} from '../../features/setPass/set-pass-reducer';
import {recoveryPassReducer} from '../../features/recoveryPass/recoveryPassReducer';
import {AppActionsType, appReducer} from './app-reducer';
import {useDispatch} from 'react-redux';

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

export const useAppDispatch = () => useDispatch<ThunkDispatch<AppStateType, unknown, ActionsType>>();

export type ActionsType = LoginActions | AppActionsType | ProfileActions | RecPassActions | SetNewPassActions | RegisterActionsType;
export type ActionsType = LoginActions | AppActionsType | ProfileActions;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, ActionsType>;

export type AppDispatch = ThunkDispatch<AppStateType, unknown, ActionsType>

// export type AppThunk = ThunkAction<void, AppStateType, unknown, ActionsType>;
// export type ThunkDispatchType = ThunkDispatch<AppStateType, unknown, ActionsType>;

// @ts-ignore
window.store = store;