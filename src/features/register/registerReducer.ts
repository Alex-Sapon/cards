const initialState: RegisterStateType = {}

export type RegisterStateType = {}

export const registerReducer = (state: RegisterStateType = initialState, action: any): RegisterStateType => {
    switch(action.type) {
        default:
            return state;
    }
}