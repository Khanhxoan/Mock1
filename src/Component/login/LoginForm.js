import React, { useCallback, useEffect } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined, ArrowRightOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import './LoginForm.css'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/apiRequest';


const LoginForm = () => {
  
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const onFinish = (values) => {
    const [username, password] = [values.username, values.password]
    const newUser = {
      username: username,
      password: password
    }
    loginUser(newUser, dispatch, navigate)
    
  }
  



  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <h1 className='title'>Login to quiz zui zẻ :)))</h1>

      <Form.Item
      className='input-login'
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" className='input-login'/>
      </Form.Item>
      <Form.Item
      className='input-login'
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input
          className='input-login'
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item >
        <Form.Item name="remember" valuePropName="checked" noStyle className='remember'>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
      </Form.Item>

      <Form.Item className='button' >
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
         <br/> Or <Link className='a' to="/register">register now!</Link>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;