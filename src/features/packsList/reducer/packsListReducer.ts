import {packsListApi, PacksParamsResponseType, PackType} from '../packs-list-api';
import {AxiosError} from 'axios';
import {setAppErrorAC, setAppStatusAC} from '../../../app/reducer/app-reducer';
import {AppStateType, AppThunk} from '../../../app/store';

const initialState: PacksListStateType = {
    cardPacks: [] as PackType[],
    page: 1,
    pageCount: 0,
    cardPacksTotalCount: 0,
    minCardsCount: 0,
    maxCardsCount: 0,
    token: '',
    tokenDeathTime: 0,
}

export const packsListReducer = (state: PacksListStateType = initialState, action: PacksListActionsType): PacksListStateType => {
    switch (action.type) {
        case 'PACKS-LIST/SET-PACKS-LIST-PARAMS':
            return {...state, ...action.data};
        default:
            return state;
    }
}
//actions
export const setPacksListData = (data: PacksParamsResponseType) => ({type: 'PACKS-LIST/SET-PACKS-LIST-PARAMS', data,} as const);

//thunks
export const fetchCardPacks = (): AppThunk => (dispatch, getState: () => AppStateType) => {

    const {pageCount, page} = getState().tablePacks;
    const data = {
        page,
        pageCount,
    }

    dispatch(setAppStatusAC('loading'));

    packsListApi.getPacks(data)
        .then(res => {
            dispatch(setPacksListData(res.data));
        })
        .catch((e: AxiosError<{ error: string }>) => {
            const error = e.response ? e.response.data.error : e.message;
            dispatch(setAppErrorAC(error));
        })
        .finally(() => {
            dispatch(setAppStatusAC('idle'));
        })
}

//types
export type PacksListActionsType =
    | ReturnType<typeof setPacksListData>
export type PacksListStateType = PacksParamsResponseType & {
}