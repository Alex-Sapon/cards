import styles from './App.module.css';
import {Routes, Route, Navigate} from 'react-router-dom';
import {Navbar} from '../navbar/Navbar';
import {Login} from '../../features/login/Login';
import {Registration} from '../../features/registration/Registration';
import {Profile} from '../../features/profile/Profile';
import {SetPassword} from '../../features/setPass/SetPassword';
import {RecoveryPass} from '../../features/recoveryPass/RecoveryPass';
import {Error404} from '../error404/Error404';
import {PATH} from '../../enums/path';
import {ErrorSnackbar} from '../ErrorSnackbar/ErrorSnackbar';
import LinearProgress from '@mui/material/LinearProgress/LinearProgress';
import {useEffect} from 'react';
import {initializeApp} from './app-reducer';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import {AppStateType, useAppDispatch, useAppSelector} from './store';
import {RequestStatusType} from '../../features/registration/registrationReducer';
import {PacksList} from '../../features/packsList/PacksList';

const selectStatus = (state: AppStateType): RequestStatusType => state.register.status;
const selectIsInitialized = (state: AppStateType): boolean => state.app.isInitialized;

export const App = () => {
    const dispatch = useAppDispatch();
    const status = useAppSelector(selectStatus);

    const isInitialized = useAppSelector(selectIsInitialized);

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
            <Navbar/>
            {status === 'loading' && <LinearProgress color="secondary"/>}
            <div className={styles.app_container}>
                <ErrorSnackbar/>
                <Routes>
                    <Route index element={<PacksList />}/>
                    {/*<Route path={PATH.HOME} element={<Navigate to={PATH.PROFILE}/>}/>*/}
                    {/*<Route path={PATH.LOGIN} element={<Login/>}/>*/}
                    {/*<Route path={PATH.REGISTRATION} element={<Registration/>}/>*/}
                    {/*<Route path={PATH.PROFILE} element={<Profile/>}/>*/}
                    {/*<Route path={PATH.SET_PASS} element={<SetPassword/>}/>*/}
                    {/*<Route path={PATH.RECOVERY_PASS} element={<RecoveryPass/>}/>*/}
                    {/*<Route path={PATH.PAGE_NOT_FOUND} element={<Error404/>}/>*/}
                </Routes>
            </div>
        </div>
    );
};