import React, { useEffect, useState } from 'react';
import '../CSS/AccDashSettings.css';
import Swal from 'sweetalert2';
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../axiosInstance';
import { getUser, logout } from '../auth';

export default function AccdashSettings() {
  const [fullName, setFullName] = useState('');
  const [userdata, setuserdata] = useState({});
  const [password, setPassword] = useState({
    currentPassword: '',
    newPassword: '',
  });
  const go = useNavigate();

  useEffect(() => {
    const user = getUser();
    if (user) {
      setuserdata(user);
      setFullName(`${user.firstname || ''} ${user.lastname || ''}`.trim());
    }
  }, []);

  const handleNameChange = (e) => {
    const value = e.target.value;
    setFullName(value);
    const parts = value.trim().split(/\s+/);
    setuserdata((prev) => ({
      ...prev,
      firstname: parts[0] || '',
      lastname: parts.slice(1).join(' '),
    }));
  };

  const handleChange = (e) => {
    setuserdata({
      ...userdata,
      [e.target.name]: e.target.value,
    });
  };

  const updateDetails = () => {
    axiosInstance
      .post('/updateuser', { userdata })
      .then((res) => {
        if (res.data.status) {
          const updatedUser = res.data.user;
          setuserdata(updatedUser);
          setFullName(`${updatedUser.firstname || ''} ${updatedUser.lastname || ''}`.trim());
          localStorage.setItem('user', JSON.stringify(updatedUser));
          Swal.fire({
            icon: 'success',
            text: 'Profile Updated',
          });
        } else {
          Swal.fire({
            icon: 'error',
            text: res.data.message || 'Email already exists',
          });
        }
      })
      .catch(() => {
        Swal.fire({
          icon: 'error',
          text: 'Failed to update profile.',
        });
      });
  };

  const passwordChange = (e) => {
    setPassword({
      ...password,
      [e.target.name]: e.target.value,
    });
  };

  const savePassword = () => {
    const user = getUser();
    if (!user) return;
    if (!password.currentPassword || !password.newPassword) {
      Swal.fire({
        icon: 'warning',
        text: 'Please fill in both password fields.',
      });
      return;
    }
    if (password.newPassword.length < 8) {
      Swal.fire({
        icon: 'warning',
        text: 'New password must be at least 8 characters.',
      });
      return;
    }

    axiosInstance
      .post('/updatepassword', {
        id: user._id,
        currentPassword: password.currentPassword,
        newPassword: password.newPassword,
      })
      .then((res) => {
        if (res.data.status) {
          Swal.fire({
            icon: 'success',
            text: 'Password Updated Successfully',
          });
          setPassword({
            currentPassword: '',
            newPassword: '',
          });
        } else {
          Swal.fire({
            icon: 'error',
            text: res.data.message || 'Current Password is Incorrect',
          });
        }
      })
      .catch(() => {
        Swal.fire({
          icon: 'error',
          text: 'Error updating password.',
        });
      });
  };

  const deleteAccount = () => {
    const user = getUser();
    if (!user) return;

    Swal.fire({
      title: 'Are you sure?',
      text: 'Your account will be permanently deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        axiosInstance
          .post('/deleteaccount', {
            _id: user._id,
          })
          .then((res) => {
            if (res.data.status) {
              logout();
              Swal.fire({
                icon: 'success',
                text: 'Account Deleted Successfully',
              });
              go('/');
            } else {
              Swal.fire({
                icon: 'error',
                text: res.data.message || 'Unable to delete account',
              });
            }
          })
          .catch(() => {
            Swal.fire({
              icon: 'error',
              text: 'Error deleting account.',
            });
          });
      }
    });
  };

  return (
    <>
      <main className="account-page">
        <div className="account-container">
          <h1>Account Setting</h1>

          {/* Account Details */}
          <section className="setting-section">
            <h2>Account details</h2>

            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={handleNameChange}
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="example@gmail.com"
                value={userdata.email || ''}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Phone</label>
              <input
                type="text"
                placeholder="Phone number"
                name="phone"
                value={userdata.phone || ''}
                onChange={handleChange}
              />
            </div>

            <button className="btn btn-green" onClick={updateDetails}>
              Save Details
            </button>
          </section>

          <hr />

          {/* Password */}
          <section className="setting-section">
            <h2>Password</h2>

            <div className="form-group large-input">
              <label>Current Password</label>
              <input
                type="password"
                name="currentPassword"
                placeholder="Enter current password"
                value={password.currentPassword}
                onChange={passwordChange}
              />
            </div>

            <div className="form-group large-input">
              <label>New Password</label>
              <input
                type="password"
                name="newPassword"
                placeholder="Enter new password (min 8 chars)"
                value={password.newPassword}
                onChange={passwordChange}
              />
            </div>

            <p className="help-text">Can’t remember your current password?</p>
            <Link to="/ForgotPassword" className="reset-link">
              Reset your password.
            </Link>
            <br />

            <button className="btn btn-green password-btn" onClick={savePassword}>
              Save Password
            </button>
          </section>

          <hr />

          {/* Delete Account */}
          <section className="setting-section delete-section">
            <h2>Delete Account</h2>

            <p>Would you like to delete your account?</p>

            <p>
              Deleting your account will permanently remove your account and all associated details.
            </p>

            <button className="btn btn-danger" onClick={deleteAccount}>
              I want to delete my account
            </button>
          </section>
        </div>
      </main>
    </>
  );
}
