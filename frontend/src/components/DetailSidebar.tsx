import React, {useState, useEffect} from 'react'
import { Box, Avatar, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField,  } from '@mui/material';
import UserInterface from '../interface/UserInterface'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser, updateUserDetails } from '../features/user/userSlice';
// import { clearFavorite } from '../features/favorite/favoriteSlice';
import { clearCart } from '../features/cart/cartSlice';
import { setAllOrders } from '../features/order/orderSlice';
import { setAllUsers } from '../features/user/allUserSlice';
import { editUser } from '../utils/api/UsersApi';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../app/rootReducer';
import './detailSidebar.css'
import { closeCart, closeOrderHistory, openCart, openOrderHistory } from '../features/DetailPages/DetailPagesSlice';

interface DetailSidebarProps {
  user: UserInterface;
  appLogout: () => void;
  setIsProductManageOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsUserManageOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOrderManageOpen: React.Dispatch<React.SetStateAction<boolean>>;
  updateUser: (updatedUser: UserInterface) => void;
  setIsFavoriteOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DetailSidebar: React.FC<DetailSidebarProps> = ({ user, appLogout, setIsProductManageOpen, setIsUserManageOpen, updateUser, setIsFavoriteOpen, setIsOrderManageOpen }) =>
{
    const navigate = useNavigate();
    const dispatch = useDispatch(); 
    const currentUser = useSelector((state: RootState) => state.user.userDetails);

    const [activeButton, setActiveButton] = useState<'product' | 'user' | 'order' | 'avatar' | 'favorites' | null | 'orderHistory' | 'cart'>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isManagementDropped, setisManagementDropped] = useState(false)
    const [editedUser, setEditedUser] = useState<UserInterface>({
      ...user,
    });
    const [newUser, setNewUser] = useState<UserInterface>({
      ...user,
    });
    
    useEffect(() => {
      setNewUser(user);
    }, [user]);
  
    const handleEditDialogOpen = () => {
      setIsDialogOpen(true);
    };

    const handleEditDialogClose = () => {
      setIsDialogOpen(false);
    };

    const handleEdit = () => {
      if (user.id) {
        editUser(user.id, editedUser)
        .then((updatedUserData) => {
          setNewUser(updatedUserData);
          dispatch(updateUserDetails(updatedUserData))
          updateUser(updatedUserData);      
      })
        setIsDialogOpen(false);
      } else {
        console.error('User ID is undefined');
      }
    };

    const handleInputChange = (property: keyof UserInterface, value: string) => {
      setEditedUser((prevUser) => ({
        ...prevUser,
        [property]: value,
      }));
    };

    const HandleLogOut = () =>
    {
      // dispatch(clearFavorite());
      dispatch(clearCart())
      dispatch(setAllUsers([]));
      dispatch(setAllOrders([]));

      appLogout();
      dispatch(logoutUser());
      localStorage.removeItem('token');
      navigate('/');
    }

    const handleButtonClick = (button: 'product' | 'user' | 'order' | 'favorites' | null | 'orderHistory' | 'cart') => {
      setActiveButton(button);
      if (button === 'product') {
        setIsProductManageOpen(true)
        setIsUserManageOpen(false);
        dispatch(closeOrderHistory());
        setIsFavoriteOpen(false);
        setIsOrderManageOpen(false);
        dispatch(closeCart());
      } else if (button === 'user') {
        setIsUserManageOpen(true)
        setIsProductManageOpen(false);
        dispatch(closeOrderHistory());
        setIsFavoriteOpen(false);
        setIsOrderManageOpen(false);
        dispatch(closeCart());
      } else if (button === 'order') {
        setIsOrderManageOpen(true);
        dispatch(closeOrderHistory());
        setIsProductManageOpen(false);
        setIsUserManageOpen(false);
        setIsFavoriteOpen(false);
        dispatch(closeCart());
      } else if (button === 'favorites') {
        setIsFavoriteOpen(true);
        dispatch(closeOrderHistory());
        setIsProductManageOpen(false);
        setIsUserManageOpen(false);
        setIsOrderManageOpen(false);
        dispatch(closeCart());
      } else if (button === 'orderHistory') {
        setIsFavoriteOpen(false);
        dispatch(openOrderHistory()); //true
        setIsProductManageOpen(false);
        setIsUserManageOpen(false);
        setIsOrderManageOpen(false);
        dispatch(closeCart());
      } else if (button === 'cart'){
        setIsFavoriteOpen(false);
        dispatch(closeOrderHistory()); //true
        setIsProductManageOpen(false);
        setIsUserManageOpen(false);
        setIsOrderManageOpen(false);
        dispatch(openCart());
      } else {
        dispatch(closeOrderHistory());
        setIsProductManageOpen(false);
        setIsUserManageOpen(false);
        setIsFavoriteOpen(false);
        setIsOrderManageOpen(false);
        dispatch(closeCart());
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
      <Avatar
        alt={newUser.name}
        src={newUser.avatar ? newUser.avatar : "https://gravatar.com/avatar/00000000000000000000000000000000?d=mp"}
        style={{ width: '150px', height: '150px', margin: '20px 0' }}
      />
      <Typography variant="h6" style={{ margin: '10px 0' }}>{newUser.name}</Typography>
      {/* <Typography variant="body2" style={{ textAlign: 'center', margin: '20px 0' }}>
        User ID: <br/>{newUser.id}
      </Typography>
      <Typography variant="body1" style={{ margin: '10px 0' }}>Address: {newUser.address}</Typography>
      <Typography variant="body1" style={{ margin: '10px 0' }}>Email: {newUser.email}</Typography> */}
      <div style={{ marginTop: '10px', display: 'flex', gap: '10px', margin: '20px' }}>
        <Button variant="contained" color="primary" onClick={handleEditDialogOpen}>
          Edit
        </Button>
        <Dialog open={isDialogOpen} onClose={handleEditDialogClose}>
          <DialogTitle>Edit User</DialogTitle>
          <DialogContent>
            <TextField
              label="Name"
              type="text"
              value={editedUser.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Address"
              type="text"
              value={editedUser.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              fullWidth
              margin="normal"
              required
            />
            <TextField
                label="Avatar"
                type="text"
                value={editedUser.avatar}
                onChange={(e) => handleInputChange('avatar', e.target.value)}
                fullWidth
                margin="normal"
                required
              />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditDialogClose} color="primary">
              Cancel
            </Button>
          <Button
            onClick={handleEdit}
            disabled={!editedUser.name || !editedUser.address || !editedUser.avatar}
            color="primary"
          >
              Save
            </Button>
          </DialogActions>
        </Dialog>
        <Button variant="contained" color="primary" onClick={() => handleButtonClick(null)}>Dashboard</Button>
      </div>
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
        onClick={() => handleButtonClick('orderHistory')}
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
        onClick={() => handleButtonClick('favorites')}
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
        onClick={() => handleButtonClick('cart')}
      >
        Cart
    </Button>
    {currentUser?.role === 'Admin' && (
        <Box
          marginTop="50px"
          display="flex"
          flexDirection="column"
          gap="20px"
          style={{
            margin: '20px',
            // transition: 'max-height 2s ease-in-out',
            // overflow: 'hidden',
            // maxHeight: isManagementDropped ? '1000px' : '0',
            // border: '1px solid blakc'
          }}
        >          
        <Button
          sx={{
            backgroundColor: 'transparent',
            color: 'black',
            // width: '100%',
            border: '3px solid #F7EE32', 
            margin: '5px',
            height: '60px',
            '&:hover': {
              backgroundColor: '#F7EE32', 
            },
          }}
            onClick={()=>(setisManagementDropped((prev) => !prev))}
        >
          <Avatar
            alt={currentUser?.name}
            src={currentUser?.avatar}
            style={{ width: '25px', height: '25px', margin: '20px 0' }}
          />
            Admin management
        </Button>
        {isManagementDropped && (
          <>
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
          </>
        )}      
      </Box>
    )}  
    <Button
        variant="contained" color="secondary"
        onClick={HandleLogOut}
        style={{ marginTop: '10vh' }}
    >
        log out
    </Button>
  </Box>
  )
}

export default DetailSidebar