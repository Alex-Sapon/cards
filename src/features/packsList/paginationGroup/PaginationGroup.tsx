import * as React from 'react';
import {memo} from 'react';
import styles from './PaginationGroup.module.css';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import { ActionsType, useAppDispatch } from '../../../app/store';

type PaginationGroupType = {
    cardsTotalCount?:number
    pageCount?: number
    page?: number
    title?: string
    disable?: boolean
    onChangePage: (page: number) => ActionsType
    onChangeValue: (value: number) => ActionsType
}

export const PaginationGroup = memo((props: PaginationGroupType) => {
    const {cardsTotalCount, pageCount, page, title, disable, onChangeValue, onChangePage} = props;

	const dispatch = useAppDispatch();

    const handleChangePageCount = (e: SelectChangeEvent) => {
        if (pageCount && Number(e.target.value) !== pageCount) {
            dispatch(onChangeValue.call(onChangeValue, Number(e.target.value)));
        }
    }

    const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        dispatch(onChangePage.call(onChangePage, value));
    }

    const totalPageCount = cardsTotalCount && pageCount && Math.ceil(cardsTotalCount / pageCount);

    return (
        <div className={styles.pagination_group}>
            <Stack spacing={2} sx={{mr: '2rem'}}>
                <Pagination
                    disabled={disable}
                    count={totalPageCount}
                    page={page}
                    shape="rounded"
                    onChange={handleChangePage}
                />
            </Stack>
            <div className={styles.select_wrapper}>
                <span>Show</span>
                <Select
                    disabled={disable}
                    size="small"
                    value={String(pageCount)}
                    onChange={handleChangePageCount}
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
});