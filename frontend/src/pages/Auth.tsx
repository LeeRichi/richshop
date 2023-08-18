import React, { useState } from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';
import axios from 'axios';

function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI4M2M4NmZjMC00MjU0LTRkYmYtYTBmZS1mNGYxMDdiOGU1ZTMiLCJyb2xlIjoiQWRtaW4iLCJuYmYiOjE2OTIyMTI2NjcsImV4cCI6MTY5MjIxMzI2NywiaWF0IjoxNjkyMjEyNjY3LCJpc3MiOiJlY29tbWVyY2UtYmFja2VuZCJ9.bePqrQ4A-6Jle0w7BKSunT5V_DcgQlDCXi4CSoEHTC8'; // Replace with your actual Bearer token
      const response = await fetch('http://localhost:5052/api/v1/users', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        const user = userData.find((user: any) => user.email === email);

        if (user) {
          if (user.password === password) {
            setIsLoggedIn(true);
          } else {
            alert('Incorrect password.');
          }
        } else {
          alert('User not found.');
        }
      } else {
        alert('Authentication failed. Check your credentials.');
      }
    } catch (error) {
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <Container sx={{ paddingTop: '10vh' }}>
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Admin Login
      </Typography>
      {isLoggedIn ? (
        <Typography variant="body1" align="center">
          Welcome, admin!
        </Typography>
      ) : (
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Password"
            fullWidth
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Log In
          </Button>
        </form>
      )}
    </Container>
  );
}

export default Auth;
