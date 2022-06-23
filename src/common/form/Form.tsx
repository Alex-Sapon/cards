import { ReactNode } from 'react';
import styles from './Form.module.css';

type FromType = {
    children: ReactNode
    onSubmit: () => void
}

export const Form = ({children, onSubmit}: FromType) => {
    return (
        <div className={styles.wrapper}>
            <form className={styles.form} onSubmit={onSubmit}>
                {children}
            </form>
        </div>
    )
};