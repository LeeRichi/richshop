import React, { useState, ChangeEvent } from 'react';
import { Slider, Box, Typography, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

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


  const handlePriceChange = (event: Event, newValue: number | number[]) => {
    setPriceRange(newValue as [number, number]);
  };

  const handleMinInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const minValue = parseFloat(event.target.value);
    setPriceRange([minValue, priceRange[1]]);
  };

  const handleMaxInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const maxValue = parseFloat(event.target.value);
    setPriceRange([priceRange[0], maxValue]);
  };

  const handleBrandChange = (event: SelectChangeEvent) => {
    setSelectedBrand(event.target.value as string);
  };

  const brands = generateRandomBrands();

  const filteredBrands = brands.filter((brand) =>
    brand.toLowerCase().includes(brandSearch.toLowerCase())
  );

  return (
    <div>
      <h2>Price</h2>
      <Box width="20%" px={2}>
        <Slider
          value={priceRange}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          min={0}
          max={100}
          aria-labelledby="range-slider"
        />
      </Box>
      <TextField
        label="Min Price"
        type="number"
        value={priceRange[0]}
        onChange={handleMinInputChange}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        label="Max Price"
        type="number"
        value={priceRange[1]}
        onChange={handleMaxInputChange}
        InputLabelProps={{
          shrink: true,
        }}
      />
    
      <h2>Brand</h2>
      <FormControl style={{ minWidth: 120 }}>
        {/* <InputLabel>Brand</InputLabel> */}
        <Select
          value={selectedBrand}
          onChange={handleBrandChange}
          onOpen={() => setBrandSearch('')} // Clear the search when the dropdown opens
        >
          <MenuItem value="">
            <em>All Brands</em>
          </MenuItem>
          {filteredBrands.map((brand, index) => (
            <MenuItem key={index} value={brand}>
              {brand}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <h2>Color</h2>
      {/* Add color selection UI elements */}

      <h2>Sale</h2>
      {/* Add sale filtering UI elements */}
    </div>
  );
};

export default Sidebar;
