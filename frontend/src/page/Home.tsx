import React, { useState, useEffect } from 'react';
import { Container, Grid, Button, Typography } from '@mui/material';
import axios from 'axios';
import { BASE_API_URL } from '../utils/constants';
import ProductCard from '../components/ProductCard';
import { Product } from '../interface/ProductInterface';
import selectProducts from '../app/store';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/rootReducer';
import { setProducts } from '../features/product/productSlice';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link } from 'react-router-dom';
import Category from '../components/Category';
import { fetchProducts } from '../utils/api/ProductsApi';
import Footer from '../components/Footer';

const footwearBanner = require('../assets/footwearBanner.png');

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products);

  useEffect(() => {
    fetchProducts().then(products => {
      dispatch(setProducts(products));
    })
    .catch(error => {
      console.error('Error fetching users:', error);
    });
  }, [dispatch]);

  return (
    <>
      {!products ? <h1>loading...</h1> :  <Container style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Category />
        <div style={{ width: '100%', minHeight: '300px', backgroundColor: '#f5a623', marginBottom: '20px', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', padding: '20px', borderRadius: '10px', marginTop: '10px', }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
              Step into Style!
            </div>
            <div style={{ fontSize: '20px', marginTop: '15px' }}>
              Back to School - Discover the Latest Trends
            </div>
            <Button variant="contained" style={{ cursor: 'pointer', marginTop: '15px', backgroundColor: 'transparent', boxShadow: 'none', }}>
              Shop Footwear
              <ArrowForwardIcon style={{ marginLeft: '5px' }} />
            </Button>
          </div>
          <div style={{ flex: 1, textAlign: 'right' }}>
            <img src="https://pbs.twimg.com/media/FgK636pX0AAhkjc?format=jpg&name=large" alt="Your Image" style={{ width: '60%', marginRight: '10%', marginBottom: '-25px' }} />
          </div>
        </div>
        <Grid container spacing={2}>
          {products.products.map((product: any) => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      </Container>}
      <Footer />
    </>
  );
};

export default Home;
