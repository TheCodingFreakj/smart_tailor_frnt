import React, { useState } from "react";
import AceEditor from "react-ace";

import { JSHINT } from 'jshint';
import { Liquid } from 'liquidjs';
// import 'ace-builds/src-noconflict/mode-javascript';
// import 'ace-builds/src-noconflict/mode-liquid';
// import 'ace-builds/src-noconflict/mode-css';


// import "ace-builds/src-noconflict/mode-liquid";
import "ace-builds/src-noconflict/theme-monokai";
// import 'ace-builds/src-noconflict/mode-css';
// import "ace-builds/src-noconflict/mode-javascript";
const SnippetEditorWithNodes = () => {

  const editorRef = React.useRef(null);


  const [htmlContent, setHtmlContent] = useState(`<div id=schema-holder> <div class="card">
    <img src="https://via.placeholder.com/300x200" alt="Card Image">
    <div class="card-content">
      <h3 class="card-title">Card Title</h3>
      <p class="card-description" id="card-description">
        This is a description of the card. It provides a brief overview of the content.
      </p>
      <button class="card-button" onclick="changeMessage()">Click Me</button>
    </div>
  </div> </div>`);





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
    console.log(typeof htmlContent)
    const cleanHtmlContent = htmlContent.replace(/,/g, '').trim();

    return <div dangerouslySetInnerHTML={{ __html: cleanHtmlContent }} />
  }

  console.log(htmlContent)


  const [cssContent, setCssContent] = useState(`    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f9;
      margin: 0;
      padding: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }

    .card {
      background-color: #fff;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      width: 300px;
      text-align: center;
    }

    .card img {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }

    .card-content {
      padding: 15px;
    }

    .card-title {
      font-size: 1.5rem;
      margin: 10px 0;
      color: #333;
    }

    .card-description {
      font-size: 1rem;
      color: #666;
      margin-bottom: 20px;
    }

    .card-button {
      display: inline-block;
      padding: 10px 20px;
      font-size: 1rem;
      color: #fff;
      background-color: #007bff;
      border: none;
      border-radius: 5px;
      text-decoration: none;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    .card-button:hover {
      background-color: #0056b3;
    }`);
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
  function generateCustomSettingsFromHTML(htmlContent) {
    
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlContent, "text/html");
  
      // Helper function to create a setting
      const createSetting = (type, label, id, defaultValue) => ({
          type: type,
          label: label,
          id: id,
          default: defaultValue || ""
      });
  
      // Helper function to check if the setting already exists
      const settingExists = (settings, setting) => {
          return settings.some(existingSetting => 
              existingSetting.type === setting.type && 
              existingSetting.label === setting.label && 
              existingSetting.default === setting.default
          );
      };
  
      const settings = [];
      let elementCount = 0;
  
      // Process all elements in the HTML document
      doc.body.querySelectorAll('*').forEach(el => {
          const tagName = el.tagName.toLowerCase();
          let setting;
  
          // Handle <img> elements (image picker)
          if (tagName === 'img') {
              setting = createSetting('image_picker', 'Image', `image_${elementCount}`, el.src);
              if (!settingExists(settings, setting)) {
                  settings.push(setting);
              }
          }
  
          // Handle <h1>, <h2>, <h3>, <h4>, <h5>, <h6> elements (text areas for titles)
          else if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(tagName)) {
              setting = createSetting('textarea', 'Text Content', `text_content_${elementCount}`, el.textContent.trim());
              if (!settingExists(settings, setting)) {
                  settings.push(setting);
              }
          }
  
          // Handle <p> (paragraph) elements (text areas for descriptions)
          else if (tagName === 'p') {
              setting = createSetting('textarea', 'Text Content', `text_content_${elementCount}`, el.textContent.trim());
              if (!settingExists(settings, setting)) {
                  settings.push(setting);
              }
          }
  
          // Handle <button> elements (buttons)
          else if (tagName === 'button') {
              setting = createSetting('text', 'Button Text', `button_${elementCount}`, el.textContent.trim());
              if (!settingExists(settings, setting)) {
                  settings.push(setting);
              }
          }
  
          // Increment element count for unique IDs
          elementCount++;
      });
  
      return settings;
  
  
}



function extractClassesAndIdsFromHtml(htmlTemplate) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlTemplate, 'text/html');
  
  let classes = [];
  let ids = [];

  // Extract class names (unique classes)
  const elementsWithClass = doc.querySelectorAll('[class]');
  elementsWithClass.forEach(element => {
    const elementClasses = element.classList;
    elementClasses.forEach(className => {
      if (!classes.includes(className)) {
        classes.push(className);
      }
    });
  });

  // Extract ids (unique ids)
  const elementsWithId = doc.querySelectorAll('[id]');
  elementsWithId.forEach(element => {
    const id = element.id;
    if (id && !ids.includes(id)) {
      ids.push(id);
    }
  });

  return { classes, ids };
}

const [schemaData, setschemaData] = React.useState('')
const [liquidData, setliquidData] = React.useState('')
function generateLiquidTemplateWithDynamicClassesAndIds(htmlTemplate, schema) {
  const { classes, ids } = extractClassesAndIdsFromHtml(htmlTemplate);
  let liquidTemplate = '';

  // Adding styles to the template
  let cssContent = classes.map(className => `.${className} {}`).join("\n");
  liquidTemplate += `<style>${cssContent}</style>`;

  // Add dynamic settings to the template
  liquidTemplate += `<div class="settings-container">`;
  if (schema) {
    schema.forEach(setting => {
      let settingHtml = '';

      // Generate HTML for each setting type, adding classes and ids dynamically
      switch (setting.type) {
        case 'text':
          settingHtml = `
            <div class="${setting.id} setting-text" id="${setting.id}">{{ settings.${setting.id} | default: "${setting.default}" }}</div>
          `;
          break;
        case 'textarea':
          settingHtml = `
            <div class="${setting.id} setting-textarea" id="${setting.id}">{{ settings.${setting.id} | default: "${setting.default}" }}</div>
          `;
          break;
        case 'image_picker':
          settingHtml = `
            <img src="{{ settings.${setting.id} | default: "${setting.default}" }}" alt="Image" class="${setting.id}">
          `;
          break;
        default:
          settingHtml = '';
      }

      liquidTemplate += settingHtml;
    });
  }
  liquidTemplate += `</div>`;

  return liquidTemplate;
}





const [renderedHtml, setRenderedHtml] = useState('');
React.useEffect(()=>{
  const engine = new Liquid();
        // Render the template with the provided data
    engine.parseAndRender(liquidData, schemaData)
    .then(result => {
      setRenderedHtml(result);
    })
    .catch(error => {
      console.error('Error rendering Liquid template:', error);
    });

},[liquidData])

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

      <button onClick={() => {

        const schema = generateCustomSettingsFromHTML(htmlContent);
        

        
        setschemaData(schema)
        console.log(schema)

        const liquidContent = generateLiquidTemplateWithDynamicClassesAndIds(htmlContent, schema);
        setliquidData(liquidContent)

        console.log(liquidContent)
       
        
      }}>Generate Schema</button>

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
