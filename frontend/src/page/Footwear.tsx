import React from 'react';
import Sidebar from '../components/Sidebar';
import SubNavbar from '../components/SubNavbar';
import { useSelector } from 'react-redux';
import { selectProducts } from '../features/product/productSlice'; // Replace with the correct path to your product slice
import { Container, Grid, Button, Typography } from '@mui/material';
import ProductCard from '../components/ProductCard';

const Footwear = () => {
  const products = useSelector(selectProducts); // Assuming you have a selector to get all products

  const footwearProducts = products.filter(product => product.category === 'Footwear');
  console.log(footwearProducts);

  return (
    <>
      <SubNavbar />
      <div style={{ display: 'flex' }}>
              <Sidebar />
              <Grid container spacing={2}>
        {footwearProducts.map((product: any) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
        {/* <div style={{ flex: 1, padding: '20px', display: 'flex', flexWrap: 'wrap' }}>
          {footwearProducts.map(product => (
            <div key={product.id} style={{ padding: '10px', border: '1px solid #ccc', margin: '20px', width: '200px', height: '300px' }}>
              <h3>{product.title}</h3>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
            </div>
          ))}
        </div> */}
      </div>
    </>
  );
};

export default Footwear;
