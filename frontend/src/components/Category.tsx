import React from 'react'
import { Container, Grid, Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/rootReducer';
import { Product } from '../interface/ProductInterface';
import { Link } from 'react-router-dom';

const Category = () =>
{
  const products = useSelector((state: RootState) => state.products);
  const categories = Array.from(new Set(products.products.map((product: Product) => product.category)));

  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '10px', borderBottom: '1px solid #ccc' }}>
        {categories.map((category, index) => (
          <Typography variant="h6" key={index} style={{ margin: '15px' }}>
            <Link to={`/category/${category}`} style={{ color: 'inherit', textDecoration: 'none' }}>
              {category}
            </Link>
          </Typography>
        ))}
    </div>
  )
}

export default Category