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
import InstallTrackingButton from "./InstallScript";
import axios from "axios";
import RemoveAll from "./RemoveAll";



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
            id: entry.customer_id,
            name: entry.customer_id,
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

    console.log("customers----------->",customers)
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
         {customers.length !== 0 && <ReusableButton
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
                    Install Trackers- Slider Manager
                  </Typography>

                  <InstallTrackingButton shopId={localStorage.getItem("shopParams")} identifier={"slider"} />
                  <Typography variant="h6" gutterBottom>
                    Install Trackers- Frequently Bought together
                  </Typography>
                  <InstallTrackingButton shopId={localStorage.getItem("shopParams")} identifier={"fbought"} />
        <Typography variant="h6" gutterBottom>
                    Clear All Data
                  </Typography>

                  <RemoveAll shopId={localStorage.getItem("shopParams")}/>

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
