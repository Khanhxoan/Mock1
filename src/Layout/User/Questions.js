import React, { useState } from 'react';
import { Radio, Button, Card  } from 'antd';
import { RadioChangeEvent } from 'antd'
import './Questions.css'

const Questions = () => {
    const [value, setValue] = useState(1);

    const onChange = (e) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
    };
    return (
        <div className='question'>
            <Card
            className='card-question'
            type="inner"
            title="Question 1"
            >
                <Radio.Group onChange={onChange} value={value}>
                    <Radio value={1}>A</Radio>
                    <Radio value={2}>B</Radio>
                    <Radio value={3}>C</Radio>
                    <Radio value={4}>D</Radio>
                </Radio.Group>
            </Card>
            <Button type="primary" block className='btn-question'>
                Save and next
            </Button>
        </div>
    )
}

export default Questions;