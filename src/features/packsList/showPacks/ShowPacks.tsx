import * as React from 'react';
import Slider from '@mui/material/Slider';
import styles from './ShowPacks.module.css';
import Button from '../../../common/button/Button';
import {useAppDispatch, useAppSelector} from '../../../app/store';
import {fetchCardPacksDima} from '../Dima/reducer/packsListDimaReducer';
import {useEffect, useState } from 'react';
import { useDebounce } from '../Dima/debounce/debounce';

export const ShowPacks = () => {

    const dispatch = useAppDispatch()
    const status = useAppSelector(state => state.app.status)
    const user_id = useAppSelector(state => state.login._id)

    const [value, setValue] = React.useState<number[]>([0, 110]);

    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);

    const debouncedSearchTerm = useDebounce(value, 500);
    useEffect(
        () => {
            if (debouncedSearchTerm) {
                dispatch(fetchCardPacksDima({min: value[0], max: value[1]}))
            }
        },
        [debouncedSearchTerm]
    );



    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
        console.log(value[0]);
    };

    const myPacksClickHandler = () => {
       dispatch(fetchCardPacksDima({user_id}))
    }
    const allPacksClickHandler = () => {
       dispatch(fetchCardPacksDima({}))
    }

    return (
        <div className={styles.left_bar}>
            <h3 className={styles.left_bar_title}>Show packs cards</h3>
            <div className={styles.button_group}>
                <Button onClick={myPacksClickHandler} disabled={status === 'loading'} >My</Button>
                <Button onClick={allPacksClickHandler} disabled={status === 'loading'}>All</Button>
            </div>
            <h3 className={styles.left_bar_subtitle}>Number of cards</h3>
            <div className={styles.slider}>
                <Slider
                    getAriaLabel={() => 'Temperature range'}
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay="on"
                    max={110}
                />
            </div>
        </div>
    )
}