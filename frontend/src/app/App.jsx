// React hooks
import React, { useState, useEffect, useContext } from "react";

// Components
import Navbars from "../components/Navbar.jsx";
import CreateListing from "../components/CreateListing.jsx";
import Register from "./pages/auth/Register.jsx";
import Login from "./pages/auth/Login.jsx";
import Home from "../components/Home.jsx";
import Profile from "../components/Profile.jsx";
import ResetPassword from "../components/ResetPassword.jsx";
import OthersProfile from "../components/OthersProfile.jsx";
import Footer from "../components/Footer.jsx";
import Activate from "../components/Activate.jsx";
import AuthenticationContext, {AuthenticationProvider} from "../utils/AuthenticationProvider.jsx";
import GoogleLogin from "../features/auth/components/google-login.jsx";
// CSS

import "../index.css";

// React router dom
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoggedInYes from "../utils/LoggedInYes.jsx";
import LoggedInNo from "../utils/LoggedInNo.jsx";

import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { GoogleOAuthProvider } from '@react-oauth/google';
// Axios
import Axios from "axios";
//import { auth } from "./features/auth/services/auth.jsx";


Axios.defaults.baseURL = "http://localhost/api/";

function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(() => {
  //   // this callback function determines the initial value of isLoggedIn
  //   const LoggedInState = localStorage.getItem("LoggedIn");
  //   return LoggedInState === "true"; //if LoggedInState == true then is true if not then is false
  // });

  // const [isLoggedIn, setIsLoggedIn] = useState(() => {
  //   auth
  //     .validateUser()
  //     .then((response) => {
  //       console.log(response.status);
  //       setIsLoggedIn(true)
  //     })
  //     .catch((error) => {
  //       console.log(error.response.status);
  //       setIsLoggedIn(false)
  //     });
  // });
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { isLoggedIn, isLoading } = useContext(AuthenticationContext);

  if (isLoading) {
    return <div>Loading...</div>; // or any loading indicator you prefer
  }
  console.log(isLoggedIn)
  return (
    <div className="App">
      <div className="content">
      <GoogleOAuthProvider clientId="5697968452-qq3mdbceiqokeeia1ovgtomipl3qslqh.apps.googleusercontent.com">
        <GoogleReCaptchaProvider reCaptchaKey="6LfNFOkpAAAAAFUhpMlcP6nAl45UrKkmupJTN8qR">
          {/* <AuthenticationContext.Provider value={{ isLoggedIn, setIsLoggedIn }}> */}
          
           
            <Router>
            <AuthenticationProvider>
              <Navbars isLoggedIn={isLoggedIn} />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/reset_password" element={<ResetPassword />} />
                <Route path="/Profile" element={<Profile />} />
                <Route path="/googletest" element={<GoogleLogin />} />
                {/* onLogout={handleLogout} */}
                <Route path="/Profile/:id" element={<OthersProfile />} />

                <Route element={<LoggedInYes />}>
                  <Route path="/Register" element={<Register />} />
                  <Route path="/Login" element={<Login />} />
                  <Route path="/Activate/:uid/:token" element={<Activate />} />
                  {/* <Route path="/LoginModal" element={<LoginModal />} /> */}
                </Route>

                <Route element={<LoggedInNo />}>
                  <Route path="/CreateListing" element={<CreateListing />} />
                </Route>
              </Routes>
              </AuthenticationProvider>
            </Router>
          {/* </AuthenticationContext.Provider> */}
          
        </GoogleReCaptchaProvider>
        </GoogleOAuthProvider>
      </div>
      <Footer />
    </div>
  );
}

export default App;
