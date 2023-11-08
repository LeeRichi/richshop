import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  InputBase,
  Menu,
  MenuItem,
  useMediaQuery,
} from '@mui/material';
import { AccountCircle, FavoriteBorder, ShoppingCart, Search } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/rootReducer';
import { logoutUser } from '../features/user/userSlice';
import { clearCart } from '../features/cart/cartSlice';
import { setAllOrders } from '../features/order/orderSlice';
import { setAllUsers } from '../features/user/allUserSlice';
import { Product } from '../interface/ProductInterface';
import {
  closeCart,
  closeFavorite,
  closeOrderHistory,
  closeOrderManage,
  closeProductManage,
  closeUserManage,
  openCart,
  openFavorite,
} from '../features/DetailPages/DetailPagesSlice';

const Navbar = ({
  appLogout,
  products,
  onSearchResultsChange,
}: {
  appLogout: () => void;
  products: Product[];
  onSearchResultsChange: (results: Product[]) => void;
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.userDetails);
  const favoriteCount = user?.favorites?.length;
  const cartCount = user?.carts?.length;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const isSmallDevice = useMediaQuery('(max-width:900px)');
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

  const handleLogout = () => {
    dispatch(clearCart());
    dispatch(setAllUsers([]));
    dispatch(setAllOrders([]));

    appLogout();
    dispatch(logoutUser());
    localStorage.removeItem('token');
  };
  
  console.log(user)

  const onHandleClick = (btn: 'favorites' | null | 'cart') => {
    if (user) {
      if (btn === 'favorites') {
        dispatch(openFavorite());
        dispatch(closeCart());
        dispatch(closeProductManage());
        dispatch(closeUserManage());
        dispatch(closeOrderHistory());
        dispatch(closeOrderManage());
      } else if (btn === 'cart') {
        dispatch(closeFavorite());
        dispatch(openCart());
        dispatch(closeProductManage());
        dispatch(closeUserManage());
        dispatch(closeOrderHistory());
        dispatch(closeOrderManage());
      } else {
        dispatch(closeCart());
        dispatch(closeFavorite());
        dispatch(closeProductManage());
        dispatch(closeUserManage());
        dispatch(closeOrderHistory());
        dispatch(closeOrderManage());
      }
    } else {
      navigate('/auth');
    }
  };

  return (
    <AppBar position="static" style={{ backgroundColor: '#2d2d2d' }}>
      <Toolbar
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <IconButton color="inherit">
            <Search />
          </IconButton>
          <form onSubmit={handleSearchSubmit} style={{ minWidth: 150 }}>
            <InputBase
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
              inputProps={{ 'aria-label': 'search' }}
              style={{
                borderBottom: '1px solid white',
                width: !isSmallDevice ? '180%' :'70%',
                backgroundColor: 'transparent',
                color: 'white',
              }}
            />
          </form>
        </div>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          style={{
            backgroundColor: 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textDecoration: 'none',
            color: 'white',
            border: '1px solid white',
            padding: '5px',
            marginLeft: '-100px'
          }}
        >
          <span style={{ verticalAlign: 'middle' }}>RICH</span>
        </Typography>
        <div>
          <IconButton
            color="inherit"
            component={Link}
            to={`/users/${user?.id}`}
            onClick={() => onHandleClick('favorites')}
          >
            <Badge badgeContent={favoriteCount} color="secondary">
              <FavoriteBorder />
            </Badge>
          </IconButton>
          {user ? (
            <>
              <IconButton color="inherit" onClick={handleMenuClick}>
                <img
                  src={user.avatar ? user.avatar : 'https://gravatar.com/avatar/00000000000000000000000000000000?d=mp'}
                  alt={user.name}
                  width="32px"
                  height="32px"
                  style={{
                    borderRadius: '50%',
                    border: user.role === 'Admin' ? '1px solid white' : 'none',
                  }}
                />
                {/* admin badge */}
                {user.role === 'Admin' && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      borderRadius: '50%',
                      padding: '2px',
                      color: 'white',
                      fontSize: '20px',
                      lineHeight: '1',
                    }}
                  >
                    ☑️
                  </div>
                )}
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
                  to={`/users/${user.id}`}
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
          <IconButton
            color="inherit"
            component={Link}
            to={`/users/${user?.id}`}
            onClick={() => onHandleClick('cart')}
          >
            <Badge badgeContent={cartCount} color="primary">
              <ShoppingCart />
            </Badge>
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
