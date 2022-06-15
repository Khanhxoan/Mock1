// import axios from "axios";
import {
  loginFailed,
  loginSuccess,
  loginStart,
  registerStart,
  registerSuccess,
  registerFailed,
  refreshStart,
  refreshSuccess,
  refreshFailed,
  logoutStart,
  logoutSuccess,
  logoutFailed,
} from "./authSlice";
import {
  getQuestionsFailed,
  getQuestionsStart,
  getQuestionsSuccess,
} from "./getQuestionsSlice";
import {
  getUsersStart,
  getUsersSuccess,
  getUsersFailed,
  createUsersStart,
  createUsersSuccess,
  createUsersFailed,
  updateUserStart,
  updateUserSuccess,
  updateUserFailed,
} from "./getUserSlice";
import {
  createFailed,
  createStart,
  createSuccess,
  deleteFailed,
  deleteStart,
  deleteSuccess,
  editFailed,
  editStart,
  editSuccess,
  getDetailFailed,
  getDetailStart,
  getDetailSuccess,
} from "./questionSlice";
import { submitFailed, submitStart, submitSuccess } from "./submitAnswerSlice";
import { message, Modal } from "antd";
import axios from "axios";

// xu ly cac ham goi api
axios.defaults.baseURL = "https://fwa-ec-quiz-mock1.herokuapp.com";

// call api post user login
export const loginUser = async (user, dispatch) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("/v1/auth/login", user);
    dispatch(loginSuccess(res.data));
    message.success("Login success")
  } catch (err) {
    dispatch(loginFailed());
    message.error({
      title: "Login failed",
      content: `${err.response.data.message}, please try again!`
    });
  }
};

// Logout user

export const logoutUser = async (
  accessToken,
  refreshToken,
  dispatch,
  navigate
) => {
  dispatch(logoutStart());
  try {
    await axios.post(
      "/v1/auth/logout",
      { refreshToken },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    dispatch(logoutSuccess());
    navigate("/");
    message.success("Logout success")
  } catch (err) {
    dispatch(logoutFailed());
    message.error({
      title: "Logout failed",
      content: err.response.data.message,
    });
  }
};

// call api post user register
export const registerUser = async (user, dispatch, navigate) => {
  dispatch(registerStart());
  try {
    await axios.post("/v1/auth/register", user);
    dispatch(registerSuccess());
    navigate("/");
    message.success("Register success!")
  } catch (err) {
    dispatch(registerFailed());
    Modal.error({
      title: "Register failed",
      content: err.response.data.message,
    });
  }
};

// Refresh Token
export const refresh = async (refreshToken, dispatch) => {
  dispatch(refreshStart());
  try {
    const res = await axios.post("/v1/auth/refresh-tokens", { refreshToken });
    dispatch(refreshSuccess(res.data));
    return res;
  } catch (err) {
    dispatch(refreshFailed());
  }
};

// call api get users cho admin
export const getUsers = async (accessToken, dispatch, limit, page) => {
  dispatch(getUsersStart());
  try {
    const res = await axios.get(`/v1/users?limit=${limit}&page=${page}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    dispatch(getUsersSuccess(res.data));
    return res.data;
  } catch (err) {
    dispatch(getUsersFailed());
    Modal.error({
      title: "Get user failed",
      content: err.response.data.message,
    });
  }
};

// create User cho admin
export const createUser = async (accessToken, newUser, dispatch) => {
  dispatch(createUsersStart());
  try {
    const res = await axios.post("/v1/users", newUser, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    dispatch(createUsersSuccess());
    message.success("Add a new user success")
  } catch (err) {
    dispatch(createUsersFailed());
  }
};

// update User cho admin
export const updateUser = async (accessToken, newUser, dispatch, id) => {
  dispatch(updateUserStart());
  try {
    const res = await axios.patch(`/v1/users/${id}`, newUser, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    dispatch(updateUserSuccess());
  } catch (err) {
    dispatch(updateUserFailed());
  }
};

// lấy ra list câu hỏi - admin
export const getQuestions = async (accessToken, dispatch, limit, page) => {
  dispatch(getQuestionsStart());
  try {
    const res = await axios.get(
      `/v1/questions/edit?limit=${limit}&page=${page}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    dispatch(getQuestionsSuccess(res.data));
    return res.data;
  } catch (err) {
    dispatch(getQuestionsFailed());
    Modal.error({
      title: "Get questions failed",
      content: err.response.data.message,
    });
  }
};

// Lấy list câu hỏi - user
export const getAmountQuestion = async (accessToken, dispatch, limit, page) => {
  dispatch(getQuestionsStart());
  try {
    const res = await axios.get(`/v1/questions?limit=${limit}&page=${page}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    dispatch(getQuestionsSuccess(res.data));
    console.log(res.data.totalResults);
    return res.data;
  } catch (err) {
    dispatch(getQuestionsFailed());
    Modal.error({
      title: "Get question failed",
      content: err.response.data.message,
    });
  }
};

// Submit answer
export const submitAnswer = async (accessToken, dispatch, totalAnswer) => {
  dispatch(submitStart());
  try {
    const res = await axios.post("/v1/questions/submit", totalAnswer, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    dispatch(submitSuccess(res.data));
    return res.data;
  } catch (err) {
    dispatch(submitFailed());
  }
};

// Create question

export const createQuestion = async (accessToken, question, dispatch) => {
  dispatch(createStart());
  try {
    const res = await axios.post("/v1/questions/edit", question, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    dispatch(createSuccess());
    message.success("Add a new question success!")
  } catch (err) {
    dispatch(createFailed());
    Modal.error({
      title: "Create question failed",
      content: err.response.data.message,
    });
  }
};

// Edit question
export const editQuestion = async (accessToken, question, dispatch, id) => {
  dispatch(editStart());
  try {
    const res = await axios.patch(`/v1/questions/edit/${id}`, question, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    dispatch(editSuccess());
    message.success("Edit question success!")
  } catch (err) {
    dispatch(editFailed());
    Modal.error({
      title: "Edit failed",
      content: err.response.data.message,
    });
  }
};

// get Detail
export const getDetailQuestion = async (accessToken, dispatch, id) => {
  dispatch(getDetailStart());
  try {
    const res = await axios.get(`/v1/questions/edit/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    dispatch(getDetailSuccess(res.data));
    return res
  } catch (err) {
    dispatch(getDetailFailed());
  }
};

// delete question
export const deleteQuestion = async (accessToken, dispatch, id) => {
  dispatch(deleteStart());
  try {
    const res = await axios.delete(`/v1/questions/edit/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    dispatch(deleteSuccess(res.data));
    message.success("Delete question success!")
  } catch (err) {
    dispatch(deleteFailed());
    Modal.error({
      title: "Delete failed",
      content: err.response.data.message,
    });
  }
};
