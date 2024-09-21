import { Outlet, Navigate } from "react-router-dom"
import AuthenticationContext from "./AuthenticationProvider";
import React, { useContext } from "react";

const LoggedInYes = () => {
    
    const { isLoggedIn } = useContext(AuthenticationContext)
    console.log(isLoggedIn)
    let auth = {"session" : isLoggedIn}
   
    
    return(
        auth.session ? <Navigate to="/" /> : <Outlet />
    )
}

export default LoggedInYes