import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/home.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, [navigate]);

  const collectData = async () => {
    // check empty fields
    if (!name || !email || !password) {
      setErrorMessage("All fields are required!");
      return;
    }

    // regex for email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email address!");
      return;
    }

    setErrorMessage("");

    // if validation passes, continue
    let result = await fetch("http://localhost:5000/register", {
      method: "post",
      body: JSON.stringify({ name, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    result = await result.json();
    localStorage.setItem("user", JSON.stringify(result.result));
    localStorage.setItem("token", JSON.stringify(result.auth));
    navigate("/");
  };

  return (
    <div className="home-container">
      <div className="welcome-section">
        <h1>Welcome to Your Ecommerce Dashboard, I'm David!</h1>
        <p>Manage your products, track inventory, and optimize your ecommerce business. Let's get started!</p>
      </div>
      <div className="registration">
        <h1>Sign Up</h1>
        <input
          className="inputBox"
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="inputBox"
          type="text"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="inputBox"
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Error Message */}
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <button onClick={collectData} className="signupButton">
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Signup;
