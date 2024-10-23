import React from "react";
import { Routes,Route } from "react-router-dom";
import Collection from "./pages/collection";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/login";
import Placeorder from "./pages/Placeorder";
import Orders from "./pages/Orders";
import Navbar from "./components/Navbar";
import Home from "./pages/Home"; 
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App =()=>{
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] 1g:px-[9vw]">
      <ToastContainer/>
      <Navbar/>
      <SearchBar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/collection" element ={<Collection/>}/>
        <Route path="/About" element ={<About/>}/>
        <Route path="/Contact" element ={<Contact/>}/>
        <Route path="/Product/:ProductId" element ={<Product/>}/>
        <Route path="/Cart" element ={<Cart/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/placeorder" element ={<Placeorder/>}/>
        <Route path="/Orders" element ={<Orders/>}/>

      </Routes>
      <Footer/>
   </div>

  )
}
export default App;