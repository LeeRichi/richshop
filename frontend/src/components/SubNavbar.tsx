import React, { useEffect, useRef } from 'react';
import { Button } from '@mui/material';
import { useLocation } from 'react-router-dom';

const SubNavbar = () => {
  const location = useLocation();
  const currentPageRef = useRef('');

  useEffect(() => {
    const path = location.pathname;
    const category = path.split('/').filter(part => part)[1]; // Extract category from the URL
    currentPageRef.current = category || 'Unknown'; // Set the current page (category) or 'Unknown'
  }, [location.pathname]);
    
    
    console.log(location)
    console.log(currentPageRef)
    

  const handleSortPrice = () => {
    // Handle sorting logic here
    console.log('Sort prices');
  };

  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px', borderBottom: '1px solid #ccc' }}>
          <div>{currentPageRef.current}</div>
          <div>{location.pathname}</div>
      <Button variant="outlined" onClick={handleSortPrice}>Sort Price</Button>
    </div>
  );
};

export default SubNavbar;
