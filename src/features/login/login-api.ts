import {AxiosResponse} from 'axios';
import {instance} from "../../assets/settings/instance-api";

export const loginAPI = {
    login(data: ILoginParams) {
        return instance.post<ILoginParams, AxiosResponse<ILoginResponse>>(`auth/login`, data);
    }
};

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