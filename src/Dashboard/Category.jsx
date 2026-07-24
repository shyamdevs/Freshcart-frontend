import React, { useEffect, useState } from "react";

import "../CSS/Category.css";

import {
  FiSearch,
  FiMoreVertical,
  FiChevronDown,
} from "react-icons/fi";
import { FaEdit, FaTrash } from "react-icons/fa"
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Dashsidebar from "./Dashsidebar";
import Swal from "sweetalert2";

const CategoryPage = () => {

  let [mycategory, setcategory] = useState([])
  const go = useNavigate();

  function getallcategory() {
    axios.get("http://localhost:8080/AllCategory").then((res) => {
      if (res.data.status) {
        setcategory(res.data.myallcategory)
      }
      else {
        document.write("not a single category added")
      }
    })
  }
  // product length --------------------


  let [allproduct, setAllproduct] = useState([]);

  function getproduct() {
    axios.get("http://localhost:8080/allproduct").then((res) => {
      if (res.data.status) {
        setAllproduct(res.data.myallproduct);
      }
    });
  }







  useEffect(() => {
    getallcategory()
    getproduct()
  }, [])
  // delete category------------
  let dltcategory = (dltcat) => {
    axios.post("http://localhost:8080/deletecategory", { dltcat }).then((res) => {
      if (res.data.status) {

        Swal.fire({
          icon: "success",
          text: "Category Deleted"
        }).then(() => {
          window.location.reload()
        })

      }
    })
  }

  // -----------------------
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);

  const categoryPerPage = 10;

  const filteredCategory = mycategory.filter((item) => {

    const matchSearch =
      item.categoryName.toLowerCase().includes(search.toLowerCase());

    const matchStatus =
      statusFilter === "All" ||
      item.status === statusFilter;

    return matchSearch && matchStatus;

  });

  const lastIndex = currentPage * categoryPerPage;

  const firstIndex = lastIndex - categoryPerPage;

  const currentCategory = filteredCategory.slice(firstIndex, lastIndex);

  const totalPages = Math.ceil(filteredCategory.length / categoryPerPage);


  return (
    <div className="dashboard-layout">

      <Dashsidebar />

      <div className="dashboard-content">



        <div className="category-page">

          {/* ================= HEADER ================= */}

          <div className="category-header">

            <div className="category-title">

              <h1>Categories</h1>

              <div className="category-breadcrumb">

                <Link to={"/dash"}> <span>Dashboard</span></Link>

                <span>/</span>

                <span>Categories</span>

              </div>

            </div>

            <Link
              to={"/CategoryForm"}
              className="add-category-btn"
            >
              Add New Category
            </Link>

          </div>

          {/* ================= TABLE CARD ================= */}

          <div className="category-card">

            {/* TOP BAR */}

            <div className="category-topbar">

              <div className="search-box">

                <FiSearch className="search-icon" />

                <input
                  type="text"
                  placeholder="Search Category"
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
                  <option value="Active">Published</option>
                  <option value="Disabled">Unpublished</option>
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

                    <th>Icon</th>

                    <th>Name</th>

                    <th>Products</th>

                    <th>Status</th>

                    <th>Action</th>

                  </tr>

                </thead>

                <tbody>

                  {currentCategory.map((item) => {
                    return (
                      <>
                        <tr>
                          <td>  <input type="checkbox" /></td>
                          <td><img src={item.image} /></td>
                          <td>{item.categoryName}</td>
                          <td>{allproduct.filter((product) =>
                            product.Category === item.categoryName
                          ).length}</td>
                          <td>{item.status}</td>

                          <td>

                            <button className="action-btn edit-action"
                              onClick={() =>
                                go("/EditCategory", {
                                  state: item,
                                })
                              }

                            >
                              <FaEdit />
                            </button>

                            <button className="action-btn delete-action" onClick={() => dltcategory(item)}>
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

            <div className="table-footer">

              <div className="entries">

                Showing {currentCategory.length} of {filteredCategory.length} Categories

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
      </div></div>
  );
};

export default CategoryPage;