import axios from "axios";

const instanceProfile = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    withCredentials: true,
})


export const profileAPI = {
    updateUserProfile(name:string) {
        return instanceProfile.put<IProfileResponse>('auth/me', {name});
    },
}

export const authProfileAPI = {
    logout() {
        return instanceProfile.delete<IlogOutResponse>('auth/me');
    }
}

interface IlogOutResponse {
    info: string
    error: string
}

export interface IProfileResponse {
    updatedUser: {
        _id: string;
        email: string;
        name: string;
        avatar?: string;
        publicCardPacksCount: number;
        created: Date;
        updated: Date;
        isAdmin: boolean;
        verified: boolean;
        rememberMe: boolean;
        error?: string;
    }
    error?: string
}