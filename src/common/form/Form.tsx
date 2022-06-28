import { CSSProperties, ReactNode } from 'react';
import styles from './Form.module.css';

type FromType = {
    title?: string
    children: ReactNode
    onSubmit: () => void
    formWrapper?: CSSProperties
}

export const Form = (props: FromType) => {
    const {title, children, onSubmit, formWrapper} = props;

    return (
        <div className={`${styles.wrapper} ${formWrapper ? formWrapper : ''}`}>
            <h3 className={styles.title}>{title}</h3>
            <form className={styles.form} onSubmit={onSubmit}>
                {children}
            </form>
        </div>
    )
};