
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signin from './Accountpage/Signin'
import Footer from './Homepage/Footer'
import Signinnav from './Accountpage/signinnav'
import Signup from './Accountpage/Signup'
import ForgotPassword from './Accountpage/Forgetpass'
import Navbar from './Homepage/Navbar'
import AccDashNotification from './Accountpage/AccDashNotification'
import AccountSetting from './Accountpage/AccdashSettings'
import Freature from './Homepage/Freature'
import Slider from './Homepage/Slider'
import Banner from './Homepage/Banner'
import Dashsidebar from './Dashboard/Dashsidebar'
import Products from './Dashboard/Products'
import Addproduct from './Dashboard/Addproduct'
import CategoryForm from './Dashboard/Addcategory'
import CategoryPage from './Dashboard/Category'
import Customer from './Dashboard/Customer'
import Popproduct from './Homepage/Popproduct'
import Home from './Homepage/Home'
import Editpro from './Dashboard/Editpro'
import Editcat from './Dashboard/Editcat'
import Accdash from './Accountpage/Accdash'
import AccdashSettings from './Accountpage/AccdashSettings'
import AccountLayout from './Accountpage/AccountLayout'
import AddressPopup from './Accountpage/AccAddaddress'
import Address from './Accountpage/Address'
import CartPopup from './Homepage/CartPopup'
import Wishlist from './Homepage/Wishlist'
import ProductDetails from './Homepage/Productdetail'
import RelatedProducts from './Homepage/Relatedproductdetail'
import ReviewPopup from './Homepage/Reviewform'
import EditReview from './Homepage/Editreview'
import AdminReviews from './Dashboard/Review'
import Dashboard from './Dashboard/Dash'
import PaymentMethod from './Accountpage/PaymentMethod'
import YourOrders from './Accountpage/Yourorder'
import AdminOrderList from './Dashboard/OrderList'
import OrderSingle from './Dashboard/OrderSingle'
import AddVendor from './Dashboard/AddVendor'
import SellerVendor from './Dashboard/SellerVendor'








function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/Signin' element={<Signin />} />
          <Route path='/Signup' element={<Signup />} />
          <Route path='/Signup' element={<Signup />} />
          <Route path='/Popularproduct' element={<Popproduct />} />
          <Route path='/ForgotPassword' element={<ForgotPassword />} />
          <Route path='/' element={<Home />} />
          <Route path='/Cart' element={<CartPopup />} />
          <Route path='/Wishlist' element={<Wishlist/>}/>

<Route path="/productdetails" element={<ProductDetails />}/>
<Route path="/RelatedProducts" element={<RelatedProducts />}/>


<Route path='/ReviewPopup' element={<ReviewPopup/>}/>
<Route
    path="/editreview"
    element={<EditReview />}
/>







         
          <Route path='/dashboard' element={<Dashsidebar />} />

          <Route path='/products' element={<Products />} />

          <Route path='/Addproduct' element={<Addproduct />} />

          <Route path='/CategoryForm' element={<CategoryForm />} />
          <Route path='/CategoryPage' element={<CategoryPage />} />

          <Route path='/Customer' element={<Customer />} />
          <Route path='/editproduct' element={<Editpro />} />
          <Route path="/EditCategory" element={<Editcat />} />
          <Route path="/Accdash" element={<Accdash />} />
<Route path='/AdminReviews' element={<AdminReviews/>}/>

<Route path='/orderlist' element={<AdminOrderList/>}/>
<Route path='/OrderSingle' element={<OrderSingle />}/>

<Route path="/addvendor" element={<AddVendor />} />
<Route path="/sellervendor" element={<SellerVendor />} />

<Route path='dash' element={<Dashboard/>}/>



          <Route path="/account" element={<AccountLayout />}>
          <Route path='YourOrder' element={<YourOrders/>}/>
            <Route path="settings" element={<AccdashSettings />} />
            <Route path="notification" element={<AccDashNotification />} />
          <Route path='PaymentMethod' element={<PaymentMethod/>} />
            <Route path="Address" element={<Address />} />


          </Route>






      
        </Routes>
      </BrowserRouter>


    </>
  )
}

export default App
