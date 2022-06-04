import React, { useEffect } from 'react';
import { Pagination } from 'antd';
import { Button } from 'antd';
import './setting.css'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAmountQuestion } from '../../redux/apiRequest';

const Setting = () => {

  const user = useSelector( state => state?.auth.login?.currentUser.tokens?.access)
  // const questionList = useSelector(state => state?.getAmountQuestion?.questions?.allQuestions?.results)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  
    const handle5Qquestions = async () => {
      await getAmountQuestion(user.token, dispatch, 5, 2)
      navigate ('/questions')
    }



  return (
    <div>
        <h1 className='h1-setting'>Bạn muốn chơi bao nhiêu câu nào?</h1>
        <Button onClick={handle5Qquestions} type="primary" block className='btn-setting'>
            5 Questions
        </Button>

        <Button type="primary" block className='btn-setting'>
            10 Questions
        </Button>

        <Button type="primary" block className='btn-setting'>
            15 Questions
        </Button>

    </div>
  )
}

export default Setting