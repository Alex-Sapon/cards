import * as React from 'react';
import styles from './PacksList.module.css';
import {ShowPacks} from './showPacks/ShowPacks';
import {TablePacks} from './tablePacks/TablePacks';
import {AlertBar} from '../login/AlertBar';
import {useEffect} from 'react';
import {AppStateType, useAppDispatch, useAppSelector} from '../../components/app/store';
import {fetchCardPacks, setResponseMessage} from './packs-list-reducer';
import {PATH} from '../../enums/path';
import { Navigate } from 'react-router-dom';

const selectResponseMessage = (state: AppStateType) => state.packList.responseMessage;
const selectIsLoggedIn = (state: AppStateType) => state.login.isLoggedIn;

export const PacksList = () => {
    const dispatch = useAppDispatch();

    const responseMessage = useAppSelector(selectResponseMessage);
    const isLoggedIn = useAppSelector(selectIsLoggedIn);

    useEffect(() => {
        dispatch(fetchCardPacks());
    }, []);

    if (!isLoggedIn) {
        return <Navigate to={PATH.LOGIN}/>
    }

    return (
        <div className={styles.container}>
            <ShowPacks/>
            <TablePacks/>
            {responseMessage && <AlertBar message={responseMessage} closeAlert={() => setResponseMessage(null)}/>}
        </div>
    )
}