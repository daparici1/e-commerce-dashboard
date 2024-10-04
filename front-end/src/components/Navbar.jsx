import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  const logout = () => {
    // local storage is how we track if someone is logged in or not
    // ...so clearing it would make it easy for us to have someone
    // ..."log out"
    localStorage.clear(); 
    navigate('/signup');
  };
  return (
    <div>
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
          {auth ? <Link onClick={logout} to="/signup">Logout</Link>
           : <Link to="/signup">Sign Up</Link>
          }
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
