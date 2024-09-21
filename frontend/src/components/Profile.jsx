import React, { useState, useEffect } from "react";
import axios from "axios";
// React Bootstrap
import {
  Button,
  Container,
  Row,
  Col,
  Form,
  FloatingLabel,
  Image,
  Toast,
} from "react-bootstrap";

import { useNavigate } from "react-router-dom";
import style from "../css/Profile.module.css";

import Resizer from "react-image-file-resizer";

function Profile({ onLogout }) {
  const [newProfileData, setNewProfileData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    bio: "",
    profilePicture: "",
    profilePictureName: "",
  });
  const [profileData, setProfileData] = useState({});
  const [toastState, showToast] = useState(false);

  const toggleClose = () => showToast(false);
  const navigate = useNavigate();

  useEffect(() => {
    //let ignore = false;
    const controller = new AbortController();
    //const Token = "Token " + String(localStorage.getItem("Token"));
    axios({
      method: "get",
      url: "/profile/",
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        //  if (!ignore) {
        console.log(response.data.profilePicture);
        setProfileData(response.data);
        //console.log(profileData.bio);
        //}
      })
      .catch((error) => {
        console.error(error);
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
      // useEffect run one time, then run again, causes rerender, causes clean up function to run, causes second axios request to be cancelled
      // ignore = true;
      console.log("clean up function running");
      controller.abort();
    };
  }, []);

  const handleUpload = (e) => {
    console.log(e.target.files[0]);

    try {
      Resizer.imageFileResizer(
        e.target.files[0],
        500,
        500,
        "JPEG",
        100,
        0,
        (uri) => {
          console.log(uri);

          setNewProfileData({
            ...newProfileData,
            profilePictureName: e.target.files[0].name,
            profilePicture: uri,
          });
        },
        "blob",
        0,
        0
      );
    } catch (error) {}
  };
  const handleSave = (e) => {
    e.preventDefault();
    //const Token = "Token " + String(localStorage.getItem("Token"));
    const csrfToken = document.cookie
      .split("; ")
      .find((cookie) => cookie.startsWith("csrftoken="))
      .split("=")[1];
    let form_data = new FormData();
    //form_data.append("owner", 1);
    //console.log(profileData.profilePicture)
    if (newProfileData.profilePicture !== "") {
      form_data.append(
        "profilePicture",
        newProfileData.profilePicture,
        newProfileData.profilePictureName
      );
    }

    form_data.append("bio", newProfileData.bio);
    axios({
      method: "put",
      url: "/profile/",
      data: form_data,
      headers: {
        "X-CSRFToken": csrfToken,
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        console.log(response.data);
        showToast(true);
      })
      .catch((error) => {
        console.error("error " + error);
      });
  };

  const handleSubmit = (event) => {
    const Token = "Token " + String(localStorage.getItem("Token"));
    console.log(Token);
    axios({
      method: "get",
      url: "/logout/",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(response.data);
        localStorage.clear();
        onLogout();
        navigate("/");
      })
      .catch((error) => {
        console.error("error " + error);
      });
  };

  return (
    <>
      <Container>
        <Row>
          <Col xs={{ span: 4, offset: 4 }} style={{ position: "absolute" }}>
            <Toast
              className="toastUpdate"
              show={toastState}
              onClose={toggleClose}
            >
              <Toast.Header>
                <strong className="me-auto">Ape App</strong>
                <small>just now</small>
              </Toast.Header>
              <Toast.Body>Update profile successful</Toast.Body>
            </Toast>
          </Col>
        </Row>

        <Row className={`${style.row1} mt-2`}>
          <Col className={style.group}>
            <h1 className="mb-4">Edit profile</h1>
            <h3>Profile photo</h3>
            <Row>
              <Col xs={4}>
                {newProfileData.profilePicture ? (
                  <Image
                    src={URL.createObjectURL(newProfileData.pfp)}
                    alt="1"
                    referrerPolicy="no-referrer"
                    className={style.avatar}
                    roundedCircle
                  />
                ) : (
                  <Image
                    src={profileData.pfp}
                    alt="2"
                    referrerPolicy="no-referrer"
                    className={style.avatar}
                    roundedCircle
                  />
                )}
              </Col>
              <Col sm={8}>
                <p className="fw-light mt-5">Clear frontal face photo</p>
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label className="uploadBtn">Upload a photo</Form.Label>
                  <Form.Control
                    onChange={handleUpload}
                    type="file"
                    style={{ display: "none" }}
                    accept=".jpg,.gif,.png"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form>
              <h3 className="mt-2">Public profile</h3>
              <Form.Group className="mb-3">
                <FloatingLabel controlId="floatingUsername" label="Username">
                  <Form.Control
                    className=""
                    type="text"
                    placeholder="Username"
                    defaultValue={profileData.username}
                    onChange={(evt) => {
                      newProfileData.username = evt.target.value;
                    }}
                  />
                </FloatingLabel>
              </Form.Group>

              <Form.Group className="mb-3">
                <FloatingLabel controlId="floatingFirstName" label="First name">
                  <Form.Control
                    className=""
                    type="text"
                    placeholder="First name"
                    onChange={(evt) => {
                      //listData.price = evt.target.value;
                    }}
                  />
                </FloatingLabel>
              </Form.Group>

              <Form.Group className="mb-3">
                <FloatingLabel controlId="floatingLastName" label="Last name">
                  <Form.Control
                    className=""
                    type="text"
                    placeholder="Last name"
                    onChange={(evt) => {
                      //listData.price = evt.target.value;
                    }}
                  />
                </FloatingLabel>
              </Form.Group>

              <Form.Group>
                <FloatingLabel controlId="floatingBio" label="Bio">
                  <Form.Control
                    as="textarea"
                    style={{ height: "100px" }}
                    placeholder="Bio"
                    defaultValue={profileData.bio}
                    onChange={(evt) => {
                      newProfileData.bio = evt.target.value;
                    }}
                  />
                </FloatingLabel>
              </Form.Group>
                    <Button
                variant="primary"
                type="submit"
                className="mt-2 mb-2"
                style={{ float: "right" }}
                onClick={handleSave}
              >
                Save
              </Button>
      


              {/* <Button
                variant="primary"
                type="submit"
                className=""
                onClick={handleSubmit}
              >
                Log out
              </Button> */}
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}
export default Profile;
