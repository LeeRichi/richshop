import React, { useState, useEffect, useRef } from 'react';
import { Container, Grid, Button, Typography, InputBase } from '@mui/material';
import axios from 'axios';
import { BASE_API_URL } from '../utils/constants';
import ProductCard from '../components/ProductCard';
import { Product } from '../interface/ProductInterface';
import selectProducts from '../app/store';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/rootReducer';
import { setProducts } from '../features/product/productSlice';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link, useNavigate } from 'react-router-dom';
import Category from '../components/Category';
import { fetchProducts } from '../utils/api/ProductsApi';
import My3DViewer from '../components/3d/My3DViewer';
import NewsLetterForm from '../components/NewsLetterForm';
import './index.css'

const Home = ({ searchResults }: { searchResults: Product[] }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state: RootState) => state.products);

  useEffect(() => {
    fetchProducts().then(products => {
      dispatch(setProducts(products));
      console.log(products.length)
    })
    .catch(error => {
      console.error('Error fetching users:', error);
    });
  }, [dispatch]);

  return (
    <>
      {!products ? <h1>loading...</h1> :  <Container style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Category />
        <div style={{ 
          width: '100vw', 
          height: '60vh', 
          minHeight: '300px', 
          marginBottom: '20px', 
          display: 'flex', 
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px', 
          marginTop: '10px', 
          position: 'relative',
        }}>
          <My3DViewer />
          <div style={{ 
            position: 'absolute', 
            textAlign: 'center',
            color: 'white', 
            zIndex: 1,
          }}>
            <div style={{ fontSize: '72px', fontWeight: 'bold' }}>
              Step into Style!
            </div>
            <div style={{ fontSize: '40px', marginTop: '15px' }}>
              Black Friday - Discover the Latest Trends
            </div>
            <Button
              variant="contained"
              onClick={() => navigate('/category/sale')}
              style={{ cursor: 'pointer', marginTop: '15px', backgroundColor: 'transparent', boxShadow: 'none' }}>
              Black Friday Sale
              <ArrowForwardIcon style={{ marginLeft: '5px' }} />
            </Button>
          </div>
        </div>           
        <Grid container spacing={2}>
          {searchResults.length > 0
            ? searchResults.map((product: any) => (
              <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                <ProductCard product={product} />
              </Grid>
            ))
            : products.products.map((product: any) => (
              <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                <ProductCard product={product} />             
              </Grid>
          ))}                        
        </Grid>        
        <NewsLetterForm />
      </Container>}   
      <div className="carousel-container">
        <div className="carousel-text">
          <span> Get the Rich App: App Store</span>
          <span style={{padding: '0 10vw'}}></span>
          <span>📱 Get the Rich App: Google Play</span>
        </div>
      </div>
    </>
  );
};

export default Home;
