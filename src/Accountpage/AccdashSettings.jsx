import React from "react";
import "../CSS/AccDashSettings.css";
import Accdash from "./Accdash";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function AccdashSettings() {


const [fullName, setFullName] = useState("");

useEffect(() => {

    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {

        setuserdata(user);

        setFullName(
            `${user.firstname} ${user.lastname}`
        );

    }

}, []);
const handleNameChange = (e) => {

    const value = e.target.value;

    setFullName(value);

    const parts = value.trim().split(/\s+/);

    setuserdata(prev => ({
        ...prev,
        firstname: parts[0] || "",
        lastname: parts.slice(1).join(" ")
    }));

};



  const [userdata, setuserdata] = useState({ });

  const handleChange = (e) => {

    setuserdata({

      ...userdata,

      [e.target.name]: e.target.value

    });

  }

const updateDetails = () => {

    axios.post("https://freshcart-backend-theta.vercel.app/updateuser", {
        userdata
    }).then((res) => {

       if (res.data.status) {

    const updatedUser = res.data.user;

    setuserdata(updatedUser);

    setFullName(
        `${updatedUser.firstname} ${updatedUser.lastname}`
    );

    localStorage.setItem(
        "user",
        JSON.stringify(updatedUser)
    );

    Swal.fire({
        icon: "success",
        text: "Profile Updated"
    });
}
        
        else {

            Swal.fire({
                icon: "error",
                text: "email already exists"
            });

        }

    });

}

  

  // Password update ------------
  const [password, setPassword] = useState({

    currentPassword: "",

    newPassword: ""

  });

  const passwordChange = (e) => {

    setPassword({

      ...password,

      [e.target.name]: e.target.value

    });

  }
const savePassword = () => {

  const user = JSON.parse(localStorage.getItem("user"));

  axios.post("https://freshcart-backend-theta.vercel.app/updatepassword", {
    id: user._id,
    currentPassword: password.currentPassword,
    newPassword: password.newPassword
  })
  .then((res) => {

    if (res.data.status) {

      Swal.fire({
        icon: "success",
        text: "Password Updated Successfully"
      });

    } else {

      Swal.fire({
        icon: "error",
        text: "Current Password is Incorrect"
      });

    }

  });

}
// delete ---------
const go = useNavigate();
const deleteAccount = () => {

  const user = JSON.parse(localStorage.getItem("user"));

  Swal.fire({
    title: "Are you sure?",
    text: "Your account will be permanently deleted!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, Delete",
    cancelButtonText: "Cancel"
  }).then((result) => {

    if (result.isConfirmed) {

      axios.post("https://freshcart-backend-theta.vercel.app/deleteaccount", {
        _id: user._id
      }).then((res) => {

        if (res.data.status) {

          localStorage.removeItem("user");

          Swal.fire({
            icon: "success",
            text: "Account Deleted Successfully"
          });

          go("/Signup");

        } else {

          Swal.fire({
            icon: "error",
            text: "Unable to delete account"
          });

        }

      });

    }

  });

};




  return (
    <>


      <main className="account-page">
        <div className="account-container">

          <h1>Account Setting</h1>

          {/* <!-- Account Details --> */}
          <section className="setting-section">
            <h2>Account details</h2>

            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                // name="firstname"
                placeholder="Abhi Sharma"
               value={fullName}

                 onChange={handleNameChange}
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input type="email"   name="email" placeholder="example@gmail.com" value={userdata.email}
                onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Phone</label>
              <input type="text" placeholder="Phone number"   name="phone" value={userdata.phone}
                onChange={handleChange} />
            </div>

            <button className="btn btn-green" onClick={updateDetails}>Save Details</button>
          </section>

          <hr />

          {/* <!-- Password --> */}
          <section className="setting-section">
            <h2>Password</h2>

            <div className="form-group large-input">
              <label>New Password</label>
              <input type="password" name="newPassword" placeholder="enter new password" onChange={passwordChange} />
            </div>

            <div className="form-group large-input">
              <label>Current Password</label>
              <input type="password" name="currentPassword" placeholder="enter current password" onChange={passwordChange} />
            </div>

            <p className="help-text">Can’t remember your current password?</p>
            <a href="#" className="reset-link">Reset your password.</a><br />

            <button className="btn btn-green password-btn" onClick={savePassword}>Save Password</button>
          </section>

          <hr />

          {/* <!-- Delete Account --> */}
          <section className="setting-section delete-section">
            <h2>Delete Account</h2>

            <p>Would you like to delete your account?</p>

            <p>
              This account contain 12 orders, Deleting your account will remove all
              the order details associated with it.
            </p>

            <button className="btn btn-danger"   onClick={deleteAccount}>
              I want to delete my account
            </button>
          </section>

        </div>
      </main>
    </>
  )
}
