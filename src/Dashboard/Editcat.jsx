import React, { useEffect, useState } from "react";
import "../CSS/Addcategory.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Dashsidebar from "./Dashsidebar";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";

const Editcat = () => {
    const location = useLocation();
const go = useNavigate();

    let [categoryvalue, setcategory] = useState({})


    let categoryname = (e) => {
        setcategory({ ...categoryvalue, [e.target.name]: e.target.value })
    }

  const updatedata = (e) => {
    e.preventDefault();

    axios.post(
        "https://freshcart-backend-theta.vercel.app/updatecategory",
        {categoryvalue}
    ).then((res) => {

        if (res.data.status) {

            Swal.fire({
                icon: "success",
                text: "Category Updated"
            });

            go("/CategoryPage");
        }
    });
};



    useEffect(() => {
        if (location.state) {
            setcategory(location.state);
        }
    }, [location.state]);

    return (
        <>
      <div className="dashboard-layout">

<Dashsidebar/>

<div className="dashboard-content">




        <div className="fc-page">
            <div className="fc-container">

                {/* ================= HEADER ================= */}

                <div className="fc-header">

                    <div className="fc-header-left">

                        <h1>Add New Category</h1>

                        <div className="fc-breadcrumb">
                            <span>Dashboard</span>
                            <span>/</span>
                            <span>Categories</span>
                            <span>/</span>
                            <span className="active">Add Category</span>
                        </div>

                    </div>
                    <Link to={"/CategoryPage"} style={{ textDecoration: "none", }} >
                        <button className="fc-back-btn">

                            ← Back to Categories


                        </button>  </Link>

                </div>

                <form >

                    {/* ================= TOP GRID ================= */}

                    <div className="fc-top-grid">

                        {/* ================= IMAGE CARD ================= */}

                        <div className="fc-card fc-image-card">

                            <h3>Category Image</h3>
                            <input type="text" placeholder="Enter Url"   value={categoryvalue.image || ""} name="image" onChange={categoryname} />

                        </div>

                        {/* ================= INFO CARD ================= */}

                        <div className="fc-card">

                            <h3>Category Information</h3>

                            <div className="fc-grid">

                                <div className="fc-group">
                                    <label>Category Name</label>
                                    <input
                                        type="text"
                                        placeholder="Category Name"
                                        name="categoryName"
                                          value={categoryvalue.categoryName || ""}
                                        onChange={categoryname}

                                    />
                                </div>

                                <div className="fc-group">
                                    <label>Slug</label>
                                    <input
                                        type="text"
                                        placeholder="Slug"
                                        name="slug"
                                          value={categoryvalue.slug || ""}
                                        onChange={categoryname}
                                    />
                                </div>

                                <div className="fc-group">
                                    <label>Parent Category</label>

                                    <select name="Category"   value={categoryvalue.Category || ""}  onChange={categoryname}>
                                        <option value="">Select Category</option>
                                        <option value="Dairy, Bread & Eggs">Dairy, Bread & Eggs</option>
                                        <option value="Snacks & Munchies">Snacks & Munchies</option>
                                        <option value="Fruits & Vegetables">Fruits & Vegetables</option>
                                    </select>

                                </div>

                                <div className="fc-group">
                                    <label>Date</label>

                                    <input type="date" name="date"   value={categoryvalue.date || ""} onChange={categoryname} />

                                </div>

                            </div>

                            <div className="fc-group">

                                <label>Description</label>

                                <textarea
                                    rows="6"
                                    placeholder="Category Description"
                                    name="Description"   value={categoryvalue.Description || ""} onChange={categoryname}
                                ></textarea>

                            </div>

                            <div className="fc-status">

                                <label>Status</label>

                                <div className="fc-radio">

                                    <label>
                                        <input
                                            type="radio"
                                            name="status"
                                            value="Active"
                                            onChange={categoryname}
  checked={categoryvalue.status === "Active"}
                                        />
                                        Active
                                    </label>

                                    <label>
                                        <input
                                            type="radio"
                                            name="status"
                                          value="Disabled"
                                              checked={categoryvalue.status === "Disabled"}
                                            onChange={categoryname}
                                        />
                                        Disabled
                                    </label>

                                </div>

                            </div>

                        </div>

                    </div>

                    {/* ================= META CARD ================= */}

                    <div className="fc-card fc-meta-card">

                        <h3>Meta Data</h3>

                        <div className="fc-group">

                            <label>Meta Title</label>

                            <input
                                type="text"
                                placeholder="Meta Title"
                                name="metaTitle"
                                  value={categoryvalue.metaTitle || ""}
                                onChange={categoryname}
                            />

                        </div>

                        <div className="fc-group">

                            <label>Meta Description</label>

                            <textarea
                                rows="6"
                                placeholder="Meta Description"
                                name="MetaDescription"
                                  value={categoryvalue.MetaDescription || ""}
                                onChange={categoryname}
                            ></textarea>

                        </div>

                    </div>

                    {/* ================= BUTTONS ================= */}

                    <div className="fc-buttons">

                        <button
                            type="button"
                            className="fc-save"
                        >
                            Save Draft
                        </button>

                      <button type="submit"
    className="fc-create"
    onClick={updatedata}
>
    Update Category
</button>

                    </div>

                </form>
            </div>
        </div>
        </div>
         </div>
       </>
    );
};

export default Editcat;