import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import Signin from './Accountpage/Signin';
import Footer from './Homepage/Footer';
import Signinnav from './Accountpage/signinnav';
import Signup from './Accountpage/Signup';
import ForgotPassword from './Accountpage/Forgetpass';
import Navbar from './Homepage/Navbar';
import AccDashNotification from './Accountpage/AccDashNotification';
import AccountSetting from './Accountpage/AccdashSettings';
import Freature from './Homepage/Freature';
import Slider from './Homepage/Slider';
import Banner from './Homepage/Banner';
import Dashsidebar from './Dashboard/Dashsidebar';
import Products from './Dashboard/Products';
import Addproduct from './Dashboard/Addproduct';
import CategoryForm from './Dashboard/Addcategory';
import CategoryPage from './Dashboard/Category';
import Customer from './Dashboard/Customer';
import Popproduct from './Homepage/Popproduct';
import Home from './Homepage/Home';
import Editpro from './Dashboard/Editpro';
import Editcat from './Dashboard/Editcat';
import Accdash from './Accountpage/Accdash';
import AccdashSettings from './Accountpage/AccdashSettings';
import AccountLayout from './Accountpage/AccountLayout';
import Address from './Accountpage/Address';
import CartPopup from './Homepage/CartPopup';
import Wishlist from './Homepage/Wishlist';
import ProductDetails from './Homepage/Productdetail';
import RelatedProducts from './Homepage/Relatedproductdetail';
import ReviewPopup from './Homepage/Reviewform';
import EditReview from './Homepage/Editreview';
import AdminReviews from './Dashboard/Review';
import Dashboard from './Dashboard/Dash';
import PaymentMethod from './Accountpage/PaymentMethod';
import YourOrders from './Accountpage/Yourorder';
import AdminOrderList from './Dashboard/OrderList';
import OrderSingle from './Dashboard/OrderSingle';
import AddVendor from './Dashboard/AddVendor';
import SellerVendor from './Dashboard/SellerVendor';
import ProtectedRoute from './Accountpage/ProtectedRoute';

function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '5rem 2rem' }}>
      <h1 style={{ fontSize: '4rem', color: '#0aad0a' }}>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you're looking for doesn't exist.</p>
      <a href="/Home" style={{ color: '#0aad0a', textDecoration: 'underline' }}>Go to Home</a>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/Signin" element={<Signin />} />
        <Route path="/" element={<Signup />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Popularproduct" element={<Popproduct />} />
        <Route path="/productdetails" element={<ProductDetails />} />
        <Route path="/RelatedProducts" element={<RelatedProducts />} />

        {/* User-protected routes (login required) */}
        <Route path="/Cart" element={<ProtectedRoute><CartPopup /></ProtectedRoute>} />
        <Route path="/Wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
        <Route path="/ReviewPopup" element={<ProtectedRoute><ReviewPopup /></ProtectedRoute>} />
        <Route path="/editreview" element={<ProtectedRoute><EditReview /></ProtectedRoute>} />

        <Route path="/account" element={<ProtectedRoute><AccountLayout /></ProtectedRoute>}>
          <Route path="YourOrder" element={<YourOrders />} />
          <Route path="settings" element={<AccdashSettings />} />
          <Route path="notification" element={<AccDashNotification />} />
          <Route path="PaymentMethod" element={<PaymentMethod />} />
          <Route path="Address" element={<Address />} />
        </Route>

        {/* Admin-only routes */}
        <Route path="/dashboard" element={<ProtectedRoute adminOnly><Dashsidebar /></ProtectedRoute>} />
        <Route path="/dash" element={<ProtectedRoute adminOnly><Dashboard /></ProtectedRoute>} />
        <Route path="/products" element={<ProtectedRoute adminOnly><Products /></ProtectedRoute>} />
        <Route path="/Addproduct" element={<ProtectedRoute adminOnly><Addproduct /></ProtectedRoute>} />
        <Route path="/CategoryForm" element={<ProtectedRoute adminOnly><CategoryForm /></ProtectedRoute>} />
        <Route path="/CategoryPage" element={<ProtectedRoute adminOnly><CategoryPage /></ProtectedRoute>} />
        <Route path="/Customer" element={<ProtectedRoute adminOnly><Customer /></ProtectedRoute>} />
        <Route path="/editproduct" element={<ProtectedRoute adminOnly><Editpro /></ProtectedRoute>} />
        <Route path="/EditCategory" element={<ProtectedRoute adminOnly><Editcat /></ProtectedRoute>} />
        <Route path="/Accdash" element={<ProtectedRoute adminOnly><Accdash /></ProtectedRoute>} />
        <Route path="/AdminReviews" element={<ProtectedRoute adminOnly><AdminReviews /></ProtectedRoute>} />
        <Route path="/orderlist" element={<ProtectedRoute adminOnly><AdminOrderList /></ProtectedRoute>} />
        <Route path="/OrderSingle" element={<ProtectedRoute adminOnly><OrderSingle /></ProtectedRoute>} />
        <Route path="/addvendor" element={<ProtectedRoute adminOnly><AddVendor /></ProtectedRoute>} />
        <Route path="/sellervendor" element={<ProtectedRoute adminOnly><SellerVendor /></ProtectedRoute>} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
