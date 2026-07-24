import React, { useState } from "react";
import {
  FiMenu,
  FiX,
  FiPackage,
  FiSettings,
  FiMapPin,
  FiCreditCard,
  FiBell,
  FiLogOut,
} from "react-icons/fi";

import "../CSS/Accdash.css";
import { Link, useNavigate } from "react-router-dom";

export default function Accdash() {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("user");
    navigate("/Signup");

  }

  return (
    <>
      {/* Mobile Header */}
      <div className="account-header">
        <h2>Account Setting</h2>

        <button
          className="menu-btn"
          onClick={() => setOpen(true)}
        >
          <FiMenu />
        </button>
      </div>

      {/* Overlay */}
      {open && (
        <div
          className="overlay"
          onClick={() => setOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside className={`profile-sidebar ${open ? "show" : ""}`}>

        {/* Mobile Sidebar Header */}
        <div className="sidebar-top">
          <h2>Account Setting</h2>

          <button
            className="close-btn"
            onClick={() => setOpen(false)}
          >
            <FiX />
          </button>
        </div>

        {/* Menu */}
        <Link to={"/account/YourOrder"}>
          <div
            className="sidebar-item "
            onClick={() => setOpen(false)}
          >
            <FiPackage className="sidebar-icon" />
            <span>Your Orders</span>
          </div>
        </Link>

        <Link to="/account/settings">
          <div
            className="sidebar-item"
            onClick={() => setOpen(false)}
          >
            <FiSettings className="sidebar-icon" />
            <span>Settings</span>
          </div></Link>
        <Link to="/account/Address">
          <div
            className="sidebar-item"
            onClick={() => setOpen(false)}
          >
            <FiMapPin className="sidebar-icon" />
            <span>Address</span>
          </div></Link>

        <Link to="/account/PaymentMethod">
          <div
            className="sidebar-item"
            onClick={() => setOpen(false)}
          >
            <FiCreditCard className="sidebar-icon" />
            <span>Payment Method</span>
          </div>
        </Link>



        <Link to="/account/notification">
          <div
            className="sidebar-item"
            onClick={() => setOpen(false)}
          >
            <FiBell className="sidebar-icon" />
            <span>Notification</span>
          </div></Link>

        <hr />

        <div
          className="sidebar-item logout"
          onClick={() => setOpen(false)}
           onClick={logout}
        >
          <FiLogOut className="sidebar-icon" />
          <span>Log out</span>
        </div>

      </aside>
    </>
  );
}