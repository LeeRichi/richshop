import React from "react";
import { Container, Typography, Button } from "@mui/material";
interface DashboardProps {
  name: string;
}


export const Dashboard: React.FC<DashboardProps> = ({ name }) => {
  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        Hi, {name}, what are you thinking?
      </Typography>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        style={{ marginBottom: "1rem" }}
      >
        Add Product
      </Button>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        style={{ marginBottom: "1rem" }}
      >
        Edit Product
      </Button>
      <Button variant="contained" color="secondary" fullWidth style={{ marginBottom: "1rem" }}>
        Update Product
      </Button>
      <Button variant="contained" color="secondary" fullWidth style={{ marginBottom: "5rem" }}>
        Delete Product
      </Button>

      <Button
        variant="contained"
        color="primary"
        fullWidth
        style={{ marginBottom: "1rem" }}
      >
        Check all users
      </Button>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        style={{ marginBottom: "1rem" }}
      >
        Edit user
      </Button>
      <Button variant="contained" color="secondary" fullWidth style={{ marginBottom: "5rem" }}>
        Delete User
      </Button>

      <Button
        variant="contained"
        color="primary"
        fullWidth
        style={{ marginBottom: "1rem" }}
      >
        View all orders
      </Button>

    </Container>
  );
};

export default Dashboard;
