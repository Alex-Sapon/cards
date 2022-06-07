import { useState } from "react"
import SuperButton from "../../common/superButton/SuperButton"
import SuperCheckbox from "../../common/superCheckbox/SuperCheckbox"
import SuperDoubleRange from "../../common/superDoubleRange/SuperDoubleRange"
import SuperEditableSpan from "../../common/superEditableSpan/SuperEditableSpan"
import SuperInputText from "../../common/superInputText/SuperInputText"
import SuperRadio from "../../common/superRadio/SuperRadio"
import SuperRange from "../../common/superRange/SuperRange"
import SuperSelect from "../../common/superSelect/SuperSelect"
import styles from './Test.module.css';

export const Test = () => {
    const [minValue, setMinValue] = useState<number>(0);
    const [maxValue, setMaxValue] = useState<number>(100);

    const value = [minValue, maxValue] as (string | number | readonly string[] | undefined) & [number, number];

    const changeDoubleRange = (value: [number, number]) => {
        setMinValue(value[0]);
        setMaxValue(value[1]);
    }

    return (
        <div>
            <h2>Universal components</h2>
            <h4>SuperButton</h4>
            <SuperButton>Button</SuperButton>
            <h4>SuperCheckbox</h4>
            <SuperCheckbox/>
            <h4>SuperDoubleRange</h4>
            <SuperDoubleRange value={value} min={0} max={100} onChangeRange={changeDoubleRange}/>
            <h4>SuperEditableSpan</h4>
            <SuperEditableSpan value={'Editable text...'} className={styles.editable_text}/>
            <h4>SuperInputText</h4>
            <SuperInputText/>
            <h4>SuperRadio</h4>
            <SuperRadio/>
            <h4>SuperRange</h4>
            <SuperRange/>
            <h4>SuperSelect</h4>
            <SuperSelect/>
        </div>
    )
}