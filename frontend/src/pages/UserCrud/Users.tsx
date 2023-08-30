import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@mui/material';
import { Delete, Edit, Add } from '@mui/icons-material';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom'; // If you're using React Router for navigation
import LocalShippingIcon from '@mui/icons-material/LocalShipping';


interface User {
  id: string;
  name: string;
  address: string;
  email: string;
  avatar: string;
  password: string;
  role: string;
}

function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserAddress, setNewUserAddress] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserAvatar, setNewUserAvatar] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');
  const [isCreating, setIsCreating] = useState(true); // Track if it's creating or updating
  const [tempUserId, setTempUserId] = useState<string | null>(null);


  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5052/api/v1/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleDeleteUser = async (userId: string) =>
  {
    const confirmed = window.confirm('Are you sure you want to delete this user?');
    if (confirmed) {
      try {
        await axios.delete(`http://localhost:5052/api/v1/users/${userId}`);
        fetchUsers();
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const handleCreateUser = async () =>
  {
    setIsCreating(true);
    try {
      const response = await axios.post('http://localhost:5052/api/v1/users', {
        name: newUserName,
        address: newUserAddress,
        email: newUserEmail,
        avatar: newUserAvatar,
        password: newUserPassword,
      });
      if (response.status === 201) {
        setOpenDialog(false);
        setNewUserName('');
        setNewUserAddress('');
        setNewUserEmail('');
        setNewUserAvatar('');
        setNewUserPassword('');
        fetchUsers();
      }
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const handleUpdateUser = async (userId: string | null) =>
  {
    setIsCreating(false);
    setOpenDialog(false);
    const updatedData = {
      name: newUserName, 
      address: newUserAddress,
      email: newUserEmail,
      avatar: newUserAvatar,
      password: newUserPassword,
    };
    try {
      await axios.patch(`http://localhost:5052/api/v1/users/${userId}`, updatedData);
      fetchUsers();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        All Users
      </Typography>
      <Button
        variant="contained"
        startIcon={<Add />}
        onClick={() => { setOpenDialog(true); setIsCreating(true); }}
      >
        Create User
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: 'darkgray' }}>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell align="center">Orders</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} sx={{ '&:hover': { backgroundColor: '#f5f5f5' } }}>
                <TableCell>{user.id}</TableCell>
                <TableCell>
                  <Typography variant="subtitle1" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
                    <img src={user.avatar} alt={`Avatar for ${user.name}`} width="50" style={{ verticalAlign: 'middle' }} /> {user.name}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{user.address}</Typography>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell align="center">
                <Link to={`/userOrderPath/${user.id}?name=${encodeURIComponent(user.name)}`}>
                    <IconButton>
                      <Box color="primary.main">
                        <LocalShippingIcon />
                      </Box>
                    </IconButton>
                  </Link>
                </TableCell>
                <TableCell align="center">
                  <IconButton color="primary" onClick={() => {
                    setTempUserId(user.id);
                    setOpenDialog(true);
                    setIsCreating(false);
                  }}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDeleteUser(user.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>{isCreating ? 'Create User' : 'Update User'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            fullWidth
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Address"
            fullWidth
            value={newUserAddress}
            onChange={(e) => setNewUserAddress(e.target.value)}
            margin="normal"
          />
          {isCreating ?
            (<TextField
            label="Email"
            fullWidth
            value={newUserEmail}
            onChange={(e) => setNewUserEmail(e.target.value)}
            margin="normal"
            />) : null    
          }
        
          <TextField
            label="Avatar"
            fullWidth
            value={newUserAvatar}
            onChange={(e) => setNewUserAvatar(e.target.value)}
            margin="normal"
          />
          {isCreating ? (<TextField
            label="Password"
            fullWidth
            value={newUserPassword}
            onChange={(e) => setNewUserPassword(e.target.value)}
            margin="normal"
            type="password"
          />) : null}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
          {isCreating ? (<Button onClick={handleCreateUser} >
            Confirm
          </Button>) :   <Button onClick={() => handleUpdateUser(tempUserId)}>
            Update</Button> }
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Users;
