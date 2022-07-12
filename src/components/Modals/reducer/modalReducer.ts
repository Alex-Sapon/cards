const initialState: ModalStateType = {
    isCloseModal: false,
    isOpenModal: false
};

export const modalReducer = (state: ModalStateType = initialState, action: ModalActionsType): ModalStateType => {
    switch (action.type) {
        case 'MODAL/SET-CLOSE-MODAL':
            return {...state, isCloseModal: action.isClose};
        case 'MODAL/SET-OPEN-MODAL':
            return {...state, isOpenModal: action.isOpen};
        default:
            return state;
    }
};

//actions
export const setCloseModalAC = (isClose: boolean) => ({type: 'MODAL/SET-CLOSE-MODAL', isClose} as const);
export const setOpenModalAC = (isOpen: boolean) => ({type: 'MODAL/SET-OPEN-MODAL', isOpen} as const);

//thunks

//types
export type ModalStateType = {
    isCloseModal: boolean
    isOpenModal: boolean
}
export type ModalActionsType =
    | ReturnType<typeof setCloseModalAC>
    | ReturnType<typeof setOpenModalAC>
