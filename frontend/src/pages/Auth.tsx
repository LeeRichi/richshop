import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Typography, TextField, Button } from "@mui/material";
import { Dashboard } from './Dashboard';

interface LoginFormProps {
  setUserIdRef: (userId: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ setUserIdRef }) => 
{
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");
  const [role, setRole] = useState("");
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const savedIsLoggedIn = localStorage.getItem("isLoggedIn");
    const savedUserId = localStorage.getItem("userId");
    if (savedUserId) {
      setUserId(savedUserId);
      setisLoggedIn(true);
      console.log(savedUserId)
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) =>
  {
    e.preventDefault();
    try {
      const response = await axios.post(
        // "http://localhost:5052/api/v1/auth",
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
        console.log(response.data);
        setToken(response.data)

        const authToken = response.data;
        console.log(authToken);
        localStorage.setItem("authToken", authToken); // This line sets the authToken in localStorage.


        setToken(authToken);
        console.log(token)
        setMessage("Login successful!");
        try {
          const response = await fetch(
            "https://fullstackshop.azurewebsites.net/api/v1/users"
            // "http://localhost:5052/api/v1/users"
          );
          if (response.ok) {
            const userData = await response.json();
            console.log(userData)
            localStorage.setItem("userData", userData);
            const dataFromLocalStorage = localStorage.getItem("userData");
            console.log(dataFromLocalStorage)

            const user = userData.find(
              (user: any) => user.email === email
            );

            if (user) {
              setRole(user.role);
              await setName(user.name);
              await setAvatar(user.avatar);
              await setRole(user.role)
              setisLoggedIn(true);
              localStorage.setItem("isLoggedIn", "true");
              await setUserId(user.id);
              await setUserIdRef(user.id);
              localStorage.setItem("userId", user.id);
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
        localStorage.setItem("isLoggedIn", "true");
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
      <Dashboard name={name} avatar={avatar} role={role} userId={userId} isLoggedIn={isLoggedIn} setisLoggedIn={setisLoggedIn} />
    );
};

export default LoginForm;
