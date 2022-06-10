import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './Admin.css'
import { useEffect, useState } from 'react';
import { createUser, getUsers, refresh } from '../../redux/apiRequest';
import { Button, Table, Space, Modal, Form, Input, Image } from 'antd';
import axios from 'axios';
import { UserAddOutlined, RollbackOutlined } from '@ant-design/icons';

const AdminUser = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [currentPageSize, setCurrentPageSize] = useState(10)
    const [totalRecord, setTotalRecord] = useState(10)
    const [dataSource , setDataSource] = useState([])
    
    const tokens = useSelector(state => state?.auth.login?.currentUser.tokens)
    const accessToken = useSelector(state => state?.auth.login?.currentUser?.tokens.access.token)

    const totalUsers = useSelector(state => state?.getUsers.users?.allUsers?.totalResults)
    const userList = useSelector(state => state?.getUsers.users?.allUsers?.results)

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [flag, setFlag] = useState(false)
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleBack = () => {
      navigate('/admin')
    }

    useEffect(()=> {
      setDataSource(userList)
      console.log(userList);
    },[userList])
    
    useEffect(() => {
      if(!tokens) {
        navigate('/')
      }
      if(accessToken){
        getUsers(accessToken, dispatch, currentPageSize , currentPage) 
          .then(res=> setTotalRecord(res?.totalResults))
          
      }
    },[flag])

    const handPageChange = (e) => {
      setCurrentPage(e.current)
      setCurrentPageSize(e.pageSize)
      getUsers(accessToken, dispatch, currentPageSize , e.current)
        .then((res)=> console.log(res))
    
    }

    // column của bảng
    const columns = [
      {
        title: 'Username',
        dataIndex: 'username',
        
      },
      {
        title: 'Email',
        dataIndex: 'email',
        
      },
      {
        title: 'Role',
        dataIndex: 'role',
      },
      {
        title: 'Avatar',
        dataIndex: 'avatar',
        render: (_, record) => (
          <Image src={record.avatar} width={80}/>
        )
      }]

    const handleCreateUser = async (values) => {
      const newUser = {
        username: values.username,
        password: values.password,
        email: values.email,
        role: values.role,
      }
      console.log(newUser);
      await createUser(accessToken, newUser, dispatch)
      setFlag(!flag)
      setIsModalVisible(false)

    }

    const showModal = () => {
      setIsModalVisible(true);
    };
    
    const handleCancel = () => {
      setIsModalVisible(false);
    };
  
    return (
      <>
        <Button onClick={handleBack} icon={<RollbackOutlined />} />
        <h1 className='h1'>List of Registers</h1>
        <Table columns={columns} dataSource={dataSource} onChange={handPageChange} pagination={{total: totalRecord, current: currentPage, pageSize: currentPageSize, showLessItems: true, showSizeChanger: true}} />
        <Button onClick={showModal} icon={<UserAddOutlined />}/> 
        <h1 className='h1'>Tổng số user: {totalUsers}</h1>
        <Modal title="Basic Modal" visible={isModalVisible} onCancel={handleCancel}>
          <Form onFinish={handleCreateUser}>
              <Form.Item
                  name="username"
                  rules={[
                  {
                      required: true,
                      message: 'Please input username',
                  },
                  ]}
              >
                  <Input placeholder="Username" />
              </Form.Item>
              <Form.Item
                  name="password"
                  rules={[
                  {
                      required: true,
                      message: 'Please input password',
                  },
                  ]}
              >
                  <Input
                  placeholder="Password"
                  />
              </Form.Item>
              <Form.Item
                  name="email"
                  rules={[
                  {
                      required: true,
                      message: 'Please input email',
                  },
                  ]}
              >
                  <Input
                  placeholder="Email"
                  />
              </Form.Item>
              <Form.Item
                  name="role"
                  rules={[
                  {
                      required: true,
                      message: 'Please input role',
                  },
                  ]}
              >
                  <Input
                  placeholder="role"
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

export default AdminUser  