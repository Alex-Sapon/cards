const initialState: RecoveryPassStateType = {}

export type RecoveryPassStateType = {}

export const recoveryPassReducer = (state: RecoveryPassStateType = initialState, action: any): RecoveryPassStateType => {
    switch(action.type) {
        default:
            return state;
    }
}