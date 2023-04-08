import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Login from './components/auths/Login'
import Registering from './components/auths/Registering';
import Home from './components/home/Home';
import axios from "axios";


function App() {
  
  const [status, setStatus] = useState("");

  function isNotEmpty(input) {
    if (input.trim() === "") return false;
    return true;
  }

  const [showPassword,setShowPassword] = useState(false);


  const [token,setToken] = useState(function(){return localStorage.getItem('token') || undefined});
  const [user,setUser] = useState({});
  const [logged,setLogged] = useState(false);


  useEffect(()=>{
    decodeUserToken();
    console.log('re');
  },[])

  async function decodeUserToken(){
    try{
      const req = await axios.post('/search/decodeUser',{},{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      console.log(req);
      setUser(req.data);
    }catch(err){
      console.log(err);
    }
  }



  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home user={user} logged={logged}/>}/>
        <Route path='/register' element={<Registering setStatus={setStatus} status={status} isNotEmpty={isNotEmpty} showPassword={showPassword} setShowPassword={setShowPassword}/>}/>
        <Route path='/login' element={<Login setStatus={setStatus} status={status} isNotEmpty={isNotEmpty} showPassword={showPassword} setShowPassword={setShowPassword}/>}/> 
      </Routes>
    </Router>
  );
}

export default App;
