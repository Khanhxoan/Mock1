import { Button, Form, Input, InputNumber, Popconfirm, Table, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getQuestions } from '../../redux/apiRequest'


const AdminQuestions = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [currentPageSize, setCurrentPageSize] = useState(10)
  const [totalRecord, setTotalRecord] = useState(10)
  const [dataSource , setDataSource] = useState([])
  

  const user = useSelector( state => state?.auth.login?.currentUser.tokens?.access)
  const questionList = useSelector(state => state?.getQuestions.questions?.allQuestions?.results)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleBack = () => {
    navigate('/admin')
  }

  useEffect(()=> {
    setDataSource(questionList)
    console.log(questionList)
  },[questionList])
  
  useEffect(() => {
    if(!user) {
      navigate('/')
    }
    if(user.token){
      getQuestions(user.token, dispatch, currentPageSize , currentPage)
        .then(res=> {
          setTotalRecord(res.totalResults)
          return res.results
        })
    }

  },[])
  const handPageChange = (e) => {
    setCurrentPage(e.current)
    setCurrentPageSize(e.pageSize)
    getQuestions(user.token, dispatch, currentPageSize , e.current) 
      .then((res)=> console.log(res))
  
  }
  const columns = [
    {
      title: 'Question',
      dataIndex: 'question',
      
    },
    {
      title: 'Answer1',
      dataIndex: 'answer1',
      
    },
    {
      title: 'Answer2',
      dataIndex: 'answer2',
      
    },
    {
      title: 'Answer3',
      dataIndex: 'answer3',
      
    },
    {
      title: 'Answer4',
      dataIndex: 'answer4',
      
    },
    {
      title: 'Correct answer',
      dataIndex: 'correctanswer',
    },
    ]
  return (
    <>
      <Button onClick={handleBack}>Back</Button>
      <Table columns={columns} dataSource={dataSource} onChange={handPageChange} pagination={{total: totalRecord, current: currentPage, pageSize: currentPageSize, showLessItems: true, showSizeChanger: true}} />
    </>
  )

}

export default AdminQuestions