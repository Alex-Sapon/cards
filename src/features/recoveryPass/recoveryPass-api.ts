import axios, {AxiosResponse} from 'axios';

const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    withCredentials: true,
});

export const forgotAPI = {
    forgot(data: IForgotData) {
        return instance.post<{}, AxiosResponse<IForgotResponse>>(`auth/forgot`, data);
    },
};

interface IForgotResponse {
    info: string
    error: string
}

export interface IForgotData {
    email: string
    from: string
    message: string
}