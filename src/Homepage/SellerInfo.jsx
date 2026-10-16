import React, { useEffect, useState } from "react";
import "../CSS/SellerInfo.css"

import axiosInstance from "../axiosInstance";

export default function SellerInfo({ product }) {

    const [seller, setSeller] = useState({});

    useEffect(() => {
        if (!product?.vendorId) return;

        axiosInstance.post("/vendorbyid", {

            vendorId: product.vendorId

        }).then((res) => {

            if (res.data.status) {

                setSeller(res.data.vendor || {});

            }

        }).catch(() => setSeller({}));

    }, [product]);

    return (

        <div className="seller-info">

            <table>

                <tbody>

                    <tr>
                        <td>Seller Name</td>
                        <td>{seller.vendorName}</td>
                    </tr>

                    <tr>
                        <td>Phone</td>
                        <td>{seller.phone}</td>
                    </tr>

                    <tr>
                        <td>Address</td>
                        <td>{seller.address}</td>
                    </tr>

                    <tr>
                        <td>Email</td>
                        <td>{seller.email}</td>
                    </tr>

                </tbody>

            </table>

        </div>

    );
}