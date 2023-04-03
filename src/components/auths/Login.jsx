import React from 'react'

const Login = ({controller2,setController2,status,login}) => {
  return (

    <div className="auth flex justify-center items-center min-h-[100vh] max-h-[100vh] bg-gray50 font-Karla">
      <div className="flex">
        <div className="side-1 p-7 flex flex-col gap-20 bg-preWhite rounded-xl">
          <nav className="flex items-center">
            <div className="logo&name flex gap-2 items-center">
              <i className="bi bi-circle-fill text-2xl text-pink5"></i>
              <p className="font-semibold text-lg">
                AMedia app
                <span className="font-semibold text-purple15">.</span>
              </p>
            </div>
            <p className="text-textGray text-sm font-medium tracking-tighter ml-auto mr-auto">
              Home
            </p>
          </nav>
            <p className="mt-2 mb-2 text-3xl font-bold">
                Log in to your account <span className="text-purple15">.</span>
            </p>
            <form className="section-2 flex flex-col gap-2">

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
                      type="email"
                      onChange={(e) =>
                        setController2((prevState) => {
                          return {
                            ...prevState,
                            email: e.target.value,
                          };
                        })
                      }
                      value={controller2.email}
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
                      type="password"
                      onChange={(e) =>
                        setController2((prevState) => {
                          return {
                            ...prevState,
                            password: e.target.value,
                          };
                        })
                      }
                      value={controller2.password}
                    />
                  </div>
                  <i className="bi bi-eye-fill text-textGray text-lg"></i>
                </div>
              </div>

              <button
                type="submit"
                className="mt-7 bg-purple15 px-9 py-3 self-center rounded-3xl font-bold tracking-tighter text-preWhite hover:scale-105 active:scale-95 duration-75"
                onClick={login}
              >
                Log in
              </button>

              <p className="text-center">{status}</p>
            </form>
          </div>
        </div>
      </div>

  )
}

export default Login