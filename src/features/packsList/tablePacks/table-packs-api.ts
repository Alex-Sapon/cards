import {instance} from '../../../assets/settings/instance-api';
import {AxiosResponse} from 'axios';

export const tablePacksAPI = {
    createPack(data: NewCardsPackType) {
        return instance.post<any, AxiosResponse<NewCardsResponseType>, NewCardsPackType>(`cards/pack`, data);
    },
    deletePack(id: string) {
        return instance.delete<any, AxiosResponse<DeleteCardsPackResponseType>, { id: string }>(`cards/pack?${id}`);
    },
    updatePack(data: UpdateCardsPackType) {
        return instance.put<any, AxiosResponse<UpdateCardsPackResponseType>, UpdateCardsPackType>(`cards/pack`, data);
    },
}

type ResponseType = {
    cardPacks: PackType[]
    page: number
    pageCount: number
    cardPacksTotalCount: number
    minCardsCount: number
    maxCardsCount: number
    token: string
    tokenDeathTime: number
}

type PackType = {
    _id: string
    user_id: string
    user_name: string
    private: false
    name: string
    path: string
    grade: number
    shots: number
    cardsCount: number
    type: string
    rating: number
    created: Date
    updated: Date
    more_id: string
    __v: number
}

type NewCardsPackType = {
    cardsPack: {
        name: string
        deckCover: string
        private: boolean
    }
}

type NewCardsResponseType = {
    newCardsPack: PackType
    token: string
    tokenDeathTime: number
}

type DeleteCardsPackResponseType = {
    deletedCardsPack: {}
}

type UpdateCardsPackResponseType = {
    updatedCardsPack: {}
}

type UpdateCardsPackType = {
    cardsPack: {
        _id: string
        name: string
        // ... не обязательно
    }
}