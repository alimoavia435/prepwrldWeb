import React from 'react'
import {Navigate, useLocation} from "react-router-dom"

const ProtectedRoute = ({children}) => {
    let user = localStorage.getItem("tokendev")
    let location = useLocation();

    if(!user) {
        return <Navigate to="/kyc-info" state={{ from: location}} replace />
    }
 return children

};

export default ProtectedRoute;