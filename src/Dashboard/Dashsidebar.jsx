import React, { useState } from "react";
import logo from "../Images/freshcart-logo.svg"
import googlepay from "../Images/googleplay-btn.svg"
import appstore from "../Images/appstore-btn.svg"

import {
  FiHome,
  FiShoppingCart,
  FiGrid,
  FiPackage,
  FiUsers,
  FiStar,
  FiChevronDown,
  FiChevronUp,
  FiSettings,
  FiImage,
  FiFileText,
  FiHelpCircle,
  FiHeadphones,
  FiMenu,
  FiX,
} from "react-icons/fi";

import "../CSS/Dashside.css";
import { Link } from "react-router-dom";

export default function Dashsidebar() {
  const [open, setOpen] = useState(false);
  const [ordersOpen, setOrdersOpen] = useState(false);

  return (
    <>
      {/* Mobile Header */}

      <div className="mobile-header"  style={{ justifyContent:"space-between"}}>
        <img src={logo} alt="logo"/>

        <button onClick={() => setOpen(!open)}>
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>

      <div className={`overlay ${open ? "show" : ""}`} onClick={() => setOpen(false)}></div>

      <aside className={`sidebar ${open ? "active" : ""}`}>
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="logo" /></Link>
        </div>

        <ul>
<Link to={"/dash"}>
          <li >
            <FiHome />
            Dashboard
          </li></Link>

          <p className="heading">Store Managements</p>



          <Link to="/products"> <li> <FiShoppingCart />
            Products   </li>
          </Link>


          <Link to="/CategoryPage">
            <li>
              <FiGrid />
              Categories
            </li>


          </Link>

          <li onClick={() => setOrdersOpen(!ordersOpen)}>
            <div className="left">
              <FiPackage />
              Orders
            </div>

            {ordersOpen ? <FiChevronUp /> : <FiChevronDown />}
          </li>

          {ordersOpen && (
            <div className="submenu">
             <Link to={"/orderlist"}><span>📋List</span></Link> 
             <Link to={"/OrderSingle"}><span>👉Single</span></Link> 
             
            </div>
          )}
<Link to={"/sellervendor"}>
          <li>
            <FiUsers />
            Sellers / Vendors
          </li>
          </Link>
          <Link to="/Customer">
            <li>
              <FiUsers />
              Customers
            </li>
          </Link>

          <Link to={"/AdminReviews"}>
            <li>
              <FiStar />
              Reviews
            </li></Link>


          <p className="heading">
            Site Settings
            <span className="badge">Coming Soon</span>
          </p>

          <li className="disabled">
            <FiFileText />
            Blog
          </li>

          <li className="disabled">
            <FiImage />
            Media
          </li>

          <li className="disabled">
            <FiSettings />
            Store Settings
          </li>

          <p className="heading">
            Support
            <span className="badge">Coming Soon</span>
          </p>

          <li className="disabled">
            <FiHeadphones />
            Support Ticket
          </li>

          <li className="disabled">
            <FiHelpCircle />
            Help Center
          </li>

          <li className="disabled">
            ♾️
            How FreshCart Works
          </li>

          <p className="heading">Our Apps</p>

          <li className="disabled"> <img src={appstore} alt='appstore' /></li>

          <li className="disabled">   <img src={googlepay} alt='Google pay' /></li>

        </ul>
      </aside>
    </>
  );
}