import React from "react";
import { Container, Typography, Button } from "@mui/material";

export const Dashboard: React.FC = ({name}: any) => {
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
      <Button variant="contained" color="secondary" fullWidth>
        Delete Product
      </Button>
    </Container>
  );
};

export default Dashboard;
