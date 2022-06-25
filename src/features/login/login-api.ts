import axios from 'axios';

export const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    withCredentials: true,
});

export const loginAPI = {
    login(data: ILoginParams) {
        return instance.post<ILoginResponse>(`auth/login`, data);
    }
};

interface ILoginParams {
    email: string
    password: string
    rememberMe: boolean
};

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
};