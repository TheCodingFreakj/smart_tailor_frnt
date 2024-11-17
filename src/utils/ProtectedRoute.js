
import {useNavigate } from 'react-router-dom';
import { checkInstallation } from '../utils/api';
import React from 'react';

const ProtectedRoute = ({ children }) => {
const [isInstalled, setIsInstalled] = React.useState(false);
  const shopDomain = new URLSearchParams(window.location.search).get("shop");

  const navigate = useNavigate();

  React.useEffect(() => {
    const verifyInstallation = async () => {
      const isInstalledVar = await checkInstallation(shopDomain);
      if (!isInstalled) {
        navigate("/error");
      }

      setIsInstalled(isInstalledVar)
    };

    if (shopDomain != null) {
      verifyInstallation();

    }else{
      navigate("/error");
    }


  }, [shopDomain, navigate]);

  // Render the child component if installed
  return children;
};

export default ProtectedRoute;
