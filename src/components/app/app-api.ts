import axios, {AxiosResponse} from 'axios';
import {instance} from "../../assets/settings/instance-api";

export const appAPI = {
    me() {
        return instance.post<any, AxiosResponse<IMeResponse>, {}>(`auth/me`);
    }
};

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
}