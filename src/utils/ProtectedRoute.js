
import {useNavigate } from 'react-router-dom';

const ProtectedRoute = ({isInstalled, params, children }) => {

    console.log(isInstalled)
    console.log(params.has("shop"))


const navigate = useNavigate();

if(params.has("shop") || !isInstalled){

    navigate("/error")

}
  // Render the child component if installed
  return children;
};

export default ProtectedRoute;
