import React, {useState, useEffect} from 'react';
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
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem, 
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Product } from '../../../interface/ProductInterface';
import { RootState } from '../../../app/rootReducer';
import { deleteProduct, postProduct } from '../../../utils/api/ProductsApi';
import {setProducts} from '../../../features/product/productSlice'


const ProductManage = () =>
{
  const dispatch = useDispatch();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    title: '',
    description: '',
    price: 0,
    category: '',
    images: [''],
    inventory: 0,
  });

  const products = useSelector((state: RootState) => state.products);

  const onHandleAdd = () =>
  {
    const newProductData: Product = {
      title: newProduct.title,
      description: newProduct.description,
      price: newProduct.price,
      category: newProduct.category,
      images: newProduct.images,
      inventory: newProduct.inventory,
    };

    postProduct(newProductData);
    handleCloseDialog();
    console.log('Adding product:', newProduct);
  };

  const handleInputChange = (property: string, value: string | number | string[]) => {
    setNewProduct({
      ...newProduct,
      [property]: Array.isArray(value) ? [...value] : value,
    });
  };

  const onHandleDelete = (productId?: string) => {
    if (productId) {
      const confirmDelete = window.confirm('Are you sure you want to delete this product?');
      if (confirmDelete) {
        deleteProduct(productId);
        const deletedProduct = products.products.find(product => product.id === productId);
        if (deletedProduct) {
          alert(`Product "${deletedProduct.title}" (ID: ${deletedProduct.id}) has been deleted.`);
        }
      }
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
            <TextField
              label="Title"
              type="text"
              value={newProduct.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Description"
              type="text"
              value={newProduct.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Price"
              type="number"
              value={newProduct.price}
              onChange={(e) => handleInputChange('price', parseFloat(e.target.value))}
              fullWidth
              margin="normal"
            />
            <FormControl fullWidth margin="normal">
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                id="category"
                value={newProduct.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                label="Category"
              >
                <MenuItem value="Footwear">Footwear</MenuItem>
                <MenuItem value="Apparel">Apparel</MenuItem>
                <MenuItem value="Accessories">Accessories</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Image URL"
              type="text"
              value={newProduct.images[0]}
              onChange={(e) => handleInputChange('images', [e.target.value])}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Inventory"
              type="number"
              value={newProduct.inventory}
              onChange={(e) => handleInputChange('inventory', parseFloat(e.target.value))}
              fullWidth
              margin="normal"
            />
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
