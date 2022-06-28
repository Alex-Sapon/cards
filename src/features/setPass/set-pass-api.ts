import axios from 'axios';

export const instanceLogin = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    withCredentials: true,
});

export const setPasswordAPI = {
    updatePass(data: IUpdateDataPass) {
        return instanceLogin.post<IResponseData>(`auth/set-new-password`, data);
    }
};

export interface IUpdateDataPass {
    password: string
    resetPasswordToken: string
}

interface IResponseData {
    info: string
    error: string
}