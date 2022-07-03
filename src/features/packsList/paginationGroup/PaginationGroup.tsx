import * as React from 'react';
import styles from './PaginationGroup.module.css';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import Select, {SelectChangeEvent} from '@mui/material/Select';

type PaginationGroupType = {
    cardPacksTotalCount?: number
    pageCount?: number
    page?: number
}

export const PaginationGroup = (props: PaginationGroupType) => {
    const {cardPacksTotalCount, pageCount, page} = props;

    const [age, setAge] = React.useState('');

    const handleChangeValue = (event: SelectChangeEvent) => {
        setAge(event.target.value);
    };

    return (
        <div className={styles.pagination_group}>
            <Stack spacing={2} sx={{mr: '2rem'}}>
                <Pagination count={cardPacksTotalCount} page={page} shape="rounded" />
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
                    <MenuItem value="10">{'10'}</MenuItem>
                    <MenuItem value="15">{'15'}</MenuItem>
                </Select>
                <span>cards per page</span>
            </div>
        </div>
    )
};