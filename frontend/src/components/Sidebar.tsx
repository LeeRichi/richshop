import React, { useState, ChangeEvent } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Slider,
  Box,
  Typography,
  TextField,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const generateRandomBrands = () => {
  const brands = [];
  for (let i = 0; i < 20; i++) {
    brands.push(`Brand ${i + 1}`);
  }
  return brands;
};

const predefinedColors = [
  'red',
  'blue',
  'green',
  'yellow',
  'orange',
  'purple',
  'pink',
  'brown',
  'cyan',
  'gray',
];

interface SidebarProps {
  onPriceRangeChange: (priceRange: [number, number]) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onPriceRangeChange }) => {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 300]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [brandSearch, setBrandSearch] = useState('');
  const brands = generateRandomBrands();

  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isPriceOpen, setIsPriceOpen] = useState(false);
  const [isBrandOpen, setIsBrandOpen] = useState(false);
  const [isColorOpen, setIsColorOpen] = useState(false);
  const [isSaleOpen, setIsSaleOpen] = useState(false);

  const handlePriceChange = (event: Event, newValue: number | number[]) => {
    setPriceRange(newValue as [number, number]);
    onPriceRangeChange(newValue as [number, number]);
  };

  const handleColorSelection = (color: string) => {
    setSelectedColors((prevSelectedColors) => {
      if (prevSelectedColors.includes(color)) {
        return prevSelectedColors.filter((c) => c !== color);
      } else {
        return [...prevSelectedColors, color];
      }
    });
  };

  return (
    <div style={{ width: '20%', marginTop: '0rem' }}>
      <Accordion>
        <AccordionSummary expandIcon={isFilterOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}>
          <h1>Filter</h1>
        </AccordionSummary>
        <AccordionDetails>
          <Accordion>
           <AccordionSummary expandIcon={isPriceOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}>
            <h2>Price</h2>
           </AccordionSummary>
            <AccordionDetails>
              <Box width="100%" px={2} style={{ display: 'flex', alignItems: 'center' }}>
                <Slider
                  value={priceRange}
                  style={{ margin: '2rem' }}
                  onChange={handlePriceChange}
                  valueLabelDisplay="on"
                  valueLabelFormat={(value) => (
                    <Typography>
                      {`€${value}`}
                    </Typography>
                  )}
                  min={0}
                  max={300}
                  aria-labelledby="range-slider"
                />
              </Box>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary>
              <h2>Brand</h2>
            </AccordionSummary>
            <AccordionDetails>
              <TextField
                label="Search Brand"
                value={brandSearch}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setBrandSearch(e.target.value)}
              />
              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {brands
                  .filter((brand) => brand.toLowerCase().includes(brandSearch.toLowerCase()))
                  .map((brand, index) => (
                    <div
                      key={index}
                      style={{
                        cursor: 'pointer',
                        padding: '8px',
                        border: '1px solid #ccc',
                        marginRight: '10px',
                        marginBottom: '10px',
                        backgroundColor: selectedColors.includes(brand) ? '#f0f0f0' : 'transparent',
                      }}
                      onClick={() => handleColorSelection(brand)}
                    >
                      {brand}
                    </div>
                  ))}
              </div>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary>
              <h2>Color</h2>
            </AccordionSummary>
            <AccordionDetails>
              <div style={{ display: 'flex' }}>
                {predefinedColors.map((color) => (
                  <div
                    key={color}
                    style={{
                      backgroundColor: color,
                      width: '30px',
                      height: '30px',
                      marginRight: '10px',
                      border: selectedColors.includes(color) ? '2px solid black' : 'none',
                    }}
                    onClick={() => handleColorSelection(color)}
                  />
                ))}
              </div>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary>
              <h2>Sale</h2>
            </AccordionSummary>
            <AccordionDetails>
              <div style={{ display: 'flex' }}>
                <button style={{ cursor: 'pointer', color: 'red', border: 'none', backgroundColor: 'transparent' }}>Sale</button>
              </div>
            </AccordionDetails>
          </Accordion>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default Sidebar;
