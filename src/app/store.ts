import {applyMiddleware, combineReducers, legacy_createStore as createStore} from 'redux';
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {LoginActionsType, loginReducer} from '../features/login/reducer/loginReducer';
import {RegistrationActionsType, registrationReducer} from '../features/registration/reducer/registrationReducer';
import {SetNewPasswordActionsType, setPasswordReducer} from '../features/setPassword/reducer/setPasswordReducer';
import {
    RecoveryPasswordActionsType,
    recoveryPasswordReducer
} from '../features/recoveryPassword/reducer/recoveryPasswordReducer';
	RecoveryPasswordActionsType,
	recoveryPasswordReducer
} from '../features/recoveryPass/reducer/recoveryPassReducer';
import {AppActionsType, appReducer} from './reducer/app-reducer';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {PacksListActionsType, packsListReducer} from '../features/packsList/reducer/packsListReducer';
import {TablePacksActionsType, tablePacksReducer} from '../features/packsList/tablePacks/reducer/tablePacksReducer';
import {packsListDimaApi} from '../features/packsList/Dima/api/DimaAPI';
import {PacksListDimaActionsType, packsListDimaReducer} from '../features/packsList/Dima/reducer/packsListDimaReducer';
import {PacksListActionsType, packsListReducer} from '../features/packsList/packs-list-reducer';
import {TablePacksActionsType, tablePacksReducer} from '../features/packsList/tablePacks/table-packs-reducer';
import {CardsNameActionsType, cardsNameReducer} from "../features/packName/reducer/packCardReducer";


const rootReducer = combineReducers({
    app: appReducer,
    profile: profileReducer,
    login: loginReducer,
    setPassword: setPasswordReducer,
    recoveryPassword: recoveryPasswordReducer,
    registration: registrationReducer,
    packList: packsListReducer,
    tablePacks: tablePacksReducer,
    packListDima: packsListDimaReducer
	app: appReducer,
	login: loginReducer,
	setPassword: setPasswordReducer,
	recoveryPassword: recoveryPasswordReducer,
	registration: registrationReducer,
	packList: packsListReducer,
	cardPack: cardsNameReducer,
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
    | RegistrationActionsType
    | PacksListActionsType
    | TablePacksActionsType
    | PacksListDimaActionsType
	| LoginActionsType
	| AppActionsType
	| RecoveryPasswordActionsType
	| SetNewPasswordActionsType
	| RegistrationActionsType
	| PacksListActionsType
	| TablePacksActionsType
	| CardsNameActionsType


export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, ActionsType>;

export type AppDispatch = ThunkDispatch<AppStateType, unknown, ActionsType>;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector;

// @ts-ignore
window.store = store;