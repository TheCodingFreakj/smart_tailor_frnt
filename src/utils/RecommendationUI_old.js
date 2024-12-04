import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid2, TextField, Button, MenuItem, Select, InputLabel, FormControl, TextareaAutosize, List, ListItem, ListItemText, IconButton } from '@mui/material';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete'; // For deleting snippets
import CardEditor from './CardEditor';

const renderInputFields = (data, parentKey = '', handleChange) => {
  return Object.keys(data).map((key) => {
    const path = parentKey ? `${parentKey}.${key}` : key;
    const value = data[key];

    if (typeof value === 'object' && !Array.isArray(value)) {
      return (
        <Box key={path} sx={{ margin: '16px 0' }}>
          <Typography variant="h6">{key}</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
            {renderInputFields(value, path, handleChange)}
          </Box>
        </Box>
      );
    }

    return (
      <Grid2 item xs={12} sm={6} key={path} sx={{ padding: '8px' }}>
        <TextField
          fullWidth
          label={key}
          value={value}
          onChange={(e) => handleChange(path, e.target.value)}
          variant="outlined"
        />
      </Grid2>
    );
  });
};

const RecommendationUI = () => {
  const [configData, setConfigData] = useState({});
  const [customers, setCustomers] = useState([]); // Store list of customers
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');
  const [selectedKey, setSelectedKey] = useState('');
  const [newNestedKey, setNewNestedKey] = useState('');
  const [newNestedValue, setNewNestedValue] = useState('');
  const [newSnippet, setNewSnippet] = useState(''); // State for new code snippet
  const [snippets, setSnippets] = useState([]); // Store list of custom snippets
  const [title, setTitle]=useState('Awesome Snipet');
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
}

.card h2 {
  font-size: 24px;
  color: #333;
}

.card p {
  font-size: 16px;
  color: #666;
}

.card-button {
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.card-button:hover {
  background-color: #0056b3;
}

`);
  const [jsSnippet, setJsSnippet] = useState(`
    document.querySelector('.card-button').addEventListener('click', function() {
      alert('Button clicked!');
    });
  `);
  const [previewHtml, setPreviewHtml] = useState('');

  useEffect(() => {
    // Fetch customers and slider settings when the component mounts
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/slider-settings/`); // Fetch settings for all customers
        console.log(response.data);

        const customerData = response.data.map((entry) => ({
          id: entry.customer,
          name: entry.customer,
          settings: entry.settings,
        }));

        setCustomers(customerData);

        if (selectedCustomer) {
          const selectedCustomerSettings = customerData.find((customer) => customer.id === selectedCustomer);
          if (selectedCustomerSettings) {
            setConfigData(selectedCustomerSettings.settings);
          }
        }

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [selectedCustomer]);

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

  const handleUpdate = async () => {
    
    try {
      const apiUrl = `${process.env.REACT_APP_API_URL}/slider-settings/`;
      const response = await axios.post(apiUrl, {
        customer: selectedCustomer,
        settings: configData,
      });
      console.log('Slider settings and snippets saved:', response.data);
    } catch (error) {
      console.error('There was an error saving the settings and snippets:', error);
    }
  };

  const handleCreate = () => {
    if (newKey && newValue) {
      setConfigData((prevConfigData) => ({
        ...prevConfigData,
        [newKey]: newValue,
      }));
      setNewKey('');
      setNewValue('');
    }
  };

  const handleAddNestedField = () => {
    if (selectedKey && newNestedKey && newNestedValue) {
      const keys = selectedKey.split('.');
      setConfigData((prevConfigData) => {
        let newData = { ...prevConfigData };
        let temp = newData;

        keys.forEach((key, index) => {
          if (index === keys.length - 1) {
            temp[key] = {
              ...temp[key],
              [newNestedKey]: newNestedValue,
            };
          } else {
            temp = temp[key];
          }
        });

        return newData;
      });

      setNewNestedKey('');
      setNewNestedValue('');
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
// Initialize an empty array to hold components
let jsonObject = {
  components_json: [],
  title: ''
};
// Function to create the component JSON
const createComponentJson = (htmlSnippet, cssSnippet, jsSnippet) => {
  return {
    type: "cardComponent",  // You can dynamically assign the type based on component
    html: {
      content: htmlSnippet,
      editable: true
    },
    css: {
      styles: cssSnippet,
      editable: true
    },
    javascript: {
      script: jsSnippet,
      editable: true
    }
  };
};
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
  const [codeSnippets, setCodeSnippets] = useState([]);
   useEffect( ()=>{

    
    async function fetchData() {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/dynamic-components-list/`);
    console.log(response.data)
    setCodeSnippets(response.data)
    }
    fetchData();

   },[])

   const [jsonHolder, setjsonHolder] = useState([])
    

    const handleSnippetSelect = async (e) => {
      const selectedId = e.target.value;
      console.log(selectedId,codeSnippets)

      if (codeSnippets.length > 0){
        codeSnippets.map(s=>{
          if (s.id == selectedId) {
            setjsonHolder(s.components_json)
          }
        })
      }
      
     
    };
   
 console.log(jsonHolder)
  const handleUpdateSnipeets =async ()=>{
    const apiUrl = `${process.env.REACT_APP_API_URL}/dynamic-components-list/`;
    const component = createComponentJson(htmlSnippet, cssSnippet, jsSnippet);
    jsonObject.components_json.push(component);
    jsonObject.title = `${title}`;
    
    console.log(jsonObject);

    try {
      // Send POST request using Axios
      const response = await axios.post(apiUrl, jsonObject, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error posting data:", error);
    }
    
}
  // Function to filter and return only keys that have nested objects
  const getNestedKeys = (data) => {
    return Object.keys(data).filter((key) => typeof data[key] === 'object' && !Array.isArray(data[key]));
  };
  const mainAreaOptions = [
    { id: 'area1', name: 'Main Area 1' },
    { id: 'area2', name: 'Main Area 2' },
 
  ];
  const [selectedAreas, setSelectedAreas] = useState("")
  const [selectedArea, setSelectedArea] = useState("area1")
  const handleChangeSee = (e) => {
 

    setSelectedArea(e.target.value)
  };

  const [selectedSnippet, setSelectedSnippet] = useState(null);
  return (
    <>
    <Box sx={{ padding: '24px' }}>
  {/* Select Main Area (Settings Form) */}
  <FormControl fullWidth sx={{ marginBottom: '16px' }}>
    <InputLabel>Choose Settings Form</InputLabel>
    <Select
      value={selectedArea}
      onChange={(e) => handleChangeSee(e)}
      label="Choose Settings Form"
    >
      {mainAreaOptions.map((option) => (
        <MenuItem key={option.id} value={option.id}>
          {option.name}
        </MenuItem>
      ))}
    </Select>
  </FormControl>

  {/* Dynamic Form Content Based on Selected Area */}
  {selectedArea === 'area1' && (
    <>
      {/* Select Customer */}
      <FormControl  sx={{ marginBottom: '16px' }}>
        <InputLabel>Choose Customer</InputLabel>
        <Select
          value={selectedCustomer}
          onChange={(e) => setSelectedCustomer(e.target.value)}
          label="Choose Customer"
        >
          {customers.map((customer) => (
            <MenuItem key={customer.id} value={customer.id}>
              {customer.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Render Input Fields */}
      <Grid2 container spacing={3}>
        {renderInputFields(configData, '', handleChange)}
      </Grid2>

      {/* Create New Setting Section */}
      <Box sx={{ marginTop: '24px' }}>
        <Typography variant="h6">Add New Key</Typography>
        <Grid2 container spacing={2}>
          <Grid2 item xs={6}>
            <TextField
              fullWidth
              label="New Key"
              value={newKey}
              onChange={(e) => setNewKey(e.target.value)}
              variant="outlined"
            />
          </Grid2>
          <Grid2 item xs={6}>
            <TextField
              fullWidth
              label="New Value"
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              variant="outlined"
            />
          </Grid2>
        </Grid2>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleCreate}
          sx={{ marginTop: '16px' }}
        >
          Add New Key
        </Button>
      </Box>

      {/* Add Nested Field Section */}
      <Box sx={{ marginTop: '24px' }}>
        <Typography variant="h6">Add Nested Field to Existing Key</Typography>
        <FormControl fullWidth sx={{ marginBottom: '16px' }}>
          <InputLabel>Choose Key</InputLabel>
          <Select
            value={selectedKey}
            onChange={(e) => setSelectedKey(e.target.value)}
            label="Choose Key"
          >
            {getNestedKeys(configData).map((key) => (
              <MenuItem key={key} value={key}>
                {key}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Grid2 container spacing={2}>
          <Grid2 item xs={6}>
            <TextField
              fullWidth
              label="New Nested Key"
              value={newNestedKey}
              onChange={(e) => setNewNestedKey(e.target.value)}
              variant="outlined"
            />
          </Grid2>
          <Grid2 item xs={6}>
            <TextField
              fullWidth
              label="New Nested Value"
              value={newNestedValue}
              onChange={(e) => setNewNestedValue(e.target.value)}
              variant="outlined"
            />
          </Grid2>
        </Grid2>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleAddNestedField}
          sx={{ marginTop: '16px' }}
        >
          Add Nested Field
        </Button>

        
      <Button
        variant="contained"
        color="primary"
        onClick={handleUpdate}
        sx={{ marginTop: '24px' }}
      >
        Update Settings 
      </Button>
      </Box>
    </>
  )}
</Box>

<Box sx={{ padding: '24px' }}>

      {/* Snippets Section */}
      <Box sx={{ marginTop: '24px' }}>
        

        {/* List of Snippets */}
        <List sx={{ marginTop: '16px' }}>
          {snippets.map((snippet, index) => (
            <ListItem key={index}>
              <ListItemText primary={snippet} />
              <IconButton edge="end" onClick={() => handleDeleteSnippet(snippet)}>
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Preview Section */}
      <Box sx={{ marginTop: '24px' }}>
        <Typography variant="h6">HTML, CSS, and JavaScript Preview</Typography>

        <TextField
          fullWidth
          label="Snipet Title"
          multiline
          minRows={4}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          variant="outlined"
          placeholder="<div>Your Title...</div>" // Example HTML code placeholder
        />
        
        {/* HTML Snippet */}
        <TextField
          fullWidth
          label="HTML Snippet"
          multiline
          minRows={4}
          value={htmlSnippet}
          onChange={(e) => setHtmlSnippet(e.target.value)}
          variant="outlined"
          placeholder="<div>Your HTML content here...</div>" // Example HTML code placeholder
        />
        
        {/* CSS Snippet */}
        <TextField
          fullWidth
          label="CSS Snippet"
          multiline
          minRows={4}
          value={cssSnippet}
          onChange={(e) => setCssSnippet(e.target.value)}
          variant="outlined"
          placeholder="/* Your CSS styles here... */" // Example CSS code placeholder
        />
        
        {/* JavaScript Snippet */}
        <TextField
          fullWidth
          label="JavaScript Snippet"
          multiline
          minRows={4}
          value={jsSnippet}
          onChange={(e) => setJsSnippet(e.target.value)}
          variant="outlined"
          placeholder="// Your JavaScript code here..." // Example JS code placeholder
        />
        
        <Button
          variant="contained"
          color="primary"
          onClick={handlePreview}
          sx={{ marginTop: '16px' }}
        >
          Preview Snippet
        </Button>
        
        <Box
          sx={{
            marginTop: '16px',
            border: '1px solid #ccc',
            padding: '16px',
            height: '300px',
            overflow: 'auto',
            backgroundColor: '#f7f7f7',
          }}
        >
          <iframe
            title="Preview"
            srcDoc={previewHtml}
            width="100%"
            height="100%"
            frameBorder="0"
          ></iframe>
        </Box>
      </Box>

  


      
      <Button
        variant="contained"
        color="primary"
        onClick={handleUpdateSnipeets}
        sx={{ marginTop: '24px' }}
      >
        Update  Snippets
      </Button>
    </Box>
    </>
  );
};

export default RecommendationUI;
