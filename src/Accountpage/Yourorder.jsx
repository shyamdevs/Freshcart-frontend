import React, { useEffect, useState } from "react";
import axios from "axios";
import "../CSS/YourOrders.css";
import OrderBillPopup from "./OrderBillPopup";
import { FaEye } from "react-icons/fa";
export default function YourOrders() {

    const user = JSON.parse(localStorage.getItem("user"));

    const [orders, setOrders] = useState([]);
    const [showBill, setShowBill] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [address, setAddress] = useState({});

    useEffect(() => {
        getOrders();
        getAddress();
    }, []);

    // Orders
    function getOrders() {

        axios.post("https://freshcart-backend-orpin.vercel.app/myorders", {

            userId: user._id

        }).then((res) => {

            if (res.data.status) {

                setOrders(res.data.myorders);

            }

        });

    }

    function closeBill(){

    setShowBill(false);

    getOrders();

}

    // Address
    function getAddress() {

        axios.post("https://freshcart-backend-orpin.vercel.app/getaddress", {

            userId: user._id

        }).then((res) => {

            if (res.data.status && res.data.addresses.length > 0) {

                const defaultAddress =
                    res.data.addresses.find((item) => item.IsDefault) ||
                    res.data.addresses[0];

                setAddress(defaultAddress);

            }

        });

    }

    return (
        <>

            <div className="orders-page">

                <h2 className="orders-title">

                    Your Orders

                </h2>

                <table className="orders-table">

                    <thead>

                        <tr>

                            <th>Product</th>

                            <th>Order</th>

                            <th>Date</th>

                            <th>Items</th>

                            <th>Status</th>

                            <th>Amount</th>

                            <th>Action</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            orders.map((item) => (

                                <tr key={item._id}>

                                    <td className="product-info">

                                        <img
                                            src={item.image}
                                            alt=""
                                            className="order-image"
                                        />

                                        <div>

                                            <h4>{item.Title}</h4>

                                            <p>{item.Weight}</p>

                                        </div>

                                    </td>

                                    <td>{item.orderNo}</td>

                                    <td>{item.date}</td>

                                    <td>{item.quantity}</td>

                                    <td>

                                        <span className="status">

                                            {item.status}

                                        </span>

                                    </td>

                                    <td>

                                        ₹{item.SalePrice * item.quantity}

                                    </td>

                                    <td>

                                        <button
                                            className="view-btn"
                                            onClick={() => {

                                                setSelectedOrder(item);

                                                setShowBill(true);

                                            }}
                                        >

                                            <FaEye />

                                        </button>

                                    </td>

                                </tr>

                            ))

                        }

                    </tbody>

                </table>

            </div>

            {
                showBill && (

                    <OrderBillPopup

                        order={selectedOrder}

                        user={user}

                        address={address}

                         closePopup={closeBill}

                    />

                )
            }

        </>
    );
}