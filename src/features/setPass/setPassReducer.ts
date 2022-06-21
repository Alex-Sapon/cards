const initialState: SetPassStateType = {}

export type SetPassStateType = {}

export const setPassReducer = (state: SetPassStateType = initialState, action: any): SetPassStateType => {
    switch(action.type) {
        default:
            return state;
    }
}