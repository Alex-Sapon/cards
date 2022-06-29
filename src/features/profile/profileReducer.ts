import {authProfileAPI, profileAPI} from "./api-profile";
import {AppThunk} from "../../components/app/store";
import {setResponseMessage, setIsLoggedIn} from "../login/login-reducer";

const initialState: ProfileStateType = {
	name: '',
	status: false,
	avatar:''
}

export const profileReducer = (state: ProfileStateType = initialState, action: ProfileActionsType): ProfileStateType => {
	switch (action.type) {
		case 'profile/SET-UPDATE-PROFILE':
			return {...state, name: action.name, avatar: action.avatar}
		case 'profile/SET-STATUS':
			return {...state, status: action.status}
		default:
			return state

	}
}

//actions
export const setUpdateProfileAC = (name: string, avatar: string) => ({
	type: 'profile/SET-UPDATE-PROFILE', name,
	avatar
} as const)
export const setProfileStatusAC = (status: boolean) => ({type: 'profile/SET-STATUS', status} as const)

//thunks
export const logoutTC = (): AppThunk => dispatch => {
		dispatch(setProfileStatusAC(true))
		authProfileAPI.logout()
			.then(res => {
				dispatch(setIsLoggedIn(false))
			})
			.catch((error) => {
				dispatch(setResponseMessage(error.message ? error.message : 'Some error occurred'))
			})
			.finally(() => {
				dispatch(setProfileStatusAC(false))
			})

	}

export const updateProfileTC = (name: string, avatar: string): AppThunk => dispatch => {
	dispatch(setProfileStatusAC(true))
	profileAPI.updateUserProfile(name, avatar)
		.then(res => {
			//let {name, avatar} = res.data.updatedUser
			dispatch(setUpdateProfileAC(name, avatar))
		})
		.catch((e: any) => {
			const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
			dispatch(setResponseMessage(error))
		})
		.finally(() => {
			dispatch(setProfileStatusAC(false))
		})
}

//types
export type ProfileStateType = {
	name: string
	status: boolean
	avatar?: string
}
export type ProfileActionsType =
	| ReturnType<typeof setUpdateProfileAC>
	| ReturnType<typeof setProfileStatusAC>