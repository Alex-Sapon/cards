import {UserResponseType} from '../../../api/auth-api';
import {profileReducer, setUpdateProfileAC} from '../reducer/profileReducer';


let startState: UserResponseType;


beforeEach( () => {
    startState = {
        _id: '',
        email: '',
        name: '',
        avatar: '',
        publicCardPacksCount: 0,
        created: new Date(),
        updated: new Date(),
        isAdmin: false,
        verified: false,
        rememberMe: false,
        error: '',
        __v: 0,
        token: '',
        tokenDeathTime: 0,
    }
} )

//test for PROFILE/SET-UPDATE-PROFILE
test('correct data should be set', () => {

    const action = setUpdateProfileAC({
        _id: '123',
        email: '',
        name: '',
        avatar: '',
        publicCardPacksCount: 0,
        created: new Date(),
        updated: new Date(),
        isAdmin: false,
        verified: false,
        rememberMe: false,
        error: '',
        __v: 0,
        token: '',
        tokenDeathTime: 0,
    });

    const endState = profileReducer(startState, action)

    expect(endState._id).toBe('123');
})
