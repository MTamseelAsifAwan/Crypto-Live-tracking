import axios from 'axios';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const loginData = { username, password };
    console.log('Login data:', loginData);
    try {
        const response = await axios.post('http://localhost:3000/login', loginData);
        toast.success('Login successful');
        navigate('/');
        console.log(response.data);
    } catch (error) {
        toast.error('Login failed: ' + error.response.data);
    }
  };

  const handlesign = () => {
    window.location.href = "/Signup";
  };

  return (
    <>
      <form
        onSubmit={handleLogin}
        className="max-w-md mx-auto mt-10 bg-white dark:bg-zinc-900 shadow-2xl rounded-2xl overflow-hidden border-4 border-[#0b004e] dark:border-blue-800"
      >
        <div className="px-8 py-10 md:px-10">
          <h2 className="text-4xl font-extrabold text-center text-black dark:text-black">
            Welcome Back!
          </h2>
          <p className="text-center dark:text-black text-black mt-3">
            We missed you, sign in to continue.
          </p>
          <div className="mt-10">
            <div className="relative">
              <label
                className="block mb-3 text-sm font-medium text-black dark:text-black"
                htmlFor="username"
              >
                Username
              </label>
              <input
                placeholder="username"
                className="block w-full px-4 py-3 mt-2 text-black bg-white border-2 rounded-lg dark:border-zinc-800 dark:bg-zinc-800 dark:text-black focus:border-[#0b004e] dark:focus:border-[#0b004e] focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-[#0b004e]"
                name="us"
                id="username"
                type="username"
                value={username}
                onChange={(e) => setusername(e.target.value)}
              />
            </div>
            <div className="mt-6">
              <label
                className="block mb-3 text-sm font-medium text-black dark:text-black"
                htmlFor="password"
              >
                Password
              </label>
              <input
                placeholder="••••••••"
                className="block w-full px-4 py-3 mt-2 text-black bg-white border-2 rounded-lg dark:border-zinc-800 dark:bg-zinc-800 dark:text-zinc-200 focus:border-[#0b004e] dark:focus:border-[#0b004e] focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-[#0b004e]"
                name="password"
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mt-10">
              <button
                className="w-full px-4 py-3 tracking-wide text-white transition-colors duration-200 transform bg-gradient-to-r from-[#0b004e] via-[#002834] to-[#1d152f] rounded-lg hover:from-[#002834] hover:to-[#0b004e] focus:outline-none focus:ring-4 focus:ring-[#0b004e] dark:focus:ring-blue-800"
                type="submit"
              >
                Let&apos;s Go
              </button>
            </div>
          </div>
        </div>
        <div className="px-8 py-4 bg-blue-200 dark:bg-black">
          <div className="text-sm text-white dark:text-blue-300 text-center">
            Don&apos;t have an account?
            <a className="font-medium underline" href="#" onClick={handlesign}>
              Sign up
            </a>
          </div>
        </div>
      </form>
      <ToastContainer />
    </>
  );
};

export default Login;