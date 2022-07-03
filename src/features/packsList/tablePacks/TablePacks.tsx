import * as React from 'react';
import {ChangeEvent, useEffect, useState} from 'react';
import styles from './TablePacks.module.css';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import {styled} from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {SelectChangeEvent} from '@mui/material/Select';
import TableSortLabel from '@mui/material/TableSortLabel';
import Button from '../../../common/button/Button';
import {TextField} from '@mui/material';
import {PaginationGroup} from '../paginationGroup/PaginationGroup';
import {AppStateType, useAppDispatch, useAppSelector} from '../../../app/store';
import useDebounce from './useDebounce';
import {shortWord} from './shortWord';
import {Navigate, useNavigate} from 'react-router-dom';
import {PATH} from '../../../enums/path';

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

const selectCardPacks = (state: AppStateType) => state.packList.cardPacks;
const selectCardPacksTotalCount = (state: AppStateType) => state.packList.cardPacksTotalCount;
const selectPageCount = (state: AppStateType) => state.packList.pageCount;
const selectPage = (state: AppStateType) => state.packList.page;
const selectStatus = (state: AppStateType) => state.app.status;
const selectProfileUserId = (state: AppStateType) => state.profile._id;

export const TablePacks = () => {
    const [value, setValue] = useState<string>('');

    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const debouncedValue = useDebounce<string>(value, 500);

    const cardPacks = useAppSelector(selectCardPacks);
    const cardPacksTotalCount = useAppSelector(selectCardPacksTotalCount);
    const pageCount = useAppSelector(selectPageCount);
    const page = useAppSelector(selectPage);
    const status = useAppSelector(selectStatus);
    const profileUserId = useAppSelector(selectProfileUserId);

    const handleChangeValue = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setValue(e.currentTarget.value);
    };

    useEffect(() => {
        // dispatch();
    }, [debouncedValue])

    const handleChangeCheckbox = (event: SelectChangeEvent) => {

    };

    const handleCardsRedirect = (e: React.MouseEvent<HTMLTableCellElement>) => {
        // if (e.currentTarget.matches('name-redirect')) {
        //     return <Navigate to={PATH.CARDS}/>
        // }

        return <Navigate to={PATH.CARDS}/>

    }

    return (
        <div className={styles.table_wrapper}>
            <h3 className={styles.table_title}>Packs list</h3>
            <div className={styles.text_field_group}>
                <TextField
                    fullWidth
                    sx={{backgroundColor: '#ECECF9', mr: '2rem'}}
                    size="small"
                    placeholder="Search"
                    disabled={status === 'loading'}
                    // value='Hello'
                    onChange={handleChangeValue}
                    InputProps={{startAdornment: <InputAdornment position="start"><SearchIcon/></InputAdornment>}}
                />
                <Button disabled={status === 'loading'}>Add new pack</Button>
            </div>
            <TableContainer className={styles.table_container}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>
                                <TableSortLabel
                                    active={true}
                                    direction={'asc'}
                                    // onClick={createSortHandler(headCell.id)}
                                >
                                </TableSortLabel>
                                <b>Name</b>
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                <TableSortLabel
                                    active={true}
                                    direction={'asc'}
                                    // onClick={createSortHandler(headCell.id)}
                                >
                                </TableSortLabel>
                                <b>Cards</b>
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                <TableSortLabel
                                    active={true}
                                    direction={'asc'}
                                    // onClick={createSortHandler(headCell.id)}
                                >
                                </TableSortLabel>
                                <b>Last Updated</b>
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                <TableSortLabel
                                    active={true}
                                    direction={'asc'}
                                    // onClick={createSortHandler(headCell.id)}
                                >
                                </TableSortLabel>
                                <b>Created by</b>
                            </StyledTableCell>
                            <StyledTableCell align="center"><b>Actions</b></StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cardPacks ? cardPacks.map(({_id, name, cardsCount, updated, user_name}) => (
                            <StyledTableRow key={_id}>
                                <StyledTableCell
                                    sx={{width: '20%', cursor: 'pointer'}}
                                    component="th"
                                    scope="row"
                                    onClick={() => navigate(PATH.CARDS)}
                                >
                                    {shortWord(name)}
                                </StyledTableCell>
                                <StyledTableCell sx={{width: '13%'}} align="center">{cardsCount}</StyledTableCell>
                                <StyledTableCell sx={{width: '20%'}} align="center">
                                    {new Date(updated).toLocaleDateString()}
                                </StyledTableCell>
                                <StyledTableCell sx={{width: '20%'}} align="center">{shortWord(user_name)}</StyledTableCell>
                                <StyledTableCell sx={{width: '27%'}} align="center" className={styles.table_button_group}>
                                    {profileUserId === _id &&
                                        <><Button id="button_delete" disabled={status === 'loading'}>Delete</Button>
                                            <Button disabled={status === 'loading'}>Edit</Button></>}
                                    <Button disabled={status === 'loading'}>Learn</Button>
                                </StyledTableCell>
                            </StyledTableRow>
                        )) : <div>Now packs</div>}
                    </TableBody>
                </Table>
            </TableContainer>
            <PaginationGroup
                cardPacksTotalCount={cardPacksTotalCount}
                pageCount={pageCount}
                page={page}
                title="Cards per Page"
            />
        </div>
    )
};