import axios from 'axios';
import React, { Fragment } from 'react';
const ShowHideSlider = ({shopId }) => {
    const [message, setMessage] = React.useState("")
    const [showSlider, setshowSlider] = React.useState(true)

    const toggleSlider = async ()=>{
        setshowSlider(!showSlider)
        await showHide()
    }
    const showHide = async () => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/track-activity-page-view/`, // URL of your Django API
                { showSlider: showSlider }, // Send shop as JSON body
                { headers: { "Content-Type": "application/json",'ngrok-skip-browser-warning': 'true', } } // Ensure JSON header
            );

            console.log(response.data)
            if (response.data.success) {
                setMessage("Previous Trackers Cleared Successfully")
            }
        } catch (error) {
            console.error("Error installing script:", error);
            setMessage("Error installing script")
        }
    };

  
  

    return (

        <Fragment>
{showSlider == true ? <button 
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
    Hide Slider
</button>}

            {message && <p>{message}</p>}
        </Fragment>


    );
};

export default ShowHideSlider;