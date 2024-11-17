import axios from "axios";

export const checkInstallation = async (shopDomain) => {
  try {
    const response = await axios.get(`https://smart-tailor.onrender.com/check-installation/`, {
      params: { shop: shopDomain },
    });
    return response.data.installed;
  } catch (error) {
    return false; // Default to false if the API call fails
  }
};