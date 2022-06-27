import {AxiosError} from 'axios';
import {AppThunk} from '../../components/app/store';
import {forgotAPI, IForgotData} from './recoveryPass-api';
import {setErrorMessage} from '../login/login-reducer';

const initialState: RecPassStateType = {
    isSendEmail: false,
    isDisabled: false,
}

export const recoveryPassReducer = (state: RecPassStateType = initialState, action: RecPassActions): RecPassStateType => {
    switch (action.type) {
        case 'RECOVERY-PASS/SET-IS-SEND-EMAIL':
            return {...state, isSendEmail: action.isSend};
        case 'RECOVERY-PASS/SET-IS-DISABLED':
            return {...state, isSendEmail: action.isDisabled};
        default:
            return state;
    }
};

const setIsSendEmail = (isSend: boolean) => ({
    type: 'RECOVERY-PASS/SET-IS-SEND-EMAIL',
    isSend,
} as const);

const setIsDisabled = (isDisabled: boolean) => ({
    type: 'RECOVERY-PASS/SET-IS-DISABLED',
    isDisabled,
} as const);

export const forgotPass = (email: string): AppThunk => dispatch => {
    dispatch(setIsDisabled(true));

    const data: IForgotData = {
        email: email,
        from: 'alexsapon@gmail.com',
        message: `
                <div style="background-color: lime; padding: 15px">password recovery link: 
                    <a href='http://localhost:3000/#/recovery-password/$token$'> link</a>
                </div>
                `,
    }

    forgotAPI.forgot(data)
        .then(() => {
            debugger
            dispatch(setIsSendEmail(true));
        })
        .catch((e: AxiosError) => {
            debugger
            dispatch(setErrorMessage(e.message));
        })
        .finally(() => {
            dispatch(setIsDisabled(false));
        })
};

export type RecPassActions =
    | ReturnType<typeof setIsSendEmail>
    | ReturnType<typeof setIsDisabled>

export type RecPassStateType = {
    isSendEmail: boolean
    isDisabled: boolean
}
