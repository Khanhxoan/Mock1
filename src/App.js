import './App.css';
import LoginForm from './Component/login/LoginForm';
import LayoutQuiz from './Layout/Layout';
import Register from './Component/register/SigupForm';
import { Route, Routes } from 'react-router-dom';
import Setting from './Layout/User/Setting';
import Score from './Layout/User/Score';
import Questions from './Layout/User/Questions';
import AdminUser from './Layout/Admin/Admin-user';
import Admin from './Layout/Admin/Admin';
// import AdminQuestions from './Layout/Admin/Questions';
import AdminQuestions from './Layout/Admin/Admin-questions';
import User from './Layout/User/User';


function App() {
  return (
      <div className="App">
      <Routes>
        <Route path='/' element={<LayoutQuiz/>} >
          <Route path='/' element={<LoginForm/>} />
          <Route path='/admin' element={<Admin/>} />
            <Route path='/admin/user' element={<AdminUser/>} />
            <Route path='/admin/questions' element={<AdminQuestions/>} />
          <Route path='/register' element={<Register/>}/>
          <Route path='/setting' element={<Setting/>}/>
          <Route path='/questions' element= {<Questions/>}/>
          <Route path='/score' element={<Score/>}/>
        </Route>
      </Routes>
      </div>
  );
}

export default App;
