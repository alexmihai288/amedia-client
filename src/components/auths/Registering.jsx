import React from "react";
import { Link } from "react-router-dom";

const Registering = ({ register, controller, setController, status }) => {
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
            <form className="section-2 flex flex-col gap-2">
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
              </div>
              <div className="names flex gap-4">
                <div className="firstName flex gap-3 items-center bg-gray50 px-3 py-1 rounded-xl">
                  <div className="flex flex-col">
                    <label
                      htmlFor="firstName"
                      className="text-textGray tracking-tighter text-xs font-semibold"
                    >
                      First Name
                    </label>
                    <input
                      id="firstName"
                      className="outline-none bg-inherit font-bold w-32"
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
                <div className="lastName flex gap-3 items-center bg-gray50 px-3 py-1 rounded-xl">
                  <div className="flex flex-col">
                    <label
                      htmlFor="lastName"
                      className="text-textGray tracking-tighter text-xs font-semibold"
                    >
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      className="outline-none bg-inherit font-bold w-32"
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
                      type="email"
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
                      type="password"
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
                  <i className="bi bi-eye-fill text-textGray text-lg"></i>
                </div>
              </div>

              <button
                type="submit"
                className="mt-7 bg-purple15 px-9 py-3 self-center rounded-3xl font-bold tracking-tighter text-preWhite hover:scale-105 					active:scale-95 duration-75"
                onClick={register}
              >
                Create account
              </button>

              <p className="text-center">{status}</p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registering;
