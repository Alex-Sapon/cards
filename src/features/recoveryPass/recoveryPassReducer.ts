import {AppThunk} from '../../components/app/store';
import {forgotAPI, IForgotData} from './recovery-pass-api';
import {LoadingStatus} from '../setPass/set-pass-reducer';

const initialState: RecPassStateType = {
	email: 'example@mail.com',
	isSendEmail: false,
	status: 'idle',
	responseMessage: null,
}

export const recoveryPassReducer = (state: RecPassStateType = initialState, action: RecPassActions): RecPassStateType => {
	switch (action.type) {
		case 'RECOVERY-PASS/SET-IS-SEND-EMAIL':
			return {...state, isSendEmail: action.isSend};
		case 'RECOVERY-PASS/SET-STATUS':
			return {...state, status: action.status};
		case 'RECOVERY-PASS/SET-EMAIL':
			return {...state, email: action.email};
		case 'RECOVERY-PASS/SET-RESPONSE-MESSAGE':
			return {...state, responseMessage: action.message};
		default:
			return state;
	}
};

const setIsSendEmail = (isSend: boolean) => ({
	type: 'RECOVERY-PASS/SET-IS-SEND-EMAIL',
	isSend,
} as const);

const setLoadingStatus = (status: LoadingStatus) => ({
	type: 'RECOVERY-PASS/SET-STATUS',
	status,
} as const);

const setEmail = (email: string) => ({
	type: 'RECOVERY-PASS/SET-EMAIL',
	email,
} as const);

export const setResponseMessage = (message: string | null) => ({
	type: 'RECOVERY-PASS/SET-RESPONSE-MESSAGE',
	message,
} as const);

export const forgotPass = (email: string): AppThunk => dispatch => {
	dispatch(setLoadingStatus('loading'));

	const data: IForgotData = {
		email: email,
		from: 'alexsapon@gmail.com',
		message: `
                <div style="background-color: lime; padding: 15px">password recovery link: 
                    <a href='http://localhost:3000/#/set-new-password/$token$'> link</a>
                </div>
                `,
	}

	forgotAPI.forgot(data)
		.then(() => {
			dispatch(setIsSendEmail(true));
			dispatch(setEmail(email));
		})
		.catch((e) => {
			dispatch(setResponseMessage(e.message));
		})
		.finally(() => {
			dispatch(setLoadingStatus('idle'));
		})
};

export type RecPassActions =
	| ReturnType<typeof setIsSendEmail>
	| ReturnType<typeof setLoadingStatus>
	| ReturnType<typeof setEmail>
	| ReturnType<typeof setResponseMessage>

export type RecPassStateType = {
	email: string
	isSendEmail: boolean
	status: LoadingStatus
	responseMessage: string | null
}
