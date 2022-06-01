import React, { useState } from 'react'
import './Login.css'
import {Form } from 'antd'
import 'antd/dist/antd.css';
import axios from 'axios';
import { Navigate } from 'react-router-dom';


const Login = () => {
    const [username, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [navigate, setNavigate] = useState(false)

    const handleLogin = (e) => {
        e.preventDefault()
        let user = {username, password}
        axios
            .post('https://fwa-ec-quiz-mock1.herokuapp.com/v1/auth/login', user)
            .then((res) => {
                localStorage.setItem("user", JSON.stringify(res.data.user))
                localStorage.setItem("role", JSON.stringify(res.data.user.role))
                localStorage.setItem("token", JSON.stringify(res.data.tokens))
            })
    }
    



  return (
    <div className='login'>
        <form className='login_form'>
            <h1>Login Quiz zuiii</h1>
            
            <label>User Name</label>
            <input 
                type="name" 
                placeholder='Enter name...' 
                value={username}
                onChange = {e => {
                    setUserName(e.target.value);
                }}
            />

            <label>Email</label>
            <input 
                type="email" 
                placeholder='Enter email...' 
                value={email}
                onChange = {e => setEmail(e.target.value)}
            />
            <label>Password</label>
            <input 
                type="password" 
                placeholder='Enter password...' 
                value={password}
                onChange = {e => setPassword(e.target.value)}
            />
            <div className='button'>
                <button type='submit' className='submit_btn' onClick={handleLogin}>Login</button>
                <button type='submit' className='submit_btn'>Register</button>
            </div>
        </form>
    </div>
  )
}

export default Login