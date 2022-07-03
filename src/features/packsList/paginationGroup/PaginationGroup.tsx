import * as React from 'react';
import styles from './PaginationGroup.module.css';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import {useAppDispatch} from '../../../components/app/store';
import {setPage, setPageCount} from '../tablePacks/table-packs-reducer';

type PaginationGroupType = {
    cardPacksTotalCount?: number
    pageCount?: number
    page?: number
}

export const PaginationGroup = (props: PaginationGroupType) => {
    const {cardPacksTotalCount, pageCount, page} = props;

    const dispatch = useAppDispatch();

    const handleChangeValue = (e: SelectChangeEvent) => {
        if (pageCount && Number(e.target.value) !== pageCount) {
            dispatch(setPageCount(Number(e.target.value)));
        }
type TablePackPropsType = {
  title:string
}

export const PaginationGroup = (props:TablePackPropsType) => {
    const [page, setPage] = React.useState('');

        console.log(pageCount)
        console.log(Number(e.target.value))
    };

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        dispatch(setPage(value));
    const handleChangeCheckbox = (event: SelectChangeEvent) => {
      setPage(event.target.value);
    };

    return (
        <div className={styles.pagination_group}>
            <Stack spacing={2} sx={{mr: '2rem'}}>
                <Pagination count={cardPacksTotalCount} page={page} shape="rounded" onChange={handleChange}/>
                <Pagination count={10} shape="rounded" color="secondary"/>
            </Stack>
            <div className={styles.select_wrapper}>
                <span>Show</span>
                <Select
                    size="small"
                    value={String(pageCount)}
                    onChange={handleChangeValue}
                    sx={{minWidth: '65px', m: '0 0.5rem', height: '30px'}}
                >
                    <MenuItem value={pageCount}>{pageCount}</MenuItem>
                    <MenuItem value="5">{'5'}</MenuItem>
                    <MenuItem value="10">{'10'}</MenuItem>
                    <MenuItem value="15">{'15'}</MenuItem>
                </Select>
                <span>{props.title}</span>
            </div>
        </div>
    )
};