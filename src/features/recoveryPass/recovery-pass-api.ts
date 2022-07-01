import {AxiosResponse} from 'axios';
import {instance} from '../../assets/settings/instance-api';

export const forgotAPI = {
    forgot(data: IForgotData) {
        return instance.post<IForgotData, AxiosResponse<IForgotResponse>>(`auth/forgot`, data);
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