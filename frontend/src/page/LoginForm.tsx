import React, { ReactNode, useState } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, Box } from "@mui/material";
import { storeToken } from '../utils/tokenStorage';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/rootReducer';
import getUserDetails from '../utils/api/getUserDetails';
import { updateUserDetails } from '../features/user/userSlice';
import { BASE_API_URL } from '../utils/constants';
import jwt_decode from "jwt-decode";
import { GoogleOAuthProvider, GoogleLogin, CredentialResponse, GoogleCredentialResponse } from '@react-oauth/google';
import { CheckEmailExists, fetchUsers, postUser } from '../utils/api/UsersApi';
import UserInterface from '../interface/UserInterface';


const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLoginSuccess = (credentialResponse: GoogleCredentialResponse) => {
    const credential = credentialResponse.credential;
    if (credential) {
      const userObject: {email: string, name: string, picture: string} = jwt_decode(credential)

      CheckEmailExists(userObject.email)
        .then(emailExists =>
        {
          console.log(emailExists.exists.result.exists)
          if (emailExists.exists.result.exists === false) {
            //if user is new
            const userData = {
              "name": userObject.name,
              "address": "none",
              "email": userObject.email,
              "avatar": userObject.picture,
              "password": "test",
            }
            postUser(userData)
            navigate(`/users/${emailExists.exists.result.userId}`);  
          } else {
            //old user loging in
            const userData:UserInterface = {
              "id": emailExists.exists.result.userId,
              "name": userObject.name,
              "address": "none",
              "email": userObject.email,
              "avatar": userObject.picture,
              "password": "test",
              "role": "User",
              "orders": []
            }
            dispatch(updateUserDetails(userData))
            navigate(`/users/${emailExists.exists.result.userId}`);  
          }
        })
      .catch(error => {
        console.error('Error checking email:', error);
      });
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


  const test = getUserDetails('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI1Mjg4ODk5Zi0zN2Y2LTRiNzMtYTc1Yi02N2E1NmI5Y2MwMTgiLCJyb2xlIjoiVXNlciIsIm5iZiI6MTY5OTI3NTk5NSwiZXhwIjoxNjk5Mjc5NTk1LCJpYXQiOjE2OTkyNzU5OTUsImlzcyI6ImVjb21tZXJjZS1iYWNrZW5kIn0.j2x4BmpZUqgzpqtfHH3Z1BW7mtBFK_JNtqz74mBJsEE')
  console.log(test)

  return (
    <Container maxWidth="sm" style={{ marginTop: '10rem', height: '50vh' }}>
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
      <Box sx={{ display: 'flex', marginTop: '1rem' }}>
        <GoogleOAuthProvider clientId={clientId || 'defaultClientId'}>
          <GoogleLogin onSuccess={handleLoginSuccess} onError={handleLoginError} />
        </GoogleOAuthProvider>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => navigate('/signUp')}
          sx={{marginLeft: '10px'}}
        >
          Sign up
        </Button>    
      </Box>
    </Container>
  );
};

export default LoginForm;
