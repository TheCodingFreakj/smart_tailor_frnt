





import axios from "axios";

export const checkInstallation = async (shopDomain,code) => {
  // https://smart-tailor.onrender.com/check-installation/
  try {
    const response = await axios.post(
      "https://smart-tailor.onrender.com/check-installation/", // URL of your Django API
      { shop: shopDomain, code:code }, // Send shop as JSON body
      { headers: { "Content-Type": "application/json" } } // Ensure JSON header
    );

    return response.data
  } catch (error) {
    console.error("API call failed:", error.response?.data || error.message);
  }
};
