import axios from 'axios';
import React, { Fragment } from 'react';
const ShowHideSlider = ({shopId, selectedCustomer }) => {
    const [message, setMessage] = React.useState("")
    const [showSlider, setshowSlider] = React.useState(true)

    const toggleSlider = async ()=>{
        
         let res = await showHide()

        if (res == "As the Customer Visits the page the tracker would be active" || res == 'The Tracking is Active'){
            setshowSlider(!showSlider)
        }
    }
    const showHide = async () => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/track-activity-page-view/`, // URL of your Django API
                { showSlider: showSlider, shopid:shopId, customerId:selectedCustomer }, // Send shop as JSON body
                { headers: { "Content-Type": "application/json",'ngrok-skip-browser-warning': 'true', } } // Ensure JSON header
            );

                console.log(response.data.message)
                setMessage(response.data.message)

                return response.data.message
            
        } catch (error) {
            console.error("Error installing script:", error);
            setMessage("Error installing script")
        }
    };

  
  

    return (

        <Fragment>
{showSlider ? <button 
    onClick={toggleSlider} 
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
    Hide Slider
</button>: <button 
    onClick={toggleSlider} 
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
    Show Slider
</button>}

            {message && <p>{message}</p>}
        </Fragment>


    );
};

export default ShowHideSlider;