import React from 'react';
import { useSelector } from 'react-redux';
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Product } from '../../../interface/ProductInterface';
import { RootState } from '../../../app/rootReducer';


const ProductManage = () => {
  const products = useSelector((state: RootState) => state.products);

  return (
    <Container maxWidth="md" sx={{ marginTop: '3rem' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Product List
      </Typography>
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
            <IconButton color="secondary">
              <DeleteOutlineIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default ProductManage;
