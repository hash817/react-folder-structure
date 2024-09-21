import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Form, FloatingLabel, Image, Container, Tab, Tabs, Row, Col, Card } from "react-bootstrap";
import logo from "../logo.svg";
import style from "../css/OthersProfile.module.css";

function OthersProfile() {
  let { id } = useParams(); // { id } extracts the value from id key in object returned by useParams() hook to store it in id variable directly.

  const [profileData, setProfileData] = useState({});
  const [lists, setList] = useState([]);

  useEffect(() => {
    const Token = "Token " + String(localStorage.getItem("Token"));
    const controller = new AbortController();
    axios({
      method: "get",
      url: "/profile/" + id,
      signal: controller.signal,
      headers: {
        // Authorization: Token,
        "Content-Type": "application/json",
      },
      withCredentials: true,
    })
      .then((response) => {
        setProfileData(response.data[0].profile)
        setList(response.data)
        console.log(response.data[0].profile)
        console.log(profileData)
        console.log(lists)
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log(
            "Previous request canceled, new request is send",
            error.message
          );
        } else {
          console.error(error);
          alert("test" + error);
        }
      });
    return () => {
      // useEffect run one time, then run again, causes rerender, causes clean up function to run, causes second axios request to be cancelled
      // ignore = true;
      console.log("clean up function running");
      controller.abort();
    };
  }, []);

  return (
    <>
      <Container>
        <h3 className="mt-5">Public profile</h3>
        <Row>

          <Col xs={4}>
            <Image
              src={profileData.profilePicture}
              alt="2"
              className={style.avatar}
              roundedCircle
            />
            <div>
              {profileData.username}
            </div>

            <div>
              bio : {profileData.bio}
            </div>
          </Col>

          <Col xs={8}>
            <Tabs defaultActiveKey="Listings">
              <Tab eventKey="Listings" title="Listings">
                {Object.keys(lists).forEach(e => {
                  console.log(e)
                  console.log(lists[e])
                })}
                <Row>
                  {lists.map((list) => (
                    <Col key={list.id} md={4} xs={12} className="mb-3">
                      <Card className={`${style.OthersProfileCard} me-5`} >
                        {list.image === null ? (
                          <Card.Img variant="top" src={logo} className="img" />
                        ) : (
                          <Card.Img variant="top" src={list.image} className="img" />
                        )}

                        {/* <Card.Title>name : {list.listingName}</Card.Title> */}
                        <div className="pb-1">
                          <p className="m-0">
                            {list.listingName}
                          </p>
                          <p className="fw-bold">${list.price}</p>

                        </div>

                      </Card>
                    </Col>
                  ))}

                </Row>

              </Tab>
              <Tab eventKey="Info" title="Info">

                
                <div>
                  {profileData.username}
                </div>

                <div>
                  email : {profileData.email}
                </div>
              </Tab>

              <Tab eventKey="Review" title="Review">Review</Tab>
            </Tabs>
          </Col>

        </Row>

      </Container>
    </>
  );
}

export default OthersProfile;
