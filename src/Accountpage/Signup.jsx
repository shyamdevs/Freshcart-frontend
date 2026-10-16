import React, { useState } from 'react';
import signupImg from '../Images/signup-g.svg';
import '../CSS/Signup.css';
import { useNavigate, Link } from 'react-router-dom';
import Signinnav from './signinnav';
import Footer from '../Homepage/Footer';
import Swal from 'sweetalert2';
import axiosInstance from '../axiosInstance';

export default function Signup() {
  const [alldata, setalldata] = useState({ firstname: '', lastname: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const go = useNavigate();

  const signupdata = (e) => {
    setalldata({ ...alldata, [e.target.name]: e.target.value });
  };

  const savedata = async (e) => {
    e.preventDefault();
    if (!alldata.firstname || !alldata.lastname || !alldata.email || !alldata.password) {
      Swal.fire({ icon: 'warning', text: 'Please fill in all fields.' }); return;
    }
    if (alldata.password.length < 8) {
      Swal.fire({ icon: 'warning', text: 'Password must be at least 8 characters.' }); return;
    }
    setLoading(true);
    try {
      const res = await axiosInstance.post('/signup', { alldata });
      if (res.data.status) {
        Swal.fire({ icon: 'success', text: 'Account created! Please sign in.', timer: 1500, showConfirmButton: false });
        setTimeout(() => go('/Signin'), 1500);
      } else {
        Swal.fire({ icon: 'error', text: res.data.message || 'Registration failed. Try again.' });
      }
    } catch (err) {
  const message =
    err.response?.data?.message ||
    (err.code === 'ERR_NETWORK'
      ? 'Cannot reach the server. Check your API URL and backend status.'
      : err.message || 'Signup failed. Please try again.');

  console.error('Signup error:', {
    message,
    status: err.response?.status,
    response: err.response?.data,
    code: err.code,
  });

  Swal.fire({
    icon: 'error',
    title: 'Registration Failed',
    text: message,
  });
} finally {
  setLoading(false);
} 
  };

  return (
    <>
      <Signinnav />
      <section className="register-page">
        <div className="register-container">
          <div className="register-left">
            <img src={signupImg} alt="FreshCart Signup" />
          </div>
          <div className="register-right">
            <div className="register-form-box">
              <h1>Get Start Shopping</h1>
              <p>Welcome to FreshCart! Create your free account.</p>
              <form onSubmit={savedata} noValidate>
                <div className="name-row">
                  <input type="text" placeholder="First Name" name="firstname" value={alldata.firstname} onChange={signupdata} required />
                  <input type="text" placeholder="Last Name" name="lastname" value={alldata.lastname} onChange={signupdata} required />
                </div>
                <input type="email" placeholder="Email" name="email" value={alldata.email} onChange={signupdata} required />
                <div className="password-field">
                  <input type={showPassword ? 'text' : 'password'} placeholder="Password (min 8 chars)" name="password" value={alldata.password} onChange={signupdata} required minLength={8} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} aria-label="Toggle password">
                    {showPassword ? '🙈' : '👀'}
                  </button>
                </div>
                <button className="register-btn" type="submit" disabled={loading}>
                  {loading ? 'Creating Account...' : 'Register'}
                </button>
              </form>
              <h6>By continuing, you agree to our <a href="#">Terms of Service</a> & <a href="#">Privacy Policy</a></h6>
              <p style={{marginTop:'1rem', textAlign:'center'}}>Already have an account? <Link to="/Signin">Sign In</Link></p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}