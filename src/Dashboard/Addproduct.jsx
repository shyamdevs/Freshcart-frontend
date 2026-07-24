import React, { useEffect, useState } from 'react'
import "../CSS/Addproduct.css"
import axios from 'axios'
import Dashsidebar from './Dashsidebar'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

export default function Addproduct() {

    let [productvalue, setproductvalue] = useState({})

    let go = useNavigate()

    const [vendors, setVendors] = useState([]);

    useEffect(() => {

        axios.get("https://freshcart-backend-theta.vercel.app/allvendor")

            .then((res) => {

                if (res.data.status) {

                    setVendors(res.data.myallvendor);

                }

            });

    }, []);



    let productname = (e) => {

        let { name, value } = e.target;

        if (name === "vendorId") {

            let vendor = vendors.find((v) => v._id === value);

            setproductvalue({

                ...productvalue,

                vendorId: value,

                vendorName: vendor ? vendor.vendorName : ""

            });

        }

        else {

            setproductvalue({

                ...productvalue,

                [name]: value

            });

        }

    }

    const savedata = (e) => {
        e.preventDefault();
        axios.post("https://freshcart-backend-theta.vercel.app/product", { productvalue }).then(() => {
            Swal.fire({
                text: "Product added!",
                icon: "success"
            });
            go("/products")

        })
    }


    let [categories, setcategories] = useState([])



    let getcategory = () => {
        axios.get("https://freshcart-backend-theta.vercel.app/AllCategory").then((res) => {
            if (res.data.status) {
                setcategories(res.data.myallcategory)
            }
        })
    }
    useEffect(() => {
        getcategory()
    }, [])


    return (
        <>
            <div className="dashboard-layout">

                <Dashsidebar />

                <div className="dashboard-content">


                    <div className="product-page">
                        <form className="product-form">

                            {/* Left Section */}

                            <div className="left-section">

                                <div className="card">
                                    <h2>Product Information</h2>

                                    <div className="grid">

                                        <div className="form-group">
                                            <label>Title</label>
                                            <input
                                                type="text"
                                                placeholder="Product Name"
                                                name='Title' onChange={productname}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label>Product Category</label>

                                            <select name="Category" onChange={productname}>
                                                <option value="">Product Category</option>
                                                {categories.map((item) => {
                                                    return (
                                                        <>
                                                            <option>{item.categoryName}</option>
                                                        </>
                                                    )
                                                })}
                                            </select>
                                        </div>

                                        <div className="form-group">
                                            <label>Weight</label>

                                            <input
                                                type="text"
                                                placeholder="Weight"
                                                name='Weight' onChange={productname}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label>Unit</label>

                                            <select name='Unit' onChange={productname}>
                                                <option value="">Select Units</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                            </select>
                                        </div>

                                    </div>
                                </div>

                                <div className="card">

                                    <h2>Product Images</h2>
                                    <input type="text" placeholder='Enter image url' name='image' onChange={productname} />



                                </div>


                                <div className="card">

                                    <h2>Vendor Information</h2>

                                    <div className="form-group">

                                        <label>Select Vendor</label>

                                        <select
                                            name="vendorId"
                                            value={productvalue.vendorId || ""}
                                            onChange={productname}
                                        >
                                            <option value="">Select Vendor</option>

                                            {
                                                vendors.map((item) => (
                                                    <option
                                                        key={item._id}
                                                        value={item._id}
                                                    >
                                                        {item.vendorName}
                                                    </option>
                                                ))
                                            }

                                        </select>

                                    </div>

                                </div>



                                <div className="card">

                                    <h2>Product Description</h2>

                                    <textarea
                                        rows="8"
                                        name='Description'
                                        placeholder="Write description..." onChange={productname}
                                    ></textarea>

                                </div>

                            </div>

                            {/* Right Section */}

                            <div className="right-section">

                                <div className="card">

                                    <div className="stock-toggle">

                                        <label className="switch">
                                            <input type="checkbox" defaultChecked />
                                            <span className="slider"></span>
                                        </label>

                                        <span className="stock-text">
                                            In Stock
                                        </span>

                                    </div>

                                    <div className="form-group">
                                        <label>Product Code</label>

                                        <input
                                            type="text"
                                            name='ProductCode'
                                            placeholder="Enter Product Code" onChange={productname}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Product SKU</label>

                                        <input
                                            type="text"
                                            name='ProductSKU'
                                            placeholder="Enter Product SKU" onChange={productname}
                                        />
                                    </div>

                                    <div className="form-group">

                                        <label>Status</label>

                                        <div className="radio">

                                            <label>
                                                <input
                                                    type="radio"
                                                    name="status" onChange={productname}
                                                    value="active"
                                                />
                                                Active
                                            </label>

                                            <label>
                                                <input
                                                    type="radio"
                                                    name="status"
                                                    value="Disabled" onChange={productname}
                                                />
                                                Disabled
                                            </label>

                                        </div>

                                    </div>

                                </div>

                                <div className="card">

                                    <h2>Product Price</h2>

                                    <div className="form-group">
                                        <label>Regular Price</label>

                                        <input
                                            type="number" onChange={productname}
                                            name='RegularPrice'
                                            placeholder="$0.00"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Sale Price</label>

                                        <input
                                            type="number" onChange={productname}
                                            name='SalePrice'
                                            placeholder="$0.00"
                                        />
                                    </div>

                                </div>

                                <div className="card">

                                    <h2>Meta Data</h2>

                                    <div className="form-group">
                                        <label>Meta Title</label>

                                        <input
                                            type="text" onChange={productname}
                                            name='MetaTitle'
                                            placeholder="Title"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Meta Description</label>

                                        <textarea
                                            rows="5" onChange={productname}
                                            name='MetaDescription'
                                            placeholder="Meta Description"
                                        ></textarea>
                                    </div>

                                </div>

                            </div>

                        </form>

                        <button className="submit-btn" onClick={savedata}>
                            Create Product
                        </button>

                    </div>
                </div></div>

        </>
    )
}
