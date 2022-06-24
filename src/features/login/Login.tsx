import Button from '../../common/button/Button';
import Checkbox from '../../common/checkbox/Checkbox';
import InputText from '../../common/inputText/InputText';
import {Form} from '../../common/form/Form';
import styles from './Login.module.css';

export const Login = () => {
    return (
        <Form onSubmit={() => {}} title={'Sign In'}>
            <InputText error={''} wrapperStyles={styles.wrapper} placeholder="Email"/>
            <InputText error={''} wrapperStyles={styles.wrapper} placeholder="Password"/>
            <Checkbox labelStyles={styles.label}>remember me</Checkbox>
            <Button className={styles.button}>login</Button>
            <div>Don't have an account?</div>
        </Form>
    )
};