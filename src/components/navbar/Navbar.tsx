import {NavLink} from "react-router-dom";
import styles from './Navbar.module.css';
import {PATH} from '../../enums/path';

export const Navbar = () => {
    const setActiveClass = (navData: { isActive: boolean }): string => navData.isActive ? styles.active : styles.navbar_item;

    return (
        <div className={styles.navbar_container}>
            <nav className={styles.navbar_list}>
                <NavLink to={PATH.PROFILE} className={setActiveClass}>Profile</NavLink>
                <NavLink to={PATH.LOGIN} className={setActiveClass}>Login</NavLink>
                <NavLink to={PATH.REGISTRATION} className={setActiveClass}>Registration</NavLink>
                <NavLink to={PATH.SET_PASS} className={setActiveClass}>Set password</NavLink>
                <NavLink to={PATH.RECOVERY_PASS} className={setActiveClass}>Recovery password</NavLink>
                <NavLink to={PATH.TEST} className={setActiveClass}>Test</NavLink>
            </nav>
        </div>
    )
}