import Button from '../../common/button/Button';
import {Form} from '../../common/form/Form';
import InputText from '../../common/inputText/InputText';
import styles from './RecoveryPass.module.css';

export const RecoveryPass = () => {
    return (
        <Form onSubmit={() => {}} title={'Forgot your password?'}>
            <InputText error={''} wrapperStyles={styles.wrapper} placeholder="Email"/>
            <Button className={styles.button}>Send Instructions</Button>
            <div>Did you remember your password?</div>
        </Form>
    )
}