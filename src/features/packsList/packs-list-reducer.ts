import {packsListApi, PacksParamsResponseType, PackType} from './packs-list-api';
import {AppStateType, AppThunk} from '../../components/app/store';
import {AxiosError} from 'axios';

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
}

export const packsListReducer = (state: PacksListStateType = initialState, action: PacksListActions): PacksListStateType => {
    switch (action.type) {
        case 'PACKS-LIST/SET-PACKS-LIST-PARAMS':
            return {...state, ...action.data};
        case 'PACKS-LIST/SET-RESPONSE-MESSAGE':
            return {...state, responseMessage: action.message};
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

export const fetchCardPacks = (): AppThunk => (dispatch, getState: () => AppStateType) => {
    const {minCardsCount, maxCardsCount, } = getState().packList;

    const data ={

    }

    packsListApi.getPacks(data)
        .then(res => {
            dispatch(setPacksListData(res.data));
        })
        .catch((e: AxiosError<{error: string}>) => {
            const error = e.response ? e.response.data.error : e.message;
            dispatch(setResponseMessage(error));

        })
        .finally(() => {

        })
}

export type PacksListActions =
    | ReturnType<typeof setPacksListData>
    | ReturnType<typeof setResponseMessage>;

type PacksListStateType = PacksParamsResponseType & {
    responseMessage: string | null
}