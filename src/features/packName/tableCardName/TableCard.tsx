import * as React from 'react';
import {ChangeEvent, useEffect, useState} from 'react';
import styles from './tableCardName.module.css';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import {TextField} from '@mui/material';
import {PaginationGroup} from "../../packsList/paginationGroup/PaginationGroup";
import Rating from "@mui/material/Rating";
import ArrowBackSharpIcon from '@mui/icons-material/ArrowBackSharp';
import Paper from "@mui/material/Paper";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CreateIcon from '@mui/icons-material/Create';
import Button from "../../../common/button/Button";
import {useAppDispatch, useAppSelector} from "../../../app/store";
import {
	addCardTC,
	removeCardTC,
	setCardsPage,
	setCardsPageCount,
	setSearchQuestion,
	updateCardTC
} from "../reducer/packCardReducer";
import {useNavigate} from 'react-router-dom';
import useDebounce from "../../packsList/tablePacks/utils/useDebounce";
import {shortWord} from "../../packsList/tablePacks/utils/shortWord";
import {StyledTableCell, StyledTableRow} from "./styledTableCard/styledTableCard";

export const TableCard = () => {

	const [value, setValue] = useState('')

	const navigate = useNavigate()
	const dispatch = useAppDispatch()

	const debouncedValue = useDebounce<string>(value, 500)

	const page = useAppSelector(state => state.cardPack.page)
	const cardsTotalCount = useAppSelector(state => state.cardPack.cardsTotalCount)
	const pageCount = useAppSelector(state => state.cardPack.pageCount)
	const cards = useAppSelector(state => state.cardPack.cards)
	const cardsPack_id = useAppSelector(state => state.cardPack.cardsPack_id)


	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.currentTarget.value)
	}

	useEffect(() => {
		dispatch(setSearchQuestion(debouncedValue))
	}, [debouncedValue])


	const addNewCard = () => {
		dispatch(addCardTC(cardsPack_id, "New card"))
	}

	const removeCard = (_id: string) => {
		dispatch(removeCardTC(_id))
	}

	const changeCard = (_id: string) => {
		dispatch(updateCardTC(_id, 'Update card'))
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
				Pack Name</h2>
			<div className={styles.inputContainer}>
				<TextField
					onChange={onChangeHandler}
					fullWidth
					sx={{backgroundColor: '#ECECF9', mr: '2rem'}}
					size="small"
					placeholder="Search..."
					InputProps={{startAdornment: <InputAdornment position="start"><SearchIcon/></InputAdornment>}}
				/>
				<div></div>
				<Button onClick={addNewCard}>ADD NEW CARD</Button>
			</div>
			<Paper elevation={3}>
				<TableContainer className={styles.table_container}>
					<Table>
						<TableHead>
							<TableRow>
								<StyledTableCell align="justify">
									<TableSortLabel
										active={true}
										direction={'asc'}>
									</TableSortLabel>
									<b>Question</b>
								</StyledTableCell>
								<StyledTableCell align="justify">
									<TableSortLabel
										active={true}
										direction={'asc'}>
									</TableSortLabel>
									<b>Answer</b>
								</StyledTableCell>
								<StyledTableCell align="justify">
									<TableSortLabel
										active={true}
										direction={'asc'}>
									</TableSortLabel>
									<b>Updated</b>
								</StyledTableCell>
								<StyledTableCell align="justify">
									<TableSortLabel
										active={true}
										direction={'asc'}>
									</TableSortLabel>
									<b>Grade</b>
								</StyledTableCell>
								<StyledTableCell align="justify">
									<b>Actions</b>
								</StyledTableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{cards.length ? cards.map(({answer, question, updated, _id}) => (
								<StyledTableRow key={_id}>
									<StyledTableCell component="th" scope="row">
										<span style={{display: 'inline-block', flex: '1 1 auto'}}>{shortWord(question, 15)}</span>
									</StyledTableCell>
									<StyledTableCell align="justify">{answer}</StyledTableCell>
									<StyledTableCell align="justify">{new Date(updated).toLocaleDateString()}</StyledTableCell>
									<StyledTableCell align="justify">
										<Rating
											name="no-value"
											value={null}
											size="small"
											readOnly/>
									</StyledTableCell>
									<StyledTableCell align="center" className={styles.table_button_group}>
										<div className={styles.icon}>
											<DeleteForeverIcon onClick={() => removeCard(_id)}/>
											<CreateIcon onClick={() => changeCard(_id)}/>
										</div>
									</StyledTableCell>
								</StyledTableRow>
							)) : <div className={styles.now_cards}>Now pack...</div>}
						</TableBody>
					</Table>
				</TableContainer>
			</Paper>
			<div className={styles.paginationContainer}>
				<PaginationGroup page={page}
												 pageCount={pageCount}
												 cardPacksTotalCount={cardsTotalCount}
												 onChangePage={(pageNumber) => setCardsPageCount(pageNumber)}
												 onChangeValue={(value: number) => setCardsPage(value)}
												 title='Cards per Page'/>
			</div>
		</div>
	)
};