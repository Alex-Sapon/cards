import { ReactNode } from 'react';
import styles from './Form.module.css';

type FromType = {
    title?: string
    children: ReactNode
    onSubmit: () => void
}

export const Form = ({title, children, onSubmit}: FromType) => {
    return (
        <div className={styles.wrapper}>
            <h3 className={styles.title}>{title}</h3>
            <form className={styles.form} onSubmit={onSubmit}>
                {children}
            </form>
        </div>
    )
};