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
    <Space size='small' className="space-admin">
        <Button onClick={redirectUsers} className="btn-admin">Users</Button>
        <Button onClick={redirectQuestions} className="btn-admin">Questions</Button>
        <Outlet/>
    </Space>
  )
}

export default Admin