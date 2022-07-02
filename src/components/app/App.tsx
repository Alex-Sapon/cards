import styles from './App.module.css';
import {Navigate, Route, Routes} from 'react-router-dom';
import {Navbar} from '../navbar/Navbar';
import {Login} from '../../features/login/Login';
import {Registration} from '../../features/registration/Registration';
import {Profile} from '../../features/profile/Profile';
import {SetPassword} from '../../features/setPass/SetPassword';
import {RecoveryPass} from '../../features/recoveryPass/RecoveryPass';
import {Error404} from '../error404/Error404';
import {PATH} from '../../enums/path';
import {ErrorSnackbar} from '../ErrorSnackbar/ErrorSnackbar';
import {useEffect} from 'react';
import {initializeApp} from './app-reducer';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import {AppStateType, useAppDispatch, useAppSelector} from './store';
import {PacksList} from '../../features/packsList/PacksList';

const selectIsInitialized = (state: AppStateType): boolean => state.app.isInitialized;

export const App = () => {
    const dispatch = useAppDispatch();

    const isInitialized = useAppSelector(selectIsInitialized);
    const isLoggedIn = useAppSelector(state => state.login.isLoggedIn)

    useEffect(() => {
        dispatch(initializeApp());
    }, [dispatch]);

    if (!isInitialized) {
        return (
            <Box sx={{display: 'flex', justifyContent: 'center', marginTop: '30%'}}>
                <CircularProgress/>
            </Box>
        )
    }

    return (
        <div>
            {isLoggedIn && <Navbar/>}
            <div className={styles.app_container}>
                <ErrorSnackbar/>
                <Routes>
                    {/*<Route index element={<PacksList />}/>*/}
                    <Route path={PATH.HOME} element={<Navigate to={PATH.LOGIN}/>}/>
                    <Route path={PATH.LOGIN} element={<Login/>}/>
                    <Route path={PATH.REGISTRATION} element={<Registration/>}/>
                    <Route path={PATH.PACKS_LIST} element={<PacksList/>}/>
                    <Route path={PATH.PROFILE} element={<Profile/>}/>
                    <Route path={PATH.SET_PASS} element={<SetPassword/>}/>
                    <Route path={PATH.RECOVERY_PASS} element={<RecoveryPass/>}/>
                    <Route path={PATH.PAGE_NOT_FOUND} element={<Error404/>}/>
                </Routes>
            </div>
        </div>
    );
};