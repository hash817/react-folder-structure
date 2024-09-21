import React, { useState, useContext, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// React Bootstrap
import {
  Container,
  FloatingLabel,
  Button,
  Col,
  Row,
  Form,
} from "react-bootstrap";

import { GoogleLogin } from "@react-oauth/google";
import AuthenticationContext from "../../../utils/AuthenticationProvider";
import style from "../../../css/Login.module.css";

// Axios
import axios from "axios";

import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

import GoogleLoginButton from "../../../features/auth/components/google-button";
import { auth } from "../../../features/auth/api/auth";
import handleReCaptchaVerify from "../../../features/auth/utils/recaptcha";

function Login() {
  //const navigate = useNavigate();

  //const [refreshReCaptcha, setRefreshReCaptcha] = useState(false);
  const [userData] = useState({
    username: "",
    password: "",
  });
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthenticationContext);

  const { executeRecaptcha } = useGoogleReCaptcha();
  const handleSubmit = useCallback(handleReCaptchaVerify(userData, setIsLoggedIn, executeRecaptcha), [executeRecaptcha]);

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   console.log(userData);
  //   axios({
  //     method: "post",
  //     url: "/login/",
  //     data: {
  //       username: userData.username,
  //       password: userData.password,
  //       reCaptchaToken: token,
  //     },
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((response) => {
  //       console.log(response.data);
  //       localStorage.setItem("LoggedIn", true);

  //       setIsLoggedIn(true);
  //     })
  //     .catch((error) => {
  //       alert("error");
  //       console.log(error);
  //     });
  // };

  return isLoggedIn ? (
    <h1>ALREADY LOGGED IN</h1>
  ) : (
    <Container>
      <Row className="justify-content-center mt-4 ">
        <Col className={style.col1} xs={6}>
          <Form>
            <h2 className="tw-text-4xl tw-font-semibold">Login</h2>
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

            <FloatingLabel controlId="floatingPassword" label="Password">
              <Form.Control
                className="mt-4"
                type="password"
                placeholder="Password"
                onChange={(evt) => {
                  userData.password = evt.target.value;
                }}
              />
            </FloatingLabel>
            <Button
              variant="primary"
              type="submit"
              className="mt-4"
              onClick={handleSubmit}
            >
              Submit
            </Button>

            <GoogleLoginButton onClick={auth.reachGoogle} />
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
