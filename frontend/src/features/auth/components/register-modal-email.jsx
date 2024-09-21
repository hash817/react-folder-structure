import React, { useState } from "react";
import { FloatingLabel, Button, Col, Row, Form, Modal } from "react-bootstrap";

// Assets
import style from "../../../css/Register.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import AccountText from "./account-text.jsx";

import axios from "axios";

function RegisterEmailModal({ onClick }) {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });

    if (name === "password") {
      setPasswordCriteria(validatePassword(value));
    }
  };

  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

  const validatePassword = (password) => {
    const length = password.length >= 8;
    const uppercase = /[A-Z]/.test(password);
    const lowercase = /[a-z]/.test(password);
    const number = /[0-9]/.test(password);
    return { length, uppercase, lowercase, number };
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(userData.email);

    let validationErrors = {};

    if (!validateEmail(userData.email)) {
      validationErrors.email = "Looks like this email is incomplete";
    }

    const passwordValidations = validatePassword(userData.password);

    if (Object.values(passwordValidations).some((valid) => !valid)) {
      validationErrors.password = "Password does not meet criteria";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log('no errors')
    }
  };

  return (
    <>
      <Row className="justify-content-center mt-4 ">
        <Col xs={12}>
          <Form>
            <FloatingLabel controlId="floatingEmail" label="Email">
              <Form.Control
                name="email"
                required
                className="mt-4 tw-border-gray-300"
                type="email"
                placeholder="Email"
                isInvalid={!!errors.email}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </FloatingLabel>

            <Form.Group style={{ position: "relative" }}>
              <FloatingLabel controlId="floatingPassword" label="Password">
                <Form.Control
                  required
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                 
                  className="mt-4 tw-border-gray-300"
                  onChange={handleChange}
                />
              </FloatingLabel>
              <span className={style.eye} onClick={togglePasswordVisibility}>
                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
              </span>
              </Form.Group>
              {/* Password Criteria */}
              <ul className="mt-2 space-y-1">
                <li
                  className={
                    passwordCriteria.length ? "tw-text-green-500" : "tw-text-gray-500"
                  }
                >
                  ✔ At least 8 characters
                </li>
                <li
                  className={
                    passwordCriteria.uppercase
                      ? "tw-text-green-500"
                      : "tw-text-gray-500"
                  }
                >
                  ✔ At least 1 uppercase letter
                </li>
                <li
                  className={
                    passwordCriteria.lowercase
                      ? "tw-text-green-500"
                      : "tw-text-gray-500"
                  }
                >
                  ✔ At least 1 lowercase letter
                </li>
                <li
                  className={
                    passwordCriteria.number ? "tw-text-green-500" : "tw-text-gray-500"
                  }
                >
                  ✔ At least 1 number
                </li>
              </ul>
      

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
              Continue
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
}

export default RegisterEmailModal;
