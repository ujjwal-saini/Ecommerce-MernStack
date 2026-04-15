import React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Landing from './page/User/landing'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import Main from './page/User/main';
import ProductDetail from './components/productDetail';
import ErrorPage from './components/errorpage';
import "../public/global.css"
import Addtocart from './page/User/addtocart';
import Adminpage from './page/Admin/landingpage';
import Login from './page/auth/login';
import Signup from './page/auth/signup';
import Profile from './page/User/profile';
import Adminmain from './page/Admin/main';
import Customer from './page/Admin/customer';
import Productpage from './page/Admin/productpage';
import Setting from './page/User/setting';
import Analytic from './page/Admin/analytic';
import AllProducts from './components/allProducts';
import AdminRoute from './middleware/AdminRoute';
import ProtectedRoute from './middleware/ProtectedRoute';
import CartLoader from './reduxFile/cartLoader';
import ForgotPassword from './page/auth/forget';
import UpdatePass from './page/auth/updatePass';
import Location from "./page/User/location";
import Orders from './page/User/order/orders';
import OrderSuccess from './page/User/order/OrderSuccess';
import UserOrders from './page/User/userOrder';
import AdminOrders from './page/Admin/adminOrder';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Getproductsdata from './reduxFile/productLoader';
import EditProduct from './page/Admin/editProduct';
import ChatBot from "react-chatbotify";
import ScrollToTop from './page/scrollToTop';
function App() {
  return (
    <BrowserRouter>
    <ScrollToTop/>
    <ChatBot />
      <CartLoader />
      <Getproductsdata/>
      <ToastContainer position="top-left" autoClose={2000} />
      <Routes>
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<Signup />} />
        <Route path='forgot-password' element={<ForgotPassword />} />
        <Route path="updatepass/reset/:email" element={<UpdatePass />} />
        {/* user page route */}
        <Route path="/" element={<ProtectedRoute><Landing /></ProtectedRoute>}>
          <Route index element={<Main />} />
          <Route path="productdetail/:id" element={<ProductDetail />} />
          <Route path="allproducts/productdetail/:id" element={<ProductDetail />} />
          <Route path='addtocart' element={<Addtocart />} />
          <Route path='profile' element={<Profile />} />
          <Route path="allproducts/:category" element={<AllProducts />} />
          <Route path='setting' element={<Setting />} />
          <Route path="location" element={<Location />} />
          <Route path="order" element={<Orders />} />
          <Route path="success" element={<OrderSuccess />} />
          <Route path="myorders" element={<UserOrders />} />
          <Route path='*' element={<ErrorPage />} />
        </Route>

        {/* Admin page route */}
        <Route path='admindashboard' element={<AdminRoute><Adminpage /></AdminRoute>}>
          <Route index element={<Adminmain />} />
          <Route path="allorders" element={<AdminOrders />} />
          <Route path='customer' element={<Customer />} />
          <Route path='products' element={<Productpage />} />
          <Route path='analytic' element={<Analytic />} />
          <Route path='profile' element={<Profile />} />
          <Route path='products/editproduct/:id' element={<EditProduct/>} />
          <Route path='setting' element={<Setting />} />
        </Route>
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App