import {authProfileAPI, profileAPI} from "./api-profile";
import {AppThunk} from "../../components/app/store";
import {setErrorMessage, setIsLoggedIn} from "../login/login-reducer";

const initialState: ProfileStateType = {
	name: '',
	status: false,
	avatar:''
}

export const profileReducer = (state: ProfileStateType = initialState, action: ProfileActionsType): ProfileStateType => {
	switch (action.type) {
		case 'profile/SET-UPDATE-PROFILE':
			return {...state, name: action.name}
		case 'profile/SET-STATUS':
			return {...state, status: action.status}
		default:
			return state

	}
}

//actions
export const setUpdateProfileAC = (name: string) => ({type: 'profile/SET-UPDATE-PROFILE', name} as const)
export const setProfileStatusAC = (status: boolean) => ({type: 'profile/SET-STATUS', status} as const)

//thunks
export const logoutTC = (): AppThunk => dispatch => {
		dispatch(setProfileStatusAC(true))
		authProfileAPI.logout()
			.then(res => {
				dispatch(setIsLoggedIn(false))
			})
			.catch((error) => {
				dispatch(setErrorMessage(error.message ? error.message : 'Some error occurred'))
			})
			.finally(() => {
				dispatch(setProfileStatusAC(false))
			})
		dispatch(setProfileStatusAC(true))
		authProfileAPI.logout()
			.then((res) => {
				dispatch(setIsLoggedIn(false))
			})
			.catch((e: any) => {
				const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
				dispatch(setErrorMessage(error))
			})
			.finally(() => {
				dispatch(setProfileStatusAC(false))
			})
	}

	export const updateProfileTC = (name: string): AppThunk => dispatch => {
		dispatch(setProfileStatusAC(true))
		profileAPI.updateUserProfile(name)
			.then(res => {
				dispatch(setUpdateProfileAC(name))
			})
			.catch((e: any) => {
				const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
				dispatch(setErrorMessage(error))
			})
			.finally(() => {
				dispatch(setProfileStatusAC(false))
			})
	}


export type ProfileStateType = {
		name: string
		status: boolean
		avatar?:''
	}
export type ProfileActionsType =
	| ReturnType<typeof setUpdateProfileAC>
	| ReturnType<typeof setProfileStatusAC>