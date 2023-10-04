import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  IconButton,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../app/rootReducer';
import { fetchUsers, deleteUser, postUser, editUser } from '../../../utils/api/UsersApi';
import { Link } from 'react-router-dom';
import ManageBar from '../../../components/ManageBar';
import { setAllUsers } from '../../../features/user/allUserSlice';
import UserInterface from '../../../interface/UserInterface';

const UserManage = () => {
  const dispatch = useDispatch();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingUserId, setEditingUserId] = useState('');
  const [editedUser, setEditedUser] = useState<UserInterface>({
    name: '',
    address: '',
    email: '',
    avatar: '',
    role: 'User',
    orders: [],
    password: '',
  });

  useEffect(() => {
    fetchUsers()
      .then(users => {
        dispatch(setAllUsers(users)); 
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, [dispatch]);
  
  const users = useSelector((state: RootState) => state.allUser.users);

  const handleOpenDialog = (isEditing: boolean, userId?: string) => {
    setIsDialogOpen(true);
    setIsEditing(isEditing);
    if (isEditing && userId) {
      setEditingUserId(userId);
      const UserToEdit = users?.find(user => user.id === userId);
      if (UserToEdit) {
        console.log(UserToEdit)
        setEditedUser(UserToEdit);
      }
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setIsEditing(false);
    setEditingUserId('');
    setEditedUser({
      name: '',
      address: '',
      email: '',
      avatar: '',
      role: 'User',
      orders: [],
      password: '',
    });
  };

  const onHandleAddOrUpdate = () => {
    const userData = {
      name: editedUser.name,
      address: editedUser.address,
      email: editedUser.email,
      avatar: editedUser.avatar,
      password: editedUser.password,
    };

    if (isEditing && editingUserId) {
      editUser(editingUserId, userData).then(response => {
        const updatedUsers = users?.map((user) =>
          user.id === editingUserId ? { ...user, ...response } : user
        ) || [];
        dispatch(setAllUsers(updatedUsers));
        setIsEditing(false);
        handleCloseDialog();
      });
    } else {
      postUser(userData).then((response) => {
        dispatch(setAllUsers([...(users || []), response]));
        handleCloseDialog();
      });
    }
    setEditedUser({
      name: '',
      address: '',
      email: '',
      avatar: '',
      password: '',
      orders: [],
    });
  };


  const handleInputChange = (property: keyof UserInterface, value: string | number) => {
    setEditedUser(prevUser => ({
      ...prevUser,
      [property]: value,
    }));
  };

  const onHandleDelete = (userId?: string) =>
  {
     if (userId) {
      const confirmDelete = window.confirm('Are you sure you want to delete this product?');
      if (confirmDelete) {
        deleteUser(userId);
        if (users) {
          const deletedUser = users?.find((user) => user.id === userId);
          const updatedUsers = users?.filter((user) => user.id !== userId);
          dispatch(setAllUsers(updatedUsers));
          if (deletedUser) {
            alert(`Product "${deletedUser.name}" (ID: ${deletedUser.id}) has been deleted.`);
          }
        }
      }
    }
  };

  return (
    <>
      <ManageBar />
      <div style={{ display: 'flex' }}>
        <Container maxWidth="md" sx={{ marginTop: '3rem' }}>
          <Typography variant="h4" align="center" gutterBottom>
            User List
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={() => handleOpenDialog(false)}>Add User</Button>
          </Box>
          <List>
            {users?.map((user: UserInterface) => (
              <ListItem key={user.id} sx={{ marginBottom: '1rem' }}>
                <ListItemAvatar>
                  <Avatar alt={user.name} src={user.avatar} />
                </ListItemAvatar>
                <ListItemText primary={user.name} secondary={`ID: ${user.id}`} />
                <IconButton color="primary">
                  <EditIcon onClick={() => user.id && handleOpenDialog(true, user.id)} />
                </IconButton>
                <IconButton color="secondary" onClick={() => onHandleDelete(user.id)}>
                  <DeleteOutlineIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
          <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
            <DialogTitle>{isEditing ? 'Edit User' : 'Add a New User'}</DialogTitle>
            <DialogContent>
              <form>
                <TextField
                  label="Name"
                  type="text"
                  value={editedUser.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Address"
                  type="text"
                  value={editedUser.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Email"
                  type="text"
                  value={editedUser.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Avatar"
                  type="text"
                  value={editedUser.avatar}
                  onChange={(e) => handleInputChange('avatar', e.target.value)}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Password"
                  type="text"
                  value={editedUser.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  fullWidth
                  margin="normal"
                />
                {/* <FormControl fullWidth margin="normal">
                  <InputLabel id="category-label">Role</InputLabel>
                  <Select
                    labelId="Role-label"
                    id="Role"
                    value={editedUser.role}
                    onChange={(e) => handleInputChange('role', e.target.value)}
                    label="Role"
                  >
                    <MenuItem value="Footwear">Admin</MenuItem>
                    <MenuItem value="Apparel">User</MenuItem>
                  </Select>
                </FormControl> */}
              </form>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="primary">
                Cancel
              </Button>
              <Button onClick={onHandleAddOrUpdate} color="primary">
                {isEditing ? 'Update' : 'Add'}
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      </div>
    </>
  );
};

export default UserManage;
