/* eslint-disable react-hooks/exhaustive-deps */
import React,{  useState } from "react";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";

const TailRegForm = ({ isOpen, onClose, isLogin }) => {
  const { dispatch } = React.useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    setPasswordError("");
  };

  const handleUsernameChange = (event) => {
    const newUsername= event.target.value;
    setUsername(newUsername);
    setUsernameError("");
  };

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    setEmailError("");
  };

  

  const handleSubmit = async (e) => {
    let hasError = false;
    
    e.preventDefault();
    if (password.length < 8) {
      hasError = true
      setPasswordError("Password must be at least 8 characters long.");
      
    }
    if (username.includes("@")) {
      hasError = true
      setUsernameError("Username cannot contain @ symbol");
   
    }
    if(!hasError){

    try {
      // Make the HTTP POST request using Axios
      const response = await axios.post(`${process.env.REACT_APP_Auth_URL}/dj-rest-auth/registration/`, {
        "email":email,
        "username":username,
        "password1":password,
        "password2":password
      });
      dispatch({
        type: "LOGIN",
        payload: {
          token: response.data["access"],
        },
      });

      // Handle the response here (e.g., show success message, redirect, etc.)
      console.log(response.data);

      // Close the registration modal
      onClose();
    } catch (error) {
      // Handle error here (e.g., show error message)
      console.log(error)
      console.error(error.response.data);
      if(error.response.data.email !== undefined){
        setEmailError(error.response.data.email);
      }
      if (error.response.data.username !== undefined){
        setUsernameError(error.response.data.username);
      }
      if (error.response.data.non_field_errors !== undefined){
        setPasswordError(error.response.data.non_field_errors);
      }
     }
   }};
  return (
    <div
      id="authentication-modal"
      className={`fixed inset-0 flex items-center justify-center z-50 ${
        isOpen ? "" : "hidden"
      } w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`}
    >
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div class="relative w-full max-w-md max-h-full">
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <button
            onClick={onClose}
            type="button"
            class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
            data-modal-hide="authentication-modal"
          >
            <svg
              aria-hidden="true"
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
          <div class="px-6 py-6 lg:px-8">
            <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">
              Register to our platform
            </h3>
            <form class="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="name@company.com"
                  required
                ></input>{" "}
                {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
              </div>

              <div>
                <label
                  for="username"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your username
                </label>
                <input
                  type="username"
                  name="username"
                  id="username"
                  value={username}
                  onChange={handleUsernameChange}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="username"
                  required
                ></input>{" "}
                {usernameError && <p className="text-red-500 text-sm mt-1">{usernameError}</p>}
              </div>
              <div>
                <label
                  for="password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="••••••••"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  required
                ></input>
                {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
              </div>
              
              <button
                type="submit"
                class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Sign up your account
              </button>
              <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
                Already registered?{" "}
                <a
                  onClick={isLogin}
                  class="text-blue-700 hover:underline cursor-pointer dark:text-blue-500"
                >
                  Please login
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TailRegForm;
