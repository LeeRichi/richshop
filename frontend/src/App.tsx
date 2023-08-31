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
import Products from './pages/ProductCrud/Products';


function App()
{
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [userIdRef, setUserIdRef] = useState('');

  console.log(userIdRef);

  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home cartItems={cartItems} setCartItems={setCartItems} />} />
          <Route path="/cart" element={<Cart cartItems={cartItems} setCartItems={setCartItems} userIdRef={userIdRef} />} />
          <Route path="/auth" element={<Auth setUserIdRef={setUserIdRef} />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/users" element={<CheckAllUsers />} />
          <Route path="/userOrderPath/:userId" element={<UserOrderPage />} />
          <Route path="/products" element={<Products />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
