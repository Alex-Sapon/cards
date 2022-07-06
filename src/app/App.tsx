import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import styles from './App.module.css';
import {Login} from '../features/login/Login';
import {Registration} from '../features/registration/Registration';
import {Profile} from '../features/profile/Profile';
import {SetPassword} from '../features/setPass/SetPassword';
import {RecoveryPass} from '../features/recoveryPass/RecoveryPass';
import {Error404} from '../components/error404/Error404';
import {PATH} from '../enums/path';
import {useEffect} from 'react';
import {AppStateType, useAppDispatch, useAppSelector} from './store';
import {initializeApp, RequestStatusType} from './reducer/app-reducer';
import {Navbar} from '../components/navbar/Navbar';
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar';
import {Navigate, Route, Routes} from 'react-router-dom';
import {PacksList} from '../features/packsList/PacksList';
import {TableCardName} from '../features/packName/tableCardName/tableCardName';

const selectStatus = (state: AppStateType): RequestStatusType => state.app.status;
const selectIsInitialized = (state: AppStateType): boolean => state.app.isInitialized;
const selectIsLoggedIn = (state: AppStateType): boolean => state.login.isLoggedIn;

export const App = () => {
	const dispatch = useAppDispatch();

	const status = useAppSelector(selectStatus);
	const isLoggedIn = useAppSelector(selectIsLoggedIn);
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
			{isLoggedIn && <Navbar/>}
			<div className={styles.app_container}>
				<ErrorSnackbar/>
				<Routes>
					<Route path={PATH.HOME} element={<Navigate to={PATH.LOGIN}/>}/>
					<Route path={PATH.LOGIN} element={<Login/>}/>
					<Route path={PATH.REGISTRATION} element={<Registration/>}/>
					<Route path={PATH.PACKS_LIST} element={<PacksList/>}/>
					<Route path={PATH.CARDS} element={<TableCardName/>}/>
					<Route path={PATH.PROFILE} element={<Profile/>}/>
					<Route path={PATH.SET_PASS} element={<SetPassword/>}/>
					<Route path={PATH.RECOVERY_PASS} element={<RecoveryPass/>}/>
					<Route path={PATH.PAGE_NOT_FOUND} element={<Error404/>}/>
				</Routes>
			</div>
		</div>
	)
};