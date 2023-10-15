import React,{useState, useEffect} from 'react'
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
import Dashboard from './page/Dashboard/Dashboard';
import ProductManage from './page/Dashboard/manage/ProductManage';
import UserManage from './page/Dashboard/manage/UserManage';
import OrderManage from './page/Dashboard/manage/OrderManage';
import UserDetail from './page/UserDetail';

const App = () =>
{
  const products = useSelector((state: RootState) => state.products);
  const categories = Array.from(new Set(products.products.map((product: Product) => product.category)));


  const userRole = useSelector((state: RootState) => state.user.userDetails?.role)
  const [isAdmin, setIsAdmin] = useState(false)
  
  useEffect(() => {
    if (userRole === "Admin") {
      setIsAdmin(true);
    }
  }, [userRole]); 

  const appLogout = () => {
    setIsAdmin(false); 
  }

  return (
    <Router>
      <div>
        <Navbar appLogout={appLogout} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path='/favorite' element={<Favorite />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/auth' element={<LoginForm />} />
          <Route path='/dashboard' element={<Dashboard />} />

           {isAdmin ? (
          <>
            <Route path='manage-products' element={<ProductManage />} />
            <Route path='manage-users' element={<UserManage />} />
            <Route path='manage-orders' element={<OrderManage />} />
          </>
          ) : (
            <>
              <Route path='manage-products' element={<Navigate to='/' />} />
              <Route path='manage-users' element={<Navigate to='/' />} />
              <Route path='manage-orders' element={<Navigate to='/' />} />
            </>
          )}

          <Route path='/users/:id' element={<UserDetail appLogout={appLogout}/>} />

          {categories.map(category => (
            <Route key={category} path={`/category/${category}`} element={<CategoryPage category={category} />} />
          ))}
        </Routes>
      </div>
    </Router>
    
    
  )
}

export default App