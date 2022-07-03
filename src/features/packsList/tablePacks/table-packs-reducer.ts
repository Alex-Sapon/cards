import {PacksParamsType} from '../packs-list-api';
import {NewCardsPackType, tablePacksAPI} from './table-packs-api';
import {AppThunk} from '../../../app/store';
import {AxiosError} from 'axios';
import {setAppErrorAC, setAppStatusAC} from '../../../app/reducer/app-reducer';
import {fetchCardPacks} from '../packs-list-reducer';

const initialState: TablePacksType = {
    packName: '',
    page: 1,
    pageCount: 5,
};

export const tablePacksReducer = (state: TablePacksType = initialState, action: TablePacksActionsType): TablePacksType => {
    switch (action.type) {
        case 'TABLE-PACKS/SET-PAGE':
            return {...state, page: action.page};
        case 'TABLE-PACKS/SET-PAGE-COUNT':
            return {...state, pageCount: action.pageCount};
        case 'TABLE-PACKS/SET-PACK-NAME':
            return {...state, packName: action.packName};
        default:
            return state;

    }
};

export const setPage = (page: number) => ({
    type: 'TABLE-PACKS/SET-PAGE',
    page,
} as const);

export const setPageCount = (pageCount: number) => ({
    type: 'TABLE-PACKS/SET-PAGE-COUNT',
    pageCount,
} as const);

export const setPackName = (packName: string) => ({
    type: 'TABLE-PACKS/SET-PACK-NAME',
    packName,
} as const);;

export const createNewCardsPack = (name: string): AppThunk => dispatch => {
    const data: NewCardsPackType = {
        cardsPack: {
            name: name,
            deckCover: "",
            private: false
        }
    }

    dispatch(setAppStatusAC('loading'));

    tablePacksAPI.createPack(data)
        .then(() => {
            dispatch(fetchCardPacks());
        })
        .catch((e: AxiosError<{error: string}>) => {
            dispatch(setAppErrorAC(e.response ? e.response.data.error : e.message));
        })
        .finally(() => {
            dispatch(setAppStatusAC('idle'));
        })
}

export const deleteCardsPack = (id: string): AppThunk => dispatch => {
    dispatch(setAppStatusAC('loading'));

    tablePacksAPI.deletePack(id)
        .then(() => {
            dispatch(fetchCardPacks());
        })
        .catch((e: AxiosError<{error: string}>) => {
            dispatch(setAppErrorAC(e.response ? e.response.data.error : e.message));
        })
        .finally(() => {
            dispatch(setAppStatusAC('idle'));
        })
}

export type TablePacksActionsType =
    | ReturnType<typeof setPage>
    | ReturnType<typeof setPageCount>
    | ReturnType<typeof setPackName>

type TablePacksType = PacksParamsType & {}