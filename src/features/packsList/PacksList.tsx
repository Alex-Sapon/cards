import * as React from 'react';
import styles from './PacksList.module.css';
import {ShowPacks} from './showPacks/ShowPacks';
import {TablePacks} from './tablePacks/TablePacks';
import {AlertBar} from '../login/AlertBar';

export const PacksList = () => {
    return (
        <div className={styles.container}>
            <ShowPacks/>
            <TablePacks/>
            {false && <AlertBar message={'Massage'} />}
        </div>
    )
}