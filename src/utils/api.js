





import axios from "axios";

export const checkInstallation = async (shopDomain) => {
  

  if (!shopDomain) {
    console.error("Shop parameter is missing in the URL.");
    return;
  }

  try {
    const response = await axios.post(
      "https://smart-tailor.onrender.com/check-installation/", // URL of your Django API
      { shop: shopDomain }, // Send shop as JSON body
      { headers: { "Content-Type": "application/json" } } // Ensure JSON header
    );

    return response.data
  } catch (error) {
    console.error("API call failed:", error.response?.data || error.message);
  }
};
