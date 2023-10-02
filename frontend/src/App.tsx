import React from 'react'
import Navbar from './components/Navbar'
import Home from './page/Home'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ProductDetail from './page/ProductDetail';
import Favorite from './page/Favorite'
import Cart from '../src/page/Cart'

import { useSelector } from 'react-redux';
import { RootState } from '../src/app/rootReducer';
import { Product } from '../src/interface/ProductInterface';

import CategoryPage from './page/CategoryPage';
import LoginForm from './page/LoginForm';
import Dashboard from './page/Dashboard';


const App = () =>
{
  const products = useSelector((state: RootState) => state.products);
  const categories = Array.from(new Set(products.products.map((product: Product) => product.category)));

  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path='/favorite' element={<Favorite />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/auth' element={<LoginForm />} />
          <Route path='/dashboard' element={<Dashboard />} />

          {categories.map(category => (
            <Route key={category} path={`/category/${category}`} element={<CategoryPage category={category} />} />
          ))}
        </Routes>
      </div>
    </Router>
    
    
  )
}

export default App