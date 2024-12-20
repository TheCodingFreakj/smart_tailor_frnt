import React, { useState } from "react";
import AceEditor from "react-ace";

import { JSHINT } from 'jshint';
import { Liquid } from 'liquidjs';
import axios from "axios";
// import 'ace-builds/src-noconflict/mode-javascript';
// import 'ace-builds/src-noconflict/mode-liquid';
// import 'ace-builds/src-noconflict/mode-css';


// import "ace-builds/src-noconflict/mode-liquid";
import "ace-builds/src-noconflict/theme-monokai";
// import 'ace-builds/src-noconflict/mode-css';
// import "ace-builds/src-noconflict/mode-javascript";
const SnippetEditorWithNodes = ({selectedCustomer}) => {

  const editorRef = React.useRef(null);


  const [htmlContent, setHtmlContent] = useState(`
    
    <div id=schema_holder> 
    <div class="product-card">
  <img src="https://via.placeholder.com/300x200" alt="Product 1">
  <div class="product-info">
    <h4>Product 1</h4>
    <p>$19.99</p>
    <button>Add to Cart</button>
  </div>
</div>
</div>
`);





  const settingsConfig = [
    {
      "type": "text",
      "label": "Section Title",
      "id": "section_title",
      "default": "Welcome to Our Store"
    },
    {
      "type": "textarea",
      "label": "Section Description",
      "id": "section_description",
      "default": "This is a description of the section."
    },
    {
      "type": "image_picker",
      "label": "Hero Image",
      "id": "hero_image",
      "default": "image_url_here"
    },
    {
      "type": "url",
      "label": "Link URL",
      "id": "link_url",
      "default": "https://www.example.com"
    },
    {
      "type": "link",
      "label": "Link to Collection",
      "id": "collection_link",
      "default": "/collections/all"
    },
    {
      "type": "text",
      "label": "Button Text",
      "id": "button_text",
      "default": "Shop Now"
    },
    {
      "type": "url",
      "label": "Button URL",
      "id": "button_url",
      "default": "/collections/all"
    },
    {
      "type": "select",
      "label": "Button Style",
      "id": "button_style",
      "options": [
        { "value": "primary", "label": "Primary" },
        { "value": "secondary", "label": "Secondary" }
      ],
      "default": "primary"
    },
    {
      "type": "select",
      "label": "Select Option",
      "id": "select_option",
      "options": [
        { "value": "option_1", "label": "Option 1" },
        { "value": "option_2", "label": "Option 2" }
      ],
      "default": "option_1"
    },
    {
      "type": "checkbox",
      "label": "Enable Feature",
      "id": "enable_feature",
      "default": true
    },
    {
      "type": "color",
      "label": "Background Color",
      "id": "background_color",
      "default": "#FFFFFF"
    },
    {
      "type": "file",
      "label": "Upload File",
      "id": "file_upload"
    },
    {
      "type": "range",
      "label": "Image Opacity",
      "id": "image_opacity",
      "min": 0,
      "max": 100,
      "step": 1,
      "default": 50
    },
    {
      "type": "radio",
      "label": "Display Option",
      "id": "display_option",
      "options": [
        { "value": "show", "label": "Show" },
        { "value": "hide", "label": "Hide" }
      ],
      "default": "show"
    },
    {
      "type": "date",
      "label": "Event Date",
      "id": "event_date",
      "default": "2024-12-31"
    },
    {
      "type": "richtext",
      "label": "Description",
      "id": "rich_text_description",
      "default": "<p>Write your description here...</p>"
    },
    {
      "type": "collection",
      "label": "Select Collection",
      "id": "collection_picker"
    },
    {
      "type": "product",
      "label": "Select Product",
      "id": "product_picker"
    },
    {
      "type": "html",
      "label": "Custom HTML",
      "id": "custom_html",
      "default": "<div class='custom-section'>Custom HTML here</div>"
    }
  ];



  // Function to generate form elements
  function generateFormElements(event) {
    const selectedOption = event.target.options[event.target.selectedIndex];
    console.log(selectedOption.value)
    let selectedOptionPick = ''
    settingsConfig.map(setting => {

      if (selectedOption.value == setting.type) {

        switch (selectedOption.value) {
          case 'text':
            selectedOptionPick = `
                  
                  <input type="text" id="${setting.id}" name="${setting.id}" value="${setting.default || ''}" />
                `;

          case 'textarea':
            selectedOptionPick = `
                  <div>
                        <textarea id="${setting.id}" 
                                  name="${setting.id}" 
                        >${setting.default || ''}</textarea>
                    </div>
                `;

          case 'select':
            const options = setting?.options?.map(option => `
                  <option value="${option.value}" ${option.value === setting.default ? 'selected' : ''}>${option.label}</option>
                `).join('');
            selectedOptionPick = `
                  
                  <select id="${setting.id}" name="${setting.id}">
                    ${options}
                  </select>
                `;

          case 'checkbox':
            selectedOptionPick = `
                  
                  <input type="checkbox" id="${setting.id}" name="${setting.id}" ${setting.default ? 'checked' : ''} />
                `;

          case 'color':
            selectedOptionPick = `
                  
                  <input type="color" id="${setting.id}" name="${setting.id}" value="${setting.default || '#000000'}" />
                `;

          case 'file':
            selectedOptionPick = `
                  
                  <input type="file" id="${setting.id}" name="${setting.id}" />
                `;
          case 'link':
            selectedOptionPick = `
                  
                    <a href="${setting.default}" id="${setting.id}" target="_blank"}>
                      ${setting.label}
                    </a>
                  `;

          case 'range':
            selectedOptionPick = `
                  
                  <input type="range" id="${setting.id}" name="${setting.id}" min="${setting.min || 0}" max="${setting.max || 100}" step="${setting.step || 1}" value="${setting.default || 50}" />
                `;

          case 'radio':
            const radioButtons = setting?.options?.map(option => `
                  <label>
                    <input type="radio" name="${setting.id}" value="${option.value}" ${option.value === setting.default ? 'checked' : ''} />
                    ${option.label}
                  </label>
                `).join('');
            selectedOptionPick = `
                  
                  ${radioButtons}
                `;

          case 'date':
            selectedOptionPick = `
                  
                  <input type="date" id="${setting.id}" name="${setting.id}" value="${setting.default || ''}" />
                `;

          case 'richtext':
            selectedOptionPick = `
                  
                  <textarea id="${setting.id}" name="${setting.id}">${setting.default || ''}</textarea>
                `;

          case 'html':
            selectedOptionPick = `
                  <div id="${setting.id}" name="${setting.id}">${setting.default || ''}</div>
                `;

          case 'image_picker':
            selectedOptionPick = `
                    <input type="file" id="${setting.id}" name="${setting.id}" accept="image/*" />
                    <div id="${setting.id}-preview" class="image-preview" style="margin-top: 10px;">
                      ${setting.default ? `<img src="${setting.default}" alt="Image Preview" width="150" height="150" />` : ''}
                    </div>
                  `;

          default:
            return '';
        }

      }

    })

    setHtmlContent(prevContent => prevContent + '\n' + selectedOptionPick);






    // setHtmlContent(JSON.stringify(objectt))
  }

  const showParser = () => {

    const cleanHtmlContent = htmlContent.replace(/,/g, '').trim();

    return <div dangerouslySetInnerHTML={{ __html: cleanHtmlContent }} />
  }




  const [cssContent, setCssContent] = useState(`   body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f9;
      margin: 0;
      padding: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }

   /* Product Card Layout */
.product-card {
  width: 250px; /* Adjust the width of each product card */
  background-color: #fff; /* White background for each card */
  border: 1px solid #ddd; /* Light border around the card */
  border-radius: 8px; /* Rounded corners */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
  overflow: hidden; /* Hide overflow content */
  transition: transform 0.3s ease-in-out; /* Smooth hover effect */
  margin: 15px; /* Space between cards */
  text-align: center; /* Center the text inside the card */
}

.product-card:hover {
  transform: translateY(-10px); /* Lift card on hover */
}

/* Image styling */
.product-card img {
  width: 100%; /* Make the image fill the card's width */
  height: 180px; /* Set a fixed height for images */
  object-fit: cover; /* Ensure the image covers the area without distortion */
  border-bottom: 1px solid #ddd; /* Border between the image and content */
}

/* Product info section */
.product-info {
  padding: 15px; /* Add some space around the text */
}

.product-info h4 {
  font-size: 18px; /* Set the font size for the product name */
  margin: 10px 0; /* Space between name and price */
  color: #333; /* Dark color for text */
}

.product-info p {
  font-size: 16px; /* Font size for the price */
  color: #f44336; /* Red color for price */
  margin: 10px 0; /* Space between price and button */
}

.product-info button {
  background-color: #4CAF50; /* Green background for the button */
  color: white; /* White text */
  font-size: 16px; /* Font size for button text */
  padding: 10px 15px; /* Padding around the button */
  border: none; /* Remove border */
  border-radius: 4px; /* Rounded corners for the button */
  cursor: pointer; /* Pointer cursor on hover */
  transition: background-color 0.3s ease; /* Smooth color transition */
}

.product-info button:hover {
  background-color: #45a049; /* Darker green when hovering */
}
`);



  const [code, setCode] = useState('');
  // Dynamically apply the CSS from the second editor
  // Applying the CSS content to the preview dynamically
  const applyCSS = () => {
    const styleSheet = document.createElement("style");
    styleSheet.innerText = cssContent; // Set CSS content as innerText
    document.head.appendChild(styleSheet); // Append the style tag to the document head
  };
  React.useEffect(() => {
    // const styleElement = document.getElementById('dynamic-css');
    // if (styleElement) {
    //   styleElement.textContent = cssContent;
    // }



    applyCSS();
  }, [cssContent]);

  const [errorMessages, setErrorMessages] = useState([]);
  const handleValidationError = (e) => {
    const errors = e.data; // Get the error data
    if (errors != undefined && errors?.length > 0) {
      setErrorMessages(errors.map((error) => error.message));
    } else {
      setErrorMessages([]);
    }
  };



  const executeCode = (newCode) => {
    try {
      // Create a script element dynamically and inject JavaScript code
      const script = document.createElement('script');
      if (script) {
        script.remove()
      }
      script.type = 'text/javascript';
      script.innerHTML = newCode;
      document.body.appendChild(script);
    } catch (error) {
      console.error('Error executing JS:', error);
    }
  };




  React.useEffect(() => {
    // Lint the code each time it changes
    const lintCode = () => {
      const result = JSHINT(code);
      if (result?.errors?.length > 0) {

        setErrorMessages(result?.errors?.map((error, index) => {
          return `Line ${error.line}: ${error.reason}`
        }));

      } else {
        setErrorMessages([]);
      }
    };
    lintCode();
  }, [code]); // Re-run linting whenever the code changes
  const timeoutRef = React.useRef(null);
  const inactivityTimeoutRef = React.useRef(null);
  const [isUserInactive, setIsUserInactive] = React.useState(false);
  // Function to handle user inactivity timeout
  const handleInactivityTimeout = () => {
    setIsUserInactive(true);
    console.log('User has been inactive for 5 minutes.');
    // You can trigger code execution here or other actions when the user is inactive
    executeCode(code);
  };

  // Reset the inactivity timer
  const resetInactivityTimer = () => {
    if (inactivityTimeoutRef.current) {
      clearTimeout(inactivityTimeoutRef.current); // Clear the existing inactivity timer
    }

    inactivityTimeoutRef.current = setTimeout(handleInactivityTimeout, 5 * 60 * 1000); // 5 minutes timeout for inactivity
  };

  // Debounced function to execute code after typing stops
  const debouncedExecuteCode = (newValue) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current); // Clear the previous debounce timeout
    }

    timeoutRef.current = setTimeout(() => {
      executeCode(newValue); // Execute after the user stops typing for 1 second
    }, 1000); // Adjust debounce delay as needed (1000ms)
  };

  const handleCodeChange = (newValue) => {
    setCode(newValue); // Update the state with the new code
    debouncedExecuteCode(newValue); // Trigger the debounced function

    resetInactivityTimer(); // Reset inactivity timer whenever the user types
    setIsUserInactive(false); // Reset inactivity state
  };
  // Cleanup on component unmount
  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current); // Clean up the debounce timer
      }
      if (inactivityTimeoutRef.current) {
        clearTimeout(inactivityTimeoutRef.current); // Clean up inactivity timer
      }
    };
  }, []);

  // Set ACE to not use workers
  // Disable worker loading


  // Use effect or ref to set options dynamically
  React.useEffect(() => {

    if (editorRef.current) {

      editorRef.current.editor.setOptions({
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,


      });

    }

  }, []);








  function generateCustomSettingsFromHTML(htmlContent, cssContent) {


    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, "text/html");

    // Helper function to create a setting
    const createSetting = (type, label, id, defaultValue) => ({
      type: type,
      label: label,
      id: id,
      default: defaultValue || ""
    });

    const settings = [];

    // Recursive function to process elements
    const processElement = (el) => {
      const tagName = el.tagName.toLowerCase();
      let setting;

      // Get the element's ID and class list
      const elementId = el.id;
      const elementClassList = el.classList;

      // Determine the unique ID for the element
      let id = '';

      if (elementId && elementId.trim() !== '') {
        id = elementId; // Use ID if available and not empty
      } else if (elementClassList.length && elementClassList[0].trim() !== '') {
        id = elementClassList[0]; // Use the first class if ID is not available and class is not empty
      } else if (el.tagName.toLowerCase() === 'img' && el.src && el.src.trim() !== '') {
        // For images, use the last part of the src (e.g., filename)
        const srcParts = el.src.split('/');
        id = srcParts[srcParts.length - 1].split('.')[0]; // Extract filename without extension
      } else if (el.tagName.toLowerCase() === 'input' && el.name && el.name.trim() !== '') {
        // For input fields, use the name attribute if available
        id = el.name;
      } else if (el.tagName.toLowerCase() === 'input' && el.value && el.value.trim() !== '') {
        // Fallback to using the value attribute if name is not available
        id = el.value.replace(/\s+/g, '_'); // Replace spaces with underscores for a cleaner ID
      } else if (el.textContent.trim() !== '') {
        id = `${tagName}_section`; // Use tagName_section as a fallback for non-empty text content
      }

      // If the element has no meaningful content or ID, leave the ID as an empty string
      if (el.textContent.trim() === '' && !id) {
        id = ''; // Set id to empty string if no valid content or attributes exist
      }


      // Handle different HTML tags to create appropriate settings
      switch (tagName) {
        case 'img': // Image picker
          setting = createSetting('image_picker', 'Image', id, el.src);
          break;
        case 'h1': // Heading elements (Title)
        case 'h2':
        case 'h3':
        case 'h4':
        case 'h5':
        case 'h6':
          setting = createSetting(tagName, 'Text Content', id, el.textContent.trim());
          break;
        case 'p': // Paragraph elements (Description)
          setting = createSetting(tagName, 'Text Content', id, el.textContent.trim());
          break;
        case 'button': // Button elements
          setting = createSetting('text', 'Button Text', id, el.textContent.trim());
          break;
        case 'div': // Div elements (general block-level container)
          // Check if the div has immediate text content
          const immediateText = el.firstChild && el.firstChild.nodeType === 3;

          // If the div has immediate text content, assign it
          if (immediateText) {
            setting = createSetting('text', 'Div Content', id, el.firstChild.nodeValue.trim());
          } else {
            // Otherwise, it's likely a parent div or a div without direct text content, so assign an empty default
            setting = createSetting('text', 'Div Content', id, ''); // Default content for parent divs or inner divs
          }
          break;
        case 'a': // Anchor tags (Links)
          setting = createSetting('text', 'Link Text', id, el.textContent.trim());
          break;
        case 'input': // Input fields
          setting = createSetting('text', 'Input Value', id, el.value || '');
          break;
        case 'select': // Select dropdown
          setting = createSetting('text', 'Select Value', id, el.value || '');
          break;
        case 'textarea': // Textarea elements
          setting = createSetting('textarea', 'Textarea Content', id, el.value || '');
          break;
        default:
          // If the tag is not explicitly handled, create a general text setting
          setting = createSetting('text', `${tagName} Content`, id, el.textContent.trim());
      }

      // Add setting if it doesn't already exist
      if (setting && !settings.some(existingSetting => existingSetting.id === setting.id)) {
        settings.push(setting);
      }

      // If the element has child elements, process them recursively
      if (el.children.length > 0) {
        const childSettings = [];
        Array.from(el.children).forEach(child => {
          const childSettingsResult = processElement(child);
          if (childSettingsResult) {
            childSettings.push(childSettingsResult);
          }
        });
        // If child settings exist, nest them inside the parent element
        if (childSettings.length > 0) {
          setting.settings = childSettings; // Add nested settings as 'innerSettings'
        }
      }

      return setting;
    };

    // Start processing from the root element (document body)
    Array.from(doc.body.children).forEach(el => {
      const elementSettings = processElement(el);
      if (elementSettings) {
        settings.push(elementSettings);
      }
    });

    const finalSettings = [];
    finalSettings.push(settings[0]);

    return finalSettings;
  }








  const [schemaData, setschemaData] = React.useState('')
  const [liquidData, setliquidData] = React.useState('')


  function generateLiquidTemplateWithDynamicClassesAndIds(htmlContent, schema) {
    let liquidTemplate = '';
    let recursionDepth = 1;
    let recurLength = 1

    function processSettings(settings, htmlContent, parentKey = 'settings') {
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlContent, 'text/html');

      let template = '';

      settings.forEach((setting, index) => {

        recurLength++


        let currentParentKey = ''
        if (index > 0) {
          currentParentKey = ''
          parentKey = 'settings'
          currentParentKey = `${parentKey}${'.settings'.repeat(recursionDepth - 1)}.${setting.id}`;
          // console.log("currentParentKey inside--------------->", currentParentKey)
        }
        let uniqueKey = ''

        if (index == 0) {
          parentKey = 'settings'
          uniqueKey = `${parentKey}${'.settings'.repeat(recursionDepth - 1)}.${setting.id}`
        } else {
          uniqueKey = `${currentParentKey}`
        }

        console.log(recursionDepth, index, uniqueKey)

        // console.log(uniqueKey);





        // // Remove trailing dot if present
        // if (uniqueKey.endsWith('.')) {
        //   uniqueKey = uniqueKey.slice(0, -1);
        // }



        let elementById = null;
        let elementByClass = null;

        // Ensure valid ID
        const isValidId = setting.id && setting.id.trim() !== '';

        if (isValidId) {
          try {
            elementById = doc.querySelector(`#${setting.id}`);
            elementByClass = doc.querySelector(`.${setting.id}`);
          } catch (error) {
            console.warn(`Invalid selector for setting.id: ${setting.id}`, error);
          }
        }

        let attributes = '';
        if (elementById && elementByClass) {
          attributes = `id="${setting.id}" class="${setting.id}"`;
        } else if (elementById) {
          attributes = `id="${setting.id}"`;
        } else if (elementByClass) {
          attributes = `class="${setting.id}"`;
        }

        // Handle nested settings recursively
        if (setting.settings && Array.isArray(setting.settings)) {
          recursionDepth++;
          template += `<div ${attributes}>`;
          template += processSettings(setting.settings, htmlContent, uniqueKey);
          template += `</div>`;
        } else {
          console.log(setting.type)
          switch (setting.type) {
            case 'text':
            case 'textarea':
            case 'h1': // Heading elements (Title)
            case 'h2':
            case 'h3':
            case 'h4':
            case 'h5':
            case 'h6':
            case 'p':
            case 'div':
              template += `<${setting.type} ${attributes}>{{ ${uniqueKey} }}</${setting.type}>`;
              break;
            case 'image_picker':
              template += `<img ${attributes} src="{{ ${uniqueKey} }}" alt="${setting.label || 'Image'}">`;
              break;
            case 'button':
              template += `<button ${attributes}>{{ ${uniqueKey} }}</button>`;
              break;
            default:
              template += `<div ${attributes}>{{ ${uniqueKey} }}</div>`;
          }
        }
      });

      return template;
    }

    liquidTemplate += `<div class="settings-container">`;

    if (schema && Array.isArray(schema)) {
      liquidTemplate += processSettings(schema[0].settings, htmlContent);
    }

    liquidTemplate += `</div>`;
    if (recursionDepth === 0) {
      recursionDepth = 0;
    }

    if (recurLength === 0) {
      recurLength = 0;
    }
    return liquidTemplate;
  }









  const [renderedHtml, setRenderedHtml] = useState('');
  React.useEffect(() => {
    const engine = new Liquid();
    // Render the template with the provided data
    engine.parseAndRender(liquidData, schemaData)
      .then(result => {
        setRenderedHtml(result);
      })
      .catch(error => {
        console.error('Error rendering Liquid template:', error);
      });

  }, [liquidData])

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <div>
        <label htmlFor="schema-select">Select Element Type:</label>
        <select
          id="schema-select"
          value={htmlContent}
          onChange={generateFormElements}
        >
          <option value="">--Select--</option>
          {settingsConfig.map((option) => (
            <option key={option.type} value={option.type}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", gap: "20px" }}>

        <div style={{ flex: 1 }}>
          <h2>Live HTML Node Editor</h2>



          <AceEditor
            // mode="liquid"
            // theme="monokai"

            value={htmlContent}
            onChange={(newValue) => {
              setHtmlContent(newValue);
              showParser();
            }}
            name="HTMLTemplateEditor"
            editorProps={{ $blockScrolling: true }}
            height="300px"
            width="100%"

          />
        </div>
        <div style={{ flex: 1 }}>
          <h2>CSS Editor</h2>
          <AceEditor
            // mode="css"
            // theme="monokai"
            value={cssContent}
            onChange={(newValue) => {
              setCssContent(newValue);
            }}
            name="CSSTemplateEditor"
            editorProps={{ $blockScrolling: true }}
            height="300px"
            width="100%"

          />
        </div>
        <div style={{ flex: 1 }}>
          <h2>JS Editor</h2>

          <AceEditor

            // mode="javascript"
            theme="monokai"
            value={code}
            onChange={handleCodeChange}
            onValidate={handleValidationError}
            name="CodeEditor"
            editorProps={{ $blockScrolling: true }}
            height="300px"
            width="100%"
            ref={editorRef}

          />

          {/* Display errors and hints */}
          <div style={{ color: 'red', marginTop: '10px' }}>
            {errorMessages.length > 0 ? (
              <ul>
                {errorMessages.map((msg, index) => (
                  <li key={index}>{msg}</li>
                ))}
              </ul>
            ) : (
              <p>No syntax errors detected.</p>
            )}
          </div>
          {isUserInactive && <p>User has been inactive for 5 minutes, executing code...</p>}
        </div>
      </div>

      {/* Preview Section below the editors */}
      <div>
        <style id="dynamic-css">{cssContent}</style>
        <h3>Preview:</h3>
        <div id="html-preview">{htmlContent && showParser()}</div>
      </div>

      <button onClick={async () => {

        try {

          const apiUrl = `${process.env.REACT_APP_API_URL}/capture-content/`;
            const response = await axios.post(apiUrl, {
              html: htmlContent,
            css: cssContent,
            js: code,
            selectedCustomer:selectedCustomer,
            shop:localStorage.getItem("shopParams")
            },{headers:{'ngrok-skip-browser-warning': 'true'}});

          
          console.log('Content captured:', response.data);
        } catch (error) {
          console.error('Error capturing content:', error);
        }

      }}>Generate App Block</button>

      <div style={{ padding: '20px' }}>
        <h1>Schema Structure</h1>
        <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
          {JSON.stringify(schemaData, null, 2)}
        </pre>
        <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
          <div dangerouslySetInnerHTML={{ __html: renderedHtml }} />
        </pre>
      </div>
    </div>

  );
};

export default SnippetEditorWithNodes;
