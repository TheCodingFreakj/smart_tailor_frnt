import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Paper
} from "@mui/material";
import { SettingsModal } from "./RenderMain";
import InstallTrackingScriptButton from "./InstallTrackingScriptButton";
import DeleteIcon from "@mui/icons-material/Delete"; // For snippet deletion
import axios from "axios";

const ReusableTextField = ({ label, value, onChange, error, helperText }) => (
  <TextField
    fullWidth
    label={label}
    value={value}
    onChange={onChange}
    variant="outlined"
    error={error}
    helperText={helperText}
   
  />
);

const ReusableSelect = ({ label, value, onChange, options }) => (
    <FormControl fullWidth sx={{ marginBottom: "16px", width: "50%" }}>
      <InputLabel>{label}</InputLabel>
      <Select 
        value={value || ''}  // Set default value as empty string if value is null or undefined
        onChange={onChange} 
        label={label}
      >
        {options.map((option) => (
          <MenuItem key={option.id || option} value={option.id || option}>
            {option.name || option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
  

const NewSettingSection = ({ newKey, newValue, setNewKey, setNewValue, handleCreate, isSubmitting }) => (
  <Box sx={{ marginTop: "24px" }}>
    <Typography variant="h6">Add New Key</Typography>
    <Box display="flex" gap={0.1} sx={{ flexDirection: "row", alignItems: "flex-start" }}>
      <Box display="flex" gap={2} sx={{ flexDirection: "column"}}>
        <ReusableTextField
          label="New Key"
          value={newKey}
          onChange={(e) => setNewKey(e.target.value)}
          error={!newKey}
          helperText={!newKey ? "Key cannot be empty" : ""}
        />
      </Box>
      <Box display="flex" gap={2} sx={{ flexDirection: "column"}}>
        <ReusableTextField
          label="New Value"
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
        />
      </Box>
    </Box>
    <Button
      variant="contained"
      color="secondary"
      onClick={handleCreate}
      sx={{ marginTop: "16px" }}
      disabled={isSubmitting}
    >
      {isSubmitting ? <CircularProgress size={24} /> : "Add New Key"}
    </Button>
  </Box>
);

const NestedFieldSection = ({
  configData,
  selectedKey,
  setSelectedKey,
  newNestedKey,
  setNewNestedKey,
  newNestedValue,
  setNewNestedValue,
  handleAddNestedField,
  getNestedKeys
}) => (
  <Box sx={{ marginTop: "24px" }}>
    <Typography variant="h6">Add Nested Field to Existing Key</Typography>
    <ReusableSelect
      label="Choose Key"
      value={selectedKey}
      onChange={(e) => setSelectedKey(e.target.value)}
      options={getNestedKeys(configData)}
    />
     <Box display="flex" gap={0.1} sx={{ flexDirection: "row", alignItems: "flex-start" }}>
     <Box display="flex" gap={2} sx={{ flexDirection: "column"}}>
        <ReusableTextField
          label="New Nested Key"
          value={newNestedKey}
          onChange={(e) => setNewNestedKey(e.target.value)}
        />
      </Box>
      <Box display="flex" gap={2} sx={{ flexDirection: "column"}}>
        <ReusableTextField
          label="New Nested Value"
          value={newNestedValue}
          onChange={(e) => setNewNestedValue(e.target.value)}
        />
      </Box>
    </Box>
    <Button
      variant="contained"
      color="secondary"
      onClick={handleAddNestedField}
      sx={{ marginTop: "16px" }}
    >
      Add Nested Field
    </Button>
  </Box>
);


  
const ReusableButton = ({ label, onClick, color = 'primary', variant = 'contained' }) => (
    <Button
      variant={variant}
      color={color}
      onClick={onClick}
      sx={{ marginTop: '24px' }} // Add any other custom styles passed via `sx`
    //   disabled={isLoading} // Disable button while loading
    >
      {label}
    </Button>
  );





const RecommendationUI = () => {
  const [configData, setConfigData] = useState({});

  const [loading, setLoading] = useState(true);
  const [selectedCustomer, setSelectedCustomer] = useState(() => {
    // Retrieve the selected customer from localStorage
    const savedCustomer = localStorage.getItem('selectedCustomer');
    return savedCustomer || ''; // Return savedCustomer if found, otherwise default to empty string
  });

  // Handle when the user selects a new customer
  const handleCustomerChange = (e) => {
    const customer = e.target.value;
    setSelectedCustomer(customer);

    // Save the selected customer to localStorage
    localStorage.setItem('selectedCustomer', customer);
  };
  const [customers, setCustomers] = useState([]);

      // Fetch customers and slider settings when the component mounts
      const fetchData = async () => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/slider-settings/`,{headers:{'ngrok-skip-browser-warning': 'true'}}); // Fetch settings for all customers
 
        
  
          const customerData = response.data.map((entry) => ({
            id: entry.customer,
            name: entry.customer,
            settings: entry.settings.settings,
          }));
  
          setCustomers(customerData);
  
          if (selectedCustomer) {
            const selectedCustomerSettings = customerData.find((customer) => customer.id === selectedCustomer);
            if (selectedCustomerSettings) {
              setConfigData(selectedCustomerSettings.settings);
              setLoading(false);
            }
          }
  
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
  useEffect(() => {

    fetchData();
  }, [selectedCustomer]);

  const handleUpdate = () => {
    // setIsLoading(true);
    // // Simulate an update action with a timeout
    // setTimeout(() => {
    //   setIsLoading(false);
    //   // Perform your update logic here
    // }, 2000);
  };
  const handleChange = (path, value) => {
    const keys = path.split('.');
    setConfigData((prevConfigData) => {
      let newData = { ...prevConfigData };
      let temp = newData;

      keys.forEach((key, index) => {
        if (index === keys.length - 1) {
          temp[key] = value;
        } else {
          temp = temp[key];
        }
      });

      return newData;
    });
  };
 
  const [open, setOpen] = useState(false);

  // Function to open the modal
  const handleOpenModal = () => {
    
    console.log('selectedCustomer:', selectedCustomer); // Debugging
    console.log('configData:', configData); // Debugging
    if (selectedCustomer !== '' && !loading) {
        setOpen(true);
      }
  };

  useEffect(() => {
    // Only open the modal if the conditions are met after an update
    if (selectedCustomer !== '' && configData.length > 0) {
        handleOpenModal(selectedCustomer);
    }
  }, [setSelectedCustomer]);

    // Function to load the modal state from localStorage
  const loadModalState = () => {
    const savedOpenState = localStorage.getItem('modalOpenState');
    if (savedOpenState !== null) {
      return JSON.parse(savedOpenState);
    }
    return false; // Default to 'false' if not found in localStorage
  };

  // Use effect to initialize state on component mount
  useEffect(() => {
    const initialState = loadModalState();
    setOpen(initialState); // Set the modal state based on the saved value
  }, []);

  useEffect(() => {
    if (window.performance) {
      if (performance.navigation.type === 1) {
        if (selectedCustomer !== '') {
        localStorage.setItem('modalOpenState', true);
        }
      } else {
        console.log('Page was accessed normally');
      }
    }
  }, []);
  
  
    const submitData = async (dta)=>{
        console.log(dta)

        try {
            const apiUrl = `${process.env.REACT_APP_API_URL}/slider-settings/`;
            const response = await axios.post(apiUrl, {
              customer: selectedCustomer,
              settings: dta,
            },{headers:{'ngrok-skip-browser-warning': 'true'}});

            if (response){
                fetchData()
            }
            console.log('Slider settings and snippets saved:', response.data);
          } catch (error) {
            console.error('There was an error saving the settings and snippets:', error);
          }
    }



    const handle = async () => {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/generate_fake_data/`,
        {},
        { headers: { "Content-Type": "application/json",'ngrok-skip-browser-warning': 'true', } }
      );
      // Handle response if needed
    };
  return (
    

    <Box display="flex" gap={3} sx={{ flexDirection: "row", alignItems: "flex-start", width: '100%' }}>
      
      {/* First Section (Reusable Select, New Setting, Nested Field Section, Button) */}
      <Box display="flex" flexDirection="column" sx={{ width: '50%' }}>
        <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
          <ReusableSelect
            label="Choose Customer"
            value={selectedCustomer}
            onChange={handleCustomerChange}
            options={customers}
          />
         {Object.keys(configData).length !== 0 && <ReusableButton
            label="Open Settings"
            onClick={handleOpenModal}
          />}

          {customers.length ==0 && <div>The Customer Has nt visited yet, let them visit.</div>}

        </Paper>
        <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}> <SettingsModal
        selectedCustomer={selectedCustomer}
        configData={configData}
        submitData={submitData}
        open={open} // Pass open state
        setOpen={setOpen} // Pass setter to control opening/closing modal
      /></Paper>
       

      </Box>
      
      {/* Second Section (Snippet Management) */}
      <Box display="flex" sx={{ width: '50%' }}>
        <Paper elevation={3} sx={{ padding: 2, width: '100%' }}>
        <Typography variant="h6" gutterBottom>
                    Track Customer
                  </Typography>
                  <InstallTrackingScriptButton addCustInfo={true} shopId={localStorage.getItem("shopParams")} />
                  <Typography variant="h6" gutterBottom>
                    Install Fake Data
                  </Typography>

                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handle}
                    sx={{ padding: "10px 0" }}
                  >
                    Install Fake Data
                  </Button>
        </Paper>
      </Box>
    
    </Box>
    
  );
};

export default RecommendationUI;
