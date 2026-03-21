import React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Landing from './page/User/landing'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Main from './page/User/main';
import ProductDetail from './components/productDetail';
import ErrorPage from './components/errorpage';
import '../public/global.css'
// import AllProduct from './components/allProduct';
import Addtocart from './page/User/addtocart';
import Adminpage from './page/Admin/landingpage';
import Login from './page/Login Signup/login';
import Signup from './page/Login Signup/signup';
import Profile from './page/User/profile';
import Adminmain from './page/Admin/main';
import Order from './page/Admin/order';
import Customer from './page/Admin/customer';
import Productpage from './page/Admin/productpage';
import Setting from './page/User/setting';
import Analytic from './page/Admin/analytic';
import AllProducts from './components/allProducts';
import AdminRoute from './middleware/AdminRoute';
import ProtectedRoute from './middleware/ProtectedRoute';
import CartLoader from './middleware/cartLoader';

function App() {
  return (
    <BrowserRouter>
    <CartLoader/>
      <Routes>
        <Route path='login' element={<Login />} />
        {/* <Route path='/' element={<Landing />} /> */}
        <Route path='signup' element={<Signup />} />

// user page route
        <Route path="/" element={<ProtectedRoute> <Landing /> </ProtectedRoute>}>
          <Route path='' element={<Main />} />
          <Route path="productdetail/:id" element={<ProductDetail />} />
          <Route path="allproducts/productdetail/:id" element={<ProductDetail />} />
          {/* <Route path='allproducts' element={<AllProduct />} /> */}
          <Route path='addtocart' element={<Addtocart />} />
          <Route path='profile' element={<Profile />} />
          <Route path="allproducts/:category" element={<AllProducts/>} />
          <Route path='setting' element={<Setting/> }/>
          <Route path='*' element={<ErrorPage />} />
        </Route>

// Admin page route
        <Route path='admindashboard' element={<AdminRoute> <Adminpage /> </AdminRoute>}>
          <Route path='' element={<Adminmain />} />
          <Route path='order' element={<Order />} />
          <Route path='customer' element={<Customer />} />
          <Route path='products' element={<Productpage />} />
          <Route path='analytic' element={<Analytic/>}/>
          <Route path='setting' element={<Setting />}/>
        </Route>


        <Route path='*' element={<ErrorPage />} />
      </Routes>

    </BrowserRouter>
  )
}

export default App
