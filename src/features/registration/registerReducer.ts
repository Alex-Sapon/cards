import {AppThunk} from '../../components/app/store';
import {registerAPI} from '../../api/register-api';

const initialState: RegisterStateType = {
    email: '',
    password: '',
}

export const registerReducer = (state: RegisterStateType = initialState, action: RegisterActionsType): RegisterStateType => {
    switch(action.type) {
        case 'REGISTER/USER-REGISTER':
            return {...state, email: action.email, password: action.password}
        default:
            return state;
    }
}

//actions
const userRegisterAC = (email: string, password: string) => ({type: 'REGISTER/USER-REGISTER', email, password} as const)

//thunks
export const userRegisterTC = (email: string, password: string): AppThunk => (dispatch) => {
    registerAPI.register(email, password)
        .then((res) => {
            dispatch(userRegisterAC(email, password))
        })
}

//types
export type RegisterStateType = {
    email: string,
    password: string
}
type RegisterActionsType =
    | ReturnType<typeof userRegisterAC>