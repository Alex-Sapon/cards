import SuperButton from '../../common/superButton/SuperButton'
import SuperCheckbox from '../../common/superCheckbox/SuperCheckbox'
import SuperEditableSpan from '../../common/superEditableSpan/SuperEditableSpan'
import SuperInputText from '../../common/superInputText/SuperInputText'
import SuperRange from '../../common/superRange/SuperRange'
import SuperSelect from '../../common/superSelect/SuperSelect'
import styles from './Test.module.css';

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
            <h4>SuperInputText</h4>
            <SuperInputText/>
            <h4>SuperRange</h4>
            <SuperRange/>
            <h4>SuperSelect</h4>
            <SuperSelect/>
        </div>
    )
}