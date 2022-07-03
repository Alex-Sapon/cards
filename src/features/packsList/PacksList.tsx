import * as React from 'react';
import styles from './PacksList.module.css';
import {ShowPacks} from './showPacks/ShowPacks';
import {TablePacks} from './tablePacks/TablePacks';
import {AlertBar} from '../login/AlertBar';
import {useEffect} from 'react';
import {fetchCardPacks} from './reducer/packsListReducer';
import {PATH} from '../../enums/path';
import { Navigate } from 'react-router-dom';
import { AppStateType, useAppDispatch, useAppSelector } from '../../app/store';
import { setAppErrorAC } from '../../app/reducer/app-reducer';

const selectError = (state: AppStateType): string | null => state.app.error;
const selectIsLoggedIn = (state: AppStateType): boolean => state.login.isLoggedIn;
const selectPage = (state: AppStateType): number => state.tablePacks.page;

export const PacksList = () => {
    const dispatch = useAppDispatch();

    const responseMessage = useAppSelector(selectError);
    const isLoggedIn = useAppSelector(selectIsLoggedIn);
    const page = useAppSelector(selectPage);

    useEffect(() => {
        dispatch(fetchCardPacks());
    }, [page]);

    if (!isLoggedIn) {
        return <Navigate to={PATH.LOGIN}/>
    }

    return (
        <div className={styles.container}>
            <ShowPacks/>
            <TablePacks/>
            {responseMessage && <AlertBar message={responseMessage} closeAlert={() => setAppErrorAC(null)}/>}
        </div>
    )
}