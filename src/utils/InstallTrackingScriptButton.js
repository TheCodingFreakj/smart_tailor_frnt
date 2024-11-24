import axios from 'axios';
import React, { Fragment } from 'react';
const InstallTrackingScriptButton = ({ shopId }) => {
    const [message, setMessage] = React.useState("")
    const installScript = async () => {
        try {
            const response = await axios.post(
                "https://smart-tailor.onrender.com/shopify/product-recommendations/", // URL of your Django API
                { shopId: shopId, action:"install_script" }, // Send shop as JSON body
                { headers: { "Content-Type": "application/json" } } // Ensure JSON header
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

    return (

        <Fragment>
            <button onClick={installScript} className="btn btn-primary">
                Install Tracking Script
            </button>
            {message && <p>{message}</p>}
        </Fragment>


    );
};

export default InstallTrackingScriptButton;
