import React, { useState } from 'react';
import { Box, Button, TextField, Grid, Paper } from '@mui/material';

const data = [
  {
    css: {
      styles: ".card {\n  background-color: #fff;\n  border-radius: 8px;\n  padding: 20px;\n  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);\n  width: 300px;\n  margin: 20px;\n}\n\n.card h2 {\n  font-size: 24px;\n  color: #333;\n}\n\n.card p {\n  font-size: 16px;\n  color: #666;\n}\n\n.card-button {\n  padding: 10px 15px;\n  background-color: #007bff;\n  color: white;\n  border: none;\n  border-radius: 4px;\n  cursor: pointer;\n  font-size: 16px;\n}\n\n.card-button:hover {\n  background-color: #0056b3;\n}\n\n",
      editable: true,
    },
    html: {
      content: "<div class=\"card\">\n  <h2>Card Title</h2>\n  <p>This is an example card component. You can style it using CSS and add interactivity with JavaScript.</p>\n  <button class=\"card-button\">Click Me</button>\n</div>",
      editable: true,
    },
    javascript: {
      script: "\n    document.querySelector('.card-button').addEventListener('click', function() {\n      alert('Button clicked!');\n    });\n  ",
      editable: true,
    },
    type: "cardComponent",
  },
];

const CardEditor = ({comp}) => {
  // Initialize state with the provided data
  const [cardData, setCardData] = useState(comp);

  // Handle changes in any content (CSS, HTML, JavaScript)
  const handleEditContent = (index, type, value) => {
    const newData = [...cardData];
    newData[index][type] = value;
    setCardData(newData);
  };

  // Revert content to previous state
  const handleRevertContent = (index, type) => {
    const newData = [...cardData];
    // Example: Revert CSS to previous state (repeat for html and javascript)
    newData[index][type] = data[index][type];
    setCardData(newData);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <h2>Edit Card Component</h2>
        </Grid>

        {/* CSS Section */}
        <Grid item xs={12} md={4}>
          <h3>CSS</h3>
          <TextField
            fullWidth
            multiline
            minRows={8}
            value={cardData[0].css.styles}
            onChange={(e) => handleEditContent(0, 'css', e.target.value)}
            label="Edit CSS Styles"
            variant="outlined"
            sx={{ marginBottom: 2 }}
          />
          <Button
            variant="outlined"
            onClick={() => handleRevertContent(0, 'css')}
            sx={{ width: '100%' }}
          >
            Revert to Previous CSS
          </Button>
        </Grid>

        {/* HTML Section */}
        <Grid item xs={12} md={4}>
          <h3>HTML</h3>
          <TextField
            fullWidth
            multiline
            minRows={8}
            value={cardData[0].html.content}
            onChange={(e) => handleEditContent(0, 'html', e.target.value)}
            label="Edit HTML Content"
            variant="outlined"
            sx={{ marginBottom: 2 }}
          />
          <Button
            variant="outlined"
            onClick={() => handleRevertContent(0, 'html')}
            sx={{ width: '100%' }}
          >
            Revert to Previous HTML
          </Button>
        </Grid>

        {/* JavaScript Section */}
        <Grid item xs={12} md={4}>
          <h3>JavaScript</h3>
          <TextField
            fullWidth
            multiline
            minRows={8}
            value={cardData[0].javascript.script}
            onChange={(e) => handleEditContent(0, 'javascript', e.target.value)}
            label="Edit JavaScript"
            variant="outlined"
            sx={{ marginBottom: 2 }}
          />
          <Button
            variant="outlined"
            onClick={() => handleRevertContent(0, 'javascript')}
            sx={{ width: '100%' }}
          >
            Revert to Previous JavaScript
          </Button>
        </Grid>
      </Grid>

      {/* Preview Section */}
      <Box sx={{ marginTop: 4 }}>
        <h3>Preview</h3>
        <Paper
          sx={{
            padding: 2,
            borderRadius: 2,
            boxShadow: 2,
            backgroundColor: '#f9f9f9',
          }}
        >
          {/* Inject HTML, CSS, and JavaScript dynamically */}
          <div
            className="preview-container"
            style={{
              ...cardData[0].css.styles.split('\n').reduce((styleObj, line) => {
                const [key, value] = line.split(':');
                if (key && value) {
                  styleObj[key.trim()] = value.trim();
                }
                return styleObj;
              }, {}),
            }}
            dangerouslySetInnerHTML={{
              __html: cardData[0].html.content,
            }}
          ></div>
        </Paper>
      </Box>
    </Box>
  );
};

export default CardEditor;
