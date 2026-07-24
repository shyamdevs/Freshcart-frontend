import React, { useEffect, useState } from "react";
import "../CSS/OrderSingle.css";
import Dashsidebar from "./Dashsidebar";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";
import { usePDF } from "react-to-pdf";
import Swal from "sweetalert2";


export default function OrderSingle() {

    const location = useLocation();

    const orderNo = location.state?.orderNo;

    const [orders, setOrders] = useState([]);
    console.log(orders)

    const [status, setStatus] = useState("");

    const [note, setNote] = useState("");
    const { toPDF, targetRef } = usePDF({
        filename: `${orders[0]?.customerName || "Invoice"}-${orders[0]?.orderNo || ""}.pdf`
    });


    useEffect(() => {

        if (orders.length > 0) {

            setStatus(orders[0].status);

        }

    }, [orders]);


    useEffect(() => {

        getOrder();

    }, []);

    function getOrder() {

        axios.post("http://localhost:8080/ordersingle", {

            orderNo: orderNo

        }).then((res) => {

            if (res.data.status) {

                setOrders(res.data.order);

                if (res.data.order.length > 0) {

                    setStatus(res.data.order[0].status);

                }

            }

        });

    }

    // save -------------status ----------
    function saveStatus() {

        axios.post("http://localhost:8080/updateorderstatus", {

            orderNo: order.orderNo,

            status: status

        }).then((res) => {

            if (res.data.status) {

                Swal.fire({
                    icon: "success",
                    title: "Success!",
                    text: "Order status updated successfully.",
                    confirmButtonColor: "#16a34a"
                });

                getOrders();

            }

        });

    }




    const subtotal = orders.reduce((sum, item) => {

        return sum + (item.SalePrice * item.quantity);

    }, 0);

    const shipping = 40;

    const grandTotal = subtotal + shipping;

    if (orders.length === 0) {

        return (

            <div className="dashboard-layout">

                <Dashsidebar />

                <div className="dashboard-content">

                    <h2>Loading...</h2>

                </div>

            </div>

        );

    }

    const order = orders[0];



    return (

        <div className="dashboard-layout">

            <Dashsidebar />

            <div className="dashboard-content">

                <div className="single-top">

                    <div>

                        <h1>Order Single</h1>

                        <p>
                        <Link to={"/dash"}>Dashboard</Link>

                             / Order Single

                        </p>

                    </div>

                    <Link
                        to="/orderlist"
                        className="back-btn"
                    >
                        <button>  Back to all orders</button>



                    </Link>

                </div>

                <div className="single-card" ref={targetRef} >

                    <div className="single-header">

                        <div>

                            <h2>

                                Order ID : {order.orderNo}

                            </h2>

                            <span className="processing">

                                {status}

                            </span>

                        </div>

                        <div className="status-area">

                            <select

                                value={status}

                                onChange={(e) => setStatus(e.target.value)}

                            >

                                <option>

                                    Processing

                                </option>

                                <option>

                                    Completed

                                </option>

                                <option>

                                    Cancel

                                </option>

                            </select>

                            <button className="save-btn" onClick={saveStatus}>

                                Save

                            </button>

                            <button className="save-btn" onClick={() => toPDF()} >

                                Download Invoice
                            </button>

                        </div>

                    </div>

                    <div className="detail-grid">

                        <div className="detail-box">

                            <h3>

                                Customer Details

                            </h3>

                            <p>

                                {order.customerName}

                            </p>

                            <p>

                                {order.email}

                            </p>

                            <p>

                                {order.phone}

                            </p>

                        </div>

                        <div className="detail-box">

                            <h3>

                                Shipping Address

                            </h3>

                            <p>

                                {order.address}

                            </p>

                            <p>

                                {order.city}

                            </p>

                            <p>

                                {order.state}

                            </p>

                            <p>

                                {order.country}

                            </p>

                            <p>

                                {order.zipCode}

                            </p>

                        </div>

                        <div className="detail-box">

                            <h3>

                                Order Details

                            </h3>

                            <p>

                                Order ID : {order.orderNo}

                            </p>

                            <p>

                                Date : {order.date}

                            </p>

                            <p>

                                Total : ₹{grandTotal}

                            </p>

                        </div>

                    </div>

                    <table className="single-table">

                        <thead>

                            <tr>

                                <th>

                                    Product

                                </th>

                                <th>

                                    Price

                                </th>

                                <th>

                                    Qty

                                </th>

                                <th>

                                    Total

                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {
                                orders.map((item) => (
                                    <tr key={item._id}>

                                        <td>

                                            <div className="product-info">

                                                <img
                                                    src={item.image}
                                                    alt=""
                                                    className="product-image"
                                                />

                                                <div>

                                                    <h4>{item.Title}</h4>

                                                    <p>{item.Weight}</p>

                                                </div>

                                            </div>

                                        </td>

                                        <td>

                                            ₹{item.SalePrice}

                                        </td>

                                        <td>

                                            {item.quantity}

                                        </td>

                                        <td>

                                            ₹{item.SalePrice * item.quantity}

                                        </td>

                                    </tr>

                                ))

                            }

                        </tbody>

                    </table>

                    <div className="bottom-grid">

                        <div className="note-box">

                            <h3>

                                Order Notes

                            </h3>

                            <textarea

                                rows="7"

                                placeholder="Write note..."

                                value={note}

                                onChange={(e) => setNote(e.target.value)}

                            >

                            </textarea>

                        </div>

                        <div className="summary-box">

                            <h3>

                                Order Summary

                            </h3>

                            <div className="summary-row">

                                <span>

                                    Sub Total

                                </span>

                                <span>

                                    ₹{subtotal}

                                </span>

                            </div>

                            <div className="summary-row">

                                <span>

                                    Shipping

                                </span>

                                <span>

                                    ₹{shipping}

                                </span>

                            </div>

                            <div className="summary-row total">

                                <span>

                                    Grand Total

                                </span>

                                <span>

                                    ₹{grandTotal}

                                </span>

                            </div>

                            <hr />

                            <h3>

                                Payment Info

                            </h3>

                            <div className="summary-row">

                                <span>

                                    Method

                                </span>

                                <span>

                                    Online Payment

                                </span>

                            </div>

                            <div className="summary-row">

                                <span>

                                    Status

                                </span>

                                <span>

                                    Paid

                                </span>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}