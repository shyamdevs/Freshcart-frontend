import React, { useEffect, useState } from "react";
import "../CSS/AdminOrderList.css";
import Dashsidebar from "./Dashsidebar";
import axios from "axios";
import { FaEllipsisV } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function AdminOrderList() {

    const [orders, setOrders] = useState([]);

    const [search, setSearch] = useState("");
const [statusFilter, setStatusFilter] = useState("All");
const [currentPage, setCurrentPage] = useState(1);

const ordersPerPage = 10;

    const navigate = useNavigate();


const location = useLocation();
   useEffect(()=>{

    getOrders();

},[location]);

    function getOrders() {

        axios.get("https://freshcart-backend-orpin.vercel.app/orders").then((res) => {

            if (res.data.status) {

                setOrders(res.data.myorders);

            }

        });

    }


    const filteredOrders = orders.filter((item) => {

    const matchSearch =
        item.orderNo.toLowerCase().includes(search.toLowerCase()) ||
        item.Title.toLowerCase().includes(search.toLowerCase()) ||
        item.customerName.toLowerCase().includes(search.toLowerCase());

    const matchStatus =
        statusFilter === "All" ||
        item.status === statusFilter;

    return matchSearch && matchStatus;

});


const lastIndex = currentPage * ordersPerPage;

const firstIndex = lastIndex - ordersPerPage;

const currentOrders = filteredOrders.slice(firstIndex, lastIndex);

const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);









    return (
        <>
            <div className="dashboard-layout">
                <Dashsidebar />

                <div className="dashboard-content">


                    <h1>Order List</h1>

                    <div className="order-top">

                    <input
    type="text"
    placeholder="Search Order"
    className="order-search"
    value={search}
    onChange={(e) => {
        setSearch(e.target.value);
        setCurrentPage(1);
    }}
/>

                  <select
    className="order-filter"
    value={statusFilter}
    onChange={(e) => {
        setStatusFilter(e.target.value);
        setCurrentPage(1);
    }}
>

    <option value="All">All Status</option>

    <option value="Processing">Processing</option>

    <option value="Completed">Completed</option>

    <option value="Cancel">Cancel</option>

</select>

                    </div>

                    <div className="order-table">

                        <table>

                            <thead>

                                <tr>

                                    <th>Image</th>

                                    <th>Order Name</th>
                                    <th>Customer</th>

                                    <th>Date</th>

                                    <th>Items</th>

                                    <th>Status</th>

                                    <th>Amount</th>

                                    <th></th>

                                </tr>

                            </thead>

                            <tbody>

                                {

                                   currentOrders.map((item) => (

                                        <tr key={item._id}>

                                            <td>

                                                <img
                                                    src={item.image}
                                                    alt=""
                                                    className="order-img"
                                                />

                                            </td>

                                            <td>

                                                <div>

                                                    <h4>{item.orderNo}</h4>

                                                    <p>{item.Title}</p>

                                                </div>

                                            </td>
                                            <td>{item.customerName}</td>

                                            <td>{item.date}</td>

                                            <td>{item.quantity}</td>

                                            <td>

                                                <span
                                                    className={
                                                        item.status === "Completed"
                                                            ? "completed"

                                                            : item.status === "Cancel"
                                                                ? "cancel"

                                                                : "processing"
                                                    }
                                                >

                                                    {item.status}

                                                </span>

                                            </td>

                                            <td>

                                                ₹{item.SalePrice * item.quantity}

                                            </td>

                                            <td>
                                                <FaEye
                                                    className="eye-icon"
                                                    onClick={() =>
                                                        navigate("/OrderSingle", {
                                                            state: {
                                                                orderNo: item.orderNo
                                                            }
                                                        })
                                                    }
                                                />


                                            </td>



                                        </tr>

                                    ))

                                }

                            </tbody>


                            







                        </table>

                        <div className="table-footer">

    <div className="entries">

        Showing {currentOrders.length} of {filteredOrders.length} Orders

    </div>

    <div className="pagination">

        <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
        >
            Previous
        </button>

        <button className="active">
            {currentPage}
        </button>

        <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
        >
            Next
        </button>

    </div>

</div>

                    </div>



                </div>
            </div>

        </>

    );

}