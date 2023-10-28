import React, {useState} from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  InputBase,
  Menu,
  MenuItem,
} from '@mui/material';import { AccountCircle, Storefront, ShoppingCart, Roofing } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Search as SearchIcon } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/rootReducer';
import { logoutUser } from '../features/user/userSlice';
import { clearFavorite } from '../features/favorite/favoriteSlice';
import { clearCart } from '../features/cart/cartSlice';
import { setAllOrders } from '../features/order/orderSlice';
import { setAllUsers } from '../features/user/allUserSlice';
import { Product } from '../interface/ProductInterface';

const Navbar = ({ appLogout, products, onSearchResultsChange }: { appLogout: () => void, products: Product[], onSearchResultsChange: (results: Product[]) => void;  }) =>
{
  const dispatch = useDispatch();
  const favoriteCount = useSelector((state: RootState) => state.favorites.favoriteCount);
  const cartCount = useSelector((state: RootState) => state.cart.cartCount);
  const userAvatar = useSelector((state: RootState) => state.user.userDetails);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filteredResults = products.filter((product) =>
      product.title.toLowerCase().includes(query)
    );
    setSearchResults(filteredResults);
    onSearchResultsChange(filteredResults);  
  };

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () =>
  {
    dispatch(clearFavorite());
    dispatch(clearCart())
    dispatch(setAllUsers([]));
    dispatch(setAllOrders([]));

    appLogout();
    dispatch(logoutUser());
    localStorage.removeItem('token');
  };

  return (
    <AppBar position="static" style={{ backgroundColor: '#2d2d2d' }}>
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <IconButton color="inherit">
            <SearchIcon />
          </IconButton>
          <form onSubmit={handleSearchSubmit}>
            <InputBase
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
              inputProps={{ 'aria-label': 'search' }}
              style={{
                borderBottom: '1px solid white',
                width: '300px',
                backgroundColor: 'transparent',
                color: 'white',
              }}
            />
          </form>
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
          {userAvatar ? (
            <>
              <IconButton color="inherit" onClick={handleMenuClick}>
                <img
                  src={userAvatar.avatar ? userAvatar.avatar : "https://gravatar.com/avatar/00000000000000000000000000000000?d=mp"}
                  alt={userAvatar.name}
                  width="32px"
                  height="32px"
                  style={{ borderRadius: '50%' }}
                />
              </IconButton>
              <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                >
                  <MenuItem
                    component={Link}
                    to={`/users/${userAvatar.id}`}
                    onClick={handleMenuClose}
                  >
                    Dashboard
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleLogout();
                      handleMenuClose();
                    }}
                  >
                    Logout
                  </MenuItem>
                </Menu>
            </>
          ) : (
            <IconButton color="inherit" component={Link} to="/auth">
              <AccountCircle style={{ fontSize: '32px' }} />
            </IconButton>
          )}
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
