import React, { Fragment } from "react";
import { CssBaseline, Box, Grid2, Typography, Container, Paper, Button } from '@mui/material';
import Sidebar from "../Homepage/Sidebar";
import InstallTrackingScriptButton from "../../utils/InstallTrackingScriptButton";
import ScriptRemovalButton from "../../utils/ScriptRemovalButton";
import axios from "axios";
import RecommendationUI from "../../utils/RecommendationUI";

function Settings() {


  return (
    <Fragment>
      <CssBaseline />
      <Box sx={{ display: 'flex', height: '100vh' }}>
        {/* Sidebar */}
        <Box sx={{ width: '240px', bgcolor: '#2c3e50', color: 'white' }}>
          <Sidebar />
        </Box>

        {/* Main Content Area */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            bgcolor: '#f5f5f5',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'auto',
          }}
        >
          <Container >
            <Typography variant="h4" gutterBottom>
              Settings
            </Typography>

            {/* Recommendation UI and General Settings Section */}
            {/* <Grid2 container spacing={4} sx={{ display: 'flex', flexDirection: 'row' }}>
              {/* Recommendation UI Section */}
              <Grid2 item xs={12} md={12} lg={12}> 
                <Paper sx={{ padding: 3, boxShadow: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Recommendation Settings
                  </Typography>
                  <RecommendationUI />
                </Paper>
              </Grid2>

              {/* General Settings Box */}
              <Grid2 item xs={12} md={6}>
                <Paper sx={{ padding: 3, boxShadow: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    General Settings
                  </Typography>
                  <Typography variant="body1" paragraph>
                    Customize various settings for your shop. Adjust parameters and preferences below.
                  </Typography>
                </Paper>
              </Grid2>
            

            {/* Script Management Section */}
            <Grid2 container spacing={4} sx={{ display: 'flex', flexDirection: 'row' }}>
              {/* Sidebar Settings */}
              <Grid2 item xs={12} md={6}>
                <Paper sx={{ padding: 3, boxShadow: 3, marginBottom: 2 }}>
                  
                  
                </Paper>
              </Grid2>

            </Grid2>
          </Container>
        </Box>
      </Box>
    </Fragment>
  );
}

export default Settings;
