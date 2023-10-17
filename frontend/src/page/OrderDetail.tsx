import React from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../app/rootReducer';

const OrderDetail = () => {
    const { id } = useParams();
    const orders = useSelector((state: RootState) => state.order.orders);
    const orderProducts = useSelector((state: RootState) => state.orderProduct.orderProducts);

    const order = orders?.find(order => order.id === id);
    // const orderProduct = orderProducts?.find(order => order.orderId === id);
    
    const matchingOrders = orderProducts?.filter(order => order.orderId === id);

    const products = useSelector((state: RootState) => state.products.products)
    const matchingProductIds = matchingOrders?.map(order => order.productId);
    console.log(matchingOrders)

    const filteredProducts = products?.filter(product => {
      if (typeof product.id === 'string') {
        return matchingProductIds?.includes(product.id);
      }
      return false; 
    });
  console.log(filteredProducts)

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Order Detail
      </Typography>

      <Paper variant="outlined" style={{ padding: '20px', marginBottom: '20px' }}>
        <Typography variant="h6" gutterBottom>
          Order Information
        </Typography>

        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>{order?.id}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Order Status</TableCell>
                <TableCell>{order?.orderStatus}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>User ID</TableCell>
                <TableCell>{order?.userId}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Paper variant="outlined" style={{ padding: '20px' }}>
        <Typography variant="h6" gutterBottom>
          Product Detail
        </Typography>

        <TableContainer component={Paper}>
          
          <Table>
           <TableBody>
              {filteredProducts?.map((product) => {
                const matchingOrder = matchingOrders?.find(order => order.productId === product.id);
                return (
                  <React.Fragment key={product.id}>
                    <TableRow>
                      <TableCell>Product ID</TableCell>
                      <TableCell>{product.id}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Title</TableCell>
                      <TableCell>{product.title}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Price</TableCell>
                      <TableCell>{product.price}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Amount</TableCell>
                      <TableCell>{matchingOrder?.amount}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Images</TableCell>
                      <TableCell>
                        <img src={product.images[0]} alt="Product" style={{ maxWidth: '100px' }} />
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default OrderDetail;
