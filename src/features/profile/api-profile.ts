import {instance} from "../../assets/settings/instance-api";

export const profileAPI = {
	updateUserProfile(name: string, avatar: string) {
		return instance.put<IProfileResponse>('auth/me', {name, avatar});
	},
}

export const authProfileAPI = {
	logout() {
		return instance.delete<ILogOutResponse>('auth/me');
	}
}

interface ILogOutResponse {
	info: string
	error: string
}

export interface IProfileResponse {
	updatedUser: IProfileUpdateData
	error?: string
}

export interface IProfileUpdateData {
	_id: string
	email: string
	name: string
	avatar?: string
	publicCardPacksCount: number
	created: Date
	updated: Date
	isAdmin: boolean
	verified: boolean
	rememberMe: boolean
	error?: string
}