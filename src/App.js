import './App.css';
import Login from './Component/login/Login';
import LoginForm from './Component/login/LoginForm';
import LayoutQuiz from './Layout/Layout';
import Register from './Component/register/SigupForm';
import { Route, Routes } from 'react-router-dom';
import Setting from './Layout/User/Setting';
import Score from './Layout/User/Score';
import Questions from './Layout/User/Questions';

function App() {
  return (
      <div className="App">
      <Routes>
        <Route path='/' element={<LayoutQuiz/>}>
          <Route path='/' element={<LoginForm/>} />
          <Route path='/register' element={<Register/>}/>
          <Route path='/setting' element={<Setting/>} />
          <Route path='/questions' element={<Questions/>} />
          <Route path='/score' element={<Score/>} />
        </Route>
      </Routes>
      </div>
  );
}

export default App;
