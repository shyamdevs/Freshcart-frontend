import React, { useEffect, useState } from "react";
import "../CSS/Address.css";
import axios from "axios";
import AddressPopup from "./AccAddaddress";
import Swal from "sweetalert2";

export default function Address() {

  const [showPopup, setShowPopup] = useState(false);
  const [addressData, setAddressData] = useState([]);

  useEffect(() => {
    getAddress();
  }, []);

  const user = JSON.parse(localStorage.getItem("user"));
  const getAddress = () => {



    axios.post("https://freshcart-backend-theta.vercel.app/getaddress", {

      userId: user._id

    }).then((res) => {

      if (res.data.status) {
  setAddressData(res.data.addresses);
      }

    });


  };




  const setDefaultAddress = (id) => {

    axios.post("https://freshcart-backend-theta.vercel.app/setdefaultaddress", {

        userId: user._id,

        addressId: id

    }).then((res) => {

        if(res.data.status){

            getAddress();

        }

    });

}

  // delete address --------------------

  const deleteAddress = (id) => {

    Swal.fire({

      title: "Delete Address?",

      text: "This address will be permanently deleted.",

      icon: "warning",

      showCancelButton: true,

      confirmButtonText: "Delete"

    }).then((result) => {

      if (result.isConfirmed) {

        axios.post("https://freshcart-backend-theta.vercel.app/deleteaddress", {

          _id: id

        }).then((res) => {

          if (res.data.status) {

            Swal.fire({

              icon: "success",

              text: "Address Deleted"

            });

            getAddress();

          }

        });

      }

    });

  };


  return (

    <div className="acc-address-page">

      <div className="acc-address-header">

        <h2>Address</h2>

        <button
          className="acc-add-address-btn"
          onClick={() => setShowPopup(true)}
        >
          + Add a new address
        </button>

      </div>

      <div className="acc-address-grid">

        {addressData.length > 0 ? (

          addressData.map((item) => (

            <div className="acc-address-card" key={item._id}>

              <div className="acc-address-card-top">

                <div className="acc-address-type">

                <input
    type="radio"
    checked={item.IsDefault}
    onChange={() => setDefaultAddress(item._id)}
/>

                  <span>
                    {item.BusinessName || "Home"}
                  </span>

                </div>

              </div>

              <div className="acc-address-details">

                <h4>
                  {item.FirstName} {item.LastName}
                </h4>

                <p>{item.AddressLine1}</p>

                {item.AddressLine2 && (
                  <p>{item.AddressLine2}</p>
                )}

                <p>
                  {item.City}, {item.State}
                </p>

                <p>
                  {item.Country} - {item.ZipCode}
                </p>

              </div>

              <div className="acc-default-address">

                {item.IsDefault ? (

                  <span className="acc-default-badge">
                    Default Address
                  </span>

                ) : (

                  <span className="acc-set-default">
                    Set as Default
                  </span>

                )}

              </div>

              <div className="acc-address-actions">

                {/* <button className="acc-edit-btn">
                  Edit
                </button> */}

                <button
                  className="acc-delete-btn"
                  onClick={() => deleteAddress(item._id)}
                >
                  Delete
                </button>

              </div>

            </div>

          ))

        ) : (

          <div className="acc-no-address">

            <h3>No Address Found</h3>

            <p>
              Click "Add a new address" to save your first address.
            </p>

          </div>

        )}

      </div>

      {showPopup && (

        <AddressPopup

          closePopup={() => {

            setShowPopup(false);

            getAddress().then(() => {
              window.location.reload()
            })


          }}

        />

      )}

    </div>

  );

}