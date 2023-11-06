import React, { FormEvent, useState } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import UserInterface from '../interface/UserInterface';
import { postUser } from '../utils/api/UsersApi';
import { useDispatch } from 'react-redux';
import { setAllUsers } from '../features/user/allUserSlice';

const SignUp = () =>
{
  const dispatch = useDispatch();
//   const users = useSelector((state: RootState) => state.allUser.users);

  const [newUser, setNewUser] = useState({
    name: '',
    address: '',
    email: '',
    avatar: '',
    password: '',
  });

  const handleInputChange = (property: keyof UserInterface, value: string | number) => {
    setNewUser(prevUser => ({
      ...prevUser,
      [property]: value,
    }));
  };

    const handleSubmit = (e: FormEvent) =>
    {
        e.preventDefault();
        console.log('Form submitted:', newUser);
      
        postUser(newUser).then((response) =>
        {
            console.log(response)
        })
    }

  return (
    <Container maxWidth="sm" style={{ marginTop: '10rem', height: '50vh' }}>
      <Typography variant="h4" align="center" gutterBottom>Join the crew</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          type="text"
          value={newUser.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Address"
          type="text"
          value={newUser.address}
          onChange={(e) => handleInputChange('address', e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          type="text"
          value={newUser.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Avatar"
          type="text"
          value={newUser.avatar}
          onChange={(e) => handleInputChange('avatar', e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          value={newUser.password}
          onChange={(e) => handleInputChange('password', e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Sign up
        </Button>
      </form>
    </Container>
  );
}

export default SignUp;
