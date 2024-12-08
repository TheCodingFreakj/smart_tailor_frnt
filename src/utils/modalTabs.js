import React, { useState, Suspense, lazy } from 'react';
import { Box, Tabs, Tab, Typography, Paper } from "@mui/material";
import { RenderInputFields } from './RenderInner'; // Assuming you have this component
// Lazy load the LiquidTemplateEditor component
const ProductCard = lazy(() => import('./DynamicLayoutCreator'));





const HorizontalTabs = ({configData, submitData,selectedCustomer}) => {
  const [selectedTab, setSelectedTab] = useState(0);

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  // Render content for each tab
  const renderTabContent = (index) => {
    switch (index) {
      case 0:
        return <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
              <RenderInputFields configData={configData} submitData={submitData}/>
            </Paper>
          ;
      case 1:
        return <Suspense fallback={<div>Loading editor...</div>}>

          <ProductCard selectedCustomer={selectedCustomer}/>
        
      </Suspense>
      case 2:
        return <Typography>Content for Tab 3</Typography>;
      default:
        return <Typography>No Content Available</Typography>;
    }
  };

  return (
    <Box sx={{ width: "100%", padding: "16px" }}>
      {/* Tabs */}
      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth" // Makes tabs stretch across the width
        aria-label="horizontal tabs example"
      >
        <Tab label="Editing Main Layout Config" />
        <Tab label="Editing Slider Content" />
      </Tabs>

      {/* Tab Content */}
      <Box sx={{ marginTop: "16px" }}>{renderTabContent(selectedTab)}</Box>
    </Box>
  );
};

export default HorizontalTabs;
