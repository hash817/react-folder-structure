import React, { useState, useEffect } from "react";

// React bootstrap
import { Container, Row, Col, Image, Card, Carousel } from "react-bootstrap";

// Axios
import axios from "axios";

// CSS & Image
import style from "../css/Home.module.css";
import logo from "../logo.svg";
import ec2 from "@/assets/images/ec2.jpg";
import aws from "@/assets/images/aws1.png";

// React Query
import { useQuery } from "@tanstack/react-query";

function Home() {
  //const [lists, setList] = useState([]);

  const listsQuery = useQuery({
    queryKey: ["lists"],
    queryFn: () =>
      axios({
        method: "get",
        url: "/listing/",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          console.log(response.data);
          return response.data;
        })
        .catch((error) => {
          console.error(error);
          return error;
        }),
        refetchOnWindowFocus: false,
  });

  if (listsQuery.isLoading) return <h1>LOADING</h1>;
  if (listsQuery.isError) return <h1>{JSON.stringify(listsQuery.error)}</h1>;
  // useEffect(() => {
  //   const controller = new AbortController();
  //   axios({
  //     method: "get",
  //     url: "/listing/",
  //     signal: controller.signal,
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     withCredentials: true,
  //   })
  //     .then((response) => {
  //       console.log(response.data);
  //       for (let i = 0; i < response.data.length; i++) {
  //         console.log(response.data[i].image);
  //       }
  //       setList(response.data);
  //     })
  //     .catch((error) => {
  //       if (axios.isCancel(error)) {
  //         console.log(
  //           "Previous request canceled, new request is send",
  //           error.message
  //         );
  //       } else {
  //         console.error(error);
  //         alert("test" + error);
  //       }
  //     });
  //   return () => {
  //     // useEffect run one time, then run again, causes rerender, causes clean up function to run, causes second axios request to be cancelled
  //     // ignore = true;
  //     console.log("clean up function running");
  //     controller.abort();
  //   };
  // }, []);

  return (
    <>
      <Container>
        <Carousel className={`${style.carousel} mt-3`}>
          <Carousel.Item interval={3000}>
            <img
              className={style.carouselImg}
              src={ec2}
              alt="Image One"
            />
          </Carousel.Item>
          <Carousel.Item interval={3000}>
            <img
              className={style.carouselImg}
              src={aws}
              alt="Image Two"
            />
          </Carousel.Item>
        </Carousel>
        <Row className="mt-4">
          {listsQuery.data.map((list) => (
            <Col key={list.id} xl={3} lg={4} md={6} xs={12} className="mb-3">
              <Card className={`${style.list} ${style.card} mx-auto`} style={{ width: "16rem" }}>
                {/* <Card.Title className="p-0" style={{ backgroundColor: "white" }}>
                  <Image className="mb-1 me-2" src={list.profile.profilePicture} style={{ width: '2rem', height: '2rem' }} roundedCircle /><a className="profileLink" href="/profile/profileID">{list.profile.username}</a>

                </Card.Title> */}

                <Row className="pb-2">
                  <Col xs={2}>
                    <a
                      className={style.profileLink}
                      href={"/profile/" + list.profile.owner}
                    >
                      <Image
                        className="mb-1"
                        src={list.profile.profilePicture}
                        style={{ width: "2rem", height: "2rem" }}
                        roundedCircle
                      />
                    </a>
                  </Col>
                  
                  <Col xs={10} className="position-relative">
                    <p className={`${style.header} m-0 fw-light position-absolute top-0`}>
                      <a
                        className={style.profileLink}
                        href={"/profile/" + list.profile.owner}
                      >
                        {list.profile.username}
                      </a>
                      <br></br>
                      {list.createdAt}
                    </p>
                  </Col>
                </Row>

                {list.image === null ? (
                  <Card.Img variant="top" src={logo} className={style.img} />
                ) : (
                  <Card.Img variant="top" src={list.image} className={style.img} />
                )}

                <div className="pb-1">
                  <p className="m-0">{list.listingName}</p>
                  <p className="fw-bold">${list.price}</p>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}
export default Home;
