import React, { useEffect, useState } from "react";
import "../CSS/Category.css";
import axiosInstance from "../axiosInstance";
import { Link, useNavigate } from "react-router-dom";
import Dashsidebar from "./Dashsidebar";
import { FiSearch, FiChevronDown } from "react-icons/fi";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

export default function Products() {
  const [allproductvalue, setproduct] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;
  const navigate = useNavigate();

  function getproduct() {
    axiosInstance
      .get("/allproduct")
      .then((res) => {
        if (res.data.status) {
          setproduct(res.data.myallproduct || []);
        } else {
          setproduct([]);
        }
      })
      .catch(() => setproduct([]));
  }

  useEffect(() => {
    getproduct();
  }, []);

  // delete product
  const dltproduct = (dltpro) => {
    axiosInstance
      .post("/deleteproduct", { dltpro })
      .then((res) => {
        if (res.data.status) {
          Swal.fire({
            icon: "success",
            text: "Product Deleted",
          }).then(() => {
            getproduct();
          });
        }
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          text: "Failed to delete product.",
        });
      });
  };

  const filteredProducts = allproductvalue.filter((item) => {
    const matchSearch =
      item.Title?.toLowerCase().includes(search.toLowerCase()) ?? false;

    const matchStatus =
      statusFilter === "All" || item.status === statusFilter;

    return matchSearch && matchStatus;
  });

  const lastIndex = currentPage * productsPerPage;
  const firstIndex = lastIndex - productsPerPage;
  const currentProducts = filteredProducts.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage) || 1;

  return (
    <div className="dashboard-layout">
      <Dashsidebar />

      <div className="dashboard-content">
        <div className="category-page">
          {/* HEADER */}
          <div className="category-header">
            <div className="category-title">
              <h1>Products</h1>
              <div className="category-breadcrumb">
                <Link to={"/dash"}>
                  <span>Dashboard</span>
                </Link>
                <span>/</span>
                <span>Products</span>
              </div>
            </div>

            <Link to="/Addproduct" className="add-category-btn">
              Add Product
            </Link>
          </div>

          {/* CARD */}
          <div className="category-card">
            {/* TOP BAR */}
            <div className="category-topbar">
              <div className="search-box">
                <FiSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Search Product"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>

              <div className="filter-box">
                <select
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  <option value="All">All</option>
                  <option value="active">Active</option>
                  <option value="Disabled">Disabled</option>
                </select>
                <FiChevronDown className="select-icon" />
              </div>
            </div>

            {/* TABLE */}
            <div className="table-responsive">
              <table className="category-table">
                <thead>
                  <tr>
                    <th>
                      <input type="checkbox" />
                    </th>
                    <th>Image</th>
                    <th>Product Name</th>
                    <th>Category</th>
                    <th>Status</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {currentProducts.length === 0 ? (
                    <tr>
                      <td colSpan="7" style={{ textAlign: "center", padding: "2rem" }}>
                        No Products Found
                      </td>
                    </tr>
                  ) : (
                    currentProducts.map((item) => (
                      <tr key={item._id}>
                        <td>
                          <input type="checkbox" />
                        </td>
                        <td>
                          <img
                            src={item.image}
                            alt={item.Title}
                            className="category-image"
                          />
                        </td>
                        <td>{item.Title}</td>
                        <td>{item.Category}</td>
                        <td>
                          <span
                            className={`status ${item.status?.toLowerCase()}`}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td>₹{item.RegularPrice}</td>
                        <td>
                          <button
                            className="action-btn edit-action"
                            onClick={() =>
                              navigate("/editproduct", {
                                state: item,
                              })
                            }
                          >
                            <FaEdit />
                          </button>
                          <button
                            className="action-btn delete-action"
                            onClick={() => dltproduct(item)}
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* FOOTER */}
            <div className="table-footer">
              <div className="entries">
                Showing {currentProducts.length} of {filteredProducts.length} Products
              </div>

              <div className="pagination">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  Previous
                </button>

                <button className="active">{currentPage}</button>

                <button
                  disabled={currentPage >= totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}