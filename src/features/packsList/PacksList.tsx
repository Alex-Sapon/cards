import * as React from 'react';
import Slider from '@mui/material/Slider';
import styles from './PacksList.module.css';
import Button from '../../common/button/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import SearchIcon from '@mui/icons-material/Search';
import {styled} from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function valuetext(value: number) {
    return `${value}°C`;
}


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
    '&:nth-of-type(odd)': {
        backgroundColor: '#F8F7FD',
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
) {
    return {name, calories, fat, carbs, protein};
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export const PacksList = () => {
    const [value, setValue] = React.useState<number[]>([20, 37]);

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
    };

    return (
        <div className={styles.container}>
            <div className={styles.left_bar}>
                <h3 className={styles.left_bar_title}>Show packs cards</h3>
                <div className={styles.button_group}>
                    <Button>My</Button>
                    <Button>All</Button>
                </div>
                <h3 className={styles.left_bar_subtitle}>Number of cards</h3>
                <div className={styles.slider}>
                    <Slider
                        getAriaLabel={() => 'Temperature range'}
                        value={value}
                        onChange={handleChange}
                        valueLabelDisplay="on"
                        getAriaValueText={valuetext}
                    />
                </div>
            </div>
            <div className={styles.table_wrapper}>
                <h3 className={styles.table_title}>Packs list</h3>
                <div className={styles.text_field_group}>
                    <FormControl fullWidth sx={{mr: '2rem'}} size="small">
                        <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-amount"
                            value={'Hello'}
                            onChange={() => {
                            }}
                            startAdornment={<InputAdornment position="start"><SearchIcon/></InputAdornment>}
                            label="Amount"
                        />
                    </FormControl>
                    <Button>Add new pack</Button>
                </div>
                <TableContainer component={Paper}>
                    <Table aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Dessert (100g serving)</StyledTableCell>
                                <StyledTableCell align="right">Calories</StyledTableCell>
                                <StyledTableCell align="right">Fat&nbsp;(g)</StyledTableCell>
                                <StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>
                                <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <StyledTableRow key={row.name}>
                                    <StyledTableCell component="th" scope="row">
                                        {row.name}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">{row.calories}</StyledTableCell>
                                    <StyledTableCell align="right">{row.fat}</StyledTableCell>
                                    <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                                    <StyledTableCell align="right">{row.protein}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

            </div>
        </div>
    )
}