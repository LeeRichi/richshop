import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/rootReducer';
import { Box, Button, Grid, useMediaQuery } from '@mui/material';
import { FavoriteInterface } from '../interface/FavoriteInterface';
import React from 'react';
import ProductCard from '../components/ProductCard';
import { useParams } from 'react-router-dom';

const Favorites = () => {
  const dispatch = useDispatch();
  // const favorites = useSelector((state: RootState) => state.user.userDetails?.favorites);
  const isSmallDevice = useMediaQuery('(max-width: 900px)');

  const { id } = useParams();
  const users = useSelector((state: RootState) => state.allUser.users);
  const user = users?.find((user) => user.id === id);

  const favorites = user?.favorites;
  
  return (
    <Box flex={1} padding={2}>
      <h2 style={{ textAlign: isSmallDevice ? 'center' : 'initial' }}>
        Favorites</h2>
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
