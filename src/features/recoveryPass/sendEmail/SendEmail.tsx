import { useSelector } from 'react-redux';
import { AppStateType } from '../../../components/app/store';
import styles from './SendEmail.module.css';

export const SendEmail = () => {
    const email = useSelector<AppStateType, string>(state => state.recoveryPass.email);

    return (
        <div className={styles.wrapper}>
            <img src="" alt="" className={styles.image}/>
            <h3 className={styles.title}>Check Email</h3>
            <div className={styles.subtitle}>{`We've sent Email with instructions to ${email}`}</div>
        </div>
    )
};