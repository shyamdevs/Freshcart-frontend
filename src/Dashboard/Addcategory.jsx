import React, { useState } from "react";
import "../CSS/Addcategory.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Dashsidebar from "./Dashsidebar";
import Swal from "sweetalert2";

const CategoryForm = () => {

    let [categoryvalue, setcategory] = useState({})
let go =useNavigate()

    let categoryname = (e) => {
        setcategory({ ...categoryvalue, [e.target.name]: e.target.value })
    }

    const savedata = (e) => {
        e.preventDefault();
        axios.post("https://freshcart-backend-theta.vercel.app/category", { categoryvalue }).then(() => {
                    Swal.fire({
                        text: "Category added!",
                        icon: "success"
                    });
                    go("/CategoryPage")
        
                })
    }


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
                            <Link to={"/dash"}> <span>Dashboard</span></Link>
                            <span>/</span>
                          <Link to={"/CategoryPage"}><span>Categories</span></Link>  
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
                            <input type="text" placeholder="Enter Url" name="image" onChange={categoryname} />

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
                                        onChange={categoryname}
                                    />
                                </div>

                                <div className="fc-group">
                                    <label>Slug</label>
                                    <input
                                        type="text"
                                        placeholder="Slug"
                                        name="slug"
                                        onChange={categoryname}
                                    />
                                </div>

                                <div className="fc-group">
                                    <label>Parent Category</label>

                                    <select name="Category" onChange={categoryname}>
                                        <option value="">Select Category</option>
                                        <option value="Dairy, Bread & Eggs">Dairy, Bread & Eggs</option>
                                        <option value="Snacks & Munchies">Snacks & Munchies</option>
                                        <option value="Fruits & Vegetables">Fruits & Vegetables</option>
                                    </select>

                                </div>

                                <div className="fc-group">
                                    <label>Date</label>

                                    <input type="date" name="date" onChange={categoryname} />

                                </div>

                            </div>

                            <div className="fc-group">

                                <label>Description</label>

                                <textarea
                                    rows="6"
                                    placeholder="Category Description"
                                    name="Description" onChange={categoryname}
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

                                        />
                                        Active
                                    </label>

                                    <label>
                                        <input
                                            type="radio"
                                            name="status"
                                            value="Disabled"
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
                                onChange={categoryname}
                            />

                        </div>

                        <div className="fc-group">

                            <label>Meta Description</label>

                            <textarea
                                rows="6"
                                placeholder="Meta Description"
                                name="MetaDescription"
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

                        <button
                            type="submit"
                            className="fc-create"
                            onClick={savedata}
                        >
                            Create Category
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

export default CategoryForm;