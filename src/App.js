import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Login from './components/auths/Login'
import Registering from './components/auths/Registering';
import Home from './components/home/Home';
import axios from "axios";
import CreatePost from './components/home/CreatePost';
import SinglePost from './components/home/SinglePost';
import Profile from './components/profile/Profile';


function App() {
  
  const [EditPost,setEditPost] = useState(false)

  const [status, setStatus] = useState("");

  function isNotEmpty(input) {
    if (input.trim() === "") return false;
    return true;
  }

  const [showPassword,setShowPassword] = useState(false);


  const [token,setToken] = useState(function(){return localStorage.getItem('token') || ''});
  const [user,setUser] = useState({});
  const [logged,setLogged] = useState(false);


  useEffect(()=>{
    decodeUserToken();
  },[])

  async function decodeUserToken(){
    try{
      const req = await axios.post('/search/decodeUser',{},{
        headers:{
          authorization:`Bearer ${token}`
        }
      })
      if(req.data.ok===true){
        setUser(req.data.targetUser);
        setLogged(true)
      }
    }catch(err){
      console.log(err);
    }
  }


  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home user={user} logged={logged} token={token} setEditPost={setEditPost}/>}/>
        <Route path='/register' element={<Registering setStatus={setStatus} status={status} isNotEmpty={isNotEmpty} showPassword={showPassword} setShowPassword={setShowPassword}/>}/>
        <Route path='/login' element={<Login setStatus={setStatus} status={status} isNotEmpty={isNotEmpty} showPassword={showPassword} setShowPassword={setShowPassword}/>}/> 
        <Route path='/createPost' element={<CreatePost/>}/>
        <Route path='/posts/:id' element={<SinglePost token={token} user={user} EditPost={EditPost}/>} />
        <Route path='/profile' element={<Profile user={user}/>} />
      </Routes>
    </Router>
  );
}

export default App;
