import React, { useState, useEffect } from 'react';
import { Container, Card, CardContent, Typography, Button, Grid } from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BASE_API_URL } from '../constants'; // Adjust the import path based on your project structure


export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string;
}

function Home({ cartItems, setCartItems }: { cartItems: Product[]; setCartItems: React.Dispatch<React.SetStateAction<Product[]>> }) {
  const [products, setProducts] = useState<Product[]>([]);
  
  console.log(products);
    
    const addToCart = (product: Product) => {
        setCartItems(prevItems => [...prevItems, product]);
        console.log(cartItems);

    };
  

  useEffect(() => {
    axios.get(`${BASE_API_URL}/products`)
      .then(response => {
          setProducts(response.data);
          console.log(response.data)
      })
      .catch(error => {
        // console.error('Error fetching products:', error);
        console.error('Error fetching products:', error);
        if (error.response) {
          console.error('Response data:', error.response.data);
        }
      });
  }, []);

  return (
    <Container sx={{ paddingTop: '10vh' }}>
      <Grid container spacing={5}>
        {products.map(product => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <CardContent>
                <Typography variant="h6">{product.title}</Typography>
                <Typography variant="subtitle1">${product.price}</Typography>
                <Typography>{product.description}</Typography>
                <div style={{ height: '250px', overflow: 'hidden' }}>
                  <img src={product.images} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <Button variant="contained" color="primary" fullWidth onClick={() => addToCart(product)}>
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

    </Container>
  );
}

export default Home;


