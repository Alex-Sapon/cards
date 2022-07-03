import * as React from 'react';
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

export const TablePacks = () => {
    // const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
    //     // onRequestSort(event, property);
    // };

    const [value, setValue] = React.useState<number[]>([20, 37]);

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
    };

    const [age, setAge] = React.useState('');

    const handleChangeCheckbox = (event: SelectChangeEvent) => {
        setAge(event.target.value);
    };

    return (
        <div className={styles.table_wrapper}>
            <h3 className={styles.table_title}>Packs list</h3>
            <div className={styles.text_field_group}>
                <TextField
                    fullWidth
                    sx={{backgroundColor: '#ECECF9', mr: '2rem'}}
                    size="small"
                    placeholder="Enter new pack"
                    // value='Hello'
                    // onChange={() => {}}
                    InputProps={{startAdornment: <InputAdornment position="start"><SearchIcon/></InputAdornment>}}
                />
                <Button>Add new pack</Button>
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
                        {true ? Array.from('1234567890').map((_, i) => (
                            <StyledTableRow key={i}>
                                <StyledTableCell component="th" scope="row">New cards packs</StyledTableCell>
                                <StyledTableCell align="center">2</StyledTableCell>
                                <StyledTableCell align="center">02.07.2022</StyledTableCell>
                                <StyledTableCell align="center">Aleksandr</StyledTableCell>
                                <StyledTableCell align="center" className={styles.table_button_group}>
                                    <Button id="button_delete">Delete</Button>
                                    <Button>Edit</Button>
                                    <Button>Learn</Button>
                                </StyledTableCell>
                            </StyledTableRow>
                        )) : <div>Now packs</div>}
                    </TableBody>
                </Table>
            </TableContainer>
            <PaginationGroup/>
        </div>
    )
};