import * as React from 'react';
import {useEffect} from 'react';
import styles from './PacksList.module.css';
import {ShowPacks} from './showPacks/ShowPacks';
import {TablePacks} from './tablePacks/TablePacks';
import {PATH} from '../../enums/path';
import {Navigate} from 'react-router-dom';
import {AppStateType, useAppDispatch, useAppSelector} from '../../app/store';
import { fetchCardPacks } from './packsListReducer';

const selectIsLoggedIn = (state: AppStateType): boolean => state.login.isLoggedIn;
const selectPage = (state: AppStateType): number => state.tablePacks.page;
const selectPageCount = (state: AppStateType): number => state.tablePacks.pageCount;
const selectSearchPackName = (state: AppStateType): string => state.tablePacks.packName;
const selectSortPackName = (state: AppStateType): string => state.tablePacks.sortPacks;

export const PacksList = () => {
    const dispatch = useAppDispatch();

    const isLoggedIn = useAppSelector(selectIsLoggedIn);
    const page = useAppSelector(selectPage);
    const pageCount = useAppSelector(selectPageCount);
    const searchPackName = useAppSelector(selectSearchPackName);
    const sortPackName = useAppSelector(selectSortPackName);

    useEffect(() => {
        dispatch(fetchCardPacks());
    }, [page, pageCount, sortPackName, searchPackName]);

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