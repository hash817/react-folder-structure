import { Outlet, Navigate } from "react-router-dom"
import AuthenticationContext from "./AuthenticationProvider";
import React, { useContext } from "react";

const LoggedInNo = () => {
    
    const { isLoggedIn } = useContext(AuthenticationContext)
    console.log(isLoggedIn)
    let auth = {"session" : isLoggedIn}
   
    
    return(
        auth.session ? <Outlet /> : <Navigate to="/Login" />
    )
}

export default LoggedInNo