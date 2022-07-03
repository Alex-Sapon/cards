import {packsListApi, PacksParamsResponseType, PackType} from './packs-list-api';
import {AppStateType, AppThunk} from '../../components/app/store';
import {AxiosError} from 'axios';
import {LoadingStatus} from '../setPass/set-pass-reducer';

const initialState: PacksListStateType = {
    cardPacks: [] as PackType[],
    page: 1,
    pageCount: 0,
    cardPacksTotalCount: 0,
    minCardsCount: 0,
    maxCardsCount: 0,
    token: '',
    tokenDeathTime: 0,
    responseMessage: null,
    status: 'idle',
}

export const packsListReducer = (state: PacksListStateType = initialState, action: PacksListActions): PacksListStateType => {
    switch (action.type) {
        case 'PACKS-LIST/SET-PACKS-LIST-PARAMS':
            return {...state, ...action.data};
        case 'PACKS-LIST/SET-RESPONSE-MESSAGE':
            return {...state, responseMessage: action.message};
        case 'PACKS-LIST/SET-LOADING-STATUS':
            return {...state, status: action.status};
        default:
            return state;
    }
}

const setPacksListData = (data: PacksParamsResponseType) => ({
    type: 'PACKS-LIST/SET-PACKS-LIST-PARAMS',
    data,
} as const);

export const setResponseMessage = (message: string | null) => ({
    type: 'PACKS-LIST/SET-RESPONSE-MESSAGE',
    message,
} as const);

export const setLoadingStatus = (status: LoadingStatus) => ({
    type: 'PACKS-LIST/SET-LOADING-STATUS',
    status,
} as const);

export const fetchCardPacks = (): AppThunk => (dispatch, getState: () => AppStateType) => {
    const {pageCount, page} = getState().tablePacks;

    const data = {
        page,
        pageCount,

    }

    dispatch(setLoadingStatus('loading'));

    packsListApi.getPacks(data)
        .then(res => {
            dispatch(setPacksListData(res.data));
        })
        .catch((e: AxiosError<{ error: string }>) => {
            const error = e.response ? e.response.data.error : e.message;
            dispatch(setResponseMessage(error));
        })
        .finally(() => {
            dispatch(setLoadingStatus('idle'));
        })
}

export type PacksListActions =
    | ReturnType<typeof setPacksListData>
    | ReturnType<typeof setResponseMessage>
    | ReturnType<typeof setLoadingStatus>;

type PacksListStateType = PacksParamsResponseType & {
    responseMessage: string | null
    status: LoadingStatus
}