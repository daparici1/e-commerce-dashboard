import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/home.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Track error message state
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/"); // REDACTS NAVIGATION, USER WAS STILL ABLE TO DO /login IN ADDRESS BAR
    }
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMessage("All fields are required!");
      return;
    }

    let result = await fetch("http://localhost:5000/login", {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.warn(result);

    // we can see "no user found" in inspect, but the user cant, we can alert them
    if (result.auth) {
      localStorage.setItem("user", JSON.stringify(result.user));
      localStorage.setItem("token", JSON.stringify(result.auth));
      navigate("/");
    } else {
      setErrorMessage("Please enter correct details");
    }
  };

  return (
    <div className="home-container">
      <div className="welcome-section">
        <h1>Welcome Back!</h1>
        <p>Please log in to continue.</p>
      </div>
      <div className="registration">
        <h1>Login</h1>
        <input
          type="text"
          className="inputBox"
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          type="password"
          className="inputBox"
          placeholder="Enter Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

        {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message */}

        <button onClick={handleLogin} className="loginButton" type="button">
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
