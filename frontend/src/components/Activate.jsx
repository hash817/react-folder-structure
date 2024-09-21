import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Form, FloatingLabel, Image, Container, Tab, Tabs, Row, Col, Card } from "react-bootstrap";
import AuthenticationContext from "../utils/AuthenticationProvider";
//import style from "../css/OthersProfile.module.css";


function Activate() {
  let { uid, token } = useParams(); 
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthenticationContext)

  useEffect(() => {
    const controller = new AbortController();
    axios({
      method: "get",
      url: "/activate/" + uid + "/" + token,
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    })
      .then((response) => {
        localStorage.setItem("LoggedIn", true);
        setIsLoggedIn(true);
        console.log(response)
        navigate("/")
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log(
            "Previous request canceled, new request is send",
            error.message
          );
        } else {
          console.error(error);
        }
      });
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <>
      <Container>
        <h3 className="mt-5 text-center">Activating account</h3>

      </Container>
    </>
  );
}

export default Activate;
