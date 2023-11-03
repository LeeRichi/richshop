import React from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Paper, Table, TableBody, TableCell, TableContainer, TableRow, TableHead, Box } from '@mui/material';
import { Stepper, Step, StepLabel } from '@mui/material';

import { useSelector } from 'react-redux';
import { RootState } from '../app/rootReducer';
import OrderProductsInterface from '../interface/OrderProductsInterface';

const statusOptions = ['Pending', 'Shipping', 'Arrived', 'PickedUp'];

const OrderDetail = () => {
    const { id } = useParams();
    const orders = useSelector((state: RootState) => state.order.orders);

  const order = orders?.find(order => order.id === id);
  
  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Order Detail
      </Typography>

      <Paper variant="outlined" style={{ padding: '20px', marginBottom: '20px' }}>
        <Typography variant="h6" gutterBottom>
          Order Information
        </Typography>

        <TableContainer component={Paper} style={{ marginBottom: '20px' }}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>{order?.id}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>User ID</TableCell>
                <TableCell>{order?.userId}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Box display="flex" alignItems="center" justifyContent="center" style={{ minHeight: '8rem' }}>
            <TableCell style={{backgroundColor: 'white',  height: '8rem' }}>Order Status:</TableCell>
            <div style={{ flex: 1 }}>
             <Stepper activeStep={statusOptions.indexOf(order?.orderStatus ?? 'Pending')} alternativeLabel>
              {statusOptions.map((status, index) => (
                <Step key={status}>
                  <StepLabel>{status}</StepLabel>
                </Step>
              ))}
              </Stepper>
            </div>
          </Box>
        </TableContainer>
      </Paper>


      <Paper variant="outlined" style={{ padding: '20px' }}>
        <Typography variant="h6" gutterBottom>
          Product Detail
        </Typography>

         <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Product ID</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Images</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {order?.orderProducts?.map((product: OrderProductsInterface) =>
              {
                return (
                  <>
                  <TableRow key={product.productId}>
                    <TableCell>{product.productId}</TableCell>
                    <TableCell>{product.product.title}</TableCell>
                    <TableCell>{product?.amount}</TableCell>
                    <TableCell>{product.product.price}</TableCell>
                    <TableCell>
                      <img src={product.product.images[0]} alt="Product" style={{ maxWidth: '100px' }} />
                    </TableCell>
                  </TableRow>
                  </>
                );
              })}
              <TableCell>Total Price</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell>{order?.orderTotal}</TableCell>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default OrderDetail;
