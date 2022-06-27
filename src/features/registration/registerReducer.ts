import {AppThunk} from '../../components/app/store';
import {registerAPI} from '../../api/register-api';
import {AxiosError} from 'axios';

const initialState: RegisterStateType = {
    isRegistered: false,
    message: null
}

export const registerReducer = (state: RegisterStateType = initialState, action: RegisterActionsType): RegisterStateType => {
    switch(action.type) {
        case 'REGISTER/USER-SET-REGISTERED':
            return {...state, isRegistered: action.isRegistered}
        case 'REGISTER/SET-MESSAGE':
            return {...state, message: action.message}
        default:
            return state;
    }
}

//actions
const userSetRegisterAC = (isRegistered: boolean) => ({type: 'REGISTER/USER-SET-REGISTERED', isRegistered} as const)
export const setRegisterMessageAC = (message: string | null) => ({type: 'REGISTER/SET-MESSAGE', message} as const)
//thunks
export const userRegisterTC = (email: string, password: string): AppThunk => (dispatch) => {
    registerAPI.register(email, password)
        .then((res) => {
            debugger
            if (res.data.addedUser) {
                dispatch(userSetRegisterAC(true))
                dispatch(setRegisterMessageAC('You have successfully registered'))
            }
        })
        .catch((error) => {
            debugger
            dispatch(setRegisterMessageAC(error.response.data.error))
        })

}

//types
export type RegisterStateType = {
    isRegistered: boolean
    message: string | null
}
export type RegisterActionsType =
    | ReturnType<typeof userSetRegisterAC>
    | ReturnType<typeof setRegisterMessageAC>