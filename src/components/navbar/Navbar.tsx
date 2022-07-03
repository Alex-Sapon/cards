import {NavLink} from 'react-router-dom';
import styles from './Navbar.module.css';
import {PATH} from '../../enums/path';
import LinearProgress from '@mui/material/LinearProgress/LinearProgress';
import {AppStateType, useAppSelector} from '../app/store';
import {RequestStatusType} from '../../features/registration/registrationReducer';

const selectStatus = (state: AppStateType): RequestStatusType => state.register.status;

export const Navbar = () => {
    const setActiveClass = (navData: { isActive: boolean }): string => {
        return navData.isActive ? styles.active : styles.navbar_item;
    }

    const status = useAppSelector(selectStatus);

    return (
        <div className={styles.navbar_container}>
            <nav className={styles.navbar_list}>
                <NavLink to={PATH.PACKS_LIST} className={setActiveClass}>Packs List</NavLink>
                <NavLink to={PATH.PROFILE} className={setActiveClass}>Profile</NavLink>
                <NavLink to={PATH.CARDS} className={setActiveClass}>Cards</NavLink>
                <NavLink to={PATH.LOGIN} className={setActiveClass}>Login</NavLink>
                <NavLink to={PATH.REGISTRATION} className={setActiveClass}>Registration</NavLink>
                <NavLink to={PATH.SET_PASS} className={setActiveClass}>Set password</NavLink>
                <NavLink to={PATH.RECOVERY_PASS} className={setActiveClass}>Recovery password</NavLink>
                <NavLink to={PATH.TEST} className={setActiveClass}>Test</NavLink>
            </nav>
            {status === 'loading' && <LinearProgress color="secondary"/>}
        </div>
    )
}