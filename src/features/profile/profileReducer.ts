import {authAPI, UpdateProfileResponseType, UserResponseType} from '../../api/auth-api';
import {AppThunk} from '../../app/store';
import {setIsLoggedIn, setResponseMessage} from '../login/login-reducer';

const initialState: ProfileStateType = {
	_id: '',
	email: '',
	name: '',
	avatar: '',
	publicCardPacksCount: 0,
	created: new Date(),
	updated: new Date(),
	isAdmin: false,
	verified: false,
	rememberMe: false,
	error: '',
	__v: 0,
	token: '',
	tokenDeathTime: 0,
	status: false,
}

export const profileReducer = (state: ProfileStateType = initialState, action: ProfileActionsType): ProfileStateType => {
	switch (action.type) {
		case 'profile/SET-UPDATE-PROFILE':
			return {...state, ...action.data}
		case 'profile/SET-STATUS':
			return {...state, status: action.status}
		default:
			return state
	}
}

export const setUpdateProfileAC = (data: UpdateProfileResponseType) => ({
	type: 'profile/SET-UPDATE-PROFILE',
	data,
} as const);

export const setProfileStatusAC = (status: boolean) => ({type: 'profile/SET-STATUS', status} as const)

//thunks
export const logoutTC = (): AppThunk => dispatch => {
	dispatch(setProfileStatusAC(true))
	authAPI.logout()
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
	authAPI.updateProfile({name, avatar})
		.then(res => {
			dispatch(setUpdateProfileAC(res.data))
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
export type ProfileStateType = UserResponseType & {
	status: boolean

}
export type ProfileActionsType =
	| ReturnType<typeof setUpdateProfileAC>
	| ReturnType<typeof setProfileStatusAC>