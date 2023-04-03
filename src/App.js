import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import { useState } from 'react';
import Login from './components/auths/Login'
import Registering from './components/auths/Registering';
import Home from './components/Home';


function App() {
  
  const [status, setStatus] = useState("");

  function isNotEmpty(input) {
    if (input.trim() === "") return false;
    return true;
  }

  const [showPassword,setShowPassword] = useState(false);


  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/register' element={<Registering setStatus={setStatus} status={status} isNotEmpty={isNotEmpty} showPassword={showPassword} setShowPassword={setShowPassword}/>}/>
        <Route path='/login' element={<Login setStatus={setStatus} status={status} isNotEmpty={isNotEmpty} showPassword={showPassword} setShowPassword={setShowPassword}/>}/> 
      </Routes>
    </Router>
  );
}

export default App;
