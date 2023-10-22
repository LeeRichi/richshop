import React, { ReactNode, useState } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button } from "@mui/material";
import { storeToken } from '../utils/tokenStorage';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/rootReducer';
import getUserDetails from '../utils/api/getUserDetails';
import { updateUserDetails } from '../features/user/userSlice';
import { BASE_API_URL } from '../utils/constants';
import jwt_decode from "jwt-decode";
import { GoogleOAuthProvider, GoogleLogin, CredentialResponse, GoogleCredentialResponse } from '@react-oauth/google';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLoginSuccess = (credentialResponse: GoogleCredentialResponse) => {
    const credential = credentialResponse.credential;
    console.log(credential)
    if (credential) {
      const userObject: {email: string, passward: string} = jwt_decode(credential)
      console.log(userObject)
      setPassword(userObject.passward)
      setEmail(userObject.email)
    }
  }

  const handleLoginError = () => {
    console.log('Login failed');
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${BASE_API_URL}/auth`,
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
      const token = response.data;
      console.log(token)
      if (token) {
        const user = await getUserDetails(token);
        console.log(user)
        dispatch(updateUserDetails(user))
        storeToken(token);
        if (user) {
          navigate(`/users/${user.id}`);  
        }
      }
    } catch (error) {
      console.error('Login failed:', error);
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '10rem' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Login
      </Typography>
      {error && (
        <Typography variant="body2" color="error" align="center" gutterBottom>
          {error}
        </Typography>
      )}
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

      <GoogleOAuthProvider clientId={'754912834445-v4ienbb0mtcv7gr8hrigbjgle7ajka6e.apps.googleusercontent.com'}>
        <GoogleLogin onSuccess={handleLoginSuccess} onError={handleLoginError} />
      </GoogleOAuthProvider>
    </Container>
  );
};

export default LoginForm;
