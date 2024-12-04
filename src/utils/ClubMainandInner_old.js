import React, { useState } from "react";
import AceEditor from "react-ace";
import ReactHtmlParser from 'html-react-parser'
import "ace-builds/src-noconflict/mode-liquid";
import "ace-builds/src-noconflict/theme-monokai";

const SnippetEditorWithNodes = () => {
  const [htmlContent, setHtmlContent] = useState(`

    <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Theme Settings Form</title>
</head>
<body>
    <form id="themeSettingsForm">

      <div class="content">
            <p>This is a basic content section. It can have various attributes and nested elements.</p>
            
            <a href="https://www.example.com" target="_blank" title="Go to Example">Visit Example Website</a>

            <img src="https://via.placeholder.com/150" alt="Placeholder Image" width="150" height="150">

            <div class="nested-content">
            <h2>Nested Content</h2>
            <p>This section is nested inside a div with a background color.</p>
            
            <ul>
                <li>First item</li>
                <li>Second item</li>
                <li>Third item</li>
            </ul>
            
            <button onclick="alert('Button clicked!')" style="padding: 10px; background-color: #4CAF50; color: white; border: none;">Click Me</button>
            </div>
        </div>

        <div class="alert">
            <p><strong>Note:</strong> This is a content replacer alert with a background color.</p>
        </div>

        <footer>
            <p>Contact us at <a href="mailto:support@example.com">support@example.com</a></p>
        </footer>
        </div>

     <!-- Button -->
    <button onClick>Save Settings</button>

      </form>

      </body>
</html>
  `);

  function identifySettingType(element) {
    // Check for input types
    if (element.tagName === "INPUT") {
        const inputType = element.getAttribute("type").toLowerCase();
        if (inputType === "text") {
            return "text";
        } else if (inputType === "checkbox") {
            return "checkbox";
        } else if (inputType === "file") {
            return "file";
        } else if (inputType === "radio") {
            return "radio";
        } else if (inputType === "range") {
            return "range";
        }
    }

    // Check for select dropdowns
    if (element.tagName === "SELECT") {
        return "select";
    }

    // Check for textarea elements
    if (element.tagName === "TEXTAREA") {
        return "textarea";
    }

    // Check for a button element
    if (element.tagName === "BUTTON") {
        return "button";
    }

    // Check for custom elements like image pickers
    if (element.hasAttribute("data-type")) {
        const dataType = element.getAttribute("data-type").toLowerCase();
        if (dataType === "image_picker") {
            return "image_picker";
        } else if (dataType === "url") {
            return "url";
        } else if (dataType === "collection_picker") {
            return "collection_picker";
        }
    }

    return "unknown"; // Default for unrecognized types
}
  
const parseAndIdentify = (htmlString) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");

  // Get all elements and identify their types
  const elements = doc.querySelectorAll('*');
  const elementTypes = Array.from(elements).map(element => ({
    tag: element.tagName,
    type: identifySettingType(element),
  }));

 console.log(elementTypes)
};


  return (
    <div>
      <h2>Live HTML Node Editor</h2>
      <AceEditor
        mode="liquid"
        theme="monokai"
        value={htmlContent}
        onChange={setHtmlContent}
        name="HTMLTemplateEditor"
        editorProps={{ $blockScrolling: true }}
        height="300px"
        width="100%"
      />
    

      <button onClick={()=> parseAndIdentify(htmlContent)}>Schema</button>
    </div>
  );
};

export default SnippetEditorWithNodes;
