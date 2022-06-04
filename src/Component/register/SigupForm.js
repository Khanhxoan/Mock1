// Tài liệu : https://www.youtube.com/watch?v=HQCs94YokCs

import './signup.css'
import { useFormik, yupToFormErrors } from 'formik';
import * as Yup from 'yup'
import { registerUser } from '../../redux/apiRequest';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// Search: regex for email address => để tìm dạng email cho form (matches)
// Search: regex pattern for password => để tìm dạng password cho form (matches)
 

// Cách 2: Sử dụng Formik và yup
const Register = () => {

    // 1, Tạo 1 formik gán với useFormik 
        const dispatch = useDispatch()
        const navigate = useNavigate();

          
        const formik = useFormik({
        initialValues: {
            email: '',
            username: '',
            password: '',
        },
        onSubmit: (e) => {
            const newUser = {
                email: email, 
                password: password,
                username: username
            };
            registerUser(newUser, dispatch, navigate)
        },        
        validationSchema: Yup.object({
            // .required để yêu cầu bắt buộc điền vào; .min: để yêu cầu độ dài tối thiểu
            username: Yup.string()
                .required('Required')
                .min(4, 'Name is too short'), 
            
            // .matches(/dạng email/) để xác nhận đúng dạng email 
            email: Yup.string()
                .required('Required')
                .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Please enter a valid email"), 

            // .matches để xác nhận password
            password: Yup.string()
                .required('Required')
                .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, 'Minimum eight characters, at least one letter and one number'),
            
            })

    });
    // console.log(formik.errors.password) // errors là 1 object => ta có thấy đến các lỗi muốn (ví dụ: erros.name)


    const { email, username, password} = formik.values 

    return (
        <form className='infoform' onSubmit={formik.handleSubmit}>
            <h1>Signup here</h1>

            <label> Username </label>
            <input 
                type = "text"
                id = 'username'
                name = 'username'
                placeholder='Enter your username...'
                // 2, Sử dụng formik :
                    // sử dụng handleChange của formik gắn cho onChange
                    // gán cho value giá trị đã khai báo trong initValues trong formik
                value={username}
                onChange={formik.handleChange}
            />
            {/* // 4, Hiển thị lỗi name */}
            {formik.errors.username && (
                <p className='errorMsg'> {username} </p>
            )} 

            <label> Email Address </label>
            <input 
                type = "email"
                id = 'email'
                name = 'email'
                placeholder='Enter your email...'
                onChange={formik.handleChange}
                value={email}
            />
            {formik.errors.email && (
                <p className='errorMsg'> {email} </p>
            )} 
            
            <label> Password </label>
            <input 
                type = "text"
                id = 'password'
                name = 'password'
                placeholder='Enter your password...'
                onChange={formik.handleChange}
                value={password}
            />
            {formik.errors.password && (
                <p className='errorMsg'> {password} </p>
            )} 

            <button type="submit"> Continue </button>

        </form>
    )
}

export default Register