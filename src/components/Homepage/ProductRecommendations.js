import React, { Fragment } from 'react';
import { Paper, Typography, Box, Button, Grid2 } from '@mui/material';

const ProductRecommendations = () => {
  const products = [
    { name: 'Product 1', price: '$50', img: 'https://via.placeholder.com/150' },
    { name: 'Product 2', price: '$40', img: 'https://via.placeholder.com/150' },
    { name: 'Product 3', price: '$30', img: 'https://via.placeholder.com/150' },
    { name: 'Product 4', price: '$60', img: 'https://via.placeholder.com/150' },
  ];

  return (
    <Fragment>

    <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            bgcolor: '#f5f5f5',
            padding: '24px',
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Container maxWidth="xl">
          <Paper sx={{ padding: 2 }}>
      <Typography variant="h6" gutterBottom>
        Recommended Products
      </Typography>
      <Grid2 container spacing={2} sx={{ overflowX: 'auto' }}>
        {products.map((product, index) => (
          <Grid2 item key={index} xs={6} sm={4} md={3}>
            <Box sx={{ textAlign: 'center' }}>
              <img src={product.img} alt={product.name} style={{ width: '100%', borderRadius: '8px' }} />
              <Typography variant="body2" sx={{ marginTop: 1 }}>
                {product.name}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {product.price}
              </Typography>
              <Button variant="contained" sx={{ marginTop: 1 }}>Add to Cart</Button>
            </Box>
          </Grid2>
        ))}
      </Grid2>
    </Paper>
          </Container>
        </Box>
      </Box>
  
    </Fragment>



  );
};

export default ProductRecommendations;
