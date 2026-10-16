import React, { useEffect, useState } from 'react';
import '../CSS/CartPopup.css';
import { FaTimes, FaTrashAlt, FaMinus, FaPlus } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosInstance';
import { getUser } from '../auth';

export default function CartPopup({ closePopup }) {
  const navigate = useNavigate();
  const user = getUser();
  const [products, setProducts] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      Swal.fire({ icon: 'warning', title: 'Login Required', text: 'Please login first.' }).then(() => {
        if (closePopup) closePopup();
        navigate('/Signin');
      });
      return;
    }
    getProducts();
    getAddress();
  }, []);

  function getProducts() {
    setLoading(true);
    axiosInstance.post('/cart', { email: user?.email })
      .then((res) => {
        if (res.data.status) {
          setProducts(res.data.mycart);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }

  const increase = (id) => {
    setProducts(products.map((item) =>
      item._id === id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  const decrease = (id) => {
    setProducts(products.map((item) =>
      item._id === id ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
    ));
  };

  const deletecart = (id) => {
    axiosInstance.post('/deleteshopcart', { _id: id })
      .then((res) => {
        if (res.data.status) {
          Swal.fire({ icon: 'success', title: 'Removed', timer: 1000, showConfirmButton: false });
          setProducts(products.filter((item) => item._id !== id));
        }
      });
  };

  const totalAmount = products.reduce((total, item) => total + (item.SalePrice || 0) * (item.quantity || 1), 0);

  const handleSubmit = () => {
    if (!selectedAddress) {
      Swal.fire({ icon: 'warning', title: 'Please add your address first' });
      return;
    }
    if (products.length === 0) {
      Swal.fire({ icon: 'warning', title: 'Your cart is empty' });
      return;
    }

    // Note: key_secret MUST NOT be here. Only the publishable key is used.
    // Order creation is handled server-side via /createrazorpayorder endpoint.
    const options = {
      key: 'rzp_test_vv1FCZvuDRF6lQ', // Publishable key only — safe to include
      amount: totalAmount * 100,
      currency: 'INR',
      name: 'FreshCart',
      description: 'Order Payment',
      handler: function (response) {
        // Payment successful — place order
        axiosInstance.post('/addorder', {
          products: products.map((item) => ({
            userId: user._id,
            customerName: user.firstname + ' ' + user.lastname,
            email: user.email,
            phone: user.phone,
            address: selectedAddress.AddressLine1,
            city: selectedAddress.City,
            state: selectedAddress.State,
            country: selectedAddress.Country,
            zipCode: selectedAddress.ZipCode,
            productId: item.productId,
            Title: item.Title,
            image: item.image,
            Weight: item.Weight,
            SalePrice: item.SalePrice,
            quantity: item.quantity,
            date: new Date().toLocaleDateString(),
            status: 'Processing',
            razorpayPaymentId: response.razorpay_payment_id,
          })),
          userEmail: user.email,
        })
        .then((res) => {
          if (res.data.status) {
            Swal.fire({ icon: 'success', title: 'Order Placed!' });
            setProducts([]);
            if (closePopup) closePopup();
          }
        });
      },
      theme: { color: '#0de23fdb' },
    };

    const pay = new window.Razorpay(options);
    pay.open();
  };

  function getAddress() {
    if (!user) return;
    axiosInstance.post('/getaddress', { userId: user._id })
      .then((res) => {
        if (res.data.status && res.data.addresses.length > 0) {
          const def = res.data.addresses.find((a) => a.IsDefault) || res.data.addresses[0];
          setSelectedAddress(def);
        }
      })
      .catch(() => {});
  }

  return (
    <>
      <div className="cart-overlay">
        <div className="cart-popup">
          <div className="cart-header">
            <div>
              <h2>Shop Cart</h2>
              {selectedAddress && (
                <p>{selectedAddress.City}, {selectedAddress.ZipCode}</p>
              )}
            </div>
            <button className="close-cart" onClick={closePopup} aria-label="Close cart"><FaTimes /></button>
          </div>
          <div className="cart-body">
            {loading ? (
              <div style={{ textAlign: 'center', padding: '2rem' }}>Loading...</div>
            ) : products.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                <p>Your cart is empty.</p>
              </div>
            ) : (
              products.map((item) => (
                <div className="cart-item" key={item._id}>
                  <img src={item.image} alt={item.Title} className="cart-image" />
                  <div className="cart-details">
                    <h3>{item.Title}</h3>
                    <span>{item.Weight}</span>
                    <button className="remove-btn" onClick={() => deletecart(item._id)}>
                      <FaTrashAlt /> Remove
                    </button>
                  </div>
                  <div className="cart-qty">
                    <button onClick={() => decrease(item._id)} aria-label="Decrease"><FaMinus /></button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increase(item._id)} aria-label="Increase"><FaPlus /></button>
                  </div>
                  <h3 className="cart-price">₹{(item.SalePrice * item.quantity).toFixed(2)}</h3>
                </div>
              ))
            )}
          </div>
          <div className="cart-footer">
            {products.length > 0 && (
              <div style={{ padding: '0.5rem 1rem', fontWeight: 'bold', borderTop: '1px solid #eee' }}>
                Total: ₹{totalAmount.toFixed(2)}
              </div>
            )}
            <button className="continue-btn" onClick={closePopup}>Continue Shopping</button>
            <button className="checkout-btn" onClick={handleSubmit} disabled={products.length === 0}>
              Proceed To Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}