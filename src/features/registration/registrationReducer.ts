const initialState: RegistrationStateType = {}

export type RegistrationStateType = {}

export const registrationReducer = (state: RegistrationStateType = initialState, action: any): RegistrationStateType => {
    switch(action.type) {
        default:
            return state;
    }
}