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

const SnippetManagementSection = () => {
    const [newSnippet, setNewSnippet] = useState(''); // State for new code snippet
    const [snippets, setSnippets] = useState([]); // Store list of custom snippets
    const [htmlSnippet, setHtmlSnippet] = useState(`<div class="card">
      <h2>Card Title</h2>
      <p>This is an example card component. You can style it using CSS and add interactivity with JavaScript.</p>
      <button class="card-button">Click Me</button>
    </div>`);
    const [cssSnippet, setCssSnippet] = useState(`.card {
      background-color: #fff;
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      width: 300px;
      margin: 20px;
    }`);
    const [jsSnippet, setJsSnippet] = useState(`document.querySelector('.card-button').addEventListener('click', function() {
      alert('Button clicked!');
    });`);
    const [previewHtml, setPreviewHtml] = useState('');
    const [codeSnippets, setCodeSnippets] = useState([]); // Store fetched snippets from API
    const [selectedSnippet, setSelectedSnippet] = useState(null); // Track selected snippet
    const [jsonHolder, setJsonHolder] = useState(null); // Track the JSON associated with the selected snippet
  
    // Handle snippet selection
    const handleSnippetSelect = (e) => {
      const selectedId = e.target.value;
      const selectedSnippet = codeSnippets.find(s => s.id === selectedId);
      if (selectedSnippet) {
        setJsonHolder(selectedSnippet.components_json);
      }
    };
  
    // Handle snippet creation
    const handleCreateSnippet = () => {
      if (newSnippet) {
        setSnippets((prevSnippets) => [...prevSnippets, newSnippet]);
        setNewSnippet('');
      }
    };
  
    // Handle snippet deletion
    const handleDeleteSnippet = (snippet) => {
      setSnippets((prevSnippets) => prevSnippets.filter((item) => item !== snippet));
    };
  
    // Function to preview the HTML
    const handlePreview = () => {
      const html = `
        <html>
          <head>
            <style>${cssSnippet}</style>
          </head>
          <body>
            ${htmlSnippet}
            <script>${jsSnippet}</script>
          </body>
        </html>
      `;
      setPreviewHtml(html);
    };
  
    // Fetch snippets from API on component mount
    useEffect(() => {
      async function fetchData() {
        try {
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/dynamic-components-list/`);
          setCodeSnippets(response.data);
        } catch (error) {
          console.error("Error fetching snippets:", error);
        }
      }
      fetchData();
    }, []);
  
    return (
      <Box sx={{ padding: 2 }}>
        {/* Snippet Selection */}
        <ReusableSelect
          label="Select Snippet"
          value={selectedSnippet}
          onChange={handleSnippetSelect}
          options={codeSnippets}
        />
  
        {/* Snippet Preview */}
        <Button variant="contained" onClick={handlePreview}>Preview Snippet</Button>
        <Box sx={{ marginTop: 2 }}>
          <Typography variant="h6">Preview:</Typography>
          <div dangerouslySetInnerHTML={{ __html: previewHtml }} />
        </Box>
  
        {/* Create New Snippet Section */}
        <Box sx={{ marginTop: "24px" }}>
          <Typography variant="h6">Create New Snippet</Typography>
          <ReusableTextField
            label="HTML Snippet"
            value={htmlSnippet}
            onChange={(e) => setHtmlSnippet(e.target.value)}
          />
          <ReusableTextField
            label="CSS Snippet"
            value={cssSnippet}
            onChange={(e) => setCssSnippet(e.target.value)}
          />
          <ReusableTextField
            label="JS Snippet"
            value={jsSnippet}
            onChange={(e) => setJsSnippet(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            sx={{ marginTop: "16px" }}
            onClick={handleCreateSnippet}
          >
            Create Snippet
          </Button>
        </Box>
  
        {/* Display Snippets List */}
        <Box sx={{ marginTop: "24px" }}>
          <Typography variant="h6">Saved Snippets</Typography>
          <List>
            {snippets.map((snippet, index) => (
              <ListItem key={index}>
                <ListItemText primary={snippet} />
                <IconButton onClick={() => handleDeleteSnippet(snippet)}>
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    );
  };
  
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





const AddNewConfig = ({configDatas, submitData,selectedCustomer}) => {
  const [configData, setConfigData] = useState(configDatas);
  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState("");
  const [selectedKey, setSelectedKey] = useState("");
  const [newNestedKey, setNewNestedKey] = useState("");
  const [newNestedValue, setNewNestedValue] = useState("");


  const handleCreate = () => {
    if (!newKey) return;
    setConfigData((prev) => ({ ...prev, [newKey]: newValue }));
    setNewKey("");
    setNewValue("");
  };

  const handleAddNestedField = () => {
    if (!selectedKey || !newNestedKey) return;
    setConfigData((prev) => {
      const newConfig = { ...prev };
      if (typeof newConfig[selectedKey] !== "object") {
        newConfig[selectedKey] = {};
      }
      newConfig[selectedKey][newNestedKey] = newNestedValue;
      return newConfig;
    });
    setNewNestedKey("");
    setNewNestedValue("");
  };


  

  const getNestedKeys = (data) => {
    return Object.keys(data).filter((key) => typeof data[key] === "object");
  };



  const handleUpdate = () => {
    console.log(configData)
    // setIsLoading(true);
    // // Simulate an update action with a timeout
    // setTimeout(() => {
    //   setIsLoading(false);
    //   // Perform your update logic here
    // }, 2000);
  };
 

  return (
    

    <Box sx={{ padding: "24px" }}>
    
 
        
        <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
          <NewSettingSection
            newKey={newKey}
            newValue={newValue}
            setNewKey={setNewKey}
            setNewValue={setNewValue}
            handleCreate={handleCreate}
            
          />
        </Paper>
    
        <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
          <NestedFieldSection
            configData={configData}
            selectedKey={selectedKey}
            setSelectedKey={setSelectedKey}
            newNestedKey={newNestedKey}
            setNewNestedKey={setNewNestedKey}
            newNestedValue={newNestedValue}
            setNewNestedValue={setNewNestedValue}
            handleAddNestedField={handleAddNestedField}
            getNestedKeys={getNestedKeys}
          />
        </Paper>
    
        <Paper elevation={3} sx={{ padding: 2 }}>
          <ReusableButton
            label="Update Settings"
            onClick={handleUpdate}
          />
        </Paper> 
      </Box>
      
      
    
    
  );
};

export default AddNewConfig;
