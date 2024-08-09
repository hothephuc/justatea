import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import LoginSignup from "./pages/LoginSignup";
import About from "./pages/About";
import Picture from "./pages/Picture";
import Contact from "./pages/Contact";
import Menu from "./pages/Menu";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Product from "./pages/Product";
import ChangeProfile from "./pages/ChangeProfile";
import AddProduct from "./pages/AddProduct";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart"
import PaymentPage from "./pages/PaymentPage"; // Import the PaymentPage
import Admin from "./pages/Admin";
import CustomerList from './components/adPanel/CustomerList';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Menu' element={<Menu />} />
          <Route path='/Menu/:productID' element={<Product />} />
          <Route path='/AddProduct' element={<AddProduct />} />
          <Route path='/Contact' element={<Contact />} />
          <Route path='/Picture' element={<Picture />} />
          <Route path='/About' element={<About />} />
          <Route path='/LoginSignup' element={<LoginSignup />} />
          <Route path='/Signup' element={<Signup />} />
          <Route path='/ChangeProfile' element={<ChangeProfile />} />
          <Route path='/Profile' element={<Profile />} />
          <Route path='/Admin' element={<Admin/>}/>
          <Route path="/Cart" element={<Cart/>}/>
          <Route path='/payment' element={<PaymentPage />} /> {/* Add PaymentPage route */}
          <Route path='/CustomerList' element={<CustomerList/>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
