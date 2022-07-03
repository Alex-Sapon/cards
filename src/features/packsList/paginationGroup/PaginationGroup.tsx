import * as React from 'react';
import styles from './PaginationGroup.module.css';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import {setPage, setPageCount} from '../tablePacks/table-packs-reducer';
import {useAppDispatch} from '../../../app/store';
import {PATH} from '../../../enums/path';
import {Navigate} from 'react-router-dom';

type PaginationGroupType = {
    cardPacksTotalCount?: number
    pageCount?: number
    page?: number
    title?: string
}

export const PaginationGroup = (props: PaginationGroupType) => {

    const {cardPacksTotalCount, pageCount, page, title} = props;

    const dispatch = useAppDispatch();

    const handleChangeValue = (e: SelectChangeEvent) => {
        if (pageCount && Number(e.target.value) !== pageCount) {
            dispatch(setPageCount(Number(e.target.value)));
        }
    }

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        dispatch(setPage(value))
    }

    return (
        <div className={styles.pagination_group}>
            <Stack spacing={2} sx={{mr: '2rem'}}>
                <Pagination count={cardPacksTotalCount} page={page} shape="rounded" onChange={handleChange}/>
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
                <span>{title}</span>
            </div>
        </div>
    )
}