// eslint-disable-next-line
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import  Navbar  from './components/Navbar';
import reportWebVitals from './reportWebVitals';
import Profile from './components/Profile';
import Footer from './components/Footer';
import Login from './components/Login';
import UserDetail from './components/UserDetail';
import * as te from 'tw-elements';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <BrowserRouter>
  <Navbar / >
 <Routes>
   
   <Route path="/" element={<App />} />
   
   <Route path="/profile" element={<Profile />} />
   <Route path="/Login" element={<Login />} />
   <Route path="/user/:id" element={<UserDetail />} />
 </Routes>
 <Footer />
</BrowserRouter>
</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
