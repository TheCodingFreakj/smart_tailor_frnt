import React, { useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Button
} from "@mui/material";

export const RenderInputFields = ({ configData, submitData }) => {
  const initialSelectedOption = Object.keys(configData)[0]; // Set initial selected option
  const initialSettings = configData[initialSelectedOption];
  const [selectedOption, setSelectedOption] = useState(initialSelectedOption);
  const [settings, setSettings] = useState(initialSettings);

  // Handle changes to selected setting
  const handleChanges = (e) => {
    const selected = e.target.value;
    setSelectedOption(selected);
    setSettings(configData[selected] || {});
  };

  // Handle changes to individual setting inputs and update local settings
  const handleInputChange = (key, value) => {
    console.log(key,value)
    setSettings((prevSettings) => {
        console.log(key,prevSettings,prevSettings[key])
      // Check if the value is nested (object) or a primitive
      const currentValue = prevSettings[key];
      const isNested = typeof currentValue === "object" && currentValue !== null;
  
      if (typeof prevSettings != 'string' && Object.keys(prevSettings).length >0) {
        // Update the nested object
        return {
          ...prevSettings,
          [key]:value
        };
      }else{
        return value
      }


  
      // Update primitive fields
      
    });
  };
  

  // Guard clause if no configData
  if (!configData || Object.keys(configData).length === 0) {
    return <Typography>No config data available</Typography>;
  }

  // Function to render nested fields if value is an object
  const renderNestedFields = (value, key) => {
    return Object.keys(value).map((nestedKey) => (
      <Box key={nestedKey} sx={{ marginBottom: 1 }}>
        <Typography variant="body2" sx={{ fontWeight: "normal" }}>
          {nestedKey}
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          value={value[nestedKey] || ""}
          onChange={(e) =>
            handleInputChange(key, {
              ...value,
              [nestedKey]: e.target.value,
            })
          }
          placeholder={`Enter ${nestedKey}`}
        />
      </Box>
    ));
  };

  // Handle the save action and submit updated settings to parent
  const handleSaveSettings = () => {
    const updatedConfigData = {
      ...configData,
      [selectedOption]: settings, // Update the selected option's settings
    };

    // Submit updated config data to the parent
    submitData(updatedConfigData);
  };

  return (
    <Box sx={{ padding: "24px" }}>
      {/* Dropdown for selecting the setting */}
      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <InputLabel id="setting-select-label">Select Setting</InputLabel>
        <Select
          labelId="setting-select-label"
          value={selectedOption}
          onChange={handleChanges}
          label="Select Setting"
        >
          {Object.keys(configData).map((option, index) => (
            <MenuItem key={index} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Render settings based on selected option */}
      <Box sx={{ marginTop: 2 }}>
        <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: "bold" }}>
          Settings for {selectedOption}
        </Typography>


        {typeof settings === "object" && settings !== null ? (
          Object.keys(settings).map((key) => (
            <Box key={key} sx={{ marginBottom: 2 }}>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                {key}
              </Typography>
              {typeof settings[key] === "object" ? (
                // Render nested fields
                renderNestedFields(settings[key], key)
              ) : (
                // Render non-nested field
                <TextField
                  fullWidth
                  variant="outlined"
                  value={settings[key] || ""}
                  onChange={(e) => handleInputChange(key, e.target.value)}
                  placeholder={`Enter ${key}`}
                />
              )}
            </Box>
          ))
        ) : (
            <TextField
            fullWidth
            variant="outlined"
            value={settings || ""}
            onChange={(e) => handleInputChange(selectedOption, e.target.value)}
            placeholder={`Enter ${selectedOption}`}
          />
        )}

       
      </Box>

      {/* Save button to submit changes to the global configData */}
      <Button onClick={handleSaveSettings} color="primary" variant="contained">
        Save Settings
      </Button>
    </Box>
  );
};
