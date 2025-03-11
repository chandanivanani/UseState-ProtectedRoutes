import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ isLoggedIn, userType }) => {
  const navigate = useNavigate();
  
  console.log("isLoggedIn",isLoggedIn);
  
  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("loggedInUser");
    window.dispatchEvent(new Event("loginStateChanged"));
    
    // setTimeout(() => {
      navigate("/login");
    // },100);
  };

  return (
    <>
      <nav className="navbar">
        
          {!isLoggedIn && (
            <>
            <ul className="nav-list">
              <li className="nav-item">
                <Link to="/login" className="nav-link">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/signup" className="nav-link">
                  Register
                </Link>
              </li>
              </ul>
            </>
          )}

          {isLoggedIn && userType == "Admin" ? (
            <>
              <ul className="nav-list">
              <li className="nav-item">
                <Link className="nav-link" to="/admin-dashboard">Admin Dashboard</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/users">UserLists</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/user-Details">userDetails</Link>
              </li>
              </ul>
              
            </>
          ) : (
            isLoggedIn && (
              <>
                <ul className="nav-list">
                <li className="nav-item">
                  <Link to="/home">Home</Link>
                </li>
                <li className="nav-item">
                  <Link to="/about">About</Link>
                </li>
                <li className="nav-item">
                  <Link to="/user-dashboard">UserDashboard</Link>
                </li>
                <li className="nav-item">
                  <Link to="/contact">Contact</Link>
                </li>
                <li className="nav-item">
                  <Link to="/users">UserLists</Link>
                </li>
                </ul>
              </>
            )
          )}

          {isLoggedIn && (userType == "Admin" || userType == "User") && (
            <div className="navbarActions">
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}

      </nav>
    </>
  );
};

export default Navbar;
