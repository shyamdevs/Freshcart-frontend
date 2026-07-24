import React, { useState } from "react";
import "../CSS/AccAddaddress.css";
import axios from "axios";
import Swal from "sweetalert2";

export default function AddressPopup({ closePopup }) {

  const user = JSON.parse(localStorage.getItem("user"));

  const [addressdata, setAddressdata] = useState({});

  const handleChange = (e) => {

    setAddressdata({

      ...addressdata,

      [e.target.name]: e.target.value

    });



  };

  const saveAddress = (e) => {

    e.preventDefault();

    axios.post("http://localhost:8080/addaddress", {

      addressdata: {

        ...addressdata,

        userid: user._id

    }

    }).then((res) => {

      if (res.data.status) {

        Swal.fire({

          icon: "success",

          text: "Address Added Successfully"

        });

        closePopup();

      }

      else {

        Swal.fire({

          icon: "error",

          text: "Something went wrong"

        });

      }

    });

  };

  return (

    <div className="address-overlay">

      <div className="address-popup">

        <h2 className="popup-title">
          Add New Address
        </h2>

        <p className="popup-subtitle">
          Add new shipping address for your order delivery.
        </p>

        <form className="address-form" onSubmit={saveAddress}>

          <input
            type="text"
            name="FirstName"
            placeholder="First Name"
            className="address-input"
            value={addressdata.FirstName}
            onChange={handleChange}
          />

          <input
            type="text"
            name="LastName"
            placeholder="Last Name"
            className="address-input"
            value={addressdata.LastName}
            onChange={handleChange}
          />

          <input
            type="text"
            name="AddressLine1"
            placeholder="Address Line 1"
            className="address-input"
            value={addressdata.AddressLine1}
            onChange={handleChange}
          />

          <input
            type="text"
            name="AddressLine2"
            placeholder="Address Line 2"
            className="address-input"
            value={addressdata.AddressLine2}
            onChange={handleChange}
          />

          <input
            type="text"
            name="City"
            placeholder="City"
            className="address-input"
            value={addressdata.City}
            onChange={handleChange}
          />

          <select
            name="Country"
            className="address-select"
            value={addressdata.Country}
            onChange={handleChange}
          >
            <option>India</option>
            <option>United States</option>
            <option>Canada</option>
            <option>Australia</option>
          </select>

          <select
            name="State"
            className="address-select"
            value={addressdata.State}
            onChange={handleChange}
          >
            <option>Gujarat</option>
            <option>Maharashtra</option>
            <option>Delhi</option>
            <option>Rajasthan</option>
            <option>Punjab</option>
          </select>

          <input
            type="text"
            name="ZipCode"
            placeholder="Zip Code"
            className="address-input"
            value={addressdata.ZipCode}
            onChange={handleChange}
          />

          <input
            type="text"
            name="BusinessName"
            placeholder="Business Name"
            className="address-input"
            value={addressdata.BusinessName}
            onChange={handleChange}
          />

          <label className="checkbox-area">

      <input
  type="checkbox"
  name="IsDefault"
  checked={addressdata.IsDefault}
  onChange={(e) =>
    setAddressdata({
      ...addressdata,
      IsDefault: e.target.checked
    })
  }
/>

            <span>Set as Default</span>

          </label>

          <div className="popup-buttons">

            <button
              type="button"
              className="cancel-btn"
              onClick={closePopup}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="save-btn"
              onClick={saveAddress}
            >
              Save Address
            </button>

          </div>

        </form>

      </div>

    </div>

  );
}