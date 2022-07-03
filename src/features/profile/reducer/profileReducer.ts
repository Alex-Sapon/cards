import {authAPI, UpdateProfileResponseType, UserResponseType} from '../../../api/auth-api';
import {AppThunk} from '../../../app/store';
import {setIsLoggedIn} from '../../login/reducer/login-reducer';
import {setAppErrorAC, setAppStatusAC} from '../../../app/reducer/app-reducer';

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
		default:
			return state
	}
}

//actions
export const setUpdateProfileAC = (data: UpdateProfileResponseType) => ({type: 'profile/SET-UPDATE-PROFILE', data} as const);
//actions
export const setUpdateProfileAC = (data: IProfileResponse) => ({type: 'profile/SET-UPDATE-PROFILE',	data} as const);
export const setProfileStatusAC = (status: boolean) => ({type: 'profile/SET-STATUS', status} as const)

//thunks
export const logoutTC = (): AppThunk => dispatch => {
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
}

export const updateProfileTC = (name: string, avatar: string): AppThunk => dispatch => {
	dispatch(setAppStatusAC('loading'))
	authAPI.updateProfile({name, avatar})
		.then(res => {
			dispatch(setUpdateProfileAC(res.data))
		})
		.catch((e: any) => {
			const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
			dispatch(setAppErrorAC(error))
		})
		.finally(() => {
			dispatch(setAppStatusAC('idle'))
		})
}

//types
export type ProfileStateType = UserResponseType & {
	status: boolean
}
export type ProfileActionsType =
	| ReturnType<typeof setUpdateProfileAC>