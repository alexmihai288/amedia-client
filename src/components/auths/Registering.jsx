import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Registering = ({setStatus,status,isNotEmpty,showPassword,setShowPassword }) => {
    const navigate = useNavigate()  

    const [controller, setController] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    photo:""
  });
  
  async function register(e) {
    e.preventDefault();
    let req
    if (
      isNotEmpty(controller.username) &&
      isNotEmpty(controller.firstName) &&
      isNotEmpty(controller.lastName) &&
      isNotEmpty(controller.email) &&
      isNotEmpty(controller.password)
    ) {
      try {
        setStatus("Loading...");
          req = await axios.post("/authenticate/register", {
          username: controller.username,
          firstName: controller.firstName,
          lastName: controller.lastName,
          email: controller.email,
          password: controller.password,
          photo: controller.photo==="" ? "https://cdn.discordapp.com/attachments/724220064223592541/1092840802721480804/user.jpg" :controller.photo
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
    }, 2000);
    
    if(req.data.ok===true){
      setTimeout(() => {
        navigate('/login')
      }, 2300);
    }
  }

   function clearing() {
    setController({
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      photo:""
    });
    setStatus("");
  }

  return (
    <div className="auth flex justify-center items-center min-h-[100vh] max-h-[100vh] bg-gray50 font-Karla">
        <div className="side-1 p-7 flex flex-col gap-10 sm:gap-15 md:gap-20 bg-preWhite rounded-xl">
          <nav className="flex items-center">
            <div className="logo&name flex gap-2 items-center">
              <i className="bi bi-circle-fill text-2xl text-pink5"></i>
              <p className="font-semibold text-lg">
                AMedia app
                <span className="font-semibold text-purple15">.</span>
              </p>
            </div>
            <Link to={'/'} className="text-textGray text-sm font-medium tracking-tighter ml-auto mr-auto">
              Home
            </Link>
          </nav>
          <div className="flex flex-col gap-7">
            <div className="section-1">
              <p className="text-textGray tracking-tighter text-sm font-semibold">
                START FOR FREE
              </p>
              <p className="mt-2 mb-2 text-3xl font-bold">
                Create new account <span className="text-purple15">.</span>
              </p>
              <p className="text-textGray tracking-tighter text-sm font-medium">
                Already A Member?
                <Link to={'/login'} className="ml-1 text-pink5"> Log In</Link>
              </p>
            </div>
            <form className="section-2 flex flex-col gap-4 md:gap-3 max-w-sm">
              <div className="username w-[100%] mb-4">
                <div className="flex gap-3 items-center bg-gray50 px-3 py-1 rounded-xl justify-between w-[100%]">
                  <div className="flex flex-col w-[100%]">
                    <label
                      htmlFor="username"
                      className="text-textGray tracking-tighter text-xs font-semibold"
                    >
                      Username
                    </label>
                    <input
                      id="username"
                      className="outline-none bg-inherit font-bold w-[100%]"
                      type="text"
                      onChange={(e) =>
                        setController((prevState) => {
                          return {
                            ...prevState,
                            username: e.target.value,
                          };
                        })
                      }
                      value={controller.username}
                    />
                  </div>
                  <i className="bi bi-person-badge-fill text-textGray text-lg"></i>
                </div>
                <div className="alert flex items-center gap-1 text-xs ml-3">
                  <span className="text-red-700">*</span>
                  <p>Username will be visible online</p>
                </div>
                <div className="photo sm:flex sm:justify-between sm:items-center mt-4 ml-3 mb-[2px]">
                  <input id="photo" className="outline-none text-xs border-b border-b-textGray placeholder-pink5" placeholder="image URL" onChange={(e)=>{
                    setController((prevState)=>{
                      return{
                        ...prevState,
                        photo:e.target.value
                      }
                    })
                  }} 
                  value={controller.photo}
                  />
                  <label htmlFor="photo" className="text-xs hidden sm:block">Choose your profile image</label>
                </div>
                <div className="alert flex items-center gap-1 text-xs ml-3">
                  <span className="text-red-700">*</span>
                  <p>This field it's not required</p>
                </div>
              </div>
              
              <div className="names flex flex-col gap-2 md:flex-row md:gap-4">
                <div className="firstName flex gap-3 items-center bg-gray50 px-3 py-1 rounded-xl w-fit">
                  <div className="flex flex-col">
                    <label
                      htmlFor="firstName"
                      className="text-textGray tracking-tighter text-xs font-semibold"
                    >
                      First Name
                    </label>
                    <input
                      id="firstName"
                      className="outline-none bg-inherit font-bold w-[50%]"
                      type="text"
                      onChange={(e) =>
                        setController((prevState) => {
                          return {
                            ...prevState,
                            firstName: e.target.value,
                          };
                        })
                      }
                      value={controller.firstName}
                    />
                  </div>
                  <i className="bi bi-person-vcard text-[#818b90] text-lg"></i>
                </div>
                <div className="lastName flex gap-3 items-center bg-gray50 px-3 py-1 rounded-xl w-fit">
                  <div className="flex flex-col">
                    <label
                      htmlFor="lastName"
                      className="text-textGray tracking-tighter text-xs font-semibold"
                    >
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      className="outline-none bg-inherit font-bold w-[50%]"
                      type="text"
                      onChange={(e) =>
                        setController((prevState) => {
                          return {
                            ...prevState,
                            lastName: e.target.value,
                          };
                        })
                      }
                      value={controller.lastName}
                    />
                  </div>
                  <i className="bi bi-person-vcard text-textGray text-lg"></i>
                </div>
              </div>

              <div className="email w-[100%]">
                <div className="flex gap-3 items-center bg-gray50 px-3 py-1 rounded-xl justify-between w-[100%]">
                  <div className="flex flex-col w-[100%]">
                    <label
                      htmlFor="email"
                      className="text-textGray tracking-tighter text-xs font-semibold"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      className="outline-none bg-inherit font-bold w-[100%]"
                      type='email'
                      onChange={(e) =>
                        setController((prevState) => {
                          return {
                            ...prevState,
                            email: e.target.value,
                          };
                        })
                      }
                      value={controller.email}
                    />
                  </div>
                  <i className="bi bi-envelope-fill text-textGray text-lg"></i>
                </div>
              </div>

              <div className="password w-[100%]">
                <div className="flex gap-3 items-center bg-gray50 px-3 py-1 rounded-xl justify-between w-[100%]">
                  <div className="flex flex-col w-[100%]">
                    <label
                      htmlFor="password"
                      className="text-textGray tracking-tighter text-xs font-semibold"
                    >
                      Password
                    </label>
                    <input
                      id="password"
                      className="outline-none bg-inherit font-bold w-[100%]"
                      type={showPassword ? "text" : "password"}
                      onChange={(e) =>
                        setController((prevState) => {
                          return {
                            ...prevState,
                            password: e.target.value,
                          };
                        })
                      }
                      value={controller.password}
                    />
                  </div>
                  {
                    showPassword ? <i onClick={()=>setShowPassword(prevState=>!prevState)} className="bi bi-eye-fill text-textGray text-lg"></i>
                    :
                    <i onClick={()=>setShowPassword(prevState=>!prevState)} className="bi bi-eye-slash-fill text-textGray text-lg"></i>
                  }
                </div>
              </div>

              <button
                type="submit"
                className="mt-4 sm:mt-7 bg-purple15 px-9 py-3 self-center rounded-3xl font-bold tracking-tighter text-preWhite hover:scale-105 active:scale-95 duration-75"
                onClick={register}
              >
                Create account
              </button>

              <p className="text-center">{status}</p>
            </form>
          </div>
        </div>
    </div>
  );
};

export default Registering;
