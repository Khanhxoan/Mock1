import React, { useRef, useState } from 'react';
import { Radio, Button, Card, Space } from 'antd';
import './Questions.css'
import { useDispatch, useSelector } from 'react-redux';
import { submitAnswer } from '../../redux/apiRequest';
import Score from './Score';


const Questions = () => {
    // state redux
    const accessToken = useSelector(state => state?.auth.login?.currentUser.tokens?.access.token)
    const questionList = useSelector(state => state?.getAmountQuestion.questions?.allQuestions?.results)
    const limit = useSelector(state => state?.getAmountQuestion.questions?.allQuestions?.limit)

    const [flag, setFlag] = useState(false)
    const [value, setValue] = useState('k');
    const dispatch = useDispatch()

    const ref = useRef([])
    const totalAnswer = ref.current
    const [index, setIndex] = useState(0)

    const id = () => {
        if(index <= (limit-1)) {
            return questionList[index].id
        }
        return questionList[index-1].id 
    }

    // new answer
    const answer = {
        id: id(),
        correctanswer: value
    }

    // handle Function
    const onChange = (e) => {
        setValue(e.target.value);
    };
    
    const handleNext = async () => {
        totalAnswer[index] = answer
        totalAnswer[index + 1]?.correctanswer ? setValue(totalAnswer[index + 1].correctanswer) : setValue('k')
        setIndex(index + 1)
    }

    const handleBack = () => {
        setValue(totalAnswer[index-1].correctanswer)
        totalAnswer[index] = answer
        setIndex(index - 1)
    }

    const handleSubmit = async () => {
        totalAnswer[index] = answer
        await submitAnswer(accessToken, dispatch, totalAnswer)
        setFlag(true)
    }

    // handle preview
    const handlePreview = () => {
        setValue(totalAnswer[0].correctanswer)
        setIndex(0);
        setFlag(false)
    }


    // component Question 
    const Question = () => {
        return (
            <Card
                bordered="red"
                className='card-question'
                type="inner"
                title={`Question${index+1}: ${questionList[index].question}`}
                
            >
                <Radio.Group onChange= {onChange} value={value}>
                    <Space direction="vertical">
                        <Radio value={questionList[index].answer1} className='radio-answer'>{questionList[index].answer1}</Radio>
                        <Radio value={questionList[index].answer2} className='radio-answer'>{questionList[index].answer2}</Radio>
                        <Radio value={questionList[index].answer3} className='radio-answer'>{questionList[index].answer3}</Radio>
                        <Radio value={questionList[index].answer4} className='radio-answer'>{questionList[index].answer4}</Radio>
                    </Space>
                </Radio.Group>
            </Card>
        )
    }

    return (
        <div className='question'>
        {flag == false ? 
        <>
            <Question/>
            <div className='btn-backnext'>
            { index + 1> 1 && <Button type="primary" block className='btn-question' onClick={handleBack}>
                    Back to previous
                </Button>}
            {
            index + 1>0 && index + 1< limit &&
                <Button type="primary" block className='btn-question' onClick={handleNext}>
                    Save and next
                </Button>
            }
            {index +1 == limit && 
                <Button type="primary" block className='btn-question' onClick={handleSubmit}>
                    Submit
                </Button>}
            </div>
                
        </> : 
        (<>
            <Score />
            <Button onClick={handlePreview} className='btn-preview' type="primary" key="console">
                    Preview !
            </Button>
            {/* <Button onClick={handleBackHome} className='btn-replay' type="primary" key="console" >
                    Chơi lại nào !
            </Button> */}
        </>)
        } 
        </div>
    )
}

export default Questions;