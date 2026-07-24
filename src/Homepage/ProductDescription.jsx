import React from "react";
import "../CSS/ProductDescription.css";

export default function ProductDescription({ product }) {

    return (

        <div className="description-tab">

            <h2>Nutrient Value & Benefits</h2>

            <p>
                {product.Description}
            </p>

            <h3>Storage Tips</h3>

            <p>
                Store in a cool, dry place away from direct sunlight and moisture.
            </p>

            <h3>Unit</h3>

            <p>
                {product.Unit}
            </p>

            <h3>Seller</h3>

            <p>
                FreshCart Pvt. Ltd.
            </p>

            <h3>Disclaimer</h3>

            <p>
                Image shown is a representation and may slightly vary from the actual product. Every effort is made to maintain the accuracy of all information displayed.
            </p>

        </div>

    );

}