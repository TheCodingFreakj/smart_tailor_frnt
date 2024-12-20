import logo from '../../logo.svg';
import '../../App.css';
import React, { Fragment } from "react"
import axios from "axios"
import ErrorPage from '../ErrorPage';
import { useParams } from 'react-router-dom';
import InstallTrackingScriptButton from '../../utils/InstallTrackingScriptButton';
import ScriptRemovalButton from '../../utils/ScriptRemovalButton';
import { CssBaseline, Box, Grid2, Typography, Container, Paper } from '@mui/material';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import ProductRecommendations from './ProductRecommendations';


function HomePage({ isInstalled, isLoading, setIsLoading }) {
  const [data, setData] = React.useState("")


  const getCsrfToken = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/csrf/`, {
        withCredentials: true, // Ensure cookies are sent
      });
      console.log("CSRF Token:", response.data.csrfToken);
      setIsLoading(false)
      return response.data.csrfToken;
    } catch (error) {
      setIsLoading(true)
      console.error("Error fetching CSRF token:", error);
    }
  };
  
  React.useEffect(() => {

    const fetchData = async (shopId) => {
      // const csrfToken = await getCsrfToken();
      // "X-CSRFToken": csrfToken 

      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/dashboard/`, // URL of your Django API
          { shopId: shopId }, // Send shop as JSON body
          { headers: { "Content-Type": "application/json",'ngrok-skip-browser-warning': 'true' } } // Ensure JSON header
        );
        setIsLoading(false)
        setData(response.data.shop_details.shop);
      } catch (error) {
        setIsLoading(true)
        console.error("API call failed:", error.response?.data || error.message);
      }
    }

    fetchData(localStorage.getItem("shopParams"))

  }, [])

  if (isLoading == true) {
    return <ErrorPage />;
  }

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
              Admin Dashboard
            </Typography>
            <Grid2 container spacing={6}>
              <Grid2 item xs={12} md={8}>
                <Dashboard />
              </Grid2>
              <Grid2 item xs={12} md={4}>
                Show recent activity in this app
              </Grid2>
            </Grid2>
          </Container>
        </Box>
      </Box>
    </>

    </Fragment>


  );
}

export default HomePage;