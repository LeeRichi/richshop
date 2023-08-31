import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  IconButton,
  Card,
  CardContent,
  CardActions,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';import { Edit, Delete, Add } from '@mui/icons-material';


interface Product {
  id: string;
  title: string;
  description: string | null;
  price: number;
  category: string;
  inventory: number;
  images: string[];
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false)
  const [newProduct, setNewProduct] = useState({
    title: "",
    description: "",
    price: 0,
    category: 'Footwear',
    images: [""],
    inventory: 10,
  });
  const [updatedId, setUpdatedId] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://fullstackshop.azurewebsites.net/api/v1/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    const confirmed = window.confirm('Are you sure you want to delete this product?');
    console.log(productId)
    if (confirmed) {
      try {
        await axios.delete(`https://fullstackshop.azurewebsites.net/api/v1/products/${productId}`);
        fetchProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const handleProductCreate = () => {
    setIsCreating(true);
  };

  const handleCreateDialogClose = () => {
    setIsCreating(false);
    setIsUpdating(false);
    setNewProduct({
      title: "",
      description: "",
      price: 0,
      category: "Footwear",
      images: [""],
      inventory: 0,
    });
  };

  const handleCreateDialogSubmit = async () => {
    try {
    console.log(newProduct)
    const response = await axios.post('https://fullstackshop.azurewebsites.net/api/v1/products', {
      Title: newProduct.title,
      Description: newProduct.description,
      Price: newProduct.price, 
      Category: newProduct.category,
      Images: [newProduct.images[0]],
      Inventory: newProduct.inventory,
    });
    
    if (response.status === 201) { // Assuming 201 Created is returned on successful creation
      fetchProducts();
      setIsCreating(false);
      setNewProduct({
        title: "",
        description: "",
        price: 0,
        category: "Footwear",
        images: [""],
        inventory: 0,
      });
    } else {
      console.error('Unexpected response:', response);
    }
  } catch (error) {
    console.error('Error creating product:', error);
  }
  };

  const handleUpdateProduct = async (productId: string) =>
  {
    setIsUpdating(true);
    setIsCreating(true);
    setUpdatedId(productId);
  };
  
  const updateSubmit = async () =>
  {
    const updatedData = {
      Title: newProduct.title,
      Description: newProduct.description,
      Price: newProduct.price,
      Category: newProduct.category,
      Images: [newProduct.images[0]],
      Inventory: newProduct.inventory,
    };
    try {
      const response = await axios.patch(`https://fullstackshop.azurewebsites.net/api/v1/products/${updatedId}`, updatedData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });  
      if (response.status === 200) {
        fetchProducts();
        setIsUpdating(false);
        setIsCreating(false);
        setNewProduct({
          title: "",
          description: "",
          price: 0,
          category: "Footwear",
          images: [""],
          inventory: 0,
        });
      } else {
        console.error('Unexpected response:', response);
      }
    } catch (error: any) {
      console.error('Error updating product:', error);

      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
      }

      console.error('Error message:', error.message);
    }
  }


  return (
    <Container maxWidth="md" sx={{ marginTop: "2rem" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Manage Products
      </Typography>
      <IconButton
        color="primary"
        aria-label="add-product"
        onClick={handleProductCreate}
        sx={{ marginBottom: "1rem" }}
      >+</IconButton>
      <Dialog open={isCreating} onClose={handleCreateDialogClose}>
        {isUpdating ?
          <DialogTitle>Update a product</DialogTitle>
          : <DialogTitle>Create new product</DialogTitle>}
        <DialogContent>
          <TextField
            label="Title"
            fullWidth
            value={newProduct.title}
            onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
            sx={{ marginBottom: '1rem' }}
          />
          <TextField
            label="Description"
            fullWidth
            value={newProduct.description}
            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
            sx={{ marginBottom: '1rem' }}
          />
          <TextField
            label="Price"
            type="number"
            fullWidth
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
            sx={{ marginBottom: '1rem' }}
          />
          <TextField
            label="Category"
            fullWidth
            value={newProduct.category}
            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
            sx={{ marginBottom: '1rem' }}
          />
          <TextField
            label="Image URL"
            fullWidth
            value={newProduct.images[0]}
            onChange={(e) => setNewProduct({ ...newProduct, images: [e.target.value] })}
            sx={{ marginBottom: '1rem' }}
          />
          <TextField
            label="Inventory"
            type="number"
            fullWidth
            value={newProduct.inventory}
            onChange={(e) => setNewProduct({ ...newProduct, inventory: parseInt(e.target.value) })}
            sx={{ marginBottom: '1rem' }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCreateDialogClose} color="primary">
            Cancel
          </Button>
          {!isUpdating ?
            <Button onClick={handleCreateDialogSubmit} color="primary">
              Create
            </Button> :
            <Button onClick={() => updateSubmit()} color="primary">
              Update
            </Button>}
        </DialogActions>
      </Dialog>
      {products.map((product) => (
        <Card key={product.id} sx={{ marginBottom: "1rem" }}>
          <CardContent>
            <Typography variant="body2" gutterBottom>
              {product.id}
            </Typography>
            <Typography variant="h5" gutterBottom>
              {product.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {product.description}
            </Typography>
            <Typography variant="body1" color="primary" gutterBottom>
              Price: ${product.price}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Category: {product.category}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Inventory: {product.inventory}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" startIcon={<Edit />} color="primary" onClick={() => handleUpdateProduct(product.id)}>
              Edit
            </Button>
            <Button size="small" startIcon={<Delete />} color="error" onClick={() => handleDeleteProduct(product.id)}>
              Delete
            </Button>
          </CardActions>
        </Card>
      ))}
    </Container>
  );
};

export default Products;


