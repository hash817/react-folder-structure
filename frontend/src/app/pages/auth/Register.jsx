import React, { useState, useEffect, memo } from "react";
import { Form, Row, Col, Button, Container, FloatingLabel } from "react-bootstrap";
import style from '@/css/Register.module.css';
import axios from 'axios';
import FormInput from "../../../components/ui/form/form-input";

function Register() {

    const [userData, setUser] = useState({
        username: "",
        email: "",
        password: "",
        password2: ""
    });

    const handleChange = (event) => {
        setUser(userData => ({
            ...userData,
            [event.target.name] : event.target.value
        }))
    }
 
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(userData);
        axios({
            method: "post",
            url: "/register/",
            data: userData,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            console.log(response.data + "test");
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
                    <Col xs={6} className={style.col1}>
                        <Form>
                            <h2>Register</h2>
                            <FormInput label="Username" type="text" name="username" className="mt-4" setter={handleChange}/>
                            <FormInput label="Email address" type="email" name="email" className="mt-4" setter={handleChange}/>
                            <FormInput label="Password" type="password" name="password" className="mt-4" setter={handleChange}/>
                            <FormInput label="Confirm password" type="password" name="password2" className="mt-4" setter={handleChange}/>
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

export default Register