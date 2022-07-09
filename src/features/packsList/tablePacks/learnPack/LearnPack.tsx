import styles from './LearnPack.module.css';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Button from '../../../../common/button/Button';
import {useNavigate} from 'react-router-dom';
import {PATH} from '../../../../enums/path';
import {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../../app/store';
import {Typography} from '@mui/material';
import {getCardsPack, setCardsPack} from './learnPackReducer';
import {getCard} from '../../../../assets/utils/smartRandom';

const grades = [
    {value: 'did_not_know', label: 'Did not know'},
    {value: 'forgot', label: 'Forgot'},
    {value: 'a_lot_of_thought', label: 'A lot of thought'},
    {value: 'confused', label: 'Сonfused'},
    {value: 'knew_the_answer', label: 'Knew the answer'}
];

export const LearnPack = () => {
    const [showAnswer, setShowAnswer] = useState(false);

    const dispatch = useAppDispatch();

    const status = useAppSelector(state => state.app.status);
    const cards = useAppSelector(state => state.learnPack.cards);

    const navigate = useNavigate();

    const handleToggleShowAnswer = () => {
        setShowAnswer(true);
    }

    const handleCancel = () => {
        navigate(PATH.PACKS + '/' + PATH.PACKS_LIST);
    }

    const handleNext = () => {
        // dispatch(setCardsPack(getCard(cards)));
    }

    return (
        <div className={styles.wrapper}>
            {status === 'loading'
                ? (
                    <Typography mt={10} variant={'h4'} sx={{textAlign: 'center'}}>Wait a minute...</Typography>
                ) : (
                    <><h3 className={styles.title}>Learn “Pack Name”</h3>
                        <p className={styles.text}><b>Question: </b>{`“${cards[0].question}”`}</p>
                        {showAnswer
                            ? (
                                <>
                                    <p className={styles.text}><b>Answer: </b>{`“${cards[0].answer}”`}</p>
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
                                </>
                            ) : (
                                <div className={styles.buttons_question}>
                                    <Button onClick={handleCancel}>Cancel</Button>
                                    <Button onClick={handleToggleShowAnswer}>Show answer</Button>
                                </div>
                            )}
                    </>
                )}
        </div>

    )
};

//<Typography mt={10} variant={'h4'} sx={{textAlign: 'center'}}>Wait a minute...</Typography>