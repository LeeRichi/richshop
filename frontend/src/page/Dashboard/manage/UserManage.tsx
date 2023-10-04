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
// import { deleteUser, postUser, editUser } from '../../../utils/api/UsersApi'; // Update the import for user-related API calls
import { updateUserDetails } from '../../../features/user/userSlice'; // Update the import for user slice
import { Link } from 'react-router-dom';
import ManageBar from '../../../components/ManageBar';
import { selectUserDetails } from '../../../features/user/userSlice';
import UserInterface from '../../../interface/UserInterface';
import { FetchUsers } from '../../../utils/api/UsersApi';

const UserManage = () => {
  const dispatch = useDispatch();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingUserId, setEditingUserId] = useState('');

  useEffect(() => {
    FetchUsers();
  }, [])
  
  const users: UserInterface[] = useSelector(selectUserDetails);
  console.log(users)

  const handleOpenDialog = (isEditing: boolean, userId?: string) => {

  };

  const handleCloseDialog = () => {

  };

  const onHandleAddOrUpdate = () => {
  };

  const handleInputChange = (property: string, value: string | number | string[]) => {
  };

  const onHandleDelete = (userId?: string) => {
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
            {users.map((user: UserInterface) => (
              <ListItem key={user.id} sx={{ marginBottom: '1rem' }}>
                <ListItemAvatar>
                  <Avatar alt={user.name} />
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
          </Dialog>
        </Container>
      </div>
    </>
  );
};

export default UserManage;
