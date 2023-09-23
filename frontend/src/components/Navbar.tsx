import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Badge } from '@mui/material';
import { AccountCircle, ShoppingCart } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import { useSelector } from 'react-redux';
import { RootState } from '../app/rootReducer';


function Navbar()
{
  const favoriteCount = useSelector((state: RootState) => state.favorites.favoriteCount);
  console.log(favoriteCount)
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component={Link} sx={{ flexGrow: 1 }} to="/">
          FullStackShop
        </Typography>
        <IconButton color="inherit" component={Link} to="/favorite">
          <Badge badgeContent={favoriteCount} color="secondary">
            <FavoriteBorderIcon />
          </Badge>
          {/* <FavoriteBorderIcon /> */}
          {/* {favoriteCount > 0 && <span>{favoriteCount}</span>} */}
        </IconButton>
        <IconButton color="inherit" component={Link} to="/auth">
          <AccountCircle />
        </IconButton>
        <IconButton color="inherit" component={Link} to="/cart"> {/* Use Link to navigate */}
          <ShoppingCart />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
