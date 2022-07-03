import * as React from 'react';
import styles from './PaginationGroup.module.css';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import Select, {SelectChangeEvent} from '@mui/material/Select';

type TablePackPropsType = {
  title:string
}

export const PaginationGroup = (props:TablePackPropsType) => {
    const [page, setPage] = React.useState('');

    const handleChangeCheckbox = (event: SelectChangeEvent) => {
      setPage(event.target.value);
    };

    return (
        <div className={styles.pagination_group}>
            <Stack spacing={2} sx={{mr: '2rem'}}>
                <Pagination count={10} shape="rounded" color="secondary"/>
            </Stack>
            <div className={styles.select_wrapper}>
                <span>Show</span>
                <Select
                    size="small"
                    value="10"
                    onChange={handleChangeCheckbox}
                    sx={{minWidth: '65px', m: '0 0.5rem', height: '30px'}}
                >
                    <MenuItem value="5">{'5'}</MenuItem>
                    <MenuItem value="10">{'10'}</MenuItem>
                    <MenuItem value="15">{'15'}</MenuItem>
                </Select>
                <span>{props.title}</span>
            </div>
        </div>
    )
};