import React from "react";
import "../CSS/OrderBillPopup.css";
import { FaTimes, FaBoxOpen, FaMapMarkerAlt, FaUser, FaPhone, FaEnvelope } from "react-icons/fa";

export default function OrderBillPopup({
  closePopup,
  order,
  user,
  address,
}) {
  if (!order) return null;



  return (
    <div className="bill-overlay">

      <div className="bill-popup">

        {/* Header */}

        <div className="bill-header">

          <div>

            <h2>Order Invoice</h2>

            <p>Thank you for shopping with FreshCart</p>

          </div>

          <button
            className="bill-close"
            onClick={closePopup}
          >
            <FaTimes />
          </button>

        </div>

        {/* Order Info */}

        <div className="bill-section">

          <div className="bill-box">

            <FaBoxOpen className="bill-icon" />

            <div>

              <h4>Order Number</h4>

              <p>{order.orderNo}</p>

            </div>

          </div>

          <div className="bill-box">

            <h4>Order Date</h4>

            <p>{order.date}</p>

          </div>

          <div className="bill-box">

            <h4>Status</h4>

            <span className="bill-status">

              {order.status}

            </span>

          </div>

        </div>

        {/* Customer */}

        <div className="bill-card">

          <h3>Customer Information</h3>

          <div className="bill-info">

            <p>

              <FaUser />

              {user?.firstname} {user?.lastname}

            </p>

            <p>

              <FaEnvelope />

              {user?.email}

            </p>

            <p>

              <FaPhone />

              {user?.phone || "Not Available"}

            </p>

          </div>

        </div>

        {/* Shipping */}

        <div className="bill-card">

          <h3>

            <FaMapMarkerAlt />

            Shipping Address

          </h3>

          <p>

            {address?.FirstName} {address?.LastName}

          </p>

          <p>{address?.AddressLine1}</p>

          <p>{address?.AddressLine2}</p>

          <p>

            {address?.City},{" "}
            {address?.State}

          </p>

          <p>

            {address?.Country} - {address?.ZipCode}

          </p>

        </div>

        {/* Product */}

        <div className="bill-card">

          <h3>Order Details</h3>

          <table className="bill-table">

            <thead>

              <tr>

                <th>Image</th>

                <th>Product</th>

                <th>Weight</th>

                <th>Qty</th>

                <th>Price</th>

                <th>Total</th>

              </tr>

            </thead>

            <tbody>

              <tr>

                <td>

                  <img
                    src={order.image}
                    alt=""
                    className="bill-image"
                  />

                </td>

                <td>{order.Title}</td>

                <td>{order.Weight}</td>

                <td>{order.quantity}</td>

                <td>₹{order.SalePrice}</td>

                <td>

                  ₹{order.SalePrice * order.quantity}

                </td>

              </tr>

            </tbody>

          </table>

        </div>

        {/* Payment */}

        <div className="bill-card">

          <h3>Payment Summary</h3>

          <div className="payment-row">

            <span>Subtotal</span>

            <span>

              ₹{order.SalePrice * order.quantity}

            </span>

          </div>

          <div className="payment-row">

            <span>Shipping</span>

            <span>Free</span>

          </div>

          <div className="payment-row">

            <span>Tax</span>

            <span>₹0</span>

          </div>

          <div className="payment-row total">

            <span>Total Paid</span>

            <span>

              ₹{order.SalePrice * order.quantity}

            </span>

          </div>

        </div>

        {/* Footer */}

        <div className="bill-footer">

          <button
            className="close-btn"
            onClick={closePopup}
          >
            Close
          </button>

          <button
            className="print-btn"
            onClick={()=>window.print()}
          >
            Print Invoice
          </button>

        </div>

      </div>

    </div>
  );
}