import {AppThunk} from './store';

const initialState: AppStateType = {
    isInitialized: false,
};

export const appReducer = (state: AppStateType = initialState, action: AppActionsType): AppStateType => {
    switch (action.type) {
        case 'APP/SET-INITIALIZE-APP':
            return {...state, isInitialized: action.isInitialized};
        default:
            return state;
    }
};

const setInitializeApp = (isInitialized: boolean) => ({
    type: 'APP/SET-INITIALIZE-APP',
    isInitialized,
} as const);

export const initializeApp = (): AppThunk => dispatch => {


}

type AppStateType = {
    isInitialized: boolean
}

export type AppActionsType =
    | ReturnType<typeof setInitializeApp>;