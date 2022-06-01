import React, { useEffect } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined, ArrowRightOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import axios from 'axios';
import './LoginForm.css'
import { Link, Navigate } from 'react-router-dom';


const LoginForm = () => {
  const onFinish = async (values) => {
    let user = {
        username: values.username,
        password: values.password
    }
    await axios
        .post('https://fwa-ec-quiz-mock1.herokuapp.com/v1/auth/login', user)
        .then( function (res) {
          localStorage.setItem("user", JSON.stringify(res.data.user))
          localStorage.setItem("token", JSON.stringify(res.data.tokens))
          localStorage.setItem("role", JSON.stringify(res.data.user.role))
        })
    }
    const role = JSON.parse(localStorage.getItem('role')) 

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