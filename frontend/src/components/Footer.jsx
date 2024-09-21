import React, { useState, useContext } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

function Footer() {
  return (
    <>
    <footer className="mt-2" style={{ boxShadow: '0 -5px 5px -5px #666666' }} >
      <Container className="text-center">
        <small>© 2024 - 2024 GYAT PTE LTD</small>
      </Container>
    </footer>
    </>
  );
}

export default Footer;
