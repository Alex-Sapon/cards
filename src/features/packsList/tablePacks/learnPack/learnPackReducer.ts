import {CardType} from '../../../packName/apiCardName/apiPackName';
import {AppThunk} from '../../../../app/store';
import {learnPackAPI} from './learnPack-api';

const initState: LearnPackStateType = {
    cards: [] as CardType[],
}

export const learnPackReducer = (state: LearnPackStateType = initState, action: LearnPackActionsType): LearnPackStateType => {
    switch (action.type) {
        case 'LEARN-PACK/SET-CARDS-PACK':
            return {...state};
        default:
            return state;
    }
}

// actions
const setCardsPack = (cards: CardType[]) => ({type: 'LEARN-PACK/SET-CARDS-PACK', cards} as const);

// thunks
export const getCardsPack = (id: string): AppThunk => dispatch => {
    learnPackAPI.getCards(id)
        .then(res => {
            dispatch(setCardsPack(res.data.cards));
        })
}

// types
export type LearnPackActionsType = ReturnType<typeof setCardsPack>

type LearnPackStateType = {}