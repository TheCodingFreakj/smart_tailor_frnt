import React, { Fragment } from "react"
import { CssBaseline, Box, Grid2, Typography, Container, Paper } from '@mui/material';
import Sidebar from "../Homepage/Sidebar";


function Analytics() {
  const [data, setData] = React.useState("")




  return (
    <Fragment>
     <>
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
            <Typography variant="h4" gutterBottom>
            Analytics
            </Typography>
            <Grid2 container spacing={6}>
              <Grid2 item xs={12} md={8}>
              Analytics
              </Grid2>
              <Grid2 item xs={12} md={4}>
               Analytics
              </Grid2>
            </Grid2>
          </Container>
        </Box>
      </Box>
    </>
    </Fragment>


  );
}

export default Analytics;