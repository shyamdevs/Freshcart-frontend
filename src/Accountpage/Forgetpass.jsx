import React, { useState } from 'react';
import forgotImg from '../Images/forgetpassword.svg';
import '../CSS/Forgetpass.css';
import Swal from 'sweetalert2';
import { useNavigate, Link } from 'react-router-dom';
import Signinnav from './signinnav';
import Footer from '../Homepage/Footer';
import axiosInstance from '../axiosInstance';

export default function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const go = useNavigate();

  const requestReset = async (e) => {
    e.preventDefault();
    if (!email) { Swal.fire({ icon: 'warning', text: 'Please enter your email.' }); return; }
    setLoading(true);
    try {
      const res = await axiosInstance.post('/forgetpass', { email });
      if (res.data.status) {
        Swal.fire({ icon: 'success', text: 'Reset token generated. Check the token below (email integration coming soon).', html: `<p>Your reset token:</p><code style="word-break:break-all;font-size:12px">${res.data.resetToken}</code><p style="margin-top:8px;font-size:12px;color:#888">In production this will be emailed to you.</p>` });
        setStep(2);
      } else {
        Swal.fire({ icon: 'error', text: res.data.message || 'Email not found.' });
      }
    } catch { Swal.fire({ icon: 'error', text: 'Network error.' }); }
    finally { setLoading(false); }
  };

  const resetPassword = async (e) => {
    e.preventDefault();
    if (!token || !newPassword) { Swal.fire({ icon: 'warning', text: 'Please fill in all fields.' }); return; }
    if (newPassword.length < 8) { Swal.fire({ icon: 'warning', text: 'Password must be at least 8 characters.' }); return; }
    setLoading(true);
    try {
      const res = await axiosInstance.post('/resetpassword', { email, token, newPassword });
      if (res.data.status) {
        Swal.fire({ icon: 'success', text: 'Password reset successfully!' });
        go('/Signin');
      } else {
        Swal.fire({ icon: 'error', text: res.data.message || 'Invalid or expired token.' });
      }
    } catch { Swal.fire({ icon: 'error', text: 'Network error.' }); }
    finally { setLoading(false); }
  };

  return (
    <>
      <Signinnav />
      <section className="forgot-page">
        <div className="forgot-container">
          <div className="forgot-left">
            <img src={forgotImg} alt="Forgot Password" />
          </div>
          <div className="forgot-right">
            <div className="forgot-form-box">
              {step === 1 ? (
                <>
                  <h1>Forgot your password?</h1>
                  <p>Enter your email address and we'll send you a password reset link.</p>
                  <form onSubmit={requestReset}>
                    <input type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} required />
                    <button type="submit" className="reset-btn" disabled={loading}>{loading ? 'Sending...' : 'Send Reset Link'}</button>
                    <Link to="/Signin"><button type="button" className="back-btn">Back to Sign In</button></Link>
                  </form>
                </>
              ) : (
                <>
                  <h1>Enter Reset Token</h1>
                  <p>Paste the token from your email and choose a new password.</p>
                  <form onSubmit={resetPassword}>
                    <input type="text" placeholder="Paste reset token here" value={token} onChange={e => setToken(e.target.value)} required />
                    <input type="password" placeholder="New password (min 8 chars)" value={newPassword} onChange={e => setNewPassword(e.target.value)} required minLength={8} />
                    <button type="submit" className="reset-btn" disabled={loading}>{loading ? 'Resetting...' : 'Reset Password'}</button>
                    <button type="button" className="back-btn" onClick={() => setStep(1)}>Back</button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}