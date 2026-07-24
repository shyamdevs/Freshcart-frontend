import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

import "../CSS/AddVendor.css";
import { useNavigate } from "react-router-dom";

export default function AddVendor() {

    let go = useNavigate()

    const [vendorvalue, setVendorValue] = useState({

        vendorName: "",

        sellerId: "",

        email: "",

        phone: "",

        address: "",

        image: ""

    });

    function getValue(e) {

        setVendorValue({

            ...vendorvalue,

            [e.target.name]: e.target.value

        });

    }

  function saveVendor() {

    if (
        !vendorvalue.vendorName ||
        !vendorvalue.sellerId ||
        !vendorvalue.email ||
        !vendorvalue.phone ||
        !vendorvalue.address ||
        !vendorvalue.image
    ) {

        Swal.fire({
            icon: "warning",
            title: "Please Fill All The Fields"
        });

        return;   // <-- Function yahin ruk jayega
    }

    axios.post("https://freshcart-backend-orpin.vercel.app/addvendor", {
        vendorvalue
    })
    .then((res) => {

        if (res.data.status) {

            Swal.fire({
                icon: "success",
                title: "Vendor Added Successfully"
            });

            go("/sellervendor");

            setVendorValue({
                vendorName: "",
                sellerId: "",
                email: "",
                phone: "",
                address: "",
                image: ""
            });

        } else {

            Swal.fire({
                icon: "error",
                title: "Something Went Wrong"
            });

        }

    });

}

    return (

        <div className="addvendor">

            <h2>Add Vendor</h2>

            <input
                type="text"
                name="vendorName"
                placeholder="Vendor Name"
                value={vendorvalue.vendorName}
                onChange={getValue}
                required
            />

            <input
                type="text"
                name="sellerId"
                placeholder="Seller ID"
                value={vendorvalue.sellerId}
                onChange={getValue}
                required
            />

            <input
                type="email"
                name="email"
                placeholder="Email"
                value={vendorvalue.email}
                onChange={getValue}
                required
            />

            <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={vendorvalue.phone}
                onChange={getValue}
                required
            />

            <input
                type="text"
                name="address"
                placeholder="Address"
                value={vendorvalue.address}
                onChange={getValue}
                required
            />

            <input
                type="text"
                name="image"
                placeholder="Image URL"
                value={vendorvalue.image}
                onChange={getValue}
                required
            />

            <button onClick={saveVendor} >

                Add Vendor

            </button>

        </div>

    );

}