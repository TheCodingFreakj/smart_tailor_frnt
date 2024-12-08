import React, { useState } from 'react';
import './BaseComponent.css';
import axios from 'axios'

const BaseComponent = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editableTitle, setEditableTitle] = useState('');
  const [editableDescription, setEditableDescription] = useState('');
  const [editableMinPrice, setEditableMinPrice] = useState(0);
  const [editableMaxPrice, setEditableMaxPrice] = useState(0);
  const [editableButtonText, setEditableButtonText] = useState('View Product');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [editableTitleColor, setEditableTitleColor] = useState('#000000');
  const [editableDescriptionColor, setEditableDescriptionColor] = useState('#000000');
  const [editableButtonTextColor, setEditableButtonTextColor] = useState('#000000');

  const [editableButtonBgColor, setEditableButtonBgColor] = useState('#ffffff');
  const [colorTarget, setColorTarget] = useState('title'); // Default target for color picker
  console.log(props.fields, props.fields.title, editableTitle)
  const [cssContent, setcssContent] = useState(`.fancy-product-card {
  width: 100%;
  max-width: 400px;
  margin: 20px auto;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

.card-image {
  width: 100%;
  overflow: hidden;
}

.product-image {
  width: 100%;
  display: block;
  border-bottom: 1px solid #ddd;
}

.card-content {
  padding: 15px;
  text-align: center;
}

.product-title {
  font-size: 20px;
  font-weight: bold;
  margin: 10px 0;
  color: #333;
}

.product-description {
  font-size: 14px;
  color: #666;
  margin: 10px 0;
}

.product-details {
  font-size: 14px;
  color: #555;
  margin: 15px 0;
}

.detail-item {
  display: block;
  margin-bottom: 5px;
}

.action-button {
  padding: 10px 20px;
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.action-button:hover {
  filter: brightness(0.9);
}`)
  const cardRef = React.useRef(null); // Reference to the card for parsing

  const [parsedData, setParsedData] = useState(null);
  // Update state when props.fields is defined or changes
  React.useEffect(() => {
    if (props.fields) {
      setEditableTitle(props.fields.title || '');
      setEditableDescription(props.fields.description || '');
      setEditableMinPrice(props.fields.min_price || 0);
      setEditableMaxPrice(props.fields.max_price || 0);
    }
  }, [props.fields]);

  // Toggle edit mode
  const toggleEditMode = () => {
    if (isEditing) {
      console.log('Saved Data:', editableTitle, editableDescription, editableMinPrice, editableMaxPrice, editableButtonText, bgColor);

    }
    setIsEditing(!isEditing);
  };

  // Handle color change based on the selected target
  const handleColorChange = (e) => {
    const value = e.target.value;
    switch (colorTarget) {
      case 'title':
        setEditableTitleColor(value);
        break;
      case 'description':
        setEditableDescriptionColor(value);
        break;
      case 'button-text':
        setEditableButtonTextColor(value);
        break;
      case 'button-bg':
        setEditableButtonBgColor(value);
        break;
      case 'card':
        setBgColor(value);
        break;
      default:
        break;
    }


  };
  // Re-parse the HTML after style changes
  React.useEffect(() => {
    if (!isEditing) {
      reParseHTML();
    }
  }, [bgColor, editableTitleColor, editableDescriptionColor, editableButtonTextColor, editableButtonBgColor]);

  // Function to re-parse HTML and update inline styles
  const reParseHTML = () => {
    const cardElement = cardRef.current;
    if (cardElement) {
      let html = cardElement.innerHTML;
      const childElements = cardElement.querySelectorAll('*');

      childElements.forEach((element) => {
        const computedStyles = window.getComputedStyle(element);
        const inlineStyles = element.getAttribute('style') || '';
        const combinedStyles = {
          ...getStylesFromString(inlineStyles),
          backgroundColor: computedStyles.backgroundColor,
          color: computedStyles.color,
        };
        const styleString = Object.entries(combinedStyles)
          .map(([key, value]) => `${key}: ${value};`)
          .join(' ');
        element.setAttribute('style', styleString);
      });

      html = cardElement.innerHTML;
      setParsedData(html); // Store the updated HTML
    }
  };

  // Helper function to convert inline style string into a JavaScript object
  const getStylesFromString = (styleString) => {
    if (!styleString) return {};
    return styleString.split(';').reduce((styles, style) => {
      if (style.trim()) {
        const [property, value] = style.split(':');
        if (property && value) {
          styles[property.trim()] = value.trim();
        }
      }
      return styles;
    }, {});
  };

  const sendDataHtml = async () => {
    try {

      const response = await axios.post(`${process.env.REACT_APP_API_URL}/capture-content/`, {
        html: parsedData, // Send the HTML content
      
          customer: props.selectedCustomer,
          shop: localStorage.getItem("shopParams"),
      
       
      },{ headers: { "Content-Type": "application/json", 'ngrok-skip-browser-warning': 'true', } });
      console.log('HTML successfully sent to backend:', response.data);
    } catch (error) {
      console.error('Error sending HTML to backend:', error);
    }
  }
  const parseCSS = (cssString) => {
    const styleObject = {};
    const rules = cssString.split('}').filter(Boolean); // Split rules by '}'

    rules.forEach((rule) => {
      const [selector, styles] = rule.split('{');
      if (!selector || !styles) return; // Skip invalid rules

      const styleKey = selector
        .trim()
        .replace('.', '') // Remove the '.' from class names
        .replace(/-([a-z])/g, (_, letter) => letter.toUpperCase()); // Convert to camelCase

      const styleProps = styles.trim().split(';').filter(Boolean); // Split styles by ';'

      styleObject[styleKey] = styleProps.reduce((acc, prop) => {
        const [key, value] = prop.split(':').map((str) => str.trim());
        if (key && value) {
          const camelCaseKey = key.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase()); // Convert CSS keys to camelCase
          acc[camelCaseKey] = value;
        }
        return acc;
      }, {});


    });


    return styleObject;
  };


  const styles = parseCSS(cssContent);
  console.log(styles.productImage)
  const [isFontColorEditing, setIsFontColorEditing] = useState(false);
  const [cardWidth, setCardWidth] = useState('')
  const [cardHeight, setCardHeight] = useState('')
  const [fontSize, setFontSize] = useState('')
  const [fontStyle, setFontStyle] = useState('')
  const toggleFontColorMode = () => {
    setIsFontColorEditing(!isFontColorEditing);
  };
  return (
    <div className='container'>
      {/* Left Side Content */}
      <div className='leftContent'>
        {/* Edit Button */}
        <button onClick={toggleEditMode} className="edit-button">
          {isEditing ? 'Save' : 'Edit'}
        </button>

        {/* Color Picker, Font Settings, and Card Size Selector */}
        {isEditing && (

          <div>
            <button className="edit-button" onClick={toggleFontColorMode}>
              {isFontColorEditing ? 'Stop Font/Color Editing' : 'Edit Font/Color/Size'}
            </button>
            <div className="customization-bar">
              {isFontColorEditing && <div className="color-picker-bar">
                <label className="color-picker-label">
                  Customize:
                  <select
                    className="color-target-selector"
                    value={colorTarget}
                    onChange={(e) => setColorTarget(e.target.value)}
                  >
                    <option value="title">Title</option>
                    <option value="description">Description</option>
                    <option value="button-text">Button Text</option>
                    <option value="button-bg">Button Background</option>
                    <option value="card">Card Background</option>
                  </select>
                </label>
                <input
                  type="color"
                  className="color-picker"
                  value={
                    colorTarget === 'title'
                      ? editableTitleColor
                      : colorTarget === 'description'
                        ? editableDescriptionColor
                        : colorTarget === 'button-text'
                          ? editableButtonTextColor
                          : colorTarget === 'button-bg'
                            ? editableButtonBgColor
                            : bgColor
                  }
                  onChange={handleColorChange}
                />
              </div>}

              {isFontColorEditing && (
                <div>          {/* Font Size Selector */}
                  <div className="font-size-selector">
                    <label>Font Size:</label>
                    <select
                      value={fontSize}
                      onChange={(e) => setFontSize(e.target.value)}
                    >
                      <option value="small">Small</option>
                      <option value="medium">Medium</option>
                      <option value="large">Large</option>
                    </select>
                  </div>

                  {/* Font Style Selector */}
                  <div className="font-style-selector">
                    <label>Font Style:</label>
                    <select
                      value={fontStyle}
                      onChange={(e) => setFontStyle(e.target.value)}
                    >
                      <option value="normal">Normal</option>
                      <option value="italic">Italic</option>
                      <option value="bold">Bold</option>
                    </select>
                  </div>

                  {/* Card Size Input */}
                  <div className="card-size-selector">
                    <label>Card Width (px):</label>
                    <input
                      type="number"
                      value={cardWidth}
                      onChange={(e) => setCardWidth(e.target.value)}
                      min="100"  // minimum width
                      max="1000" // maximum width
                    />
                  </div>

                  <div className="card-size-selector">
                    <label>Card Width (px):</label>
                    <input
                      type="number"
                      value={cardHeight}
                      onChange={(e) => setCardHeight(e.target.value)}
                      min="100"  // minimum width
                      max="1000" // maximum width
                    />
                  </div></div>)}


            </div>
          </div>
        )}

        <div className="ref-container" ref={cardRef}>
          <div
            id="fancy-product-card"
            style={{
              ...styles.fancyProductCard,
              backgroundColor: bgColor,
              width: `${cardWidth}px`, // User-defined card width
              height: `${cardHeight}px`
            }}
          >
            <div style={styles.cardImage}>
              <img
                id="product-image"
                src="https://via.placeholder.com/300x200"
                alt="Product"
                style={styles.productImage}
              />
            </div>
            <div style={styles.cardContent}>
              {/* Editable Title */}
              <h2
              id="product-title"
                style={{
                  ...styles.productTitle,
                  color: editableTitleColor,
                  fontSize: fontSize === 'small' ? '14px' : fontSize === 'medium' ? '18px' : '22px', // Font size adjustment
                  fontStyle: fontStyle, // Font style adjustment
                }}
              >
                {editableTitle}
              </h2>

              {/* Editable Description */}
              <p
              id="product-description"
                style={{
                  ...styles.productDescription,
                  color: editableDescriptionColor,
                  fontSize: fontSize === 'small' ? '12px' : fontSize === 'medium' ? '16px' : '20px', // Font size adjustment
                  fontStyle: fontStyle, // Font style adjustment
                }}
              >
                {editableDescription || 'No description available.'}
              </p>

              {/* Editable Price */}
              <div style={styles.productDetails}>
                <span  id="detail-items" style={styles.detailItem}>
                  <strong>Publications:</strong> {props.fields.publication_count}
                </span>
                <span id="detail-item" style={styles.detailItem}>
                  <strong>Price:</strong> {props.fields.currency}{' '}

                  {`${editableMinPrice} - ${editableMaxPrice}`}
                 
                </span>
              </div>

              {/* Editable Button */}
              <button
                className="action-button"
                style={{
                  ...styles.actionButton,
                  color: editableButtonTextColor,
                  backgroundColor: editableButtonBgColor,
                }}
              >
                {editableButtonText}
              </button>
            </div>
          </div>
        </div>

        <button className="edit-button" onClick={reParseHTML}>Parse Card Content</button>
      </div>

      {/* Right Side Content */}
      <div className='rightContent'>
        <div dangerouslySetInnerHTML={{ __html: parsedData }} />
        <button className="edit-button" onClick={sendDataHtml}>Add Design</button>
      </div>
    </div>



  );
};

export default BaseComponent;
