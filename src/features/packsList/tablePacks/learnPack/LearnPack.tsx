import styles from './LearnPack.module.css';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Button from '../../../../common/button/Button';
import {useNavigate} from 'react-router-dom';
import {PATH} from '../../../../enums/path';
import {useState} from 'react';

const grades = [
    {value: 'did_not_know', label: 'Did not know'},
    {value: 'forgot', label: 'Forgot'},
    {value: 'a_lot_of_thought', label: 'A lot of thought'},
    {value: 'confused', label: 'Сonfused'},
    {value: 'knew_the_answer', label: 'Knew the answer'}
];

export const LearnPack = () => {
    const [showAnswer, setShowAnswer] = useState(false);

    const navigate = useNavigate();

    const handleToggleShowAnswer = () => {
        setShowAnswer(true);
    }

    const handleCancel = () => {
        navigate(PATH.PACKS + '/' + PATH.PACKS_LIST);
    }

    const handleNext = () => {

    }

    return (
        <div className={styles.wrapper}>
            <h3 className={styles.title}>Learn “Pack Name”</h3>
            <p className={styles.text}><b>Question: </b>“How "This" works in JavaScript?”</p>
            {showAnswer
                ? (<div>
                        <p className={styles.text}><b>Answer: </b>“This is how "This" works in JavaScript”</p>
                        <div className={styles.rate}>
                            <div className={styles.label}>Rate yourself:</div>
                            <FormControl>
                                <RadioGroup defaultValue="did_not_know">
                                    {grades.map(({value, label}, i) => (
                                        <FormControlLabel
                                            key={value + i}
                                            value={value}
                                            control={<Radio size="small"/>}
                                            label={label}
                                        />))}
                                </RadioGroup>
                            </FormControl>
                        </div>
                        <div className={styles.buttons_answer}>
                            <Button onClick={handleCancel}>Cancel</Button>
                            <Button onClick={handleNext}>Next</Button>
                        </div>
                    </div>
                ) : (
                    <div className={styles.buttons_question}>
                        <Button onClick={handleCancel}>Cancel</Button>
                        <Button onClick={handleToggleShowAnswer}>Show answer</Button>
                    </div>
                )}
        </div>
    )
};