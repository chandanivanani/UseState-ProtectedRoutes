import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SignUp.module.css";

const SignUp = () => {
  const [name,setName] = useState("");
  const [lname,setlName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("User");
  const [adminKey, setAdminKey] = useState("");
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();

    if(role === "Admin" && adminKey !== "S123"){
      alert("Invalid Admin Secret Key!");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.push({ name,lname,email, password, role, adminKey:role === "Admin" ? adminKey : null});
    localStorage.setItem("users", JSON.stringify(users));

    alert("Sign up successful. Please login.");
    navigate("/login");
  };

  return (
    <div className={styles.container}>
      <h2>Sign Up</h2>
      <h4>As a</h4>
      <form onSubmit={handleSignUp}>
      <label>
      <input type="radio" name="role" value="User" checked={role === "User"} onChange={() => setRole("User")} />
       User
      </label>

      <label>
      <input type="radio" name="role" value="Admin" checked={role === "Admin"} onChange={() => setRole("Admin")} />
      Admin
      </label>

      <input type="text" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} required />
      <input type="text" placeholder="Enter your last name" value={lname} onChange={(e) => setlName(e.target.value)} required />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />

       {role === "Admin" && (
        <input 
          type="password" placeholder="Enter Admin Secret Key"
          value={adminKey}
          onChange={(e) => setAdminKey(e.target.value)} required
        />
       )} 
      
      <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;