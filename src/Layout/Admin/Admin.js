import { Button, Space } from 'antd'
import React from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'

const Admin = () => {
    const navigate= useNavigate()
    const redirectUsers = () => {
       navigate('/admin/user')
    }

    const redirectQuestions = () => {
        navigate('/admin/questions')
    }
  return (
    <Space size='small'>
        <Button onClick={redirectUsers}>Users</Button>
        <Button onClick={redirectQuestions}>Questions</Button>
        <Outlet/>
    </Space>
  )
}

export default Admin