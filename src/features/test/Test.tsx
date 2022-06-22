import SuperButton from "../../common/button/Button";
import SuperCheckbox from "../../common/checkbox/Checkbox";
import SuperEditableSpan from "../../common/superEditableSpan/SuperEditableSpan";
import SuperRange from "../../common/superRange/SuperRange";
import SuperSelect from "../../common/superSelect/SuperSelect";
import styles from './Test.module.css';
import InputText from "../../common/inputText/InputText";

export const Test = () => {
    return (
        <div>
            <h2>Universal components</h2>
            <h4>SuperButton</h4>
            <SuperButton>Button</SuperButton>
            <h4>SuperCheckbox</h4>
            <SuperCheckbox/>
            <h4>SuperEditableSpan</h4>
            <SuperEditableSpan value={'Editable text...'} className={styles.editable_text}/>
            <h4>InputText</h4>
            <InputText/>
            <h4>SuperRange</h4>
            <SuperRange/>
            <h4>SuperSelect</h4>
            <SuperSelect/>
        </div>
    )
}