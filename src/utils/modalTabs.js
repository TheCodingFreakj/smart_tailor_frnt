import React, { useState, Suspense, startTransition,lazy } from 'react';
import { Box, Tabs, Tab, Typography, Paper,MenuItem , Select} from "@mui/material";
import { RenderInputFields } from './RenderInner'; // Assuming you have this component

// Lazy load the LiquidTemplateEditor component
const ProductCard = lazy(() => import('./DynamicLayoutCreator'));
const FrequentlyBoughtTogether = lazy(() => import('./FrequentlyBoughtTogether'));




const HorizontalTabs = ({configData, submitData,selectedCustomer}) => {
  const [selectedTab, setSelectedTab] = useState(1);
  const [selectedOption, setSelectedOption] = useState("");

  // Handle tab change
  const handleSelectionChange = (event) => {
    const value = event.target.value;
    startTransition(() => {
      setSelectedOption(value); // This marks the state update as transition
    });
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };


  // Render content for each tab
  const renderTabContent = (index, selectedOption, setSelectedOption) => {
    switch (index) {
      case 0:
        return (

          "configure slider settings"
          // <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
          //   <RenderInputFields configData={configData} submitData={submitData} />
          // </Paper>
        );
      case 1:
        return (
          <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
            {/* Dropdown Menu */}
            <Select
              value={selectedOption}
              onChange={handleSelectionChange}
              displayEmpty
              fullWidth
            >
              <MenuItem value="" disabled>
                Select an Option
              </MenuItem>
              <MenuItem value="A">Customize Relatable Products</MenuItem>
              <MenuItem value="B">Customize Frequently Bought Together Products</MenuItem>
            </Select>
  
            {/* Conditional Rendering Based on Selection */}
            {selectedOption === "A" && <ProductCard selectedCustomer={selectedCustomer}/>}
            {selectedOption === "B" && <FrequentlyBoughtTogether selectedCustomer={selectedCustomer}/>}
            {!selectedOption && (
              <Typography variant="body2" sx={{ marginTop: 2 }}>
                Please select an option to see content.
              </Typography>
            )}
          </Paper>
        );
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
      <Box sx={{ marginTop: "16px" }}>{renderTabContent(selectedTab, selectedOption, setSelectedOption)}</Box>
    </Box>
  );
};

export default HorizontalTabs;
