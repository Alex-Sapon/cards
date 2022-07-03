import {PacksParamsType} from '../packs-list-api';

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
} as const);

export type TablePacksActionsType =
    | ReturnType<typeof setPage>
    | ReturnType<typeof setPageCount>
    | ReturnType<typeof setPackName>;

type TablePacksType = PacksParamsType & {}