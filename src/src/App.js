
//import './App.css';
import Navbar from "./components/navbar/Navbar";
import { BrowserRouter,Routes,Route} from 'react-router-dom';
import LoginSignup from "./pages/LoginSignup";
import About from "./pages/About";
import Picture from "./pages/Picture";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import Home from "./pages/Home";

function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Product' element={<Product/>}/>
        <Route path='/Contact' element={<Contact/>}/>
        <Route path='/Picture' element={<Picture/>}/>
        <Route path='/About' element={<About/>}/>
        <Route path='LoginSignup' element={<LoginSignup/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
