import {authProfileAPI, profileAPI} from "./api-profile";
import {AppThunk} from "../../components/app/store";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState: ProfileStateType = {
    _id: '2323',
    email: '2244@mail.ru',
    name: 'Alex',
    avatar: '',
    publicCardPacksCount: 122,
    IsLogOut: false,
    status: 'idle',
    error: null
}

export type ProfileStateType = {
    _id: string
    email: string
    name: string
    avatar: string,
    publicCardPacksCount: number
    IsLogOut: boolean
    status: RequestStatusType
    error: string | null
}

export const profileReducer = (state: ProfileStateType = initialState, action: ActionsType): ProfileStateType => {
    switch (action.type) {
        case 'profile/SET-LOG-OUT':
            return {...state, IsLogOut: action.value}
        case 'profile/SET-UPDATE-PROFILE':
            return {...state, name: action.name}
        case 'profile/SET-STATUS':
            return {...state, status: action.status}
        case 'profile/SET-ERROR':
            return {...state, error: action.error}
        default:
            return state
    }
}

/*export const setLogOut = (value: boolean) => ({type: 'profile/SET-LOG-OUT', value} as const)*/
export const setUpdateProfile = (name: string) => ({type: 'profile/SET-UPDATE-PROFILE', name} as const)
export const setProfileStatusAC = (status: RequestStatusType) => ({type: 'profile/SET-STATUS', status} as const)
export const setProfileErrorAC = (error: string | null) => ({type: 'profile/SET-ERROR', error} as const)

export const logoutTC = (): AppThunk => dispatch => {
    dispatch(setProfileStatusAC('loading'))
    authProfileAPI.logout()
        .then(res => {
            dispatch(setLogOut(false))
        })
        .catch((error) => {
            dispatch(setProfileErrorAC(error.message ? error.message : 'Some error occurred'))
        })
        .finally(() => {
            dispatch(setProfileStatusAC('succeeded'))
        })
}

export const updateProfileTC = (name: string): AppThunk => dispatch => {
    dispatch(setProfileStatusAC('loading'))
    profileAPI.createProfile(name)
        .then(res => {
            dispatch(setUpdateProfile(name))
        })
        .catch((error) => {
            dispatch(setProfileErrorAC(error.message ? error.message : 'Some error occurred'))
        })
        .finally(() => {
            dispatch(setProfileStatusAC('succeeded'))
        })
}

export type SetLogOutActionType = ReturnType<typeof setLogOut>
export type SetUpdateProfileActionType = ReturnType<typeof setUpdateProfile>
export type SetProfileStatusActionType = ReturnType<typeof setProfileStatusAC>
export type SetProfileErrorActionType = ReturnType<typeof setProfileErrorAC>

export type ActionsType = SetLogOutActionType
    | SetUpdateProfileActionType
    | SetProfileStatusActionType
    | SetProfileErrorActionType
