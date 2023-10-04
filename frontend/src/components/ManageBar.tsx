import React from 'react';
import { Typography } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

const ManageBar = () => {
  const manageOptions = ['Manage Products', 'Manage Users', 'Manage Orders'];
  const location = useLocation();

  const isCurrentPage = (option: string) => {
    if (option === 'Manage Products' && location.pathname.startsWith('/product-manage')) {
      return true;
    } else if (option === 'Manage Users' && location.pathname.startsWith('/user-manage')) {
      return true;
    } else if (option === 'Manage Orders' && location.pathname.startsWith('/order-manage')) {
      return true;
    }

    return location.pathname.includes(option.toLowerCase().replace(' ', '-'));
  };
    

  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%', borderBottom: '1px solid #ccc' }}>
      {manageOptions.map((option, index) => (
        <Typography
          key={index}
          variant="h6"
          style={{
            margin: '15px',
            color: isCurrentPage(option) ? 'inherit' : '#ccc',
          }}
          >
          <Link to={`/${option.toLowerCase().replace(' ', '-')}`} style={{ color: 'inherit', textDecoration: 'none' }}>

          {/* <Link to={`/${option.toLowerCase().replace(' ', '-')}`} style={{ color: 'inherit', textDecoration: 'none' }}> */}
            {option}
          </Link>
        </Typography>
      ))}
    </div>
  );
};

export default ManageBar;
