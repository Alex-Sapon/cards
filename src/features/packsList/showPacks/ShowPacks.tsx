import * as React from 'react';
import Slider from '@mui/material/Slider';
import styles from './ShowPacks.module.css';
import Button from '../../../common/button/Button';
import {AppStateType, useAppSelector} from '../../../app/store';

const selectUserId = (state: AppStateType) => state.tablePacks.user_id;

export const ShowPacks = () => {
    const [value, setValue] = React.useState<number[]>([20, 37]);

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
    };

    const user_id = useAppSelector(selectUserId);

    const myPacks = user_id ? `${styles.btn_active}` : '';
    const allPacks = !user_id ? `${styles.btn_active}` : '';

    return (
        <div className={styles.left_bar}>
            <h3 className={styles.left_bar_title}>Show packs cards</h3>
            <div className={styles.button_group}>
                <Button className={myPacks}>My</Button>
                <Button className={allPacks}>All</Button>
            </div>
            <h3 className={styles.left_bar_subtitle}>Number of cards</h3>
            <div className={styles.slider}>
                <Slider
                    getAriaLabel={() => 'Temperature range'}
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay="on"
                />
            </div>
        </div>
    )
}