import {applyMiddleware, combineReducers, legacy_createStore as createStore} from 'redux';
import {profileReducer} from '../../features/profile/profileReducer';
import thunk, {ThunkAction} from 'redux-thunk';
import {loginReducer} from '../../features/login/loginReducer';
import {setPassReducer} from '../../features/setPass/setPassReducer';
import {registrationReducer} from '../../features/registration/registrationReducer';
import {recoveryPassReducer} from '../../features/recoveryPass/recoveryPassReducer';

const rootReducer = combineReducers({
    profile: profileReducer,
    login: loginReducer,
    setPass: setPassReducer,
    recoveryPass: recoveryPassReducer,
    register: registrationReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppStateType = ReturnType<typeof rootReducer>;

type ActionsType = any

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, ActionsType>;

// export type AppThunk = ThunkAction<void, AppStateType, unknown, ActionsType>;
// export type ThunkDispatchType = ThunkDispatch<AppStateType, unknown, ActionsType>;

// @ts-ignore
window.store = store;