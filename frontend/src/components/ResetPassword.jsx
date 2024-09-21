import React, { useState } from "react";
import { Form, Row, Col, Button, Container, FloatingLabel } from "react-bootstrap";
import '../css/Register.module.css';
import axios from 'axios';

function ResetPassword() {

    const [userData, createUser] = useState({
        old_password: "",
        new_password1: "",
        new_password2: ""
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        const Token = "Token " + String(localStorage.getItem("Token"));
        console.log(userData);
        axios({
            method: "put",
            url: "/reset_password/",
            data: userData,
            headers: {
                Authorization: Token,
                'Content-Type': 'application/json'
            }
        }).then(response => {
            console.log(response.data + "test");
            //window.location.reload();
            // const form = event.target;
            // const userData = new userData(form);
        })
            .catch(error => {
                alert("error");
                console.log(error)
            });
    }


    return (
        <>

            <Container>
                <Row className="justify-content-center mt-4">
                    <Col xs={6} className="col1">
                        <Form>
                            <h2>Reset Password</h2>
                            <FloatingLabel
                                controlId="floatingOldPassword"
                                label="OldPassword"
                            >
                                <Form.Control
                                    className="mt-4"
                                    type="password"
                                    placeholder="Old password"
                                    onChange={(evt) => {
                                        userData.old_password = evt.target.value;
                                    }}
                                />
                            </FloatingLabel>
                            <FloatingLabel
                                controlId="floatingPassword"
                                label="Password"
                            >
                                <Form.Control
                                    className="mt-4"
                                    type="password"
                                    placeholder="Password"
                                    onChange={(evt) => {
                                        userData.new_password1 = evt.target.value;
                                    }}
                                />
                            </FloatingLabel>
                            <FloatingLabel
                                controlId="floatingPassword2"
                                label="Confirm password"
                            >
                                <Form.Control
                                    className="mt-4"
                                    type="password"
                                    placeholder="Confirm password"
                                    onChange={(evt) => {
                                        userData.new_password2 = evt.target.value;
                                    }}
                                />
                            </FloatingLabel>
                            <Button variant="primary" type="submit" className="mt-4" onClick={handleSubmit}>
                                Submit
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>

        </>
    )

}

export default ResetPassword