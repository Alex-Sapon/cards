import {CardType} from '../../../packName/apiCardName/apiPackName';

const initState: LearnPackStateType = {
    cards: [] as CardType[],
}

export const learnPackReducer = (state: LearnPackStateType = initState, action: LearnPackActions): LearnPackStateType => {
    switch (action.type) {
        default:
            return state;
    }
}

// types
export type LearnPackActions = any

type LearnPackStateType = {}