import React from 'react';
import {StyledTableCell, StyledTableRow} from "../styledTableCard/styledTableCard";
import {shortWord} from "../../../packsList/tablePacks/utils/shortWord";
import Rating from "@mui/material/Rating";
import FavoriteIcon from "@mui/icons-material/Grade";
import FavoriteBorderIcon from "@mui/icons-material/Grade";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CreateIcon from "@mui/icons-material/Create";
import {removeCardTC, updateCardTC} from "../../reducer/packCardReducer";
import {useAppDispatch, useAppSelector} from "../../../../app/store";
import styles from '../tableCardName.module.css';
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import TableBody from "@mui/material/TableBody";
import Paper from "@mui/material/Paper";

export const TableContainerCards = () => {
	const userId = useAppSelector(state => state.login._id)
	const cards = useAppSelector(state => state.cardPack.cards)

	const dispatch = useAppDispatch()

	const removeCard = (_id: string) => {
		dispatch(removeCardTC(_id))
	}

	const changeCard = (_id: string) => {
		dispatch(updateCardTC(_id, 'Update card'))
	}
	return (
		<div>
			<Paper elevation={3}>
				<TableContainer>
					<Table>
						<TableHead className={styles.wrapperRowCards}>
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
							{cards.length ? cards.map(({answer, question, updated, _id, user_id, grade}) => (
								<StyledTableRow key={_id}>
									<StyledTableCell component="th" scope="row">
										<span style={{display: 'inline-block', flex: '1 1 auto'}}>{shortWord(question, 50)}</span>
									</StyledTableCell>
									<StyledTableCell align="justify">{shortWord(answer, 150)}</StyledTableCell>
									<StyledTableCell align="justify">{new Date(updated).toLocaleDateString()}</StyledTableCell>
									<StyledTableCell align="justify">
										<Rating
											value={Number(grade.toFixed(1))}
											precision={0.1}
											icon={<FavoriteIcon fontSize="inherit" color="error"/>}
											emptyIcon={<FavoriteBorderIcon fontSize="inherit"/>}
											size="medium"
											readOnly
										/>
									</StyledTableCell>
									<StyledTableCell align="center" className={styles.table_button_group}>
										{userId === user_id
											? <div className={styles.icon}>
												<DeleteForeverIcon onClick={() => removeCard(_id)}/>
												<CreateIcon onClick={() => changeCard(_id)}/>
											</div> : null}
									</StyledTableCell>
								</StyledTableRow>
							)) : <div className={styles.now_cards}>Now pack...</div>}
						</TableBody>
					</Table>
				</TableContainer>
			</Paper>
		</div>
	);
};

