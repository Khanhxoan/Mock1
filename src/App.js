import "./App.css";
import LoginForm from "./Component/login/LoginForm";
import LayoutQuiz from "./Layout/Layout";
import { Route, Routes } from "react-router-dom";
import Setting from "./Layout/User/Setting";
import Questions from "./Layout/User/Questions";
import AdminUser from "./Layout/Admin/admin-user/Admin-getUser";
import Admin from "./Layout/Admin/Admin";
import AdminQuestions from "./Layout/Admin/admin-question/Admin-getQuestion";
import Register from "./Component/register/Register";
import { useDispatch, useSelector } from "react-redux";
import { refresh } from "./redux/apiRequest";
import { useEffect } from "react";
import NotFoundPage from "./Layout/NotFoundPage";
import tokenExpired from "./Component/login/tokenExpired";
import { DirectRole, GuardAdmin, GuardUser } from "./Component/RouteGuard";
import { Spin } from "antd";

function App() {
  const role = useSelector(
    (state) => state?.auth.login?.currentUser?.user?.role
  );
  const accessToken = useSelector(
    (state) => state?.auth.login?.currentUser?.tokens.access.token
  );
  const refreshToken = useSelector(
    (state) => state?.auth.login?.currentUser?.tokens.refresh.token
  );
  // console.log(accessToken, refreshToken);

  const dispatch = useDispatch();

  // Loading
  const isFetchingLogin = useSelector((state) => state?.auth.login?.isFetching);
  const isFetchingLogout = useSelector(
    (state) => state?.auth.logout?.isFetching
  );
  const isFetchingRegister = useSelector(
    (state) => state?.auth.register?.isFetching
  );
  const isFetchingGetAmountQuestion = useSelector(
    (state) => state?.getAmountQuestion.questions?.isFetching
  );
  const isFetchingGetQuestions = useSelector(
    (state) => state?.getQuestions.questions?.isFetching
  );
  const isFetchingGetUsers = useSelector(
    (state) => state?.getUsers.users?.isFetching
  );
  const isFetchingCreateUsers = useSelector(
    (state) => state?.getUsers.createUser?.isFetching
  );
  const isFetchingSubmitAnswer = useSelector(
    (state) => state?.submit.submit?.isFetching
  );
  const isFetchingCreateQuestion = useSelector(
    (state) => state?.question.create?.isFetching
  );
  const isFetchingEditQuestion = useSelector(
    (state) => state?.question.edit?.isFetching
  );
  const isFetchingDeleteQuestion = useSelector(
    (state) => state?.question.delete?.isFetching
  );
  const isFetchingUpdateUser = useSelector(
    (state) => state?.getUsers.updateUser?.isFetching
  );
  const isFetching =
    isFetchingLogin ||
    isFetchingLogout ||
    isFetchingRegister ||
    isFetchingGetAmountQuestion ||
    isFetchingGetQuestions ||
    isFetchingGetUsers ||
    isFetchingCreateUsers ||
    isFetchingSubmitAnswer ||
    isFetchingCreateQuestion ||
    isFetchingEditQuestion ||
    isFetchingDeleteQuestion ||
    isFetchingUpdateUser;

  // Refresh token
  useEffect( () => {
    if (accessToken && refreshToken) {
      console.log(accessToken);
      tokenExpired(accessToken, async () => {
        await refresh(refreshToken, dispatch);
      });
    }
  }, [accessToken, refreshToken]);

  return (
    <Spin spinning={isFetching} tip="Loading...">
      <div className="App">
        <Routes>
          <Route path="/" element={<LayoutQuiz />}>
            <Route
              element={<DirectRole role={role} accessToken={accessToken} />}
            >
              <Route path="/" element={<LoginForm />} />
              <Route path="/register" element={<Register />} />
            </Route>
            <Route element={<GuardAdmin role={role} />}>
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/user" element={<AdminUser />} />
              <Route path="/admin/questions" element={<AdminQuestions />} />
            </Route>
            <Route element={<GuardUser role={role} />}>
              <Route path="/setting" element={<Setting />} />
              <Route path="/questions" element={<Questions />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Spin>
  );
}

export default App;
