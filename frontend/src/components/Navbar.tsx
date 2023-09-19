import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { AccountCircle, ShoppingCart } from '@mui/icons-material';
import { Link } from 'react-router-dom';

function Navbar()
{
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component={Link} sx={{ flexGrow: 1 }} to="/">
          FullStackShop
        </Typography>
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
