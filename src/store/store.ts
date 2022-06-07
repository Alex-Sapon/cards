import { applyMiddleware, combineReducers, legacy_createStore as createStore } from "redux";
import { profileReducer } from "./reducers/profileReducer";
import thunk from 'redux-thunk';
import {loginReducer} from './reducers/loginReducer';
import {newPasswordReducer} from './reducers/newPasswordReducer';
import {recoveryPasswordReducer} from './reducers/recoveryPasswordReducer';
import {registerReducer} from './reducers/registerReducer';

const rootReducer = combineReducers({
    profile: profileReducer,
    login: loginReducer,
    newPassword: newPasswordReducer,
    recoveryPassword: recoveryPasswordReducer,
    register: registerReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;