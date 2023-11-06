import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/rootReducer';
import { toggleSidebar } from '../features/DetailPages/DetailPagesSlice';

const SidebarBtn = () => {
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector((state: RootState) => state.DetailPages.isSidebarOpen);
  console.log(isSidebarOpen);
  const [isManagementDropped, setisManagementDropped] = useState(false);
  const [activeButton, setActiveButton] = useState<'product' | 'user' | 'order' | 'avatar' | 'favorites' | null | 'orderHistory' | 'cart'>(
    null
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const currentUser = useSelector((state: RootState) => state.user.userDetails);
  console.log(currentUser);

  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center', // Horizontally center the button
        alignItems: 'center', // Keep the vertical alignment at the top
        flexDirection: 'column', // Stack items vertically
      }}
    >
      <IconButton onClick={handleToggleSidebar}>
        <MenuIcon />
      </IconButton>
      {isSidebarOpen ? (
        <>
          <Avatar
            alt={currentUser?.name}
            src={currentUser?.avatar ? currentUser?.avatar : 'https://gravatar.com/avatar/00000000000000000000000000000000?d=mp'}
            style={{ width: '150px', height: '150px', margin: '20px 0' }}
          />
          <Typography variant="h6" style={{ margin: '10px 0' }}>
            {currentUser?.name}
          </Typography>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
            <Button variant="contained" color="primary">
              Edit
            </Button>
            <Button variant="contained" color="primary">
              Dashboard
            </Button>
            <Button
              sx={{
                backgroundColor: 'transparent',
                color: 'black',
                width: '100%',
                borderBottom: '1px solid #B8B7B7',
                margin: '5px',
                height: '60px',
                '&:hover': {
                  backgroundColor: '#F3F2F1',
                },
              }}
            >
              Order History
            </Button>
            <Button
              sx={{
                backgroundColor: 'transparent',
                color: 'black',
                width: '100%',
                borderBottom: '1px solid #B8B7B7',
                margin: '5px',
                height: '60px',
                '&:hover': {
                  backgroundColor: '#F3F2F1',
                },
              }}
            >
              Favorites
            </Button>
            <Button
              sx={{
                backgroundColor: 'transparent',
                color: 'black',
                width: '100%',
                borderBottom: '1px solid #B8B7B7',
                margin: '5px',
                height: '60px',
                '&:hover': {
                  backgroundColor: '#F3F2F1',
                },
              }}
            >
              Cart
            </Button>
          </div>
          {currentUser?.role === 'Admin' && (
            <Box
              marginTop="50px"
              display="flex"
              flexDirection="column"
              gap="20px"
              style={{
                margin: '20px',
              }}
            >
              <Button
                sx={{
                  backgroundColor: 'transparent',
                  color: 'black',
                  border: '3px solid #F7EE32',
                  margin: '5px',
                  height: '60px',
                  '&:hover': {
                    backgroundColor: '#F7EE32',
                  },
                }}
              >
                <Avatar alt={currentUser?.name} src={currentUser?.avatar} style={{ width: '25px', height: '25px', margin: '20px 0' }} />
                Admin management
              </Button>
              {isManagementDropped && (
                <>
                  <Button variant="contained" color={activeButton === 'product' ? 'secondary' : 'primary'}>
                    Manage Products
                  </Button>
                  <Button variant="contained" color={activeButton === 'user' ? 'secondary' : 'primary'}>
                    Manage Users
                  </Button>
                  <Button variant="contained" color={activeButton === 'order' ? 'secondary' : 'primary'}>
                    Manage Orders
                  </Button>
                </>
              )}
            </Box>
          )}
        </>
      ) : null}
    </div>
  );
};

export default SidebarBtn;
