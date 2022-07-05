
import {AxiosError} from 'axios';
import {setAppErrorAC, setAppStatusAC } from '../../../../app/reducer/app-reducer';
import {AppStateType, AppThunk } from '../../../../app/store';
import {packsListDimaApi, PacksParamsResponseType, PacksParamsType, PackType} from '../api/DimaAPI';


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

export const packsListDimaReducer = (state: PacksListStateType = initialState, action: PacksListDimaActionsType): PacksListStateType => {
    switch (action.type) {
        case 'PACKS-LIST-DIMA/SET-PACKS-LIST-PARAMS':
            return {...state, ...action.data};
        default:
            return state;
    }
}
//actions
export const setPacksListDimaData = (data: PacksParamsResponseType) => ({type: 'PACKS-LIST-DIMA/SET-PACKS-LIST-PARAMS', data,} as const);

//thunks
export const fetchCardPacksDima = (data: PacksParamsType): AppThunk => (dispatch, getState: () => AppStateType) => {

    dispatch(setAppStatusAC('loading'));

    packsListDimaApi.getPacks(data)
        .then(res => {
            dispatch(setPacksListDimaData(res.data));
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
export type PacksListDimaActionsType =
    | ReturnType<typeof setPacksListDimaData>
export type PacksListStateType = PacksParamsResponseType & {
}