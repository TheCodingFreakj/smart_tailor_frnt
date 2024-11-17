import  { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { checkInstallation } from "./api";

const ProtectedRoute = ({ children, shopDomain }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const verifyInstallation = async () => {
      const isInstalled = await checkInstallation(shopDomain);
      if (!isInstalled) {
        navigate("/error");
      }
    };

    if (shopDomain != null){
        verifyInstallation();

    }

    
  }, [shopDomain, navigate]);

  return children; // Render the protected component if installed
};

export default ProtectedRoute;
