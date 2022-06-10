import { Button, Progress } from 'antd';
import 'antd/dist/antd.css';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { resetScore } from '../../redux/submitAnswerSlice';
import './score.css'


const Score = () => {
  // state redux
  const limit = useSelector(state => state?.getAmountQuestion.questions?.allQuestions?.limit)
  const score = useSelector(state => state.submit.submit?.score)
  
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  // handle backhome
  const handleBackHome = () => {
    dispatch(resetScore())
    navigate('/setting')
  }

return (
  <>
    <div className='total-score'>
      <h1 className='h1-title'>Chúc mừng bạn đã hoàn thành bài test !!!</h1>
      <h1 className='h1-total'>Bạn đã làm đúng {score.length} / {limit} câu</h1>
      <Progress
          className='progress'
          type="circle"
          strokeColor={{
            '0%': '#108ee9',
            '100%': '#87d068',
          }}
          percent={(score.length/limit)*100 }
      />
      <Button onClick={handleBackHome} className='btn-replay' type="primary" key="console" >
        Chơi lại nào
      </Button>
    </div>
  </>
)}

export default Score