import {AxiosResponse} from 'axios';
import {instance} from "../../api/instance-api";

export const appAPI = {
    me() {
        return instance.post<IMeResponse>(`auth/me`);
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