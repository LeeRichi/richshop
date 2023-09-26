import React from 'react'
import Navbar from './components/Navbar'
import Home from './page/Home'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ProductDetail from './page/ProductDetail';
import Favorite from './page/Favorite'
import SecondaryNavbar from './components/SecondaryNavbar';


const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <SecondaryNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path='/favorite' element={<Favorite />} />
        </Routes>
      </div>
    </Router>
    
    
  )
}

export default App