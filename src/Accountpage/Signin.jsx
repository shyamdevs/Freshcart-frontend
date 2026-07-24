import React, { useState } from "react";
import signin from "../Images/signin-g.svg";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Footer from "../Homepage/Footer";
import Signinnav from "./signinnav";

export default function Signin() {
let [signindata,setsignindata]=useState({})
let go =useNavigate()

let signinvalue=(e)=>{
setsignindata({...signindata, [e.target.name]:e.target.value})
}


const savedata = (e) => {
    e.preventDefault();
    axios.post("https://freshcart-backend-theta.vercel.app/signin", { signindata }).then((res) => {
      if (res.data.status) {
            localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
    )

        Swal.fire({
          text: "Login success",
          icon: "success"
        });
        go("/")
      }
      else {
        Swal.fire({
          icon: "error",
          text: "Invalid details!",
        });
      }
    })
  };



  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
    <Signinnav/>
    <div className="login-page">
  <div className="login-container">
    <div className="login-left">
      <img src={signin} alt="Sign in" className="login-img" />
    </div>

    <div className="login-right">
      <div className="login-form">
        <h1>Sign in to FreshCart</h1>

        <p className="login-subtitle">
          Welcome back to FreshCart! Enter your email to get started.
        </p>

        <form>
          <div className="login-input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Email"
              className="form-control"
              name="email"
              onChange={signinvalue}
            />
          </div>

          <div className="login-input-group">
            <label>Password</label>

            <div className="login-password-box">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="*****"
                name="password"
                onChange={signinvalue}
                className="form-control login-password-input"
              />

              <button
                type="button"
                className="login-eye-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👀"}
              </button>
            </div>
          </div>

          <div className="login-form-options">
            <label className="login-remember-box">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>

            <p>
              Forgot password? <Link to="/ForgotPassword">Reset It</Link>
            </p>
          </div>

          <button
            type="submit"
            className="login-btn"
            onClick={savedata}
          >
            Sign In
          </button>

          <p className="login-signup-text">
            Don’t have an account? <Link to="/Signup">Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  </div>
</div>
    <Footer/>
    </>
  );
}