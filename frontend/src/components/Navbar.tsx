import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Badge, InputBase } from '@mui/material';
import { AccountCircle, Storefront, ShoppingCart, Roofing } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Search as SearchIcon } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { RootState } from '../app/rootReducer';

function Navbar() {
  const favoriteCount = useSelector((state: RootState) => state.favorites.favoriteCount);
  const cartCount = useSelector((state: RootState) => state.cart.cartCount);
  const userAvatar = useSelector((state: RootState) => state.user.userDetails);

  return (
    <AppBar position="static" style={{ backgroundColor: '#2d2d2d' }}>
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <IconButton color="inherit">
            <SearchIcon />
          </IconButton>
          <InputBase
            placeholder="Search..."
            inputProps={{ 'aria-label': 'search' }}
            style={{ borderBottom: '1px solid white', width: '300px', backgroundColor: 'transparent', color: 'white' }}
          />
        </div>
        <Typography variant="h6" component={Link} to="/" style={{ backgroundColor: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', color: 'white', border: '1px solid white', marginRight: '15rem', padding: '5px'}}>
          <span style={{ verticalAlign: 'middle' }}>RICH</span>
        </Typography>
        <div>
          <IconButton color="inherit" component={Link} to="/favorite">
            <Badge badgeContent={favoriteCount} color="secondary">
              <FavoriteBorderIcon />
            </Badge>
          </IconButton>
          <IconButton color="inherit" component={Link} to="/auth">
            {userAvatar ? <img src={userAvatar.avatar} alt="User Avatar" width="15%" style={{borderRadius:'50%'}}/> : <AccountCircle />}
          </IconButton>
          <IconButton color="inherit" component={Link} to="/cart">
            <Badge badgeContent={cartCount} color="primary">
              <ShoppingCart />
            </Badge>
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
