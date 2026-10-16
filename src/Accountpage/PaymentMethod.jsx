import React, { useEffect, useState } from "react";
import "../CSS/PaymentMethod.css";
import axiosInstance from "../axiosInstance";
import Swal from "sweetalert2";
import { getUser } from "../auth";

export default function PaymentMethod() {

    const user = getUser();

    const [payments, setPayments] = useState([]);

    // ==========================
    // Get Payments
    // ==========================

    function getPayments() {

        axiosInstance.post(

            "/getpayment",

            {

                userId: user?._id

            }

        ).then((res) => {

            if (res.data.status && res.data.payment) {

                setPayments(res.data.payment);

            } else {
                setPayments([]);
            }

        }).catch(() => setPayments([]));

    }

    useEffect(() => {
        if (user) {
            getPayments();
        }
    }, []);

    const handleAddPaymentClick = () => {
        Swal.fire({
            icon: "info",
            title: "PCI-DSS Protected",
            text: "For your security, credit/debit cards are not stored on our servers. Your payment details are securely processed directly by Razorpay during checkout.",
            confirmButtonColor: "#0aad0a",
            confirmButtonText: "Understood"
        });
    };

    // ==========================
    // Delete Payment
    // ==========================

    function deletePayment(id) {

        Swal.fire({

            title: "Remove Card?",

            text: "This payment method will be removed.",

            icon: "warning",

            showCancelButton: true,

            confirmButtonText: "Remove"

        }).then((result) => {

            if (result.isConfirmed) {

                axiosInstance.post(

                    "/deletepayment",

                    {

                        _id: id

                    }

                ).then((res) => {

                    if (res.data.status) {

                        Swal.fire({

                            icon: "success",

                            text: "Payment Removed"

                        });

                        getPayments();

                    }

                }).catch(() => {});

            }

        });

    }

    return (

        <>

            <div className="payment-page">

                <div className="payment-header">

                    <h2>

                        Payment Methods

                    </h2>

                    <button

                        className="add-payment-btn"

                        onClick={handleAddPaymentClick}

                    >

                        Add Payment

                    </button>

                </div>

                {

                    payments.length > 0 ?

                        payments.map((item) => (

                            <div

                                className="payment-card"

                                key={item._id}

                            >

                                <div className="payment-left">

                                    <div className="payment-logo">

                                        {

                                            item.cardType === "Visa"

                                                ?

                                                "💳"

                                                :

                                                item.cardType === "MasterCard"

                                                    ?

                                                    "🟠"

                                                    :

                                                    "💰"

                                        }

                                    </div>

                                    <div>

                                        <h3>

                                            {item.cardType}

                                        </h3>

                                        <p>

                                            **** **** **** {item.cardNumber.slice(-4)}

                                        </p>

                                        <span>

                                            Expires {item.month}/{item.year}

                                        </span>

                                    </div>

                                </div>

                                <button

                                    className="remove-payment-btn"

                                    onClick={() => deletePayment(item._id)}

                                >

                                    Remove

                                </button>

                            </div>

                        ))

                        :

                        <div className="no-payment">

                            No Payment Method Added

                        </div>

                }

            </div>
        </>

    );

}