import React, { useState } from "react";
import forgotImg from "../Images/forgetpassword.svg";
import "../CSS/Forgetpass.css";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Signinnav from "./signinnav";
import Footer from "../Homepage/Footer";

export default function ForgotPassword() {
  
let [forgetpass,setforgetpass]=useState({})
let go =useNavigate()

let forgetpassdata=(e)=>{
setforgetpass({...forgetpass, [e.target.name]:e.target.value})
}

let savedata=(e)=>{
e.preventDefault();
axios.post("https://freshcart-backend-orpin.vercel.app/forgetpass", {forgetpass}).then((res) => {
      if (res.data.status) {
        Swal.fire({
          text: "password change success",
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
}

  return (
    <>
    <Signinnav/>
    <section className="forgot-page">
      <div className="forgot-container">

        <div className="forgot-left">
          <img src={forgotImg} alt="Forgot Password" />
        </div>

        <div className="forgot-right">
          <div className="forgot-form-box">
            <h1>Forgot your password?</h1>

            <p>
              Please enter the email address associated with your account and
              We will email you a link to reset your password.
            </p>

            <form>
              <input type="email" placeholder="Email" name="email" onChange={forgetpassdata} />
              <input type="password" placeholder="new password" name="password" onChange={forgetpassdata} />


              <button type="submit" className="reset-btn" onClick={savedata}>
                Reset Password
              </button>

              <button type="button" className="back-btn">
                Back
              </button>
            </form>
          </div>
        </div>

      </div>
    </section>
    <Footer/>
    </>
  );
}