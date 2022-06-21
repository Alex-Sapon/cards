const initialState: LoginStateType = {}

export type LoginStateType = {}

export const loginReducer = (state: LoginStateType = initialState, action: any): LoginStateType => {
    switch(action.type) {
        default:
            return state;
    }
}