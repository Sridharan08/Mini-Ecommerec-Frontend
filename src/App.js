import './App.css';
import Home from './pages/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductDetails from './pages/productDeatils';
import Cart from './pages/Cart';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
const [cartItems, setCartItems] = useState([]);

  return (
    <div className="App">
      <Router>
        <ToastContainer position="top-center" autoClose={2000} theme="dark" />
        <Header cartItems={cartItems}/> 
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails cartItems={cartItems} setCartItems={setCartItems} />} />
          <Route path="/cart" element={<Cart cartItems={cartItems} setCartItems={setCartItems} />} />
        </Routes>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
