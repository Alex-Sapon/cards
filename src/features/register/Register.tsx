import Button from '../../common/button/Button';
import {Form} from '../../common/form/Form';
import InputText from '../../common/inputText/InputText';
import styles from './Register.module.css';

export const Register = () => {
    return (
        <Form onSubmit={() => {}}>
            <h3>Sign Un</h3>
            <InputText placeholder='Email'/>
            <InputText placeholder='Password'/>
            <InputText placeholder='Confirm password'/>
            <div className={styles.button_group}>
                <Button>Cancel</Button>
                <Button>Register</Button>
            </div>
        </Form>
    )
}