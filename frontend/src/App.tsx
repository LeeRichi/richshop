import React from 'react'
import Navbar from './components/Navbar'
import Home from './page/Home'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ProductDetail from './page/ProductDetail';
import Favorite from './page/Favorite'
import Footwear from './page/Footwear'
import Accessories from './page/Accessories'
import Apparel from './page/Apparel'

import { useSelector } from 'react-redux';
import { RootState } from '../src/app/rootReducer';
import { Product } from '../src/interface/ProductInterface';

import CategoryPage from './page/CategoryPage';




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

          {/* <Route path='/category/Footwear' element={<Footwear />} />
          <Route path='/category/Accessories' element={<Accessories />} />
          <Route path='/category/Apparel' element={<Apparel />} /> */}
          {categories.map(category => (
            <Route key={category} path={`/category/${category}`} element={<CategoryPage category={category} />} />
          ))}
        </Routes>
      </div>
    </Router>
    
    
  )
}

export default App