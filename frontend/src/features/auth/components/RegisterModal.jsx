import React, { useState, useContext, useCallback } from "react";

// React Bootstrap
import { Modal } from "react-bootstrap";

import EmailButton from "./email-button.jsx";
import EmailModal from "./register-modal-email.jsx";
import GoogleLoginButton from "./google-button.jsx";
import AccountText from "./account-text.jsx";

// Axios
import { auth } from "../api/auth.jsx";

import { GoogleLogin } from "@react-oauth/google";

import EnterUsername from "./enter-username.jsx";

import AuthenticationContext from "../../../utils/AuthenticationProvider.jsx";

function RegisterModal({ onClick }) {
  const [showButtons, setShowButtons] = useState(true);
  const [showGoogleRegistration, setShowGoogleRegistration] = useState(false);
  const { idTokenRef } = useContext(AuthenticationContext);

  const handleButtonFalse = useCallback(() => {
    setShowButtons(false);
  }, []);

  const handleButtonTrue = useCallback(() => {
    setShowButtons(true);
  }, []);

  const handleGoogleSuccess = (credentialResponse) => {
    console.log(credentialResponse);
    idTokenRef.current = credentialResponse.credential;
    auth.CheckGoogleAccountExist({ idToken: idTokenRef.current })
      .then((response) => {
        console.log(response);
        if (response.success === "USER_LOGGED_IN") {
          location.reload();
        } else {
          setShowButtons(false);
          setShowGoogleRegistration(true);
        }
      });
  };

  const handleGoogleRegistration = (username, buttonRef) => {
    auth.registerGoogle({ id_token: idTokenRef.current, username: username })
      .then((response) => {
        console.log(response);
        buttonRef.current.disabled = true;
        // Handle successful registration (e.g., redirect or show success message)
      })
      .catch((error) => {
        if (error.response.data["Error"] === "USER_EXIST") {
          // Handle username already exists error
          console.error("Username already exists");
          // You might want to set an error state here and display it in the form
        }
      });
  };

  return (
    <div>
      <h1 className="tw-text-center tw-mb-4 tw-text-3xl tw-font-bold">
        Register
      </h1>
      {showButtons && (
        <>
          <div className="tw-flex tw-justify-center pb-3">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => {
                console.log("Login Failed");
              }}
              width="350"
            />
          </div>
          <EmailButton onClick={handleButtonFalse} />
          <AccountText
            text="Already have an account?"
            link="Log in"
            className="mt-5"
            onClick={onClick}
          />
        </>
      )}
      {showGoogleRegistration && (
        <EnterUsername
          onSubmit={handleGoogleRegistration}
          buttonText="Create my Google account"
          minLength={6}
          isGoogleRegistration={true}
        />
      )}
      {!showButtons && !showGoogleRegistration && (
        <EmailModal onClick={handleButtonTrue} />
      )}
    </div>
  );
}

export default RegisterModal;