import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/rootReducer';
import { Box, Button, Grid } from '@mui/material';
import { FavoriteInterface } from '../interface/FavoriteInterface';
import React from 'react';
import ProductCard from '../components/ProductCard';

const Favorites = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.user.userDetails?.favorites);
  console.log(favorites);

  return (
    <Box flex={1} padding={2}>
      <h2>Favorites</h2>
      <Grid container spacing={2}>
        {favorites?.map((favorite) => (
          favorite.product ? (
            <Grid item key={favorite.product.id} xs={12} sm={6} md={4} lg={3} style={{ margin: '2rem 3rem 7rem'}}>
              <ProductCard product={favorite.product} />
              <Button
                variant="contained"
                color='primary'
                style={{width: '100%', marginTop: '15px'}}
              >
                Add to Card
              </Button>            
            </Grid>
          ) : null
        ))}
      </Grid>
    </Box>
  );
};

export default Favorites;
