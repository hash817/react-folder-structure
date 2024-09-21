import React, { useState, useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";

// React Bootstrap
import { Modal } from "react-bootstrap";

import AuthenticationContext from "../../../utils/AuthenticationProvider.jsx";

import EmailButton from "./email-button.jsx";
import EmailModal from "./login-modal-email.jsx";
import GoogleLoginButton from "./google-button.jsx";
import AccountText from "./account-text.jsx";

import { GoogleLogin } from "@react-oauth/google";
import { useGoogleLogin } from "@react-oauth/google";
// Axios
import axios from "axios";
import { auth } from "../api/auth.jsx";

function LoginModal({ onClick, handleClose }) {
  const [showButtons, setShowButtons] = useState(true);
  const { isLoggedIn, setIsLoggedIn, accessToken } = useContext(
    AuthenticationContext
  );
  const handleButtonFalse = useCallback(() => {
    setShowButtons(false);
  }, []);

  const handleButtonTrue = useCallback(() => {
    setShowButtons(true);
  }, []);
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => console.log(codeResponse),
    flow: "auth-code",
  });
  return (
    <div>
      <h1 className="tw-text-center tw-mb-4 tw-text-3xl tw-font-bold">Login</h1>
      {showButtons && (
        <>
          {/* <GoogleLoginButton onClick={auth.reachGoogle} /> */}
          <div className="tw-flex tw-justify-center pb-3">
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              console.log(credentialResponse);
              const id_token = credentialResponse.credential

              auth.loginGoogle({ id_token: id_token }).then((response) => {
                console.log(response);
                setIsLoggedIn(true);
                handleClose(true);
              });

            }}
            onError={() => {
              console.log("Login Failed");
            }}
            width="350"
          />
          </div>
          {/*<button onClick={() => login()}>Sign in with Google 🚀</button> */}
          <EmailButton onClick={handleButtonFalse} />
          <AccountText
            text="Don't have an account yet?"
            link="Create account"
            className="mt-5"
            onClick={onClick}
          />
        </>
      )}
      {!showButtons && (
        <EmailModal onClick={handleButtonTrue} handleClose={handleClose} />
      )}
    </div>
  );
}

export default LoginModal;
