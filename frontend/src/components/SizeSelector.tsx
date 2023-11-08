import { ButtonGroup, Button } from '@mui/material';
import React, { useState } from 'react';

const SizeSelector = () =>
{
    const [selectedSize, setSelectedSize] = useState('');

    const handleSizeSelect = (size: string) =>
    {
        setSelectedSize(size);
    };

    return (
    <ButtonGroup>
      <Button
        variant={selectedSize === 'S' ? 'contained' : "outlined"}
        onClick={() => handleSizeSelect('S')}
        style={{
        }}
      >
        S
      </Button>
      <Button
        variant={selectedSize === 'M' ? 'contained' : "outlined"}
        onClick={() => handleSizeSelect('M')}
        style={{
        }}
      >
        M
      </Button>
      <Button
        variant={selectedSize === 'L' ? 'contained' : "outlined"}
        onClick={() => handleSizeSelect('L')}
        style={{
        }}
      >
        L
      </Button>
      <Button
        variant={selectedSize === 'XL' ? 'contained' : "outlined"}
        onClick={() => handleSizeSelect('XL')}
        style={{
        }}
      >
        XL
      </Button>
    </ButtonGroup>
  );
};

export default SizeSelector;
