import { Button, Image, Space } from 'antd'
import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { UserOutlined, QuestionOutlined } from '@ant-design/icons'
import './Admin.css'


const Admin = () => {
  const navigate= useNavigate()
    const redirectUsers = () => {
       navigate('/admin/user')
    }

    const redirectQuestions = () => {
        navigate('/admin/questions')
    }
  return (
    <Space size='small' className="space-admin">
      <div className='item'>
        <UserOutlined onClick={redirectUsers} className='user' title="Users" style={{fontSize: 200}}/>
        <h1 className='user' >USERS</h1>
      </div>
      <div className='item'>
        <QuestionOutlined  onClick={redirectQuestions} className="admin-question" title="Questions" style={{fontSize: 200}}/>
        <h1 className="admin-question">QUESTIONS</h1>
      </div>
      <Outlet/>
    </Space>
  )
}

export default Admin