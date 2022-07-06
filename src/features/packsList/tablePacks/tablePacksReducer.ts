import {AppThunk} from '../../../app/store';
import {AxiosError} from 'axios';
import {setAppErrorAC, setAppStatusAC} from '../../../app/reducer/app-reducer';
import {fetchCardPacks} from '../packsListReducer';
import {NewCardsPackType, tablePacksAPI} from './tablePacks-api';

const initialState: TablePacksType = {
    packName: '',
    sortPacks: '',
    page: 1,
    pageCount: 5,
    user_id: '',
};

export const tablePacksReducer = (state: TablePacksType = initialState, action: TablePacksActionsType): TablePacksType => {
    switch (action.type) {
        case 'TABLE-PACKS/SET-PAGE':
            return {...state, page: action.page};
        case 'TABLE-PACKS/SET-PAGE-COUNT':
            return {...state, pageCount: action.pageCount};
        case 'TABLE-PACKS/SET-SEARCH-PACK-NAME':
            return {...state, packName: action.searchPackName};
        case 'TABLE-PACKS/SET-SORT-PACK-NAME':
            return {...state, sortPacks: action.sortPackName};
        default:
            return state;

    }
};

// actions
export const setPage = (page: number) => ({type: 'TABLE-PACKS/SET-PAGE', page} as const);

export const setPageCount = (pageCount: number) => ({type: 'TABLE-PACKS/SET-PAGE-COUNT', pageCount} as const);

export const setSearchPackName = (searchPackName: string) => ({type: 'TABLE-PACKS/SET-SEARCH-PACK-NAME', searchPackName} as const);

export const setSortPackName = (sortPackName: string) => ({type: 'TABLE-PACKS/SET-SORT-PACK-NAME', sortPackName} as const);

// thunks
export const createNewCardsPack = (name: string): AppThunk => dispatch => {
    const data: NewCardsPackType = {
        cardsPack: {
            name: name,
            deckCover: '',
            private: false,
        },
    };

    dispatch(setAppStatusAC('loading'));

    tablePacksAPI.createPack(data)
        .then(() => {
            dispatch(fetchCardPacks());
        })
        .catch((e: AxiosError<{ error: string }>) => {
            dispatch(setAppErrorAC(e.response ? e.response.data.error : e.message));
        })
        .finally(() => {
            dispatch(setAppStatusAC('idle'));
        })
};

export const deleteUpdateCardsPack = (id: string, name?: string): AppThunk => dispatch => {
    const apiMethod = name
        ? tablePacksAPI.updatePack({cardsPack: {_id: id, name: name}})
        : tablePacksAPI.deletePack(id);

    dispatch(setAppStatusAC('loading'));

    apiMethod
        .then(() => {
            dispatch(fetchCardPacks());
        })
        .catch((e: AxiosError<{ error: string }>) => {
            dispatch(setAppErrorAC(e.response ? e.response.data.error : e.message));
        })
        .finally(() => {
            dispatch(setAppStatusAC('idle'));
        })
};

// types
export type TablePacksActionsType =
    | ReturnType<typeof setPage>
    | ReturnType<typeof setPageCount>
    | ReturnType<typeof setSearchPackName>
    | ReturnType<typeof setSortPackName>

type TablePacksType = {
    packName: string
    sortPacks: string
    page: number
    pageCount: number
    user_id: string
}