import {PacksParamsType} from '../../packs-list-api';

const initialState: TablePacksType = {
    page: 1,
    pageCount: 5,
};

export const tablePacksReducer = (state: TablePacksType = initialState, action: TablePacksActionsType) => {
    switch (action.type) {
        case 'TABLE-PACKS/SET-PAGE':
            return {...state, page: action.page};
        default:
            return state;

    }
};

export const setPage = (page: number) => ({
    type: 'TABLE-PACKS/SET-PAGE',
    page,
} as const);

export const setPageCount = (page: number) => ({
    type: 'TABLE-PACKS/SET-PAGE',
    page,
} as const);

export type TablePacksActionsType = ReturnType<typeof setPage>;

export type TablePacksType = PacksParamsType &  {}