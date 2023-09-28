import React from 'react';
import Sidebar from '../components/Sidebar';
import SubNavbar from '../components/SubNavbar';
import { useSelector } from 'react-redux';
import { selectProducts } from '../features/product/productSlice'; // Replace with the correct path to your product slice
import { Container, Grid, Button, Typography } from '@mui/material';
import ProductCard from '../components/ProductCard';
import Category from '../components/Category'

const Accessories = () => {
  const products = useSelector(selectProducts);

  const accessoriesProducts = products.filter(product => product.category === 'Accessories');

  return (
    <>
        <Category />
        <SubNavbar />
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <Grid container spacing={2} style={{margin:'5rem'}}>
                {accessoriesProducts.map((product: any) => (
                    <Grid item key={product.id} xs={12} sm={6} md={4} lg={3} >
                        <ProductCard product={product} style={{ height: '400px', width: '300px'}} /> 
                    </Grid>
                ))}
            </Grid>
        </div>
    </>
  );
};

export default Accessories;
