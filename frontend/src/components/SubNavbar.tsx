import React, { useEffect, useRef, useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import { useLocation } from 'react-router-dom';

const SubNavbar = () => {
  const location = useLocation();
  const currentPageRef = useRef<string | null>(null);
  const [currentPage, setCurrentPage] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    const path = location.pathname;
    const category = path.split('/').filter(part => part)[1];
    currentPageRef.current = category || 'Unknown';
    setCurrentPage(currentPageRef.current);
  }, [location.pathname]);

  const handleSortClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSortPrice = (order: string) => {
    console.log('Sort prices', order);
    setAnchorEl(null); // Close the dropdown after selecting an option
  };

  if (currentPage === null) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px' }}>
      <h1>{currentPage}</h1>
      <Button variant="outlined" onClick={handleSortClick} style={{marginRight: '5rem'}}
>
        Sort Price
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleSortPrice('lowToHigh')}>Low to High</MenuItem>
        <MenuItem onClick={() => handleSortPrice('highToLow')}>High to Low</MenuItem>
      </Menu>
    </div>
  );
};

export default SubNavbar;
