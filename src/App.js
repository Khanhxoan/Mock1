import './App.css';
import LoginForm from './Component/login/LoginForm';
import LayoutQuiz from './Layout/Layout';
import { Route, Routes} from 'react-router-dom';
import Setting from './Layout/User/Setting';
import Questions from './Layout/User/Questions';
import AdminUser from './Layout/Admin/Admin-user';
import Admin from './Layout/Admin/Admin';
import AdminQuestions from './Layout/Admin/Admin-questions';
import Register from './Component/register/Register';
import { useDispatch, useSelector } from 'react-redux';
import { refresh } from './redux/apiRequest';
import { useEffect } from 'react';
import NotFoundPage from './Layout/NotFoundPage';
import tokenExpired from './Component/login/tokenExpired';
import { DirectRole, GuardAdmin, GuardUser } from './RouteGuard';


function App() {
  const role = useSelector( state => state?.auth.login?.currentUser?.user?.role)
  const accessToken = useSelector(state => state?.auth.login?.currentUser?.tokens.access.token)
  const refreshToken = useSelector(state => state?.auth.login?.currentUser?.tokens.refresh.token)
  
  const dispatch = useDispatch()

  // Refresh token
  useEffect(() => {
    if(accessToken && refreshToken) {
      tokenExpired(accessToken, () => {
        refresh(refreshToken, dispatch)
      })
    }
  }, [accessToken,refreshToken ])

  return (
      <div className="App">
        <Routes>
            <Route path='/' element={<LayoutQuiz/>} >
              <Route element={<DirectRole role={role} />}>  
                <Route path='/' element={<LoginForm/>} />
                <Route path='/register' element={<Register/>}/>
              </Route>
              <Route element={<GuardAdmin role = {role} />} >
                <Route path='/admin' element={<Admin/>} />
                <Route path='/admin/user' element={<AdminUser/>} />
                <Route path='/admin/questions' element={<AdminQuestions/>} />
              </Route>
              <Route element={<GuardUser role = {role} />}>
                <Route path='/setting' element={<Setting/>}/>
                <Route path='/questions' element= {<Questions/>}/>
              </Route>
            </Route>
            <Route path='*' element={<NotFoundPage/>} />
          </Routes>
      </div>
  );
}

export default App;
