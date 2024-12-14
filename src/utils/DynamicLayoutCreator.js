import React, { useState, useEffect, Fragment } from "react";
import "./ProductCard.css";
import { Typography } from "@mui/material";
import BaseComponent from "./BaseComponent";
import ScriptRemovalButton from "./ScriptRemovalButton";
import InstallTrackingButton from "./InstallScript";
import RemoveAll from "./RemoveAll";
import axios from "axios";
import ShowHideSlider from "./showSlider";

const ProductCard = ({ selectedCustomer }) => {
  // State variables for product card features
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("M");
  const [color, setColor] = useState("Red");
  const [customText, setCustomText] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [wishlist, setWishlist] = useState(false);
  const [rating, setRating] = useState(0);
  const [shippingMethod, setShippingMethod] = useState("Standard");
  const [isGift, setIsGift] = useState(false);

  // State to manage product fields and loading
  const [fields, setFields] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch product data
  const fetchProductData = async (selectedCustomer) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/products/`, {
        params: {
          customer: selectedCustomer,
          shop: localStorage.getItem("shopParams"),
        },
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
      });

      console.log(response)

      setFields(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching product data:", error);
      setLoading(false);
    }
  };

  // Effect to fetch data on component mount
  useEffect(() => {
    fetchProductData(selectedCustomer);
  }, [selectedCustomer]);

  // Combine states into a single object to pass to BaseComponent
  const sharedFields = {
    quantity,
    size,
    color,
    customText,
    promoCode,
    wishlist,
    rating,
    shippingMethod,
    isGift,
  };

  const setSharedFields = {
    setQuantity,
    setSize,
    setColor,
    setCustomText,
    setPromoCode,
    setWishlist,
    setRating,
    setShippingMethod,
    setIsGift,
  };

  return (
    <Fragment>

      <Typography variant="h6" gutterBottom>
        Script Management
      </Typography>

      <div style={{display:"flex", justifyContent:"flex-start"}}>

        <div >
        <InstallTrackingButton shopId={localStorage.getItem("shopParams")} identifier={"slider"} />
        </div>

        <div style={{marginLeft:"20px"}}>
        <ScriptRemovalButton shopId={localStorage.getItem("shopParams")}/>
        </div>

        <div style={{ marginLeft: "20px" }}>
                <RemoveAll shopId={localStorage.getItem("shopParams")} />
            </div>

            <div style={{ marginLeft: "20px" }}>
                <ShowHideSlider shopId={localStorage.getItem("shopParams")} />
            </div>
      </div>

      
      
      <div className="product-card-container">
        <div className="product-card">

          {/* Size and Color Selection */}
          <div className="size-color-selection">
            <div>
              <label>Font Size:</label>
              <select value={size} onChange={(e) => setSize(e.target.value)}>
                <option value="S">Small</option>
                <option value="M">Medium</option>
                <option value="L">Large</option>
              </select>
            </div>
            <div>
              <label>Font Color:</label>
              <select value={color} onChange={(e) => setColor(e.target.value)}>
                <option value="Red">Red</option>
                <option value="Blue">Blue</option>
                <option value="Green">Green</option>
              </select>
            </div>
          </div>

          {/* Personalization */}
          <div className="personalization">
            <label>Custom Text (optional):</label>
            <input
              type="text"
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              placeholder="Enter custom text"
            />
          </div>

          {/* Promo Code */}
          <div className="promo-code">
            <label>Promo Code:</label>
            <input
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="Enter promo code"
            />
          </div>

          {/* Wishlist */}
          <button onClick={() => setWishlist(!wishlist)} className="wishlist-button">
            {wishlist ? "Remove from Wishlist" : "Add to Wishlist"}
          </button>

          {/* Rating */}
          <div className="rating">
            <label>Rating:</label>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={star <= rating ? "star-filled" : "star-empty"}
                onClick={() => setRating(star)}
              >
                ★
              </span>
            ))}
          </div>

          {/* Cart Action */}
          <button className="add-to-cart">Add to Cart</button>

          {/* Shipping Preferences */}
          <div className="shipping-method">
            <label>Shipping Method:</label>
            <select
              value={shippingMethod}
              onChange={(e) => setShippingMethod(e.target.value)}
            >
              <option value="Standard">Standard</option>
              <option value="Express">Express</option>
              <option value="Overnight">Overnight</option>
            </select>
          </div>

          {/* Gift Options */}
          <div className="gift-options">
            <label>
              <input type="checkbox" checked={isGift} onChange={() => setIsGift(!isGift)} />
              Add Gift Wrapping
            </label>
            {isGift && (
              <input
                type="text"
                placeholder="Add a gift note"
                className="gift-note"
              />
            )}
          </div>
        </div>

        {/* Display BaseComponent */}
        <div className="product-cards">
          <BaseComponent fields={fields ? fields : ""} selectedCustomer={selectedCustomer} />
        </div>
      </div>

    </Fragment>

  );
};

export default ProductCard;
