import * as React from 'react';
import {ChangeEvent, useEffect, useState} from 'react';
import styles from './tableCardName.module.css';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import {TextField} from '@mui/material';
import {PaginationGroup} from '../../packsList/paginationGroup/PaginationGroup';
import ArrowBackSharpIcon from '@mui/icons-material/ArrowBackSharp';

import Button from "../../../common/button/Button";
import {useAppDispatch, useAppSelector} from "../../../app/store";
import {addCardTC, setCardsPage, setCardsPageCount, setSearchQuestion} from "../reducer/packCardReducer";
import {useNavigate} from 'react-router-dom';
import useDebounce from "../../packsList/tablePacks/utils/useDebounce";
import {TableContainerCards} from "./tableContainerCards/TableContainerCards";

export const TableCard = () => {

	const [value, setValue] = useState('')

	const navigate = useNavigate()
	const dispatch = useAppDispatch()

	const debouncedValue = useDebounce<string>(value, 500)

	const page = useAppSelector(state => state.cardPack.page)
	const cardsTotalCount = useAppSelector(state => state.cardPack.cardsTotalCount)
	const pageCount = useAppSelector(state => state.cardPack.pageCount)
	const cardsPack_id = useAppSelector(state => state.cardPack.cardsPack_id)
	const packName = useAppSelector(state => state.cardPack.name)
	const userId = useAppSelector(state => state.login._id)
	const user_id = useAppSelector(state => state.cardPack.packUserId)

	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.currentTarget.value)
	}

	useEffect(() => {
		dispatch(setSearchQuestion(debouncedValue))
		dispatch(setCardsPage(1))
	}, [debouncedValue,])

	const addNewCard = () => {
		dispatch(addCardTC(cardsPack_id, 'New card'))
	}

	return (
		<div>
			<h2 className={styles.table_title}>
				<span onClick={() => {
					navigate(-1)
				}}><ArrowBackSharpIcon
					className={styles.arrowBackSharpIcon}
					fontSize="medium"
				/></span>
				{packName}</h2>
			<div className={styles.inputContainer}>
				<TextField
					onChange={onChangeHandler}
					fullWidth
					sx={{backgroundColor: '#ECECF9', mr: '2rem'}}
					size="small"
					placeholder="Search..."
					InputProps={{startAdornment: <InputAdornment position="start"><SearchIcon/></InputAdornment>}}
				/>
				{userId === user_id
					? <>
						<Button onClick={addNewCard}>ADD NEW CARD</Button>
					</> : null}
			</div>
			<TableContainerCards/>
			<div className={styles.paginationContainer}>
				<PaginationGroup page={page}
												 pageCount={pageCount}
												 cardsTotalCount={cardsTotalCount}
												 onChangePage={(value) => setCardsPage(value)}
												 onChangeValue={(pageNumber: number) => setCardsPageCount(pageNumber)}
												 title='Cards per Page'/>
			</div>
		</div>
	)
};