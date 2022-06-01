import React from 'react';
import { Pagination } from 'antd';
import { Button } from 'antd';
import './setting.css'

const Setting = () => {
  return (
    <div>
        <h1 className='h1-setting'>Bạn muốn chơi bao nhiêu câu nào?</h1>
        <Button type="primary" block className='btn-setting'>
            5 Questions
        </Button>

        <Button type="primary" block className='btn-setting'>
            10 Questions
        </Button>

        <Button type="primary" block className='btn-setting'>
            15 Questions
        </Button>

    </div>
  )
}

export default Setting