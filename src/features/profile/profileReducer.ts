const initialState: ProfileStateType = {}

export type ProfileStateType = {}

export const profileReducer = (state: ProfileStateType = initialState, action: any): ProfileStateType => {
    switch(action.type) {
        default:
            return state;
    }
}