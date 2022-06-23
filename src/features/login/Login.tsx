import Button from '../../common/button/Button';
import Checkbox from '../../common/checkbox/Checkbox';
import InputText from '../../common/inputText/InputText';
import {Form} from '../../common/form/Form';
import styles from './Login.module.css';

export const Login = () => {
    return (
        <Form onSubmit={() => {}}>
            <h3>Sign In</h3>
            <InputText placeholder="Email"/>
            <InputText placeholder="Password"/>
            <Checkbox>remember me</Checkbox>
            <Button className={styles.button}>login</Button>
            <div>Don't have an account?</div>
        </Form>
    )
};