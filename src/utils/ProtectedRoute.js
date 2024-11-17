
import {useNavigate } from 'react-router-dom';

const ProtectedRoute = ({isInstalled, params,firstTime, children }) => {

    console.log(isInstalled,firstTime)
    console.log(params.has("shop"))


const navigate = useNavigate();


if(!params.has("shop")){
    navigate("/error")
}else if(!isInstalled){
    navigate("/error")
}else{
    navigate("/dashboard")
}
  // Render the child component if installed
  return children;
};

export default ProtectedRoute;
