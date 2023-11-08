import { Divider, Grid, Paper, Typography } from '@mui/material'
import { Product } from '../interface/ProductInterface'
import { useSelector } from 'react-redux';
import { RootState } from '../app/rootReducer';
import ProductCard from './ProductCard';

interface RecommendationProps {
  currentproduct?: Product;
}

const Recommendation: React.FC<RecommendationProps> = ({ currentproduct }) => 
{
  const products = useSelector((state: RootState)=> state.products.products)
  let similarProducts = products.filter((product) => product.category === currentproduct?.category && product.id !== currentproduct.id);
  
  const shuffleArray = (array: Product[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  if (!currentproduct || similarProducts.length === 0) {
    similarProducts = shuffleArray([...products]);
  }

  return (
    <>
      <Grid style={{ padding: '20px', marginBottom: '20px' }}>
        <Typography variant="h6" style={{ marginBottom: '10px', width: '10vw'}}>You might also like</Typography><Divider style={{ margin: '20px 0' }} />
        <Grid container spacing={2}>
          {similarProducts?.slice(0,4).map((product) => 
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <ProductCard product={product} />
            </Grid>
          )}
        </Grid>
      </Grid>
    </>
  )
}

export default Recommendation;