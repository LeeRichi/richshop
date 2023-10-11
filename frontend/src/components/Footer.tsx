import React from 'react';
import { Typography, Link, Grid, Box, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import PaymentIcon from '@mui/icons-material/Payment';

const Footer: React.FC = () => {
  return (
    <footer style={{ borderTop: '1px solid #ccc', padding: '20px', marginTop: '20px' }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Typography
            style={{
              width: '10%',
              backgroundColor: 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textDecoration: 'none',
              color: 'black',
              border: '1px solid black',
              marginRight: '15rem',
              padding: '5px',
            }}
          >
            <span style={{ verticalAlign: 'middle' }}>RICH</span>
          </Typography>
        <Typography variant="body2">"Empowering Your Style, One Click at a Time."</Typography>
            <IconButton color="inherit">
            <PaymentIcon />
        </IconButton>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" gutterBottom>
            Contact Us
          </Typography>
          <Typography variant="body2">Email: info@example.com</Typography>
          <Typography variant="body2">Phone: 123-456-7890</Typography>
          <Typography variant="body2">1234 Elm St, City, State, 12345</Typography> 
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" gutterBottom>
            Follow Us
          </Typography>
          <IconButton color="inherit">
            <FacebookIcon />
          </IconButton>
          <IconButton color="inherit">
            <TwitterIcon />
          </IconButton>
          <IconButton color="inherit">
            <InstagramIcon />
          </IconButton>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" gutterBottom>
            Quick Links
          </Typography>
          <ul style={{ padding: 0, listStyle: 'none' }}>
            <li>
              <Link href="#" color="inherit">
                Home
              </Link>
            </li>
            <li>
              <Link href="#" color="inherit">
                Services
              </Link>
            </li>
            <li>
              <Link href="#" color="inherit">
                Products
              </Link>
            </li>
            <li>
              <Link href="#" color="inherit">
                Contact
              </Link>
            </li>
          </ul>
        </Grid>
      </Grid>
    </footer>
  );
};

export default Footer;
