import {authAPI, UserResponseType} from '../../../api/auth-api';
import {authAPI, UpdateProfileResponseType} from '../../../api/auth-api';
import {AppThunk} from '../../../app/store';
import {setIsLoggedIn} from '../../login/reducer/loginReducer';
import {setAppErrorAC, setAppStatusAC} from '../../../app/reducer/app-reducer';

const initialState: UserResponseType = {
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
}
/*const initialState = {}

export const profileReducer = (state: UserResponseType = initialState, action: ProfileActionsType): UserResponseType => {
export const profileReducer = (state: any = initialState, action: any) => {
	switch (action.type) {
		case '':
			return
		default:
			return state
	}
}

//actions
export const setUpdateProfileAC = (data: UserResponseType) => ({type: 'PROFILE/SET-UPDATE-PROFILE', data} as const);
export const setUpdateProfileAC = (data: UpdateProfileResponseType) => ({
	type: 'PROFILE/SET-UPDATE-PROFILE',
	data
} as const);*/

//thunks
/*export const logoutTC = (): AppThunk => dispatch => {
	dispatch(setAppStatusAC('loading'))
	authAPI.logout()
		.then(res => {
			dispatch(setIsLoggedIn(false))
		})
		.catch((error) => {
			dispatch(setAppErrorAC(error.message ? error.message : 'Some error occurred'))
		})
		.finally(() => {
			dispatch(setAppStatusAC('idle'))
		})
}*/

/*export const updateProfileTC = (name: string, avatar: string): AppThunk => dispatch => {
	dispatch(setAppStatusAC('loading'))
	authAPI.updateProfile({name, avatar})
		.then(res => {
			dispatch(setUpdateProfileAC(res.data.updatedUser))
			dispatch(setLoginData(res.data.updatedUser))
		})
		.catch((e: any) => {
			const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
			dispatch(setAppErrorAC(error))
		})
		.finally(() => {
			dispatch(setAppStatusAC('idle'))
		})
}*/

//types
export type ProfileActionsType =
	| ReturnType<typeof setUpdateProfileAC>
/*
export type ProfileStateType = any
export type ProfileActionsType = any

*/
