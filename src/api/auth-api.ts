import axios, {AxiosResponse} from 'axios';
import { instance } from './instance-api';

export const authAPI = {
    register(email: string, password: string) {
        return instance.post<any, AxiosResponse<ResponseType>, {email: string, password: string}>('auth/register', {email, password} )
    },
    login(data: ILoginParams) {
        return instance.post<any, AxiosResponse<ILoginResponse>, ILoginParams>(`auth/login`, data);
    },
    updateUserProfile(name: string, avatar: string) {
        return instance.put<IProfileResponse>('auth/me', {name, avatar});
    },
    logout() {
        return instance.delete<ILogOutResponse>('auth/me');
    },
    forgot(data: IForgotData) {
        return instance.post<IForgotResponse>(`auth/forgot`, data);
    },
    updatePass(data: IUpdateDataPass) {
        return instance.post<IResponseData>(`auth/set-new-password`, data);
    }
}

//types
type ResponseType= {
    addedUser: {
        _id: string,
        email: string,
        rememberMe: boolean,
        isAdmin: boolean,
        name: string,
        verified: boolean,
        publicCardPacksCount: number,
        created: string,
        updated: string,
        __v: number
    },
    error?: string,
}
export interface ILoginParams {
    email: string
    password: string
    rememberMe: boolean
}
export interface ILoginResponse {
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
interface IForgotResponse {
    info: string
    error: string
}
export interface IForgotData {
    email: string
    from: string
    message: string
}
export interface IUpdateDataPass {
    password: string
    resetPasswordToken: string
}
interface IResponseData {
    info: string
    error: string
}