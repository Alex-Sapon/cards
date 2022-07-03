import * as React from 'react';
import styles from './PackName.module.css';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import {styled} from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import {TextField} from '@mui/material';
import {PaginationGroup} from "../packsList/paginationGroup/PaginationGroup";
import Rating from "@mui/material/Rating";
import ArrowBackSharpIcon from '@mui/icons-material/ArrowBackSharp';
import Paper from "@mui/material/Paper";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CreateIcon from '@mui/icons-material/Create';
import Button from "../../common/button/Button";

const StyledTableCell = styled(TableCell)(({theme}) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: '#ECECF9',
		color: '#2D2E46',
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}));

const StyledTableRow = styled(TableRow)(({theme}) => ({
	'&:nth-of-type(even)': {
		backgroundColor: '#F8F7FD',
	},
	// hide last border
	'&:last-child td, &:last-child th': {
		border: 0,
	},
}));


export const TablePack = () => {
	return (
		<div>
			<h2 className={styles.table_title}>
				<ArrowBackSharpIcon className={styles.arrowBackSharpIcon}
					fontSize="medium"
					/>Pack Name</h2>
			<div className={styles.inputContainer}>
				<TextField
					fullWidth
					sx={{backgroundColor: '#ECECF9', mr: '2rem'}}
					size="small"
					placeholder="Search..."
					InputProps={{startAdornment: <InputAdornment position="start"><SearchIcon/></InputAdornment>}}
				/>
				<Button>ADD NEW CARD</Button>
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
							{true ? Array.from('1234567890').map((_, i) => (
								<StyledTableRow key={i}>
									<StyledTableCell component="th" scope="row">How "This" works in JavaScript</StyledTableCell>
									<StyledTableCell align="justify">This is how "This" works in JavaScript</StyledTableCell>
									<StyledTableCell align="justify">03.07.2022</StyledTableCell>
									<StyledTableCell align="justify">
										<Rating
											name="no-value"
											value={null}
											size="small"
											readOnly/>
									</StyledTableCell>
									<StyledTableCell align="center" className={styles.table_button_group}>
										<div className={styles.icon}>
										<DeleteForeverIcon/>
										<CreateIcon/>
										</div>
									</StyledTableCell>
								</StyledTableRow>
							)) : <div>Now pack</div>}
						</TableBody>
					</Table>
				</TableContainer>
			</Paper>
			<div className={styles.paginationContainer}><PaginationGroup title='Cards per Page'/>
			</div>
		</div>
	)
};