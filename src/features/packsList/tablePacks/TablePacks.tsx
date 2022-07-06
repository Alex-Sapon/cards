import {ChangeEvent, useEffect, useState} from 'react';
import {PaginationGroup} from '../paginationGroup/PaginationGroup';
import {AppStateType, useAppDispatch, useAppSelector} from '../../../app/store';
import useDebounce from './utils/useDebounce';
import {PackType} from '../packsList-api';
import {RequestStatusType} from '../../../app/reducer/app-reducer';
import {TableRowPack} from './tableRowPack/TableRowPack';
import {StyledTableCell} from './tableRowPack/styledTablePack';
import Button from '../../../common/button/Button';
import styles from './TablePacks.module.css';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import {TextField} from '@mui/material';
import {createNewCardsPack, setSearchPackName, setSortPackName} from './tablePacksReducer';

const selectCardPacks = (state: AppStateType): PackType[] => state.packList.cardPacks;
const selectCardPacksTotalCount = (state: AppStateType): number => state.packList.cardPacksTotalCount;
const selectPageCount = (state: AppStateType): number => state.tablePacks.pageCount;
const selectPage = (state: AppStateType): number => state.tablePacks.page;
const selectStatus = (state: AppStateType): RequestStatusType => state.app.status;

type DirectionNameType = 'name' | 'cardsCount' | 'updated' | 'created' | 'user_name';

export const TablePacks = () => {
    const [value, setValue] = useState('');

    const [direction, setDirection] = useState<[0 | 1, DirectionNameType]>([0, 'created']);

    const dispatch = useAppDispatch();

    const debouncedValue = useDebounce<string>(value, 500);

    const cardPacks = useAppSelector(selectCardPacks);
    const cardPacksTotalCount = useAppSelector(selectCardPacksTotalCount);
    const pageCount = useAppSelector(selectPageCount);
    const page = useAppSelector(selectPage);
    const status = useAppSelector(selectStatus);

    const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value);
    };


    useEffect(() => {
        dispatch(setSearchPackName(debouncedValue));
    }, [debouncedValue]);

    const handleNewCardsPack = () => {
        dispatch(createNewCardsPack('My new PACK'));
    };

    let finalSortName = `${direction[0]}${direction[1]}`;
    console.log(finalSortName)

    const handleSortList = (name: DirectionNameType) => {
        finalSortName = `${direction[0]}${direction[1]}`;

        setDirection([direction[0] === 0 ? 1 : 0, name]);

        dispatch(setSortPackName(finalSortName));
    };

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
                    value={value}
                    onChange={handleChangeValue}
                    InputProps={{startAdornment: <InputAdornment position="start"><SearchIcon/></InputAdornment>}}
                />
                <Button disabled={status === 'loading'} onClick={handleNewCardsPack}>Add new pack</Button>
            </div>
            <TableContainer className={styles.table_container}>
                <Table>
                    <TableHead>
                        <TableRow sx={{display: 'grid', gridTemplateColumns: '21% 15% 19% 17% 28%'}}>
                            <StyledTableCell>
                                <TableSortLabel
                                    active={true}
                                    disabled={status === 'loading'}
                                    direction={finalSortName === '0name' ? 'asc' : 'desc'}
                                    onClick={() => handleSortList('name')}
                                >
                                </TableSortLabel>
                                <b>Name</b>
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                <TableSortLabel
                                    active={true}
                                    disabled={status === 'loading'}
                                    direction={finalSortName === '0cardsCount' ? 'asc' : 'desc'}
                                    onClick={() => handleSortList('cardsCount')}
                                >
                                </TableSortLabel>
                                <b>Cards</b>
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                <TableSortLabel
                                    active={true}
                                    disabled={status === 'loading'}
                                    direction={finalSortName === '0updated' ? 'asc' : 'desc'}
                                    onClick={() => handleSortList('updated')}
                                >
                                </TableSortLabel>
                                <b>Last Updated</b>
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                <TableSortLabel
                                    active={true}
                                    disabled={status === 'loading'}
                                    direction={finalSortName === '0user_name' ? 'asc' : 'desc'}
                                    onClick={() => handleSortList('user_name')}
                                >
                                </TableSortLabel>
                                <b>Created by</b>
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                <b>Actions</b>
                            </StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cardPacks.length ? cardPacks.map(({_id, name, cardsCount, updated, user_name, user_id}) => (
                            <TableRowPack
                                key={_id}
                                _id={_id}
                                name={name}
                                cardsCount={cardsCount}
                                updated={updated}
                                user_name={user_name}
                                user_id={user_id}
                                status={status}
                            />
                        )) : <div className={styles.now_packs}>Now packs...</div>}
                    </TableBody>
                </Table>
            </TableContainer>
            <PaginationGroup
                cardPacksTotalCount={cardPacksTotalCount}
                pageCount={pageCount}
                page={page}
                title="Cards per Page"
                disable={status === 'loading'}
            />
        </div>
    )
};