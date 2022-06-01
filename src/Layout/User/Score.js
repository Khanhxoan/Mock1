import React from 'react';
import { Result, Button } from 'antd';
import 'antd/dist/antd.css';


const Score = () => (
  <Result
    status="success"
    title="Chúc mừng bạn đã hoàn thành bài test"
    extra={[
      <Button type="primary" key="console">
        Home
      </Button>,
    ]}
  />
);

export default Score