import React, { useEffect, useState } from "react";
import {Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ProtectedRoute from "./routes/ProtectedRoute";
import Navbar from "./components/Navbar";
import { getUserRole } from "./utils/auth";
import UserLists from "./pages/UserLists";
import UserDetails from "./components/UserDetails";
import Home from "./pages/Home";
import UserPosts from "./pages/UserPosts";

export default function App() {
  const[isLoggedIn , setIsLoggedIn ] = useState(() => localStorage.getItem("loggedIn"));
  const[userType, setUserType] = useState(() => localStorage.getItem("userRole"));

  const updateAuthState = () => {
    setIsLoggedIn(localStorage.getItem("loggedIn"))
    setUserType(localStorage.getItem("userRole"))
   };

   useEffect(() => {
     window.addEventListener("storage", updateAuthState);
     return () => window.removeEventListener("storage", updateAuthState);
   }, []);

   useEffect(() => {
    const handleLoginStateChange = () => {
      updateAuthState();
    };

    window.addEventListener("loginStateChanged", handleLoginStateChange);

    return () => {
      window.removeEventListener("loginStateChanged", handleLoginStateChange);
    };
   },[]);
  

  return (
    <div className="App">
    <Navbar isLoggedIn={isLoggedIn} userType={userType} />  

      <Routes>
        {/* Public Routes */}
        {!isLoggedIn && (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Login />} />
        </>
        )}
       
        {/* Protected User Routes */}
        <Route element={<ProtectedRoute />}>
        
        <Route path="/login" element={<Navigate to="/" />} />
        <Route path="/signup" element={<Navigate to="/" />} />
          
          {userType != "Admin" ? (
            <>
              <Route path="/contact" element={<Contact />} />
              <Route path="/home" element={<Home />} />
              <Route path="/" element={< Navigate to = "/home"/>}/>
              <Route path="/user-dashboard" element={<UserDashboard />} />
              <Route path="/users" element={<UserLists />} />
              <Route path="/user/:id" element={<UserPosts />} />
            </>
          ) : (
            <>
              <Route path="/" element={< Navigate to="/admin-dashboard"/>}/>
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              <Route path="/users" element={<UserLists />} />
              <Route path="/user-details" element={<UserDetails/>} />
            </>
          )}
        </Route>

          <Route path="/about" element={<About />} />

        {/* Default Redirect */}
        <Route path="*" element={<Navigate to="/" />}/>
      </Routes>
      
    </div>  
  );
};