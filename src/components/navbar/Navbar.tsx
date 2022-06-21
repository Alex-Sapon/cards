import {NavLink} from "react-router-dom";
import styles from './Navbar.module.css';
import {PATH} from '../../enums/path';

export const Navbar = () => {
    return (
        <div className={styles.navbar_container}>
            <nav className={styles.navbar_list}>
                <NavLink to={PATH.PROFILE}>Profile</NavLink>
                <NavLink to={PATH.LOGIN}>Login</NavLink>
                <NavLink to={PATH.REGISTER}>Register</NavLink>
                <NavLink to={PATH.SET_PASS}>Set password</NavLink>
                <NavLink to={PATH.RECOVERY_PASS}>Recovery password</NavLink>
                <NavLink to={PATH.TEST}>Test</NavLink>
            </nav>
        </div>
    )
}