import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    FiSearch,
    FiMoreVertical,
} from "react-icons/fi";
import { FaEdit, FaTrash } from "react-icons/fa";


import "../CSS/Customer.css";
import axios from "axios";
import Dashsidebar from "./Dashsidebar";
import Swal from "sweetalert2";

const Customer = () => {
    let [myusers, setusers] = useState([])
    const [search, setSearch] = useState("");

const [currentPage, setCurrentPage] = useState(1);

const usersPerPage = 10;

    function getusers() {
        axios.get("https://freshcart-backend-theta.vercel.app/allusers").then((res) => {
            if (res.data.status) {
                setusers(res.data.myallusers)
            }
            else {
                console.log("not  users")
            }
        })
    }

    useEffect(() => {
        getusers()
    }, [])


    // delete customer --------

     let dltcustomer = (dltcus) => {
    axios.post("https://freshcart-backend-theta.vercel.app/deletecustomer", { dltcus }).then((res) => {
      if (res.data.status) {

        Swal.fire({
          icon: "success",
          text: "Customer Deleted"
        }).then(() => {
          window.location.reload()
        })

      }
    })
  }

//   -----------------------
const filteredUsers = myusers.filter((item) => {

    return (
        item.firstname?.toLowerCase().includes(search.toLowerCase()) ||
        item.lastname?.toLowerCase().includes(search.toLowerCase()) ||
        item.email?.toLowerCase().includes(search.toLowerCase()) ||
        item.phone?.toString().includes(search)
    );

});


const lastIndex = currentPage * usersPerPage;

const firstIndex = lastIndex - usersPerPage;

const currentUsers = filteredUsers.slice(firstIndex, lastIndex);

const totalPages = Math.ceil(filteredUsers.length / usersPerPage);




    return (
        <>
            <div className="dashboard-layout">

                <Dashsidebar />

                <div className="dashboard-content">
                    <div className="customer-page">

                        {/* ================= HEADER ================= */}

                        <div className="customer-header">

                            <div className="customer-header-left">

                                <h1>Customers</h1>

                                <div className="customer-breadcrumb">

                                 <Link to={"/dash"}> <span>Dashboard</span></Link>

                                    <span>/</span>

                                    <span>Customers</span>

                                </div>

                            </div>


                        </div>

                        {/* ================= CARD ================= */}

                        <div className="customer-card">

                            {/* SEARCH */}

                            <div className="customer-top">

                                <div className="customer-search">

                                    <FiSearch className="search-icon" />

                                   <input
    type="text"
    placeholder="Search Customers"
    value={search}
    onChange={(e) => {
        setSearch(e.target.value);
        setCurrentPage(1);
    }}
/>

                                </div>

                            </div>

                            {/* TABLE */}

                            <div className="table-wrapper">

                                <table className="customer-table">

                                    <thead>

                                        <tr>

                                            <th>
                                                <input type="checkbox" />
                                            </th>

                                            <th>Name</th>

                                            <th>Email</th>

                                         

                                            <th>Phone</th>

                                            <th>Action</th>

                                        </tr>

                                    </thead>

                                    <tbody>
                                       {currentUsers.map((item) => {
                                            return (
                                                <>
                                                    <tr>
                                                        <td>
                                                            <input type="checkbox" />
                                                        </td>
                                                        <td>{item.firstname}</td>
                                                        <td>{item.email}</td>
                                                        
                                                        <td>{item.phone }</td>

                                                        <td>

                                                            {/* <button className="action-btn edit-action">
                                                                <FaEdit />
                                                            </button> */}

                                                            <button className="action-btn delete-action"  onClick={()=>dltcustomer(item)} >
                                                                <FaTrash />
                                                            </button>

                                                        </td>

                                                    </tr>

                                                </>
                                            )
                                        })}





                                    </tbody>

                                </table>

                            </div>

                            {/* ================= FOOTER ================= */}

                            <div className="customer-footer">

                                <div className="entries">

                                      Showing {currentUsers.length} of {filteredUsers.length} Customers

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

                    </div></div></div>
        </>
    );
};

export default Customer;