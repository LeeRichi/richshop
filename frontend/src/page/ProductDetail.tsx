import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/rootReducer';
import { Button, Typography, Grid, Divider, Container, ButtonGroup } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { addToCart } from '../utils/api/CartApi';
import { addToFavorites, removeFromFavorites } from '../utils/api/FavoriteApi';
import { FavoriteInterface } from '../interface/FavoriteInterface';
import { updateUserDetails } from '../features/user/userSlice';
import UserInterface from '../interface/UserInterface';
import Recommendation from '../components/Recommendation';
import NewsLetterForm from '../components/NewsLetterForm';
import SizeSelector from '../components/SizeSelector';

const ProductDetail = () =>
{
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const products = useSelector((state: RootState) => state.products.products);
  const product = products.find((product) => product.id === id);
 
  const user = useSelector((state: RootState) => state.user.userDetails);
  const userId = user?.id;
  const favorites = user?.favorites;
  const isFavorite = favorites?.some((favProduct) => favProduct.productId === id);

  if (!id) {
    return <div>No product ID provided.</div>;
  }

  if (!product) {
    return <div>No product provided.</div>;
  }

  const handleAddToCart = () =>
  {
    if(user == null){navigate(`/auth`) }
    const dataProps = { userId: user?.id, productId: id, quantity: 1 };
    addToCart(dataProps);
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleToggleFavorite = (productId: string | undefined) =>
  {
    if(user == null){navigate(`/auth`) }
    if (product?.id) {
      const favoriteData = { userId, productId }
      if (isFavorite) {
        removeFromFavorites(favoriteData).then((updatedUserDetails: FavoriteInterface) =>
        {          
          const updatedFavorites = user?.favorites?.filter(
            (favorite: FavoriteInterface) => favorite.productId !== updatedUserDetails.productId
          );
          console.log(updatedFavorites)
          const updatedUser: UserInterface= {
            ...(user as UserInterface), 
            favorites: updatedFavorites,
          };
          console.log(updatedUser)
          dispatch(updateUserDetails(updatedUser));
        })
        .catch((error) => {
          console.error('Failed to remove from favorites:', error);
        });
      } else {
        addToFavorites(favoriteData).then((updatedUserDetails: FavoriteInterface) =>
        {
          if (user?.favorites) {
            const updatedFavorites = [...user.favorites, updatedUserDetails];
            const updatedUser = {
              ...user,
              favorites: updatedFavorites,
            };
            console.log(updatedUser)
            dispatch(updateUserDetails(updatedUser));
          } else {
            console.error('User favorites is undefined');
          }
        })
        .catch((error) => {
          console.error('Failed to add from favorites:', error);
        });
      }
    }
  };

  return (
    <Container style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ padding: '20px', marginTop: '10vh' }}>
        <Grid container spacing={3} marginBottom={20}>
          <Grid item xs={12} sm={12} md={12} lg={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', maxHeight: '30vh' }}>
            <img src={product.images[0]} alt={product.title} style={{ maxWidth: '50%', height: 'auto', maxHeight: '50vh' }} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              {product.title}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              {product.description}
            </Typography>
            <Divider style={{ margin: '20px 0' }} />
            <Typography variant="h6" gutterBottom>
              Price: ${product.price}
            </Typography>
            <Button variant="contained" color="primary" onClick={handleAddToCart}>
              Add to Cart
            </Button>
            <Button style={{ backgroundColor: 'white', color: 'black', marginTop: '-35px' }}>
              {isFavorite ? (
                <FavoriteIcon style={{ position: 'absolute', top: '5px', right: '5px', color: 'red' }}
                  className="heartIcon"
                  onClick={(e) => {
                    e.stopPropagation(); 
                    handleToggleFavorite(product.id);
                  }}
                />
              ) : (
                <FavoriteBorderIcon style={{ position: 'absolute', top: '5px', right: '5px' }}
                  className='heartIcon'
                  onClick={(e) => {
                    e.stopPropagation(); 
                    handleToggleFavorite(product.id);
                  }}
                />
              )}
            </Button><br/><br />
            <SizeSelector />
          </Grid>
        </Grid>
        <Recommendation currentproduct={product} />
      </div>
      <NewsLetterForm />
    </Container>               
  );
};

export default ProductDetail;
