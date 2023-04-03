import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Home from './components/Home'
import Registering from './components/auths/Registering';
import Login from './components/auths/Login';
import axios from 'axios';
import { useState } from 'react';

function App() {

  const [controller, setController] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [controller2,setController2] = useState({
    email:"",
    password:""
  })

  const [status, setStatus] = useState("");

  function isNotEmpty(input) {
    if (input.trim() === "") return false;
    return true;
  }

  function clearing() {
    setController({
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });
    setStatus("");
    setController2({
      email:"",
      password:""
    })
  }

  async function register(e) {
    e.preventDefault();
    if (
      isNotEmpty(controller.username) &&
      isNotEmpty(controller.firstName) &&
      isNotEmpty(controller.lastName) &&
      isNotEmpty(controller.email) &&
      isNotEmpty(controller.password)
    ) {
      try {
        setStatus("Loading...");
        const req = await axios.post("/authenticate/register", {
          username: controller.username,
          firstName: controller.firstName,
          lastName: controller.lastName,
          email: controller.email,
          password: controller.password,
        });
        setStatus(req.data.msg);
      } catch (error) {
        setStatus("Something went wrong...");
        console.log(error);
      }
    } else {
      setStatus("Please fill in all the fields !");
    }

    setTimeout(() => {
      clearing();
    }, 2500);
  }

  //login
  async function login(e){
    e.preventDefault()
    if(isNotEmpty(controller2.email) && isNotEmpty(controller2.password)){
      try{
        setStatus('Loading')
        const req = await axios.post('/authenticate/login',{email:controller2.email,password:controller2.password})
        localStorage.setItem('token',req.data.token)
        setStatus(req.data.msg)
      }catch(error){
        setStatus('Something went wrong...')
        console.log(error)
      }
    }
    else
    {
      setStatus("Please fill in all the fields !")
    }

    setTimeout(() => {
      clearing();
    }, 2500);
  }

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/register' element={<Registering 
          register={register}
          controller={controller}
          setController={setController}
          status={status}/>} 
        />
        <Route path='/login' element={<Login controller2={controller2} setController2={setController2} status={status} login={login}/>}/> 
      </Routes>
    </Router>
  );
}

export default App;
