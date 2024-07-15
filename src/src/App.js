
//import './App.css';
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import {BrowserRouter,Routes,Route} from 'react-router-dom';
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

function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/Menu" element={<Menu/>}/>
          <Route path='Menu/:productID' element={<Product/>}/>
          <Route path='/AddProduct' element={<AddProduct/>}/>
        <Route path='/Contact' element={<Contact/>}/>
        <Route path='/Picture' element={<Picture/>}/>
        <Route path='/About' element={<About/>}/>
        <Route path='LoginSignup' element={<LoginSignup/>}/>
        <Route path='/Signup' element={<Signup/>}/>
        <Route path='/ChangeProfile' element={<ChangeProfile/>}/>
      </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
