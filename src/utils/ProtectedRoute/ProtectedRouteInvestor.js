import React from 'react'
import {Navigate, useLocation} from "react-router-dom"

const ProtectedRouteInvestor = ({children}) => {
    let user = localStorage.getItem("token")
    let location = useLocation();

    if(!user) {
        return <Navigate to="/explore" state={{ from: location}} replace />
    }
 return children

};

export default  ProtectedRouteInvestor;