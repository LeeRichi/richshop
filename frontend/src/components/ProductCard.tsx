import React from 'react';
import { Card, CardContent, Typography, CardActions, Button } from '@mui/material';
import {Product} from '../interface/ProductInterface'

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Card>
      <CardContent>
         <div style={{ height: '250px', overflow: 'hidden' }}>
          <img src={product.images} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <Typography variant="h6">{product.title}</Typography>
        <Typography variant="subtitle1">{`$${product.price}`}</Typography>
        <Typography>{product.description}</Typography>
        {/* Add image display */}
      </CardContent>
      <CardActions>
        <Button color="primary" variant="contained">
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
