import React, {useState} from 'react';
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Product } from '../../../interface/ProductInterface';
import { RootState } from '../../../app/rootReducer';
import { deleteProduct, postProduct } from '../../../utils/api/ProductsApi';

const ProductManage = () =>
{
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    title: '',
    description: '',
    price: 0,
    category: 'Footwear',
    images: [''],
    inventory: 0,
  });

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

    postProduct(newProductData);
    handleCloseDialog();
    console.log('Adding product:', newProduct);
  };
  const handleInputChange = (property, value) => {
    setNewProduct({ ...newProduct, [property]: value });
  };


  const onHandleDelete = (productId?: string) => {
    if (productId) {
        deleteProduct(productId);
    }
  };

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: '3rem' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Product List
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button onClick={handleOpenDialog}>Add Product</Button>
      </Box>
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Add a New Product</DialogTitle>
        <DialogContent>
          <form>
          <div>
            <label>Title:</label>
            <input
              type="text"
              value={newProduct.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
            />
          </div>
          <div>
            <label>Description:</label>
            <input
              type="text"
              value={newProduct.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
            />
          </div>
          <div>
            <label>Price:</label>
            <input
              type="number"
              value={newProduct.price}
              onChange={(e) => handleInputChange('price', parseFloat(e.target.value))}
            />
          </div>
          <div>
            <label>Category:</label>
            <input
              type="text"
              value={newProduct.category}
              onChange={(e) => handleInputChange('category', e.target.value)}
            />
          </div>
          <div>
            <label>Image URL:</label>
            <input
              type="text"
              value={newProduct.images[0]}
              onChange={(e) => handleInputChange('images', [e.target.value])}
            />
          </div>
          <div>
            <label>Inventory:</label>
            <input
              type="number"
              value={newProduct.inventory}
              onChange={(e) => handleInputChange('inventory', parseFloat(e.target.value))}
            />
          </div>
        </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={onHandleAdd} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
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
