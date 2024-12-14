import axios from 'axios';
import React, { Fragment } from 'react';
const RemoveAll = ({shopId }) => {
    const [message, setMessage] = React.useState("")
    const removeAll = async () => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/shopify/product-recommendations/`, // URL of your Django API
                { shopId: shopId, action: "remove_script" }, // Send shop as JSON body
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

  
  

    return (

        <Fragment>
<button 
    onClick={removeAll} 
    style={{
        backgroundColor: "#007bff",
        color: "#fff",
        padding: "10px 20px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "16px"
    }}
>
    Clear Scripts
</button>

            {message && <p>{message}</p>}
        </Fragment>


    );
};

export default RemoveAll;