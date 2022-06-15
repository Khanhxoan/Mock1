import React from "react";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import "../login/LoginForm.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../../redux/apiRequest";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = (values) => {
    const [username, password, email] = [
      values.username,
      values.confirmpassword,
      values.email,
    ];
    const newUser = {
      username: username,
      password: password,
      email: email,
    };
    registerUser(newUser, dispatch, navigate);
  };

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <h1 className="title">Register</h1>

      <Form.Item
        className="input-login"
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your Username!",
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
          className="input-login"
        />
      </Form.Item>
      <Form.Item
        className="input-login"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your Password!",
          },
        ]}
      >
        <Input.Password
          className="input-login"
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item
        className="input-login"
        name="confirmpassword"
        dependencies={["password"]}
        rules={[
          {
            required: true,
            message: "Please confirm your Password!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("The two passwords that you entered do not match!")
              );
            },
          }),
        ]}
      >
        <Input.Password
          className="input-login"
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Confirm Password"
        />
      </Form.Item>
      <Form.Item
        className="input-login"
        name="email"
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!",
          },
          {
            required: true,
            message: "Please input your email!",
          },
        ]}
      >
        <Input
          className="input-login"
          prefix={<MailOutlined />}
          type="email"
          placeholder="Email"
        />
      </Form.Item>

      <Form.Item className="button">
        <Button type="primary" htmlType="submit" className="login-form-button">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Register;
