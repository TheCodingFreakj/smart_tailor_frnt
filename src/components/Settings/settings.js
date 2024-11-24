import React, { Fragment } from "react"
import { CssBaseline, Box, Grid2, Typography, Container, Paper } from '@mui/material';
import Sidebar from "../Homepage/Sidebar";
import InstallTrackingScriptButton from "../../utils/InstallTrackingScriptButton";
import ScriptRemovalButton from "../../utils/ScriptRemovalButton";

function Settings() {
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
              Settings
            </Typography>
            <Grid2 container spacing={6}>
              <Grid2 item xs={12} md={8}>
                General Settings
              </Grid2>
              <Grid2 item xs={12} md={4}>
                <InstallTrackingScriptButton shopId={localStorage.getItem("shopParams")}/>
                <ScriptRemovalButton shopId={localStorage.getItem("shopParams")} /> 
              </Grid2>
            </Grid2>
          </Container>
        </Box>
      </Box>
    </>
    </Fragment>


  );
}

export default Settings;