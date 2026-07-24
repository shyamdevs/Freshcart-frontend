import React, { useState } from "react";
import "../CSS/AddPayment.css";
import axios from "axios";
import Swal from "sweetalert2";

export default function AddPayment({

    closePopup,

    refreshPayments

}) {

    const user = JSON.parse(localStorage.getItem("user"));

    const [paymentData, setPaymentData] = useState({

        userId: user?._id || "",

        cardType: "Visa",

        cardName: "",

        cardNumber: "",

        month: "",

        year: "",

        cvv: ""

    });

    const handleChange = (e) => {

        setPaymentData({

            ...paymentData,

            [e.target.name]: e.target.value

        });

    };

    const savePayment = (e) => {

        e.preventDefault();

        if (
            paymentData.cardName === "" ||
            paymentData.cardNumber === "" ||
            paymentData.month === "" ||
            paymentData.year === "" ||
            paymentData.cvv === ""
        ) {

            Swal.fire({

                icon: "warning",

                text: "Please fill all fields"

            });

            return;

        }

        axios.post(

            "http://localhost:8080/addpayment",

            paymentData

        ).then((res) => {

            if (res.data.status) {

                Swal.fire({

                    icon: "success",

                    text: "Payment Method Added"

                });

                refreshPayments();

                closePopup();

            }

            else {

                Swal.fire({

                    icon: "error",

                    text: "Something went wrong"

                });

            }

        });

    };

    return (

        <div className="payment-overlay">

            <div className="payment-popup">

                <div className="payment-popup-header">

                    <h2>Add New Payment Method</h2>

                    <button
                        className="payment-close-btn"
                        onClick={closePopup}
                    >
                        ×
                    </button>

                </div>

                <form
                    className="payment-form"
                    onSubmit={savePayment}
                >

                    <div className="payment-group">

                        <label>Card Type</label>

                        <select

                            name="cardType"

                            value={paymentData.cardType}

                            onChange={handleChange}

                        >

                            <option value="Visa">Visa</option>

                            <option value="MasterCard">MasterCard</option>

                            <option value="American Express">
                                American Express
                            </option>

                        </select>

                    </div>

                    <div className="payment-group">

                        <label>Name on Card</label>

                        <input

                            type="text"

                            name="cardName"

                            placeholder="Enter Card Holder Name"

                            value={paymentData.cardName}

                            onChange={handleChange}

                        />

                    </div>

                    <div className="payment-group">

                        <label>Card Number</label>

                        <input

                            type="text"

                            maxLength="16"

                            name="cardNumber"

                            placeholder="1234123412341234"

                            value={paymentData.cardNumber}

                            onChange={handleChange}

                        />

                    </div>

                    <div className="payment-row">

                        <div className="payment-group">

                            <label>Month</label>

                            <select

                                name="month"

                                value={paymentData.month}

                                onChange={handleChange}

                            >

                                <option value="">Month</option>

                                <option>01</option>
                                <option>02</option>
                                <option>03</option>
                                <option>04</option>
                                <option>05</option>
                                <option>06</option>
                                <option>07</option>
                                <option>08</option>
                                <option>09</option>
                                <option>10</option>
                                <option>11</option>
                                <option>12</option>

                            </select>

                        </div>

                        <div className="payment-group">

                            <label>Year</label>

                            <select

                                name="year"

                                value={paymentData.year}

                                onChange={handleChange}

                            >

                                <option value="">Year</option>

                                <option>2026</option>
                                <option>2027</option>
                                <option>2028</option>
                                <option>2029</option>
                                <option>2030</option>
                                <option>2031</option>
                                <option>2032</option>
                                <option>2033</option>
                                <option>2034</option>
                                <option>2035</option>

                            </select>

                        </div>

                    </div>

                    <div className="payment-group">

                        <label>CVV</label>

                        <input

                            type="password"

                            maxLength="3"

                            name="cvv"

                            placeholder="CVV"

                            value={paymentData.cvv}

                            onChange={handleChange}

                        />

                    </div>

                    <div className="payment-buttons">

                        <button
                            type="submit"
                            className="payment-save-btn"
                        >
                            Add New Card
                        </button>

                        <button

                            type="button"

                            className="payment-cancel-btn"

                            onClick={closePopup}

                        >

                            Close

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}