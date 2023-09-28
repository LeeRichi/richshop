import React, { useState, ChangeEvent } from 'react';
import {
  Slider,
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Input,
  InputAdornment, // Add this import
} from '@mui/material';

type SelectChangeEvent = {
  target: {
    value: unknown;
  };
};

const generateRandomBrands = () => {
  const brands = [];
  for (let i = 0; i < 20; i++) {
    brands.push(`Brand ${i + 1}`);
  }
  return brands;
};

const Sidebar = () => {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [brandSearch, setBrandSearch] = useState('');
  const brands = generateRandomBrands();

  const handlePriceChange = (event: Event, newValue: number | number[]) => {
    setPriceRange(newValue as [number, number]);
  };

  const handleBrandSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setBrandSearch(event.target.value);
  };

  const filteredBrands = brands.filter((brand) =>
    brand.toLowerCase().includes(brandSearch.toLowerCase())
  );

  const handleBrandClick = (brand: string) => {
    setSelectedBrand(brand);
  };

  return (
    <div style={{width:'20%'}}>
      <h2>Price</h2>
      <Box width="100%" px={2} style={{ display: 'flex', alignItems: 'center' }}>
  <Slider
    value={priceRange}
    onChange={handlePriceChange}
    valueLabelDisplay="auto"
    valueLabelFormat={(value) => {
      const isMin = value === priceRange[0];
      return isMin ? `Min: $${value}` : `Max: $${value}`;
    }}
    min={0}
    max={100}
    aria-labelledby="range-slider"
  />
</Box>


      <h2>Brand</h2>
      <TextField
        label="Search Brand"
        value={brandSearch}
        onChange={handleBrandSearchChange}
      />
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {filteredBrands.map((brand, index) => (
          <div
            key={index}
            style={{
              cursor: 'pointer',
              padding: '8px',
              border: '1px solid #ccc',
              marginRight: '10px',
              marginBottom: '10px',
              backgroundColor:
                selectedBrand === brand ? '#f0f0f0' : 'transparent',
            }}
            onClick={() => handleBrandClick(brand)}
          >
            {brand}
          </div>
        ))}
      </div>

      <h2>Color</h2>

      <h2>Sale</h2>
    </div>
  );
};

export default Sidebar;
