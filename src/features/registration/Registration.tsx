import Button from '../../common/button/Button';
import {Form} from '../../common/form/Form';
import InputText from '../../common/inputText/InputText';
import styles from './Registration.module.css';


//init commit
export const Registration = () => {
    return (
        <Form onSubmit={() => {}} title={'Sign Un'}>
            <InputText error={''} wrapperStyles={styles.wrapper} placeholder='Email'/>
            <InputText error={''} wrapperStyles={styles.wrapper} placeholder='Password'/>
            <InputText error={''} wrapperStyles={styles.wrapper} placeholder='Confirm password'/>
            <div className={styles.button_group}>
                <Button>Cancel</Button>
                <Button>Registration</Button>
            </div>
        </Form>
    )
};