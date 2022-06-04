import React, { useState } from 'react';
import { Result, Button } from 'antd';
import 'antd/dist/antd.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


const Score = () => {
  const score = useSelector(state => state?.auth.login?.currentUser.user?.score)
  
  const navigate = useNavigate()
  const handleBackHome = () => {
    navigate('/setting')
  }
return (
  <Result
    status="success"
    title={`Chúc mừng bạn đã hoàn thành bài test, điểm của bạn là: ${score}/5`}
    extra={[
      <Button onClick={handleBackHome} type="primary" key="console">
        Chơi lại nào !
      </Button>,
    ]}
  />

)
}

export default Score