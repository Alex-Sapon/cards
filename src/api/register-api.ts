import axios, {AxiosResponse} from 'axios';


const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
    withCredentials: true,
});

export const registerAPI = {
    register(email: string, password: string) {
        return instance.post<any, AxiosResponse<ResponseType>, {email: string, password: string}>('auth/register', {email, password} )
    },
}

//types
type ResponseType = {}