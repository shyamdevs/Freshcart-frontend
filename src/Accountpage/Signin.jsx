import React, { useState } from 'react';
import signin from '../Images/signin-g.svg';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Footer from '../Homepage/Footer';
import Signinnav from './signinnav';
import axiosInstance from '../axiosInstance';
import { setToken } from '../auth';

export default function Signin() {
  const [signindata, setsignindata] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const go = useNavigate();

 
const signinvalue = (e) => {
  const { name, value } = e.target;

  setsignindata((prev) => ({
    ...prev,
    [name]: value,
  }));
};

const savedata = async (e) => {
  e.preventDefault();

  const email = signindata.email.trim().toLowerCase();
  const password = signindata.password;

  if (!email || !password) {
    Swal.fire({
      icon: 'warning',
      text: 'Please enter your email and password.',
    });
    return;
  }

  setLoading(true);

  try {
    const res = await axiosInstance.post('/signin', {
      signindata: { email, password },
    });

    if (!res.data?.status || !res.data?.token) {
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: res.data?.message || 'Unable to sign in. Please try again.',
      });
      return;
    }

    setToken(res.data.token);
    localStorage.setItem('user', JSON.stringify(res.data.user));

    await Swal.fire({
      icon: 'success',
      text: 'Login successful!',
      timer: 1200,
      showConfirmButton: false,
    });

    go('/Home', { replace: true });
  } catch (err) {
    const status = err.response?.status;
    const serverMessage = err.response?.data?.message;

    const message =
      serverMessage ||
      (err.code === 'ERR_NETWORK'
        ? 'Cannot connect to the server. Check your API URL and backend status.'
        : status === 401
          ? 'Invalid email or password.'
          : 'Something went wrong. Please try again.');

    console.error('Signin error:', {
      status,
      message,
      response: err.response?.data,
      code: err.code,
    });

    Swal.fire({
      icon: 'error',
      title: 'Login Failed',
      text: message,
    });
  } finally {
    setLoading(false);
  }
};

  return (
    <>
      <Signinnav />
      <div className="login-page">
        <div className="login-container">
          <div className="login-left">
            <img src={signin} alt="Sign in" className="login-img" />
          </div>
          <div className="login-right">
            <div className="login-form">
              <h1>Sign in to FreshCart</h1>
              <p className="login-subtitle">Welcome back to FreshCart! Enter your credentials to continue.</p>
              <form onSubmit={savedata} noValidate>
                <div className="login-input-group">
                  <label htmlFor="email">Email</label>
                  <input id="email" type="email" placeholder="your@email.com" className="form-control" name="email" value={signindata.email} onChange={signinvalue} required />
                </div>
                <div className="login-input-group">
                  <label htmlFor="password">Password</label>
                  <div className="login-password-box">
                    <input id="password" type={showPassword ? 'text' : 'password'} placeholder="*****" name="password" value={signindata.password} onChange={signinvalue} className="form-control login-password-input" required />
                    <button type="button" className="login-eye-btn" aria-label="Toggle password" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? '🙈' : '👀'}
                    </button>
                  </div>
                </div>
                <div className="login-form-options">
                  <p>Forgot password? <Link to="/ForgotPassword">Reset It</Link></p>
                </div>
                <button type="submit" className="login-btn" disabled={loading}>
                  {loading ? 'Signing in...' : 'Sign In'}
                </button>
                <p className="login-signup-text">Don't have an account? <Link to="/">Sign Up</Link></p>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}