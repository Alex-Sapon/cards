import axios, {AxiosResponse} from 'axios';


const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
    withCredentials: true,
});

export const registrationApi = {
    register(email: string, password: string) {
        return instance.post<any, AxiosResponse<ResponseType>, {email: string, password: string}>('auth/register', {email, password} )
    },
}

//types
type ResponseType= {
    addedUser: {
        _id: string,
        email: string,
        rememberMe: boolean,
        isAdmin: boolean,
        name: string,
        verified: boolean,
        publicCardPacksCount: number,
        created: string,
        updated: string,
        __v: number
    },
    error?: string,
}

