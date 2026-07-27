import React, { useState } from "react";
import signupImg from "../Images/signup-g.svg";
import "../CSS/Signup.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Signinnav from "./signinnav";
import Footer from "../Homepage/Footer";

export default function Signup() {

let [alldata,setalldata]=useState({})
 let go =useNavigate()

let signupdata=(e)=>{
setalldata({...alldata, [e.target.name]:e.target.value})
}

let savedata=(e)=>{
e.preventDefault();
axios.post("https://freshcart-backend-orpin.vercel.app/signup", {alldata}).then(()=>{
   go("/Signin")
})
}







  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
    <Signinnav/>
    <section className="register-page">
      <div className="register-container">

        <div className="register-left">
          <img src={signupImg} alt="FreshCart Signup" />
        </div>

        <div className="register-right">
          <div className="register-form-box">
            <h1>Get Start Shopping</h1>
            <p>
              Welcome to FreshCart! Enter your email to get started.
            </p>

            <form onSubmit={savedata}>
              <div className="name-row">
                <input type="text" placeholder="First Name" name="firstname" onChange={signupdata} required />
                <input type="text" placeholder="Last Name" name="lastname" onChange={signupdata} required/>
              </div>

              <input type="email" placeholder="Email" name="email" onChange={signupdata} required/>

              <div className="password-field">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="*****" name="password" onChange={signupdata} required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                      <path d="M1 12S5 4 12 4s11 8 11 8-4 8-11 8S1 12 1 12Z" stroke="currentColor" strokeWidth="2"/>
                      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  ) : (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                      <path d="M17.94 17.94C16.23 19.24 14.23 20 12 20 5 20 1 12 1 12a21.75 21.75 0 0 1 5.06-5.94" stroke="currentColor" strokeWidth="2"/>
                      <path d="M9.9 4.24A10.94 10.94 0 0 1 12 4c7 0 11 8 11 8a21.78 21.78 0 0 1-2.16 3.19" stroke="currentColor" strokeWidth="2"/>
                      <path d="M14.12 14.12A3 3 0 0 1 9.88 9.88" stroke="currentColor" strokeWidth="2"/>
                      <path d="M1 1l22 22" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  )}
                </button>
              </div>

              <button className="register-btn" type="submit" >
                Register
              </button>
            </form>

            <h6>
              By continuing, you agree to our{" "}
              <a href="#">Terms of Service</a> &{" "}
              <a href="#">Privacy Policy</a>
            </h6>
          </div>
        </div>

      </div>
    </section>
<Footer/>
    </>
  );
}