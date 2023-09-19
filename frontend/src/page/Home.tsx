import React, { useState, useEffect } from 'react';
import { Container, Grid, Button } from '@mui/material';
import axios from 'axios';
import { BASE_API_URL } from '../constants';
import ProductCard from '../components/ProductCard';
import { Product } from '../interface/ProductInterface';
import selectProducts from '../app/store';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/rootReducer';
import { setProducts } from '../features/product/productSlice'



const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${BASE_API_URL}/products`);
        console.log(response.data)
        dispatch(setProducts(response.data));
        console.log(products)
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Container>
      <div style={{
        width: '100%',
        minHeight: '300px',
        backgroundColor: '#f5a623',
        cursor: 'pointer',
        marginBottom: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px',
        borderRadius: '10px',
        marginTop: '10px'
      }}>
        <div>
          Seasonal Sale!
        </div>
        <Button variant="text" style={{ cursor: 'pointer' }}>
          Shop Now
        </Button>
      </div>
      <Grid container spacing={2}>
        {products.products.map((product: any) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
