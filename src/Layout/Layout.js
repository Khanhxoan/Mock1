import React from 'react';
import { Layout, Menu, Breadcrumb, Button } from 'antd';
import 'antd/dist/antd.css';
import LoginForm from '../Component/login/LoginForm';
import Setting from './User/Setting';
import Register from '../Component/register/SigupForm';
import {ImportOutlined} from '@ant-design/icons';
import Score from './User/Score';
import Questions from './User/Questions';
import { Outlet, Route, Router, Routes } from 'react-router-dom';



const { Header, Content, Footer } = Layout;

const LayoutQuiz = () => (
  <div>
    <Layout>
      <Header
        style={{
          position: 'fixed',
          zIndex: 1,
          width: '100%',
        }}
      >
        <div className="logo"></div>
        <Button icon = {<ImportOutlined style={{ fontSize: '16px', color: 'red' }}/>} >Logout</Button>
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
      
);

export default LayoutQuiz;