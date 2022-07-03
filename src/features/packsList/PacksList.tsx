import * as React from 'react';
import {useEffect} from 'react';
import styles from './PacksList.module.css';
import {ShowPacks} from './showPacks/ShowPacks';
import {TablePacks} from './tablePacks/TablePacks';
import {fetchCardPacks} from './packs-list-reducer';
import {PATH} from '../../enums/path';
import {Navigate} from 'react-router-dom';
import {AppStateType, useAppDispatch, useAppSelector} from '../../app/store';

const selectError = (state: AppStateType): string | null => state.app.error;
const selectIsLoggedIn = (state: AppStateType): boolean => state.login.isLoggedIn;
const selectPage = (state: AppStateType): number => state.tablePacks.page;
const selectPageCount = (state: AppStateType): number => state.tablePacks.pageCount;

export const PacksList = () => {
    const dispatch = useAppDispatch();

    const responseMessage = useAppSelector(selectError);
    const isLoggedIn = useAppSelector(selectIsLoggedIn);
    const page = useAppSelector(selectPage);
    const pageCount = useAppSelector(selectPageCount);

    useEffect(() => {
        dispatch(fetchCardPacks());
    }, [page, pageCount]);

    if (!isLoggedIn) {
        return <Navigate to={PATH.LOGIN}/>
    }

    return (
        <div className={styles.container}>
            <ShowPacks/>
            <TablePacks/>
        </div>
    )
}