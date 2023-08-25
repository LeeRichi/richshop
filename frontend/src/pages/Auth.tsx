// import React, { useState } from 'react';
// import { Container, Typography, TextField, Button } from '@mui/material';
// import axios from 'axios';

// function Auth() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       const token =
//         'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI4M2M4NmZjMC00MjU0LTRkYmYtYTBmZS1mNGYxMDdiOGU1ZTMiLCJyb2xlIjoiQWRtaW4iLCJuYmYiOjE2OTIyMTI2NjcsImV4cCI6MTY5MjIxMzI2NywiaWF0IjoxNjkyMjEyNjY3LCJpc3MiOiJlY29tbWVyY2UtYmFja2VuZCJ9.bePqrQ4A-6Jle0w7BKSunT5V_DcgQlDCXi4CSoEHTC8'; // Replace with your actual Bearer token
//       const response = await fetch('http://localhost:5052/api/v1/users', {
//         method: 'GET',
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (response.ok) {
//         const userData = await response.json();
//         const user = userData.find((user: any) => user.email === email);

//         if (user) {
//           if (user.password === password) {
//             setIsLoggedIn(true);
//           } else {
//             alert('Incorrect password.');
//           }
//         } else {
//           alert('User not found.');
//         }
//       } else {
//         alert('Authentication failed. Check your credentials.');
//       }
//     } catch (error) {
//       alert('An error occurred. Please try again.');
//     }
//   };

//   return (
//     <Container sx={{ paddingTop: '10vh' }}>
//       <Typography variant="h4" component="h1" align="center" gutterBottom>
//         Admin Login
//       </Typography>
//       {isLoggedIn ? (
//         <Typography variant="body1" align="center">
//           Welcome, admin!
//         </Typography>
//       ) : (
//         <form onSubmit={handleSubmit}>
//           <TextField
//             label="Email"
//             fullWidth
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             margin="normal"
//           />
//           <TextField
//             label="Password"
//             fullWidth
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             margin="normal"
//           />
//           <Button type="submit" variant="contained" color="primary" fullWidth>
//             Log In
//           </Button>
//         </form>
//       )}
//     </Container>
//   );
// }

// export default Auth;

//-----
// import React, { useState } from "react";

// const LoginForm: React.FC = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");

//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();

//     const requestBody = {
//       email: email,
//       password: password,
//     };

//     const jwtToken = localStorage.getItem("jwtToken");

//     try {
//       const response = await fetch("http://localhost:5052/api/v1/auth", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${jwtToken}`,
//         },
//         body: JSON.stringify(requestBody),
//       });

//       const data = await response.json();
//       console.log(data)
        
//       if (response.ok) {
//         setMessage("Login successful!");
//         // You can perform further actions here, such as redirecting to a dashboard.
//       } else {
//         setMessage("Login failed. Please check your credentials.");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       setMessage("An error occurred while processing your request.");
//     }
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <label>Email:</label>
//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <br />
//         <label>Password:</label>
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <br />
//         <button type="submit">Login</button>
//       </form>
//       <p>{message}</p>
//     </div>
//   );
// };

// export default LoginForm;


import React, { useState } from "react";
import axios from "axios";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");

  const [isLoggedIn, setisLoggedIn] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5052/api/v1/auth",
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
        setisLoggedIn(true);
      } else {
        setMessage("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred while processing your request.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button type="submit">Login</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default LoginForm;

