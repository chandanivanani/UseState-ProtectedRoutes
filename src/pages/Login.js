import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role,setRole] = useState("User");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((u) => u.email === email && u.password === password && u.role === role);

    if (user) {
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("userRole", user.role);
      localStorage.setItem("loggedInUser",JSON.stringify(user));
      window.dispatchEvent(new Event("loginStateChanged"));
      navigate('/home');
    } else {
      alert("Invalid Credentials or Role! Please try again.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        
        <label>
        <input type="radio" name="role" value="User" checked={role === "User"} onChange={()=>setRole("User")} />
        User
        </label>

        <label>
        <input type="radio" name="role" value="Admin" checked={role === "Admin"} onChange={()=>setRole("Admin")} />
         Admin
        </label>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      
      {/* Redirect to Signup Page */}
      <p>
        Don't have an account? <Link to="/signup">Sign up here</Link>
      </p>
    </div>
  );
};

export default Login;