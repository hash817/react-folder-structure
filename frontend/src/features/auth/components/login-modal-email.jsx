import React, { useState, useContext, useCallback } from "react";
import {
  FloatingLabel,
  Button,
  Col,
  Row,
  Form,
  Modal,
} from "react-bootstrap";

// Assets
import style from "../../../css/Login.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import AccountText from "./account-text.jsx";

import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import handleReCaptchaVerify from "../utils/recaptcha";

import AuthenticationContext from "../../../utils/AuthenticationProvider";


function EmailModal({ onClick, closeModal }) {
  const [userData] = useState({
    username: "",
    password: "",
  });
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthenticationContext);

  const { executeRecaptcha } = useGoogleReCaptcha();
  const handleSubmit = useCallback(handleReCaptchaVerify(userData, setIsLoggedIn, executeRecaptcha, closeModal), [executeRecaptcha]);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   console.log(userData);
  //   axios({
  //     method: "post",
  //     url: "/login/",
  //     data: userData,
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((response) => {
  //       console.log(response.data);
  //       localStorage.setItem("LoggedIn", true);
  //       setShowState(false);
  //       setIsLoggedIn(true);
  //     })
  //     .catch((error) => {
  //       alert("error");
  //       console.log(error);
  //     });
  // };

  return (
    <>
          <Row className="justify-content-center mt-4 ">
            <Col xs={12}>
              <Form>
                <FloatingLabel controlId="floatingUsername" label="Username">
                  <Form.Control
                    className="mt-4"
                    type="Username"
                    placeholder="Username"
                    onChange={(evt) => {
                      userData.username = evt.target.value;
                    }}
                  />
                </FloatingLabel>

                <Form.Group style={{ position: "relative" }}>
                  <FloatingLabel controlId="floatingPassword" label="Password">
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      className="mt-4"
                      onChange={(evt) => {
                        userData.password = evt.target.value;
                      }}
                    />
                  </FloatingLabel>
                  <span className={style.eye} onClick={togglePasswordVisibility}>
                    <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                  </span>
                </Form.Group>


                <a
                  href="/reset_password"
                  className={`${style.link} text-muted fw-bold d-block mt-2`}
                >
                  Forgot password?
                </a>
                <Button
                  variant="primary"
                  type="submit"
                  className="mt-4 w-100"
                  onClick={handleSubmit}
                >
                  Login
                </Button>
                <div className="tw-flex tw-justify-center">
                  <button
                   type="button" onClick={onClick} className={`${style.link} text-muted fw-bold text-center mt-4`}
                  >
                    Other Log in options
                  </button>
                </div>

                <AccountText text="Don't have an account yet?" link="Create account" className="mt-1" />

              </Form>
            </Col>
          </Row>
      
    </>
  );
}

export default EmailModal;
