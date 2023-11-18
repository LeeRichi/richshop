import React from 'react';
import { Container, Grid, Button, Typography, useMediaQuery } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/rootReducer';
import { Product } from '../interface/ProductInterface';
import { Link } from 'react-router-dom';

const Category = () => {
  const products = useSelector((state: RootState) => state.products);
  const categories = Array.from(new Set(products.products.map((product: Product) => product.category)));
  const isSmallDevice = useMediaQuery('(max-width:480px)');

  return (
    <Container
      maxWidth="lg"
      style={{
        marginTop: '10px',
        borderBottom: '1px solid #ccc',
        display: 'flex',
        flexDirection: isSmallDevice ? 'column' : 'row',
        justifyContent: 'center',
        alignItems: isSmallDevice ? 'center' : 'flex-start',
      }}
    >
      {categories.map((category, index) => (
        <Typography variant="h6" key={index} style={{ margin: '15px' }}>
          <Link to={`/category/${category}`} style={{ color: 'inherit', textDecoration: 'none' }}>
            {category}
          </Link>
        </Typography>
      ))}
      <Typography variant="h6" style={{ margin: '15px', color: 'red' }}>
        <Link to={`/category/sale`} style={{ color: 'inherit', textDecoration: 'none' }}>
          Sale
        </Link>
      </Typography>
    </Container>
  );
};

export default Category;
