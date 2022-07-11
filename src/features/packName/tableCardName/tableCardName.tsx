import * as React from 'react';
import {useEffect} from 'react';
import {AlertBar} from "../../login/AlertBar";
import styles from './tableCardName.module.css';
import {useAppDispatch, useAppSelector} from "../../../app/store";
import {fetchCardsTC, setUserCardId} from "../reducer/packCardReducer";
import {TableCard} from "./TableCard";
import {Navigate} from "react-router-dom";
import {PATH} from "../../../enums/path";

export const TableCardName = () => {

	const dispatch = useAppDispatch()

	const isLoggedIn = useAppSelector(state => state.login.isLoggedIn)
	const cardsPack_id = useAppSelector(state => state.cardPack.cardsPack_id)
	const page = useAppSelector(state => state.cardPack.page)
	const pageCount = useAppSelector(state => state.cardPack.pageCount)
	const cardQuestion = useAppSelector(state => state.cardPack.cardQuestion)
	const cardAnswer = useAppSelector(state => state.cardPack.cardAnswer)
	const sortCards = useAppSelector(state => state.cardPack.sortCards)
	const minCards = useAppSelector(state => state.cardPack.min)
	const maxCards = useAppSelector(state => state.cardPack.max)

	useEffect(() => {
		dispatch(fetchCardsTC())
	},[cardsPack_id, page, pageCount, cardQuestion, cardAnswer, sortCards, minCards, maxCards])

	if (!isLoggedIn) {
		return <Navigate to={PATH.LOGIN}/>
	}

	return (
		<div className={styles.container}>
			<TableCard/>
			{false && <AlertBar message={'Massage'}/>}
		</div>
	)
}