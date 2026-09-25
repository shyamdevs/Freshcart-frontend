import React, { useEffect, useState } from "react";
import "../CSS/Navbar.css";
import logo from "../Images/freshcart-logo.svg";
import { Link } from "react-router-dom";
import CartPopup from "./CartPopup";
import axios from "axios";
import Swal from "sweetalert2";

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(false);
  const [openAccount, setOpenAccount] = useState(false);
  const [locationName, setLocationName] = useState("Location");

  const [showCart, setShowCart] = useState(false);

  const [wishlistCount, setWishlistCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);

  // ✅ 1. LocalStorage se logged-in user ka email extract karein
  const user = JSON.parse(localStorage.getItem("user"));
  const userEmail = user?.email || localStorage.getItem("email");

  useEffect(() => {
    getWishlistCount();
    getCartCount();
  }, [userEmail]); // userEmail badalne par re-run hoga

  // ✅ 2. Wishlist Count Fetch (User Specific)
  const getWishlistCount = () => {
    if (!userEmail) {
      setWishlistCount(0);
      return;
    }

    axios
      .post("https://freshcart-backend-orpin.vercel.app/wishlistcount", {
        email: userEmail,
      })
      .then((res) => {
        if (res.data.status) {
          setWishlistCount(res.data.count);
        }
      })
      .catch((err) => console.log(err));
  };

  // ✅ 3. Cart Count Fetch (User Specific)
 const getCartCount = () => {
    if (!userEmail) {
        setCartCount(0);
        return;
    }

    axios.post("https://freshcart-backend-orpin.vercel.app/cartcount", {
        email: userEmail
    })
    .then((res) => {
        if (res.data.status) {
            setCartCount(res.data.count);
        }
    })
    .catch((err) => {
        console.log("Cart Count Error:", err);
    });
};

  
  //search -------------------------------------------------------------
  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState([]);

  const searchProduct = async (value) => {

    setSearch(value);

    if (value.trim() === "") {
      setSearchData([]);
      return;
    }

    let res = await axios.get(
      `https://freshcart-backend-orpin.vercel.app/searchproduct?keyword=${value}`
    );

    if (res.data.status) {
      setSearchData(res.data.products);
    }

  };
  // location ----------------------------------
const getLocation = async () => {
  if (!navigator.geolocation) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Geolocation is not supported by your browser.",
      confirmButtonColor: "#0aad0a",
    });
    return;
  }

  try {
    if (navigator.permissions) {
      const permission = await navigator.permissions.query({
        name: "geolocation",
      });

      if (permission.state === "denied") {
      Swal.fire({
  icon: "warning",
  title: "Location Permission Blocked",
  html: `
    <p>Please enable location permission.</p>
    <ol style="text-align:left;">
      <li>Click the 🔒 icon in the address bar.</li>
      <li>Change <b>Location</b> to <b>Allow</b>.</li>
      <li>Refresh the page.</li>
    </ol>
  `,
  confirmButtonColor: "#0aad0a",
});
        return;
      }
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        const res = await axios.get(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
        );

        const address = res.data.address;

        setLocationName(
          `${address.city || address.town || address.village || address.hamlet || "Unknown"}, ${address.state || ""}`
        );
      },
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          Swal.fire({
            icon: "warning",
            title: "Permission Denied",
            text: "Please allow location access to detect your current location.",
            confirmButtonColor: "#0aad0a",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Location Error",
            text: "Unable to fetch your current location.",
            confirmButtonColor: "#0aad0a",
          });
        }
      }
    );
  } catch (err) {
    console.log(err);

    Swal.fire({
      icon: "error",
      title: "Something went wrong",
      text: "Unable to get your location.",
      confirmButtonColor: "#0aad0a",
    });
  }
};

 



  return (
    <>
      <header className="fresh-navbar">
        {/* Top Bar */}
        <div className="top-bar">
          <div className="nav-wrapper top-bar-inner">
            <p>Super Value Deals - Save more with coupons</p>

            <div className="language-box">
              <select>
                <option>English</option>
                <option>Hindi</option>
                <option>Marwadi</option>
                <option>Haryanvi</option>

              </select>

            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="main-header">
          <div className="nav-wrapper main-header-inner">
            {/* Logo */}
            <Link to="/Home" className="brand-logo">
              <img src={logo} alt="logo" />
            </Link>

            {/* Search */}
            <div className="search-area">
              <input
                type="text"
                placeholder="Search for products"
                value={search}
                onChange={(e) => searchProduct(e.target.value)}
              />
              <button type="button" aria-label="Search">
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
                  <path d="M20 20l-4.2-4.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>

              {
                searchData.length > 0 && (

                  <div className="search-result">

                    {
                      searchData.map((item) => (

                        <Link
                          to="/ProductDetails"
                          state={{ product: item }}
                          className="search-item"
                          key={item._id}
                        >

                          <img
                            src={item.image}
                            alt=""
                            width="45"
                          />

                          <div>

                            <h6>{item.Title}</h6>

                            <p>₹ {item.SalePrice}</p>

                          </div>

                        </Link>
                      ))
                    }

                  </div>

                )
              }
            </div>

            {/* Location */}
            <button className="location-btn" onClick={getLocation}>
              <svg width="22" height="22" viewBox="0 0 24 24">
                <path
                  d="M12 21s7-5.3 7-12a7 7 0 0 0-14 0c0 6.7 7 12 7 12Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <circle
                  cx="12"
                  cy="9"
                  r="2.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>

              <span>{locationName}</span>
            </button>

            {/* Icons */}
            <div className="nav-icons">
              <Link to="/Wishlist" className="icon-link">
                <svg width="26" height="26" viewBox="0 0 24 24">
                  <path
                    d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
                <span className="badge">  {wishlistCount}</span>
              </Link>

              <Link to="/" className="icon-link">
                <svg width="26" height="26" viewBox="0 0 24 24">
                  <path
                    d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <circle cx="12" cy="7" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
                </svg>
              </Link>

              <button
                className="icon-link"
                onClick={() => setShowCart(true)}
              >

                <svg width="26" height="26" viewBox="0 0 24 24">
                  <path
                    d="M6 8h12l-1 13H7L6 8Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M9 8a3 3 0 0 1 6 0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>

                <span className="badge">  {cartCount}</span>

              </button>
            </div>

            {/* Mobile Menu Button */}
            <button className="menu-btn" onClick={() => setOpenMenu(!openMenu)}>
              {openMenu ? (
                <svg width="28" height="28" viewBox="0 0 24 24">
                  <path d="M18 6 6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" />
                </svg>
              ) : (
                <svg width="30" height="30" viewBox="0 0 24 24">
                  <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          <div className="nav-wrapper desktop-nav-inner">
            <button className="department-btn">
              <svg width="20" height="20" viewBox="0 0 24 24">
                <rect x="4" y="4" width="6" height="6" fill="none" stroke="currentColor" strokeWidth="2" />
                <rect x="14" y="4" width="6" height="6" fill="none" stroke="currentColor" strokeWidth="2" />
                <rect x="4" y="14" width="6" height="6" fill="none" stroke="currentColor" strokeWidth="2" />
                <rect x="14" y="14" width="6" height="6" fill="none" stroke="currentColor" strokeWidth="2" />
              </svg>
              All Departments
            </button>

            <ul className="nav-links">
              <li><a href="#">Home </a></li>
              <li><a href="#">Shop </a></li>
              <li><a href="#">Stores </a></li>
              <li><a href="#">Mega menu </a></li>
              <li><a href="#">Pages </a></li>

              <li className="account-menu">

                <span
                  className="account-btn"
                  onClick={() => setOpenAccount(!openAccount)}
                >
                  Account
                </span>


                {openAccount && (

                  <div className="dropdown" style={{ position: "absolute" }}>
                    <Link to="/Signin">Sign In</Link>

                    <Link to="/">Sign Up</Link>

                    <Link to="/ForgotPassword">Forgot Password</Link>
                    <div className="sub-menu">
                      <span className="sub-btn">
                        My Account
                        <i className="fa-solid fa-angle-right"></i>
                      </span>

                      <div className="sub-dropdown">
                        <Link to="/account/YourOrder">Orders</Link>
                        <Link to="/account/settings">Settings</Link>
                        <Link to="/account/Address">Address</Link>
                        <Link to="/account/PaymentMethod">Payment Method</Link>
                        <Link to="/account/notification">Notification</Link>
                      </div>
                    </div>

                  </div>

                )}
              </li>
              <li><Link to="/dash">Dashboard</Link></li>
              <li><a href="#">Docs</a></li>
            </ul>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className={`mobile-panel ${openMenu ? "show" : ""}`}>


          <div className="mobile-search">

            <input
              type="text"
              placeholder="Search for products"
              value={search}
              onChange={(e) => searchProduct(e.target.value)}
            />

            <button type="button">
              Search
            </button>

            {searchData.length > 0 && (
              <div className="mobile-search-result">

                {searchData.map((item) => (
                  <Link
                    key={item._id}
                    to="/productdetails"
                    state={{ product: item }}
                    className="search-item"
                    onClick={() => {
                      setSearch("");
                      setSearchData([]);
                      setOpenMenu(false);
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.Title}
                      width="45"
                    />

                    <div>
                      <h6>{item.Title}</h6>
                      <p>₹ {item.SalePrice}</p>
                    </div>

                  </Link>
                ))}

              </div>
            )}

          </div>

          <div className="mobile-location" onClick={getLocation}>

            <svg width="22" height="22" viewBox="0 0 24 24">
              <path
                d="M12 21s7-5.3 7-12a7 7 0 0 0-14 0c0 6.7 7 12 7 12Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />

              <circle
                cx="12"
                cy="9"
                r="2.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>

            <span>{locationName}</span>

          </div>

          <button className="department-btn mobile-dept">All Departments</button>

          <a href="#">Home</a>
          <a href="#">Shop</a>
          <a href="#">Stores</a>
          <a href="#">Mega menu</a>
          <a href="#">Pages</a>
          <Link to="/account">Account</Link>
          <Link to="/dash">Dashboard</Link>
          <a href="#">Docs</a>
        </div>


        {showCart && (
          <CartPopup
            closePopup={() => setShowCart(false)}
          />
        )}
      </header >

    </>

  );
}