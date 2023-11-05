import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';

// const circleColor = value === 0 ? 'grey' : 'primary'; // Use grey for 0% value


const CircularProgressWithLabel = ({ value }: { value: number }) =>
(
    <Box position="relative" display="inline-flex">
        <div style={{ position: 'relative', width: '12rem', height: '12rem' }}>
            <CircularProgress className="bottom-circle" variant="determinate" value={100} size="99%"
                thickness={1}
                sx={{
                    position: 'absolute',
                    color: 'grey'
            }}/>
            <CircularProgress variant="determinate" value={(value / 500) * 100}
                // size="12.2rem"
                size="100%"
                thickness={2}
                sx={{
                    position: 'absolute',
                }}
            />            
        </div>
    <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
    >
        <div>
            <Typography variant="body2">{value} / 500</Typography>
        </div>
        <div>
            <Typography variant="body2">silver</Typography>
        </div>
    </Box>
  </Box>
);

export default CircularProgressWithLabel;
