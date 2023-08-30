import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Cart from './pages/Cart';
import React, { useState } from 'react';
import { Product } from './pages/Home';
import Auth from './pages/Auth'
import Orders from './pages/OrderCrud/Orders';
import CheckAllUsers from './pages/UserCrud/Users';
import UserOrderPage from './pages/UserOrderPage';


function App()
{
  const [cartItems, setCartItems] = useState<Product[]>([]);

  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home cartItems={cartItems} setCartItems={setCartItems} />} />
          <Route path="/cart" element={<Cart cartItems={cartItems} setCartItems={setCartItems} />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/users" element={<CheckAllUsers />} />
          <Route path="/userOrderPath/:userId" element={<UserOrderPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
