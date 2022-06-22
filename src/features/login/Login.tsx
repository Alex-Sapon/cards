import Button from "../../common/button/Button";
import Checkbox from "../../common/checkbox/Checkbox";
import InputText from "../../common/inputText/InputText";
import styles from './Login.module.css';

export const Login = () => {
    return (
        <div className={styles.login_wrapper}>
            <form className={styles.login_form}>
                <InputText placeholder='login'/>
                <InputText placeholder='password'/>
                <Checkbox>remember me</Checkbox>
                <Button>login</Button>
            </form>
        </div>
    )
};