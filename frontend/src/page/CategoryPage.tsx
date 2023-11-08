import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import SubNavbar from '../components/SubNavbar';
import { useSelector } from 'react-redux';
import { selectProducts } from '../features/product/productSlice';
import { Grid } from '@mui/material';
import ProductCard from '../components/ProductCard';
import Category from '../components/Category';
import { Product } from '../interface/ProductInterface';

const CategoryPage: React.FC<{ category?: string }> = ({ category }) => {
  const products = useSelector(selectProducts);
  const onSaleProducts = products.filter((product: Product) => product.isOnSale === true);

  const [categoryProducts, setCategoryProducts] = useState<Product[]>([]);
  const [sortedProducts, setSortedProducts] = useState<Product[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<[number, number]>([0, 300]);

  useEffect(() => {
    // const filteredProducts = products.filter(product => product.category === category);
      const filteredProducts = category ? products.filter(product => product.category === category) : onSaleProducts;

      setCategoryProducts(filteredProducts);
    }, [category, products]);

  useEffect(() => {
    const productsWithinPriceRange = categoryProducts.filter((product) => {
      const price = product.price;
      return price >= selectedPriceRange[0] && price <= selectedPriceRange[1];
    });
    setSortedProducts(productsWithinPriceRange);
  }, [categoryProducts, selectedPriceRange]);

  const handleSortProducts = (sortedProducts: Product[]) => {
    setSortedProducts(sortedProducts);
  };

  const handlePriceRangeChange = (priceRange: [number, number]) => {
    setSelectedPriceRange(priceRange);
  };

  return (
    <>
      <Category />
      <SubNavbar categoryProducts={categoryProducts} onSortProducts={handleSortProducts} />
      <div style={{ display: 'flex' }}>
        <Sidebar onPriceRangeChange={handlePriceRangeChange} />
        <Grid container spacing={2} style={{ margin: '5rem', flexGrow: 1 }}>
          {sortedProducts.map((product: any) => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3} style={{ width: '100%', boxSizing: 'border-box' }}>
              <ProductCard product={product}  />
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
};

export default CategoryPage;
