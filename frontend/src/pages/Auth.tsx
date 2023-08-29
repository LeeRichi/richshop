import React, { useState } from "react";
import axios from "axios";
import { Container, Typography, TextField, Button } from "@mui/material";
import { Dashboard } from './Dashboard';

const LoginForm: React.FC = () =>
{
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");
  const [role, setRole] = useState("");
  const [isLoggedIn, setisLoggedIn] = useState(false);

  const handleSubmit = async (e: React.FormEvent) =>
  {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://fullstackshop.azurewebsites.net/api/v1/auth",
        {
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        setToken(response.data.token); // Assuming the token is in the response data
        setMessage("Login successful!");
        try {
          const response = await fetch(
            "https://fullstackshop.azurewebsites.net/api/v1/users"
          );
          if (response.ok) {
            const userData = await response.json();
            console.log(userData)
            const user = userData.find(
              (user: any) => user.email === email
            );

            if (user) {
              setRole(user.role);
              setName(user.name);
              console.log(user)
              setMessage(`User found. Role: ${user.role}`);
            } else {
              setMessage("User not found.");
            }
          } else {
            setMessage("Failed to fetch user data.");
          }
        } catch (error) {
          console.error("Error:", error);
          setMessage(
            "An error occurred while processing your request."
          );
        }

        setisLoggedIn(true);
      } else {
        setMessage("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred while processing your request.");
    }
  };

  return !isLoggedIn ? (
    <Container maxWidth="sm">
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
      <Typography variant="body1" align="center" gutterBottom>
        {message}
      </Typography>
      {role && (
        <Typography variant="body1" align="center">
          Role: {role}
        </Typography>
      )}
    </Container>) : (
      <Dashboard name={name} />
    );
};

export default LoginForm;
