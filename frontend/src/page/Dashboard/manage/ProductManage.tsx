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
import { fetchProducts } from '../../../utils/api/ProductsApi';

const ProductManage = () => {
  const dispatch = useDispatch();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingProductId, setEditingProductId] = useState('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState<number | undefined>(undefined);
  const [quantityChanged, setQuantityChanged] = useState<number | undefined>(undefined);
  const [editedProduct, setEditedProduct] = useState({
    title: '',
    description: '',
    price: 0,
    category: 'Footwear',
    images: [''],
    inventory: {
      S: 0,
      M: 0,
      L: 0,
      XL: 0,
    },
    selectedSize: '',
    color: '',
    isOnSale: false,
    brand: '',
  });

  useEffect(() => {
    fetchProducts().then(products => {
      dispatch(setProducts(products));
    })
    .catch(error => {
      console.error('Error fetching products:', error);
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
        setEditedProduct({
          ...productToEdit,
          selectedSize: '',
        });
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
      inventory: {
        S: 0,
        M: 0,
        L: 0,
        XL: 0,
      },
      selectedSize: '',
      color: '',
      isOnSale: false,
      brand: '',
    });
  };

  const onHandleAddOrUpdate = () =>
  {
    const productData = {
      title: editedProduct.title,
      description: editedProduct.description,
      price: editedProduct.price,
      category: editedProduct.category,
      images: [editedProduct.images[0]],
      inventory: editedProduct.inventory,
      color: editedProduct.color,
      isOnSale: editedProduct.isOnSale,
      brand: editedProduct.brand,
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
      inventory: {
        S: 0,
        M: 0,
        L: 0,
        XL: 0,
      },
      selectedSize: '',
      color: '',
      isOnSale: false,
      brand: '',
    });
  };
  
  const handleInputChange = (property: string, value: any) => {
    if (property === 'inventory' && selectedSize) {
      // Update the quantity for the selected size
      setEditedProduct((prevProduct) => ({
        ...prevProduct,
        inventory: {
          ...prevProduct.inventory,
          [selectedSize]: parseInt(value),
        },
      }));
    } else {
      // Handle other property changes
      setEditedProduct((prevProduct) => ({
        ...prevProduct,
        [property]: value,
      }));
    }
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
              <ListItem key={product.id} sx={{ display: 'flex', width: '100%', marginBottom: '1rem' }}>
                <ListItemAvatar style={{ marginRight: '1rem' }}>
                  <Avatar alt={product.title} src={product.images[0]} style={{ borderRadius: '0' }} />
                </ListItemAvatar>
                <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <Link key={product.id} to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
                    <ListItemText primary={product.title} secondary={`ID: ${product.id}`} style={{color: 'black'}}/>
                  </Link>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <IconButton color="primary">
                    <EditIcon onClick={() => product.id && handleOpenDialog(true, product.id)} />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => onHandleDelete(product.id)}>
                    <DeleteOutlineIcon />
                  </IconButton>
                </div>
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
                <FormControl fullWidth margin="normal">
                  <InputLabel id="inventory-label">Inventory</InputLabel>
                  <Select
                    labelId="inventory-label"
                    id="inventory"
                    value={selectedSize}
                    onChange={(e) => {
                      setSelectedSize(e.target.value as string);
                    }}
                    label="Inventory"
                  >
                    {Object.keys(editedProduct.inventory).map((size) => (
                      <MenuItem key={size} value={size}>
                        {size}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {selectedSize && (
                  <TextField
                    label={`Quantity for ${selectedSize}`}
                    type="number"
                    value={(editedProduct.inventory as Record<string, number>)[selectedSize] || 0}
                    onChange={(e) => handleInputChange('inventory', e.target.value)}
                    fullWidth
                    margin="normal"
                  />
                )}
                <TextField
                  label="Color"
                  type="text"
                  value={editedProduct.color}
                  onChange={(e) => handleInputChange('color', parseFloat(e.target.value))}
                  fullWidth
                  margin="normal"
                />
                <FormControl fullWidth margin="normal">
                  <InputLabel id="isOnSale-label">Is On Sale</InputLabel>
                  <Select
                    labelId="isOnSale-label"
                    id="isOnSale"
                    value={editedProduct.isOnSale ? 'true' : 'false'}
                    onChange={(e) => handleInputChange('isOnSale', e.target.value === 'true')}
                    label="Is On Sale"
                  >                                 
                    <MenuItem value="true">True</MenuItem>
                    <MenuItem value="false">False</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  label="Brand"
                  type="text"
                  value={editedProduct.brand}
                  onChange={(e) => handleInputChange('brand', parseFloat(e.target.value))}
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
