import React, { useState, useEffect } from 'react';
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
  Grid,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useSelector, useDispatch } from 'react-redux';
import { Product } from '../../../interface/ProductInterface';
import { RootState } from '../../../app/rootReducer';
import { deleteProduct, postProduct, editProduct } from '../../../utils/api/ProductsApi';
import { setProducts } from '../../../features/product/productSlice';
import { Link } from 'react-router-dom';
import ManageBar from '../../../components/ManageBar';
import { fetchProducts } from '../../../utils/api/ProductsApi';

const ProductManage = () => {
  const dispatch = useDispatch();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingProductId, setEditingProductId] = useState('');
  const [editedProduct, setEditedProduct] = useState({
    title: '',
    description: '',
    price: 0,
    category: 'Footwear',
    images: [''],
    inventory: 0,
  });

  useEffect(() => {
    fetchProducts().then(products => {
      dispatch(setProducts(products));
    })
    .catch(error => {
      console.error('Error fetching users:', error);
    });
  }, [dispatch]);

  const products = useSelector((state: RootState) => state.products);

  const handleOpenDialog = (isEditing: boolean, productId?: string) => {
    setIsDialogOpen(true);
    setIsEditing(isEditing);
    if (isEditing && productId) {
      setEditingProductId(productId);
      const productToEdit = products.products.find(product => product.id === productId);
      if (productToEdit) {
        setEditedProduct(productToEdit);
      }
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setIsEditing(false);
    setEditingProductId('');
    setEditedProduct({
      title: '',
      description: '',
      price: 0,
      category: 'Footwear',
      images: [''],
      inventory: 0,
    });
  };

  const onHandleAddOrUpdate = () => {
    const productData = {
      title: editedProduct.title,
      description: editedProduct.description,
      price: editedProduct.price,
      category: editedProduct.category,
      images: [editedProduct.images[0]],
      inventory: editedProduct.inventory,
    };

    if (isEditing && editingProductId) {
      editProduct(editingProductId, productData).then(() => {
        const updatedProducts = products.products.map((product) =>
          product.id === editingProductId ? { ...product, ...productData } : product
        );
        dispatch(setProducts(updatedProducts));
        setIsEditing(false);
        handleCloseDialog();
      });
    } else {
      postProduct(productData).then((response) => {
        dispatch(setProducts([...products.products, response]));
        handleCloseDialog();
      });
    }
    setEditedProduct({
      title: '',
      description: '',
      price: 0,
      category: 'Footwear',
      images: [''],
      inventory: 0,
    });
  };

  const handleInputChange = (property: string, value: string | number | string[]) => {
    setEditedProduct({
      ...editedProduct,
      [property]: Array.isArray(value) ? [...value] : value,
    });
  };

  const onHandleDelete = (productId?: string) => {
    if (productId) {
      const confirmDelete = window.confirm('Are you sure you want to delete this product?');
      if (confirmDelete) {
        deleteProduct(productId);
        const deletedProduct = products.products.find((product) => product.id === productId);
        const updatedProducts = products.products.filter((product) => product.id !== productId);
        dispatch(setProducts(updatedProducts));
        if (deletedProduct) {
          alert(`Product "${deletedProduct.title}" (ID: ${deletedProduct.id}) has been deleted.`);
        }
      }
    }
  };

  return (
    <>
    {/* <ManageBar /> */}
    <div style={{ display: 'flex', flex: '1'}}>
      <Container maxWidth="md" sx={{ marginTop: '3rem' }}>
        <Typography variant="h4" align="center" gutterBottom>
          Product List
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={() => handleOpenDialog(false)}>Add Product</Button>
        </Box>
        <List>
          {products.products.map((product) => (
            <ListItem key={product.id} sx={{ marginBottom: '1rem' }} component={Link} to={`/product/${product.id}`}>
              <ListItemAvatar>
                <Avatar alt={product.title} src={product.images[0]} style={{borderRadius: '0'}} />
              </ListItemAvatar>
              <ListItemText primary={product.title} secondary={`ID: ${product.id}`} />
              <IconButton color="primary">
                <EditIcon onClick={() => product.id && handleOpenDialog(true, product.id)} />
              </IconButton>
              <IconButton color="secondary" onClick={() => onHandleDelete(product.id)}>
                <DeleteOutlineIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
        <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
          <DialogTitle>{isEditing ? 'Edit Product' : 'Add a New Product'}</DialogTitle>
          <DialogContent>
            <form>
              <TextField
                label="Title"
                type="text"
                value={editedProduct.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Description"
                type="text"
                value={editedProduct.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Price"
                type="number"
                value={editedProduct.price}
                onChange={(e) => handleInputChange('price', parseFloat(e.target.value))}
                fullWidth
                margin="normal"
              />
              <FormControl fullWidth margin="normal">
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  labelId="category-label"
                  id="category"
                  value={editedProduct.category}
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
                value={editedProduct.images[0]}
                onChange={(e) => handleInputChange('images', [e.target.value])}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Inventory"
                type="number"
                value={editedProduct.inventory}
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
            <Button onClick={onHandleAddOrUpdate} color="primary">
              {isEditing ? 'Update' : 'Add'}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
      </div>
    </>
  );
};

export default ProductManage;
