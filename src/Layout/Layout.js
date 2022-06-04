import React from 'react';
import { Layout, Menu, Breadcrumb, Button } from 'antd';
import 'antd/dist/antd.css';
import {ImportOutlined} from '@ant-design/icons';
import { Outlet, Route, Router, Routes, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './layout.css'
import Admin from './Admin/Admin-user';


const { Header, Content, Footer } = Layout;

const LayoutQuiz = () => {
  const user = useSelector(state => state.auth.login.currentUser);
  
  return (
  <div>
    <Layout>
      <Header
        style={{
          position: 'fixed',
          zIndex: 1,
          width: '100%',
        }}
      >
      <nav className="navbar-container">
        {user? (
          <>
          <p className="navbar-user">Hi, <span>{`${user.user.username} -- ${user.user.role}`}</span> </p>
          <Link to="/logout" className="navbar-item" >Logout</Link>
          </>
        ) : (    
          <>
        <Link to="/" className="navbar-item"> Login </Link>
        <Link to="/register" className="navbar-item"> Register</Link>
        </>
      )}
      </nav>
      </Header>
      <Content
        className="site-layout"
        style={{
          padding: '0 100px',
          paddingTop: '40px',
          marginTop: 64,
        }}
      >
        <Outlet />
        <div
          className="site-layout-background"
          style={{
            padding: 24,
            minHeight: 380,
          }}
        >
        </div>
      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
      Chúc các bạn có một ngày thật vui vẻ !!!
      </Footer>
    </Layout>
  
  </div>
      
)};

export default LayoutQuiz;