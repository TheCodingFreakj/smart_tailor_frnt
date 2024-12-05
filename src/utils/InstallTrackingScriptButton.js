import axios from 'axios';
import React, { Fragment } from 'react';
const InstallTrackingScriptButton = ({ addCustInfo, shopId }) => {
    const [message, setMessage] = React.useState("")
    const installScript = async () => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/shopify/product-recommendations/`, // URL of your Django API
                { shopId: shopId, action: "install_script" }, // Send shop as JSON body
                { headers: { "Content-Type": "application/json",'ngrok-skip-browser-warning': 'true', } } // Ensure JSON header
            );

            console.log(response.data)
            if (response.data.success) {
                setMessage("Tracker Installed Successfully")
            }
        } catch (error) {
            console.error("Error installing script:", error);
            setMessage("Error installing script")
        }
    };

  
    const addCustomerCode = async () => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/shopify/add-customer-code/`, // URL of your Django API
                { shopId: shopId}, // Send shop as JSON body
                { headers: { "Content-Type": "application/json",'ngrok-skip-browser-warning': 'true' } } // Ensure JSON header
            );

            console.log(response.data)
            if (response.data.success) {
                setMessage("Customer Info Installed Successfully")
            }
        } catch (error) {
            console.error("Error installing script:", error);
            setMessage("Error installing script")
        }
    };


    return (

        <Fragment>

            {addCustInfo ? <button onClick={addCustomerCode} className="btn btn-primary">
                Add Customer Info
            </button> : <button onClick={installScript} className="btn btn-primary">
                Install Tracking Script
            </button>}

            {message && <p>{message}</p>}
        </Fragment>


    );
};

export default InstallTrackingScriptButton;
