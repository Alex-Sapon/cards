import {CardType} from '../../../packName/apiCardName/apiPackName';
import {AppThunk} from '../../../../app/store';
import {learnPackAPI, UpdateGradeResponseType} from './learnPack-api';
import {AxiosError} from 'axios';
import {setAppErrorAC, setAppStatusAC} from '../../../../app/reducer/app-reducer';

const initState: LearnPackStateType = {
    cards: [] as CardType[],
}

export const learnPackReducer = (state: LearnPackStateType = initState, action: LearnPackActionsType): LearnPackStateType => {
    switch (action.type) {
        case 'LEARN-PACK/SET-CARDS-PACK':
            return {...state, cards: action.cards};
        case 'LEARN-PACK/UPDATE-CARD-PACK':
            return {...state, cards: state.cards.map(card => card._id === action.updatedGrade.updatedGrade.card_id
                    ? {...card, grade: action.updatedGrade.updatedGrade.grade} : card)};
        default:
            return state;
    }
}

// actions
export const setCardsPack = (cards: CardType[]) => ({type: 'LEARN-PACK/SET-CARDS-PACK', cards} as const);
export const updateCardsPack = (updatedGrade: UpdateGradeResponseType) => ({type: 'LEARN-PACK/UPDATE-CARD-PACK', updatedGrade} as const);

// thunks
export const getCardsPack = (id: string): AppThunk => dispatch => {
    dispatch(setAppStatusAC('loading'));

    learnPackAPI.getCards(id)
        .then(res => {
            dispatch(setCardsPack(res.data.cards));
        })
        .catch((e: AxiosError<{error: string}>) => {
            dispatch(setAppErrorAC(e.response ? e.response.data.error : e.message));

        })
        .finally(() => {
            dispatch(setAppStatusAC('idle'));
        })
}

// types
export type LearnPackActionsType = ReturnType<typeof setCardsPack> | ReturnType<typeof updateCardsPack>

type LearnPackStateType = {
    cards: CardType[]
}