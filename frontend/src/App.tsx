import React from 'react'
import Navbar from './components/Navbar'
import Home from './page/Home'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ProductDetail from './page/ProductDetail';
import Favorite from './page/Favorite'
import Footwear from './page/Footwear'
import Accessories from './page/Accessories'
import Apparel from './page/Apparel'

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path='/favorite' element={<Favorite />} />

          <Route path='/category/Footwear' element={<Footwear />} />
          <Route path='/category/Accessories' element={<Accessories />} />
          <Route path='/category/Apparel' element={<Apparel />} />
        </Routes>
      </div>
    </Router>
    
    
  )
}

export default App