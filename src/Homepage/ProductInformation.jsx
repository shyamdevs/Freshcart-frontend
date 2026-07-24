import React from "react";
import "../CSS/ProductInformation.css";

export default function ProductInformation({ product }) {

    return (

        <div className="information-tab">

            <h2 className="info-title">Details</h2>

            <div className="info-grid">

                {/* Left Column */}

                <div className="info-column">

                    <div className="info-row">
                        <span>Weight</span>
                        <span>{product.Weight}</span>
                    </div>

                    <div className="info-row">
                        <span>Category</span>
                        <span>{product.Category}</span>
                    </div>

                    <div className="info-row">
                        <span>Product Code</span>
                        <span>{product.ProductCode}</span>
                    </div>

                    <div className="info-row">
                        <span>Unit</span>
                        <span>{product.Unit}</span>
                    </div>

                    <div className="info-row">
                        <span>Shipping</span>
                        <span>Free Shipping</span>
                    </div>

                </div>

                {/* Right Column */}

                <div className="info-column">

                    <div className="info-row">
                        <span>Status</span>
                        <span>{product.status}</span>
                    </div>

                    <div className="info-row">
                        <span>Regular Price</span>
                        <span>₹{product.RegularPrice}</span>
                    </div>

                    <div className="info-row">
                        <span>Sale Price</span>
                        <span>₹{product.SalePrice}</span>
                    </div>

                  <div className="info-row description-row">
    <span>Description</span>
    <span>{product.Description}</span>
</div>

                </div>

            </div>

        </div>

    );

}