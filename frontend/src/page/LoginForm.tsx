import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button } from "@mui/material";

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:5052/api/v1/auth',
        {
          email: email,
          password: password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Login successful:', response.data);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <Container maxWidth="sm" style={{marginTop:'10rem'}}>
      <Typography variant="h4" align="center" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          margin="normal"
        />
        <TextField
          label="Password"
          fullWidth
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          margin="normal"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
        >
          Log In
        </Button>
      </form>
      {/* <Typography variant="body1" align="center" gutterBottom>
        {message}
      </Typography>
      {role && (
        <Typography variant="body1" align="center">
          Role: {role}
        </Typography>
      )} */}
    </Container>
  );
};

export default LoginForm;
