import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import LoginSignup from "./pages/LoginSignup";
import About from "./pages/About";
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
import CustomerList from './pages/CustomerList';
import Setting from './pages/Setting';
import Checkout from './pages/Checkout';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentFailure from './pages/PaymentFailure';
import ChatbotPage from "./pages/Chatbot";
import ProductMannager from './pages/ProductManager';
import Reports from './pages/Reports';
import Voucher from './pages/Voucher';
import History from './pages/History';
import Ordered from './pages/Ordered';

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
          <Route path='/About' element={<About />} />
          <Route path='/LoginSignup' element={<LoginSignup />} />
          <Route path='/Signup' element={<Signup />} />
          <Route path='/ChangeProfile' element={<ChangeProfile />} />
          <Route path='/Profile' element={<Profile />} />
          <Route path='/Admin' element={<Admin/>}/>
          <Route path="/Cart" element={<Cart/>}/>
          <Route path='/CustomerList' element={<CustomerList/>} />
          <Route path='/Setting' element ={<Setting/>} />
          <Route path="/Checkout" element={<Checkout/>}/>
          <Route path='/payment' element={<PaymentPage />} /> 
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/payment-fail" element={<PaymentFailure />} />
          <Route path="/Ordered" element={<Ordered />} />
          <Route path="/product-manager" element={<ProductMannager/>}/>
          <Route path='/reports' element ={<Reports/>}/>
          <Route path='/voucher' element ={<Voucher/>}/>
          <Route path='/History' element ={<History/>}/>
          <Route path='/chatbot' element={<ChatbotPage />} />  {/* Add the chatbot route */}
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
