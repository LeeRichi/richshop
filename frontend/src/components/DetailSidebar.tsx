import React, {useState} from 'react'
import { Box, Avatar, Typography, Button, IconButton, } from '@mui/material'
import UserInterface from '../interface/UserInterface'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../features/user/userSlice';
import { clearFavorite } from '../features/favorite/favoriteSlice';
import { clearCart } from '../features/cart/cartSlice';
import { setAllOrders } from '../features/order/orderSlice';
import { setAllUsers } from '../features/user/allUserSlice';

interface DetailSidebarProps {
  user: UserInterface;
  appLogout: () => void;
  setIsProductManageOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsUserManageOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOrderManageOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DetailSidebar: React.FC<DetailSidebarProps> = ({ user, appLogout, setIsProductManageOpen, setIsUserManageOpen, setIsOrderManageOpen }) =>
{
    const dispatch = useDispatch();
    const [activeButton, setActiveButton] = useState<'product' | 'user' | 'order' | null>(null);


    const HandleLogOut = () =>
    {
      dispatch(clearFavorite());
        dispatch(clearCart())
        dispatch(setAllUsers([]));
        dispatch(setAllOrders([]));

        appLogout();
        dispatch(logoutUser());
        localStorage.removeItem('token');
    }

    const handleButtonClick = (button: 'product' | 'user' | 'order' | null) => {
    setActiveButton(button);
    
    // Set other buttons to false
    if (button === 'product') {
      setIsProductManageOpen(true)
      setIsUserManageOpen(false);
      setIsOrderManageOpen(false);
    } else if (button === 'user') {
      setIsUserManageOpen(true)
      setIsProductManageOpen(false);
      setIsOrderManageOpen(false);
    } else if (button === 'order') {
      setIsOrderManageOpen(true);
      setIsProductManageOpen(false);
      setIsUserManageOpen(false);
    } else {
      setIsOrderManageOpen(false);
      setIsProductManageOpen(false);
      setIsUserManageOpen(false);
    }
  };


   
  return (
    <Box
        width={300}
        padding={2}
        style={{
            borderRight: '1px solid #ccc',
            minHeight: '100vh',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}
        >
        <Avatar alt={user.name} src={user.avatar} style={{ width: '150px', height: '150px', margin: '10px 0' }} />
        <Typography variant="h6">{user.name}</Typography>
        <Typography variant="body1">User ID: {user.id}</Typography>
        <Typography variant="body1">Name: {user.name}</Typography>
        <Typography variant="body1">Address: {user.address}</Typography>
        <Typography variant="body1">Email: {user.email}</Typography>

        <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
            <Button variant="contained" color="primary">Edit</Button>
            <Button variant="contained" color="primary" onClick={() => handleButtonClick(null)}>Dashboard</Button>
        </div>
          
        {user.role === 'Admin' && (
            <Box marginTop="50px" display="flex" flexDirection="column" gap="20px">
                <Button
                    variant="contained"
                    color={activeButton === 'product' ? 'secondary' : 'primary'}
                    onClick={() => handleButtonClick('product')}
                >
                    Manage Products
                </Button>
                <Button
                    variant="contained"
                    color={activeButton === 'user' ? 'secondary' : 'primary'}
                    onClick={() => handleButtonClick('user')}
                >
                    Manage Users
                </Button>
                <Button
                    variant="contained"
                    color={activeButton === 'order' ? 'secondary' : 'primary'}
                    onClick={() => handleButtonClick('order')}
                >
                    Manage Orders
                </Button>
            </Box>
        )}
        <Button
            variant="contained" color="secondary"
            onClick={HandleLogOut}
            style={{ marginTop: '30vh' }}
        >
            log out
        </Button>

    </Box>
  )
}

export default DetailSidebar