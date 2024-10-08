import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";

const Navbar = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  const logout = () => {
    // local storage is how we track if someone is logged in or not
    // ...so clearing it would make it easy for us to have someone
    // ..."log out"
    localStorage.clear();
    navigate("/signup");
  };
  return (
    <div>
      {auth ? (
        <ul className="navbar-ul">
          <li>
            <Link to="/">Products</Link>
          </li>
          <li>
            <Link to="/add">Add Products</Link>
          </li>
          <li>
            <Link to="/update">Update Products</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link onClick={logout} to="/signup">
              Logout (
              {auth
                ? (() => {
                    try {
                      const parsedAuth = JSON.parse(auth);
                      return parsedAuth.name || "User";
                    } catch (error) {
                      console.error("Failed to parse auth:", error);
                      return "User";
                    }
                  })()
                : "User"}
              )
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="navbar-ul navbar-right">
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Navbar;
