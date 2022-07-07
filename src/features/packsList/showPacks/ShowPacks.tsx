import * as React from 'react';
import Slider from '@mui/material/Slider';
import styles from './ShowPacks.module.css';
import Button from '../../../common/button/Button';
import {useAppDispatch, useAppSelector} from '../../../app/store';
import {MouseEvent, useEffect, useState} from 'react';
import {setMaxNumberCards, setMinNumberCards, setUserId} from '../tablePacks/tablePacksReducer';


export const ShowPacks = () => {

    const dispatch = useAppDispatch()
    const status = useAppSelector(state => state.app.status)
    const user_id = useAppSelector(state => state.tablePacks.user_id)
    const loginUserId = useAppSelector(state => state.login._id)

    const [value, setValue] = React.useState<number[]>([0, 110]);
    const [doUpdateSliderValue, setDoUpdateSliderValue] = useState(false)

    useEffect(
        () => {
            if (value && doUpdateSliderValue) {
                dispatch(setMinNumberCards(value[0]))
                dispatch(setMaxNumberCards(value[1]))
                setDoUpdateSliderValue(false)
            }
        },
        [doUpdateSliderValue]
    );

    const handleSliderChange = (event: Event, newValue: number | number[])  => {
            setValue(newValue as number[])
    }

    const showMyPacksClickHandler = () => {
        dispatch(setUserId(loginUserId))
    }
    const showAllPacksClickHandler = () => {
        dispatch(setUserId(''))
    }

    const handleClick = (e: MouseEvent<HTMLSpanElement>) => {
        if (e.type === 'mouseup') {
            console.log(e);
            setDoUpdateSliderValue(true)
        }
    }


    return (
        <div className={styles.left_bar}>
            <h3 className={styles.left_bar_title}>Show packs cards</h3>
            <div className={styles.button_group}>
                <Button
                    onClick={showMyPacksClickHandler}
                    disabled={status === 'loading'}
                    className={user_id ? styles.btn_active : ''}
                    >My</Button>
                <Button
                    onClick={showAllPacksClickHandler}
                    disabled={status === 'loading'}
                    className={!user_id ? styles.btn_active: ''}
                >All</Button>
            </div>
            <h3 className={styles.left_bar_subtitle}>Number of cards</h3>
            <div className={styles.slider}>
                <Slider
                    getAriaLabel={() => 'Temperature range'}
                    value={value}
                    onChange={handleSliderChange}
                    valueLabelDisplay="on"
                    max={110}
                    onMouseUp={handleClick}
                    disabled={status === 'loading'}
                />
            </div>
        </div>
    )
}