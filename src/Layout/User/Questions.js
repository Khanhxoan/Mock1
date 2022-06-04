import React, { useState } from 'react';
import { Radio, Button, Card  } from 'antd';
import { RadioChangeEvent } from 'antd'
import './Questions.css'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { submitAnswer } from '../../redux/apiRequest';
import Score from './Score';

const Questions = () => {
    const user = useSelector(state => state?.auth.login?.currentUser.tokens?.access)
    const questionList = useSelector(state => state?.getAmountQuestion.questions?.allQuestions?.results)
    const [value, setValue] = useState();
    const dispatch = useDispatch()

    console.log(questionList);

    const onChange = (e) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };

    const [index, setIndex] = useState(0)
    const answer = {
        id: () => {
            if (index < 5) {
                return questionList[index].id
            }
            return questionList[index-1].id
        },
        correctanswer: value
    }
    
    const handleSubmit = async () => {
        setIndex((index) => {
            if((index + 1) <= 5) {
                console.log(index);
                return index + 1
            }
        })
        // console.log(index);
        // submitAnswer(user.token, dispatch, answer)
        console.log(answer);
    }

    const Question = () => {
        return (
            ((index + 1) <= 5) ? (
            <Card
                className='card-question'
                type="inner"
                title={`Question${index+1}: ${questionList[index].question}`}
            >
                <Radio.Group onChange={onChange} value={value}>
                    <Radio value={questionList[index].answer1}>{questionList[index].answer1}</Radio>
                    <Radio value={questionList[index].answer2}>{questionList[index].answer2}</Radio>
                    <Radio value={questionList[index].answer3}>{questionList[index].answer3}</Radio>
                    <Radio value={questionList[index].answer4}>{questionList[index].answer4}</Radio>
                </Radio.Group>
            </Card>
            ): (<Score />)
        )
    }
    return (
        <div className='question'>
            <Question />
            {
                (index < 5)? (
                    <Button type="primary" block className='btn-question' onClick={handleSubmit}>
                        Save and next
                    </Button>
                ) :
                (<></>)
            }
        </div>
    )
}

export default Questions;