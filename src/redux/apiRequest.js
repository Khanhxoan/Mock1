import axios from "axios";
import { loginFailed, loginSuccess, loginStart, registerStart, registerSuccess, registerFailed} from "./authSlice";
import { getQuestionsFailed, getQuestionsStart, getQuestionsSuccess } from "./getQuestionsSlice";
import { getUsersStart, getUsersSuccess, getUsersFailed } from "./getUserSlice";
import { submitFailed, submitStart, submitSuccess } from "./submitAnswerSlice";

// xu ly cac ham goi api

// call api post user login
export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const res = await axios.post('https://fwa-ec-quiz-mock1.herokuapp.com/v1/auth/login', user);
        dispatch(loginSuccess(res.data));
        console.log(res);
        
        if(res.data.user.role === 'user'){
            navigate('/setting')
        }
        if(res.data.user.role === 'admin') {
            navigate('/admin')
        }
    }
    catch (err) {
        dispatch(loginFailed());
    }
}


// call api post user register
export const registerUser = async (user, dispatch, navigate) => {
    dispatch(registerStart());
    try {
        await axios.post('https://fwa-ec-quiz-mock1.herokuapp.com/v1/auth/register',user) ;
        dispatch(registerSuccess());
        navigate('/');

    } catch (err) {
        dispatch(registerFailed())
    }
}


// call api get users cho admin
export const getUsers = async (accessToken, dispatch, limit, page) => {
    dispatch(getUsersStart());
    try{
        const res = await axios.get(`https://fwa-ec-quiz-mock1.herokuapp.com/v1/users?limit=${limit}&page=${page}`, {
            headers: {Authorization: `Bearer ${accessToken}`}
        })
        dispatch(getUsersSuccess(res.data))
        console.log(res.data.results);
        return res.data
    } 
    catch(err) {
        dispatch(getUsersFailed());
    }
}

// lấy ra list câu hỏi - admin
export const getQuestions = async (accessToken, dispatch, limit, page) => {
    dispatch(getQuestionsStart());
    try{
        const res = await axios
        .get(`https://fwa-ec-quiz-mock1.herokuapp.com/v1/questions/edit?limit=${limit}&page=${page}`, {
            headers: {Authorization: `Bearer ${accessToken}`}
        })
        dispatch(getQuestionsSuccess(res.data))
        console.log(res.data.results);
        return res.data
    } 
    catch(err) {
        dispatch(getQuestionsFailed());
    }
}

// Lấy list câu hỏi - user
export const getAmountQuestion = async (accessToken, dispatch, limit, page) => {
    dispatch(getQuestionsStart());
    try{
        const res = await axios
        .get(`https://fwa-ec-quiz-mock1.herokuapp.com/v1/questions?limit=${limit}&page=${page}`, {
            headers: {Authorization: `Bearer ${accessToken}`}
        })
        dispatch(getQuestionsSuccess(res.data))
        console.log(res.data.results);
        return res.data
    } 
    catch(err) {
        dispatch(getQuestionsFailed());
    }
}


export const submitAnswer = async (accessToken, dispatch, answer) => { 
    dispatch(submitStart());
    try {
        const res = await axios
            .post('https://fwa-ec-quiz-mock1.herokuapp.com/v1/questions/submit', 
                {
                    headers: {Authorization: `Bearer ${accessToken}`}
                }, 
                {body: answer})
        dispatch(submitSuccess(res.data));
        console.log(res);
    }
    catch(err) {
        dispatch(submitFailed())
    }
}
