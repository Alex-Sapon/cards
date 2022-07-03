import {setPage, tablePacksReducer, TablePacksType} from '../reducer/tablePacksReducer';



let startState: TablePacksType;


beforeEach(() => {
    startState = {
        page: 1,
        pageCount: 5,
    };
});

//test for TABLE-PACKS/SET-PAGE
test('correct data should be set', () => {

    const action = setPage(2);

    const endState = tablePacksReducer(startState, action);

    expect(endState.page).toBe(2);
});