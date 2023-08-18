import React, { useState, useEffect } from 'react';
import { Container, Card, CardContent, Typography, Button, Grid } from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';


export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
}

function Home({ cartItems, setCartItems }: { cartItems: Product[]; setCartItems: React.Dispatch<React.SetStateAction<Product[]>> }) {
    const [products, setProducts] = useState<Product[]>([]);
    
    const addToCart = (product: Product) => {
        setCartItems(prevItems => [...prevItems, product]);
        console.log(cartItems);

    };

  useEffect(() => {
    axios.get('http://localhost:5052/api/v1/products')
      .then(response => {
          setProducts(response.data);
        //   console.log(response.data)
      })
      .catch(error => {
        console.error('Error fetching products:', error);
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
                <img src={product.image} alt={product.title} style={{ maxWidth: '100%', height: 'auto' }} />
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
