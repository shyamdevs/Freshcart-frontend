import React from "react";
import logo from "../Images/freshcart-logo.svg"
import { Link } from "react-router-dom";


export default function Signinnav() {
  return (
    <header className="auth-header">
      <div className="auth-logo">
      <Link to={"/"}>
        <div className="cart-icon">
         <img src={logo} alt="logo" />
        </div></Link>

        
      </div>

      <div className="auth-action">
        <span>Already have an account?</span>
        <Link to="/Signin">Sign in</Link>
      </div>
    </header>
  );
}