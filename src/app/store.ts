import {applyMiddleware, combineReducers, legacy_createStore as createStore} from 'redux';
import {ProfileActionsType, profileReducer} from '../features/profile/reducer/profileReducer';
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {LoginActionsType, loginReducer} from '../features/login/reducer/login-reducer';
import {RegistrationActionsType, registrationReducer} from '../features/registration/reducer/registrationReducer';
import {SetNewPasswordActionsType, setPasswordReducer} from '../features/setPass/reducer/set-pass-reducer';
import {
    RecoveryPasswordActionsType,
    recoveryPasswordReducer
} from '../features/recoveryPass/reducer/recoveryPassReducer';
import {AppActionsType, appReducer} from './reducer/app-reducer';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {PacksListActions, packsListReducer} from '../../features/packsList/packs-list-reducer';
import {TablePacksActions, tablePacksReducer} from '../../features/packsList/tablePacks/table-packs-reducer';


const rootReducer = combineReducers({
    app: appReducer,
    profile: profileReducer,
    login: loginReducer,
    setPassword: setPasswordReducer,
    recoveryPassword: recoveryPasswordReducer,
    registration: registrationReducer,
    setPass: setPassReducer,
    recoveryPass: recoveryPassReducer,
    register: registrationReducer,
    packList: packsListReducer,
    tablePacks: tablePacksReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppStateType = ReturnType<typeof rootReducer>;

export type ActionsType =
    | LoginActionsType
    | AppActionsType
    | ProfileActionsType
    | RecoveryPasswordActionsType
    | SetNewPasswordActionsType
    | RegistrationActionsType;
    | RecPassActions
    | SetNewPassActions
    | RegisterActionsType
    | PacksListActions
    | TablePacksActions;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, ActionsType>;

export type AppDispatch = ThunkDispatch<AppStateType, unknown, ActionsType>;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector;

// @ts-ignore
window.store = store;