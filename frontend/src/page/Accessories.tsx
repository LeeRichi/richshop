import React, {useState} from 'react';
import Sidebar from '../components/Sidebar';
import SubNavbar from '../components/SubNavbar';
import { useSelector } from 'react-redux';
import { selectProducts } from '../features/product/productSlice'; // Replace with the correct path to your product slice
import { Container, Grid, Button, Typography } from '@mui/material';
import ProductCard from '../components/ProductCard';
import Category from '../components/Category'
import { Product } from '../interface/ProductInterface';


const Accessories = () => {
  const products = useSelector(selectProducts);
  const accessoriesProducts = products.filter(product => product.category === 'Accessories');

  const [sortedProducts, setSortedProducts] = useState<Product[]>(accessoriesProducts);
  const [selectedPriceRange, setSelectedPriceRange] = useState<[number, number]>([0, 300]);


  const handleSortProducts = (sortedProducts: Product[]) => {
    setSortedProducts(sortedProducts);
  };

  const handlePriceRangeChange = (priceRange: [number, number]) => {
    setSelectedPriceRange(priceRange);
  };

  return (
    <>
        <Category />
        <SubNavbar categoryProducts={accessoriesProducts} onSortProducts={handleSortProducts}/>
        <div style={{ display: 'flex' }}>
            <Sidebar onPriceRangeChange={handlePriceRangeChange} />
            <Grid container spacing={2} style={{margin:'5rem'}}>
                {sortedProducts.map((product: any) => (
                    <Grid item key={product.id} xs={12} sm={6} md={4} lg={3} >
                        <ProductCard product={product} style={{ height: '400px', width: '300px'}} /> 
                    </Grid>
                ))}
            </Grid>
        </div>
    </>
  );
};

export default Accessories;
