import { Button, Form, Input, Modal, Space, Table, Spin, Tooltip } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createQuestion, deleteQuestion, editQuestion, getDetailQuestion, getQuestions, refresh } from '../../redux/apiRequest'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { EditOutlined, RollbackOutlined, DeleteOutlined } from '@ant-design/icons';


const AdminQuestions = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [currentPageSize, setCurrentPageSize] = useState(10)
  const [totalRecord, setTotalRecord] = useState(10)
  const [dataSource , setDataSource] = useState([])
  

  const user = useSelector( state => state?.auth.login?.currentUser.tokens?.access)
  const questionList = useSelector(state => state?.getQuestions.questions?.allQuestions?.results)
  const questions = useSelector(state => state?.getQuestions.questions?.allQuestions)


  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [flag, setFlag] = useState(false)
  

  // nút back lại trang admin
  const handleBack = () => {
    navigate('/admin')
  }
  
  useEffect( ()=> {
    setDataSource(questionList)
  },[questionList])
  
  useEffect(() => {
    if(!user) {
      navigate('/')
    }
    if(user.token){
      getQuestions(user.token, dispatch, currentPageSize , currentPage)
        .then(res=> {
          console.log('1');
          setTotalRecord(res?.totalResults)
          return res?.results
        })
      }
      
    },[flag])
    
    // Pagination cho table
  const handPageChange = (e) => {
    setCurrentPage(e.current)
    setCurrentPageSize(e.pageSize)
    getQuestions(user.token, dispatch, currentPageSize , e.current) 
  
  }
  
  
  // handle delete
  const handleDelete = async (token, dispatch, id) => {
    await deleteQuestion(token, dispatch, id) 
    setFlag(!flag)
  } 

  // Show Delete Confirm 
  const { confirm } = Modal;

  const showDeleteConfirm = (token, dispatch, id,question, currentPageSize , currentPage) => {
    confirm({
      title: 'Bạn có chắc là xóa câu này không',
      icon: <ExclamationCircleOutlined />,
      content: null,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
  
      onOk() {
        handleDelete(token, dispatch, id,question,currentPageSize , currentPage)
      },
  
      onCancel() {
        console.log('Cancel');
      },
    });
  };

// *****************************
const CustomModal = ({id, screenMode}) => {    
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm()

  const questionInfor = useSelector(state =>state?.question.getDetail.questionInfor )

  useEffect(() => {
      // console.log(questionInfor);
      form.setFieldsValue({
          question: questionInfor?.question,
          answer1: questionInfor?.answer1,
          answer2: questionInfor?.answer2,
          answer3: questionInfor?.answer3,
          answer4: questionInfor?.answer4,
          correctanswer: questionInfor?.correctanswer
  })
  }, [questionInfor])

  const showModal = async () => {
    if(screenMode == 1) {
      await getDetailQuestion(user.token, dispatch, id)
      setIsModalVisible(true);
    } else if(screenMode != 1) {
      form.resetFields()
      setIsModalVisible(true);
    }
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };

    
  const onFinishEdit = async (values) => {
      const [question, answer1, answer2, answer3, answer4, correctanswer] = [values.question, values.answer1, values.answer2, values.answer3, values.answer4, values.correctanswer]
      const newQuestionE = {
        question: question,
        answer1: answer1,
        answer2: answer2,
        answer3: answer3,
        answer4: answer4,
        correctanswer: correctanswer
      }
      screenMode == 1 ? await editQuestion(user.token, newQuestionE, dispatch, id) 
      : await createQuestion(user.token, newQuestionE,dispatch) 
      setIsModalVisible(false)
      setFlag(!flag)
      
      // onFinish()
    }



return (
  <>  {screenMode == 1 ? 
      (
        <Tooltip title="Edit question" color={'#f50'}>
          <Button type="primary" onClick={showModal} icon={<EditOutlined />} />
        </Tooltip>
      ):
      (
      <Button type="primary" onClick={showModal}>
          Create
      </Button>)
      }
      <Modal title="Basic Modal" visible={isModalVisible} onCancel={handleCancel} onOk={handleOk}>
      <Form onFinish={onFinishEdit} form={form}>
          <Form.Item
              name="question"
              rules={[
              {
                  required: true,
                  message: 'Please input question',
              },
              ]}
          >
              <Input placeholder="Question" />
          </Form.Item>
          <Form.Item
              name="answer1"
              rules={[
              {
                  required: true,
                  message: 'Please input answer 1',
              },
              ]}
          >
              <Input
              placeholder="Answer 1"
              />
          </Form.Item>
          <Form.Item
              name="answer2"
              rules={[
              {
                  required: true,
                  message: 'Please input answer 2',
              },
              ]}
          >
              <Input
              placeholder="Answer 2"
              />
          </Form.Item>
          <Form.Item
              name="answer3"
              rules={[
              {
                  required: true,
                  message: 'Please input answer 3',
              },
              ]}
          >
              <Input
              placeholder="Answer 3"
              />
          </Form.Item>
          <Form.Item
              name="answer4"
              rules={[
              {
                  required: true,
                  message: 'Please input answer 4',
              },
              ]}
          >
              <Input
              placeholder="Answer 4"
              />
          </Form.Item>
          <Form.Item
              name="correctanswer"
              rules={[
              {
                  required: true,
                  message: 'Please input right answer',
              },
              ]}
          >
              <Input
              placeholder="Right answer"
              />
          </Form.Item>
          <Form.Item className='button' >
              <Button type="primary" htmlType="submit" >
                  Done
              </Button>
          </Form.Item>
      </Form>
      </Modal>
  </>
)
}
// *******************************



  // const columns cho table
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
    {
        title: 'operation',
        dataIndex: 'id',
        render: (data, record) => {
          
          return (
            <Space>
              <CustomModal id={record.id} screenMode={1}/>
              <Tooltip title="Delete question" color={'red'}>
                <Button onClick={() => showDeleteConfirm(user.token, dispatch, record.id,record.question, currentPageSize , currentPage)} type="dashed" icon={<DeleteOutlined />} />
              </Tooltip>
            </Space>
          )
        }
    }
    ]
  return (
    <>
      <Tooltip title="Back" color={'#87d068'}>
        <Button onClick={handleBack} icon={<RollbackOutlined />} />
      </ Tooltip>
      <br/>
      <h1>List of questions</h1>
      <Table columns={columns} dataSource={dataSource} onChange={handPageChange} pagination={{total: totalRecord, current: currentPage, pageSize: currentPageSize, showLessItems: true, showSizeChanger: true}} />
      <h1>Tổng số câu hỏi: {questions?.totalResults}</h1>
      {/* Nút create */}
      <CustomModal screenMode={2}/>
    </>
  )

}

export default AdminQuestions