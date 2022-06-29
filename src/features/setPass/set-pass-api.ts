import {instance} from "../../assets/settings/instance-api";

export const setPasswordAPI = {
    updatePass(data: IUpdateDataPass) {
        return instance.post<IResponseData>(`auth/set-new-password`, data);
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