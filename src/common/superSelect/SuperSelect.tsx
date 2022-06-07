import React, {SelectHTMLAttributes, DetailedHTMLProps, ChangeEvent} from 'react'
import styles from './SuperSelect.module.css'

type DefaultSelectPropsType = DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>

type SuperSelectPropsType = DefaultSelectPropsType & {
    options?: string[]
    onChangeOption?: (option: string) => void
}

const SuperSelect: React.FC<SuperSelectPropsType> = ({options, onChange, onChangeOption, className, ...restProps}) => {
    const mappedOptions: JSX.Element[] = options ? options.map((item, i) => 
        <option key={i} value={item} className={styles.option}>{item}</option>
    ) : [];

    const onChangeCallback = (e: ChangeEvent<HTMLSelectElement>) => {
        onChange && onChange(e)
        onChangeOption && onChangeOption(e.currentTarget.value)
    }

    const finalSelectStyles = styles.select + (className ? ' ' + className : '')

    return (
        <select onChange={onChangeCallback} {...restProps} className={finalSelectStyles}>
            {mappedOptions}
        </select> 
    )
}

export default SuperSelect
