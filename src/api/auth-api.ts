import axios, {AxiosResponse} from 'axios';
import { instance } from './instance-api';

//api
export const authAPI = {
    me() {
        return instance.post<UserResponseType>(`auth/me`);
    },
    registration(data: RegistrationPayloadType ) {
        return instance.post<any, AxiosResponse<RegistrationResponseType>, RegistrationPayloadType>('auth/register', data )
    },
    login(data: LoginPayloadType) {
        return instance.post<any, AxiosResponse<UserResponseType>, LoginPayloadType>(`auth/login`, data);
    },
    logout() {
        return instance.delete<ResponseType>('auth/me');
    },
    updateProfile(data: UpdateProfilePayloadType) {
        return instance.put<any, AxiosResponse<UpdateProfileResponseType>, UpdateProfilePayloadType>('auth/me', data);
    },
    forgotPassword(data: ForgotPasswordPayloadType) {
        return instance.post<any, AxiosResponse<ResponseType>, ForgotPasswordPayloadType>(`auth/forgot`, data);
    },
    updatePassword(data: UpdatePasswordPayloadType) {
        return instance.post<any, AxiosResponse<ResponseType>, UpdatePasswordPayloadType>(`auth/set-new-password`, data);
    },
}

//types
type ResponseType =  {
    info: string
    error: string
}
type RegistrationResponseType= {
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
type RegistrationPayloadType = {
    email: string,
    password: string
}
export type LoginPayloadType = {
    email: string
    password: string
    rememberMe: boolean
}
export type UserResponseType = {
    _id: string,
    email: string,
    rememberMe: boolean,
    isAdmin: boolean,
    name: string,
    verified: boolean,
    publicCardPacksCount: number,
    created: Date,
    updated: Date,
    __v: number,
    token: string,
    tokenDeathTime: number,
    avatar: string
    error?: string
}
export type UpdateProfileResponseType = {
    updatedUser: UserResponseType,
    token: string,
    tokenDeathTime: number
}
export type UpdateProfilePayloadType = {
    name: string,
    avatar: string
}
export type ForgotPasswordPayloadType = {
    email: string
    from: string
    message: string
}
export type UpdatePasswordPayloadType = {
    password: string
    resetPasswordToken: string
}


//old version types
/*
type ResponseRegistrationType= {
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
export interface IMeResponse {
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
}*/

//old version api
/*export const authAPI = {
    registration(email: string, password: string) {
        return instance.post<any, AxiosResponse<ResponseRegistrationType>, {email: string, password: string}>('auth/register', {email, password} )
    },
    login(data: ILoginParams) {
        return instance.post<any, AxiosResponse<ILoginResponse>, ILoginParams>(`auth/login`, data);
    },
    updateProfile(name: string, avatar: string) {
        return instance.put<IProfileResponse>('auth/me', {name, avatar});
    },
    logout() {
        return instance.delete<ILogOutResponse>('auth/me');
    },
    forgotPassword(data: IForgotData) {
        return instance.post<IForgotResponse>(`auth/forgot`, data);
    },
    updatePassword(data: IUpdateDataPass) {
        return instance.post<IResponseData>(`auth/set-new-password`, data);
    },
    me() {
        return instance.post<IMeResponse>(`auth/me`);
    },
}*/

