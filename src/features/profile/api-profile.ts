import axios from "axios";

const instanceProfile = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    withCredentials: true,
})


export const profileAPI = {
    createProfile(name: string) {
        return instanceProfile.put<IUpdateUserProfile>('auth/me', {name});
    },
}

export const authProfileAPI = {
    logout() {
        return instanceProfile.delete<IlogOut>('auth/me');
    }
}

interface IlogOut {
    info: number
    error: string
}

interface IUpdateUserProfile {
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