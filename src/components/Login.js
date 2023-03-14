import React, { useState } from "react";
import axios from "axios";
// import "./index.css";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://test-assignment.emphasoft.com/api/v1/login/",
        {
          username: username,
          password: password,
        }
      );
      const myToken = response.data.token
      localStorage.setItem("token", myToken);
      const gettedToken = localStorage.getItem('token') 
      
      if(gettedToken){
        window.location.href = "/";
      }
      
      
      
      // Перенаправление на другую страницу
    } catch (error) {
      alert("error" +error)
      setError("Неверное имя пользователя или пароль");
    }
  };

  return (
    <form onSubmit={handleSubmit} className=" bg-white border border-green-300 shadow-xl w-1/3 mx-auto rounded px-8 pt-6 pb-8 mb-4">
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="username">
          Имя пользователя
        </label>
        <input
          className="shadow appearance-none border rounded border-none w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="username"
          type="text"
          placeholder="Имя пользователя"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
          Пароль
        </label>
        <input
          className="shadow appearance-none border-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-500 text-xs italic">{error}</p>}
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-[#31C48D] hover:bg-[#0E9F6E] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Войти
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
