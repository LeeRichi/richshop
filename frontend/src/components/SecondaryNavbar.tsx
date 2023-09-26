import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const SecondaryNavbar = ({ }) => {
  return (
    <AppBar position="static" color="default">
      <Toolbar>
        <div style={{ width: '100px', marginTop: '20px', textAlign: 'center' }}>
          hi
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default SecondaryNavbar;
