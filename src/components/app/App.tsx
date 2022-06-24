import styles from './App.module.css';
import {Routes, Route, Navigate} from 'react-router-dom';

import {Navbar} from '../navbar/Navbar';
import {Login} from '../../features/login/Login';
import {Registration} from '../../features/registration/Registration';
import {Profile} from '../../features/profile/Profile';
import {SetPassword} from '../../features/setPass/SetPassword';
import {RecoveryPass} from '../../features/recoveryPass/RecoveryPass';
import {Test} from '../../common/test/Test';
import {Error404} from '../error404/Error404';

import {PATH} from '../../enums/path';

export const App = () => {
    return (
        <div>
            <Navbar/>
            <div className={styles.app_container}>
                <Routes>
                    <Route path={PATH.HOME} element={<Navigate to={PATH.TEST}/>}/>
                    <Route path={PATH.LOGIN} element={<Login/>}/>
                    <Route path={PATH.REGISTRATION} element={<Registration/>}/>
                    <Route path={PATH.PROFILE} element={<Profile/>}/>
                    <Route path={PATH.SET_PASS} element={<SetPassword/>}/>
                    <Route path={PATH.RECOVERY_PASS} element={<RecoveryPass/>}/>
                    <Route path={PATH.TEST} element={<Test/>}/>
                    <Route path={PATH.PAGE_NOT_FOUND} element={<Error404/>}/>
                </Routes>
            </div>
        </div>
    );
};