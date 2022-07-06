import {AppStateType, AppThunk} from "../../../app/store";
import {setAppErrorAC, setAppStatusAC} from "../../../app/reducer/app-reducer";
import {AxiosError} from "axios";
import {cardNameAPI, CardsTypeResponseType, CardType} from "../apiCardName/apiPackName";

const initialState: CardsNameStateType = {
	cards: [] as CardType[],
	cardsTotalCount: 0,
	maxGrade: 0,
	minGrade: 0,
	page: 1,
	pageCount: 5,
	packUserId: "",
	token: "",
	tokenDeathTime: 0,
	cardsPack_id: '62c528938432bb24c836b25b',
	cardQuestion: "",
	getUserId: 'idle'
}

export const cardsNameReducer = (state: CardsNameStateType = initialState, action: CardsNameActionsType): CardsNameStateType => {
	switch (action.type) {
		case 'CARDS-NAME/SET-CARDS-PARAMS':
			return {...state, ...action.data}
		case 'CARDS-NAME/SET-CARDS-PACK-ID':
			return {...state, cardsPack_id: action.cardsPack_id};
		case 'CARDS-NAME/SET-CARDS-PAGE':
			return {...state, page: action.page};
		case 'CARDS-NAME/SET-CARDS-PAGE-COUNT':
			return {...state, pageCount: action.pageCount};
		case 'CARDS-NAME/SET-CARDS-TOTAL-COUNT':
			return {...state, cardsTotalCount: action.cardsTotalCount};
		case 'CARDS-NAME/GET-USER-ID':
			return {...state, getUserId: action.getUserId};
		default:
			return state
	}
}

//actions
export const setCardsPackId = (cardsPack_id: string) =>
	({type: 'CARDS-NAME/SET-CARDS-PACK-ID', cardsPack_id} as const);

export const getUserId = (getUserId: string) =>
	({type: 'CARDS-NAME/GET-USER-ID', getUserId} as const);

export const getCardsNameData = (data: CardsTypeResponseType) =>
	({type: 'CARDS-NAME/SET-CARDS-PARAMS', data} as const);

export const setCardsPage = (page: number) =>
	({type: 'CARDS-NAME/SET-CARDS-PAGE', page} as const)

export const setCardsPageCount = (pageCount: number) =>
	({type: 'CARDS-NAME/SET-CARDS-PAGE-COUNT', pageCount} as const)

export const setCardsTotalCount = (cardsTotalCount: number) =>
	({type: 'CARDS-NAME/SET-CARDS-TOTAL-COUNT', cardsTotalCount} as const)

//thunks
export const fetchCardsTC = (): AppThunk => (dispatch, getState: () => AppStateType) => {
	const {cardsPack_id, page, pageCount, packUserId} = getState().cardPack
	const params = {
		cardsPack_id, page, pageCount, packUserId
	}

	dispatch(setAppStatusAC('loading'));
	cardNameAPI.getCard(params)
		.then(res => {
			dispatch(getCardsNameData(res.data));
		})
		.catch((e: AxiosError<{ error: string }>) => {
			const error = e.response ? e.response.data.error : e.message;
			dispatch(setAppErrorAC(error));
		})
		.finally(() => {
			dispatch(setAppStatusAC('idle'));
		})
}

export const addCardTC = (cardsPack_id: string, name: string): AppThunk => dispatch => {
	const card = {cardsPack_id, name}

	dispatch(setAppStatusAC('loading'))
	cardNameAPI.createCard(card)
		.then(res => {
			dispatch(fetchCardsTC())
		})
		.catch((e: AxiosError<{ error: string }>) => {
			const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
			dispatch(setAppErrorAC(error))
		})
		.finally(() => {
			dispatch(setAppStatusAC('idle'))
		})
}

export const removeCardTC = (_id: string): AppThunk => dispatch => {
	dispatch(setAppStatusAC('loading'))
	cardNameAPI.deleteCard(_id)
		.then(res => {
			dispatch(fetchCardsTC())
		})
		.catch((e: AxiosError<{ error: string }>) => {
			const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
			dispatch(setAppErrorAC(error))
		})
		.finally(() => {
			dispatch(setAppStatusAC('idle'))
		})
}

export const updateCardTC = (_id: string, question: string): AppThunk => dispatch => {
	const card = {_id, question}
	dispatch(setAppStatusAC('loading'))
	cardNameAPI.updateCard(card)
		.then(res => {
			dispatch(fetchCardsTC())
		})
		.catch((e: AxiosError<{ error: string }>) => {
			const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
			dispatch(setAppErrorAC(error))
		})
		.finally(() => {
			dispatch(setAppStatusAC('idle'))
		})
}

//types
export type CardsNameStateType = CardsTypeResponseType & {
	cardsPack_id: string
	cardQuestion?: string
	getUserId: string

}
export type CardsNameActionsType =
	| ReturnType<typeof getCardsNameData>
	| ReturnType<typeof setCardsPackId>
	| ReturnType<typeof setCardsPage>
	| ReturnType<typeof setCardsPageCount>
	| ReturnType<typeof setCardsTotalCount>
	| ReturnType<typeof getUserId>
