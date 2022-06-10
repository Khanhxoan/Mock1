import { Button, Form, Input, InputNumber, Modal, Popconfirm, Table, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createQuestion, editQuestion, getDetailQuestion, getQuestions } from '../../redux/apiRequest'


const CustomModal = ({id, screenMode, currentPageSize , currentPage}) => {    
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm()

    const user = useSelector( state => state?.auth.login?.currentUser.tokens?.access)
    const questionList = useSelector(state => state?.getQuestions.questions?.allQuestions?.results)
    const dispatch = useDispatch();
    const questionInfor = useSelector(state =>state?.question.getDetail.questionInfor )
    const [flag, setFlag] = useState(false)


    useEffect(() => {
        if(isModalVisible && screenMode==1) {
            getDetailQuestion(user.token, dispatch, id)
        } else if(isModalVisible && screenMode != 1) {
            form.resetFields()
        }
    }, [isModalVisible])

    useEffect(() => {
        if(user.token){
          getQuestions(user.token, dispatch, currentPageSize , currentPage)
        }
          
        },[flag])

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

    const showModal = () => {
      setIsModalVisible(true);
    };  
    const handleCancel = () => {
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
        (<Button type="primary" onClick={showModal}>
            edit
        </Button>) : 
        (<Button type="primary" onClick={showModal}>
            Create
        </Button>)
        }
        <Modal title="Basic Modal" visible={isModalVisible} onCancel={handleCancel}>
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

export default CustomModal