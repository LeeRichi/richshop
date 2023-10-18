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
import OrderDetail from './page/OrderDetail';


const App = () =>
{
  const products = useSelector((state: RootState) => state.products);
  const categories = Array.from(new Set(products.products.map((product: Product) => product.category)));

  const userRole = useSelector((state: RootState) => state.user.userDetails?.role)
  const [isAdmin, setIsAdmin] = useState(false)

  const [searchResults, setSearchResults] = useState<Product[]>(products.products);
  console.log(products.products)
  console.log(searchResults)
  
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
        <Navbar appLogout={appLogout} products={products.products} onSearchResultsChange={setSearchResults}/>
        <Routes>
          <Route path="/" element={<Home searchResults={searchResults}/>} />
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

          <Route path='/users/:id' element={<UserDetail appLogout={appLogout} />} />         
          <Route path='/orders/:id' element={<OrderDetail />} />

          {categories.map(category => (
            <Route key={category} path={`/category/${category}`} element={<CategoryPage category={category} />} />
          ))}
        </Routes>
      </div>
    </Router>
    
    
  )
}

export default App

// function dispatch(arg0: any)
// {
//   throw new Error('Function not implemented.');
// }
