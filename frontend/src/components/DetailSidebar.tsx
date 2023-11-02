import React, {useState, useEffect} from 'react'
import { Box, Avatar, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import UserInterface from '../interface/UserInterface'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser, updateUserDetails } from '../features/user/userSlice';
import { clearFavorite } from '../features/favorite/favoriteSlice';
import { clearCart } from '../features/cart/cartSlice';
import { setAllOrders } from '../features/order/orderSlice';
import { setAllUsers } from '../features/user/allUserSlice';
import { editUser } from '../utils/api/UsersApi';
import { useNavigate } from 'react-router-dom';

interface DetailSidebarProps {
  user: UserInterface;
  appLogout: () => void;
  setIsProductManageOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsUserManageOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOrderManageOpen: React.Dispatch<React.SetStateAction<boolean>>;
  updateUser: (updatedUser: UserInterface) => void;
}

const DetailSidebar: React.FC<DetailSidebarProps> = ({ user, appLogout, setIsProductManageOpen, setIsUserManageOpen, setIsOrderManageOpen, updateUser }) =>
{
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [activeButton, setActiveButton] = useState<'product' | 'user' | 'order' | 'avatar'| null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
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
          console.log(user)
          console.log(editedUser)
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
      dispatch(clearFavorite());
      dispatch(clearCart())
      dispatch(setAllUsers([]));
      dispatch(setAllOrders([]));

      appLogout();
      dispatch(logoutUser());
      localStorage.removeItem('token');
      navigate('/');
    }

    const handleButtonClick = (button: 'product' | 'user' | 'order' | null) => {
      setActiveButton(button);
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
      <Avatar
        alt={newUser.name}
        src={newUser.avatar ? newUser.avatar : "https://gravatar.com/avatar/00000000000000000000000000000000?d=mp"}
        style={{ width: '150px', height: '150px', margin: '20px 0' }}
      />
        <Typography variant="h6" style={{ margin: '10px 0' }}>{newUser.name}</Typography>
        <Typography variant="body2" style={{ textAlign: 'center', margin: '20px 0' }}>
          User ID: <br/>{newUser.id}
        </Typography>
        <Typography variant="body1" style={{ margin: '10px 0' }}>Address: {newUser.address}</Typography>
        <Typography variant="body1" style={{ margin: '10px 0' }}>Email: {newUser.email}</Typography>
        <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
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