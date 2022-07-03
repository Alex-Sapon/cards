import {packsListReducer, PacksListStateType, setPacksListData} from '../reducer/packsListReducer';
import {PackType} from '../packs-list-api';


let startState: PacksListStateType;


beforeEach(() => {
    startState = {
        cardPacks: [] as PackType[],
        page: 1,
        pageCount: 0,
        cardPacksTotalCount: 0,
        maxCardsCount: 0,
        minCardsCount: 0,
        token: '',
        tokenDeathTime: 0,
    };
});

//test for PACKS-LIST/SET-PACKS-LIST-PARAMS
test('correct data should be set', () => {

    const action = setPacksListData({
        cardPacks: [] as PackType[],
        page: 3,
        pageCount: 0,
        cardPacksTotalCount: 0,
        maxCardsCount: 24,
        minCardsCount: 0,
        token: '',
        tokenDeathTime: 0,
    });

    const endState = packsListReducer(startState, action);

    expect(endState.page).toBe(3);
    expect(endState.maxCardsCount).toBe(24);
    expect(endState.cardPacks.length).toBe(0);
});