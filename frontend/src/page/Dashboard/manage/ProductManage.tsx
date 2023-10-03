import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  IconButton,
  Button,
  Box,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Product } from '../../../interface/ProductInterface';
import { RootState } from '../../../app/rootReducer';
import { deleteProduct, postProduct } from '../../../utils/api/ProductsApi';

const ProductManage = () =>
{
  const products = useSelector((state: RootState) => state.products);

  const onHandleAdd = () =>
  {
    const newProductData: Product = {
      title: 'New Product',
      description: 'string',
      price: 0,
      category: 'string',
      images: [],
      inventory: 0,
    };

    // postProduct(newProductData);
  };

  const onHandleDelete = (productId?: string) => {
    if (productId) {
        deleteProduct(productId);
    }
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: '3rem' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Product List
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button onClick={onHandleAdd}>Add Product</Button>
      </Box>
      <List>
        {products.products.map((product) => (
          <ListItem key={product.id} sx={{ marginBottom: '1rem' }}>
            <ListItemAvatar>
              <Avatar alt={product.title} src={product.images[0]} />
            </ListItemAvatar>
            <ListItemText
              primary={product.title}
              secondary={`ID: ${product.id}`}
            />
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
            <IconButton
              color="secondary"
              onClick={() => onHandleDelete(product.id)}
            >
              <DeleteOutlineIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default ProductManage;
