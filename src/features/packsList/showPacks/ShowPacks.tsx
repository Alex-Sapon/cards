import * as React from 'react';
import Slider from '@mui/material/Slider';
import styles from './ShowPacks.module.css';
import Button from '../../../common/button/Button';
import {useAppDispatch, useAppSelector} from '../../../app/store';
import {fetchCardPacksDima} from '../Dima/reducer/packsListDimaReducer';
import {MouseEvent, useEffect, useState} from 'react';
import { useDebounce } from '../Dima/debounce/debounce';

export const ShowPacks = () => {

    const dispatch = useAppDispatch()
    const status = useAppSelector(state => state.app.status)
    const user_id = useAppSelector(state => state.login._id)

    const [value, setValue] = React.useState<number[]>([0, 110]);
    const [doRequest, setDoRequest] = useState(false)
    const [switchOn, setSwitchOn] = useState(false)

    const debouncedSearchTerm = useDebounce(value, 500);
    useEffect(
        () => {
            if (debouncedSearchTerm && doRequest) {
                dispatch(fetchCardPacksDima({min: value[0], max: value[1]}))
                setDoRequest(false)
            }
        },
        [debouncedSearchTerm, doRequest]
    );

    const handleChange = (event: Event, newValue: number | number[])  => {
        if (Array.isArray(newValue))
            setValue(newValue as number[])
    }
    const myPacksClickHandler = () => {
        dispatch(fetchCardPacksDima({user_id}))
    }
    const allPacksClickHandler = () => {
        dispatch(fetchCardPacksDima({}))
    }

    const handleClick = (e: MouseEvent<HTMLSpanElement>) => {
        if (e.type === 'mouseup') {
            setDoRequest(true)
        }
    }
    return (
        <div className={styles.left_bar}>
            <h3 className={styles.left_bar_title}>Show packs cards</h3>
            <div className={styles.button_group}>
                <Button
                    onClick={myPacksClickHandler}
                    disabled={status === 'loading'}
                    >My</Button>
                <Button
                    onClick={allPacksClickHandler}
                    disabled={status === 'loading'}
                >All</Button>
            </div>
            <h3 className={styles.left_bar_subtitle}>Number of cards</h3>
            <div className={styles.slider}>
                <Slider
                    getAriaLabel={() => 'Temperature range'}
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay="on"
                    max={110}
                    onMouseUp={handleClick}
                    disabled={status === 'loading'}
                />
            </div>
        </div>
    )
}