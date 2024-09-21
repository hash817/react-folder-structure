import React, { useState, useContext } from "react";
import LoginModal from "../features/auth/components/LoginModal.jsx";
import RegisterModal from "../features/auth/components/RegisterModal.jsx";
// React Bootstrap
import { Container, Nav, Navbar, NavDropdown, Image } from "react-bootstrap";

import axios from "axios";
import SearchBar from "./Searchbar";
import AuthenticationContext from "../utils/AuthenticationProvider";

// Assets
import logo from "../logo.svg";
import style from "../css/Navbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faPlus } from "@fortawesome/free-solid-svg-icons";

// React Query and Router
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import AuthModal from "../app/modals/auth/auth-modal.jsx";

import { NavLink } from "react-router-dom";

function Navbars() {
  const { isLoggedIn, setIsLoggedIn, isLoading } = useContext(
    AuthenticationContext
  );
  const [showLogin, setShowLogin] = useState(false);
  const [showParent, setShowParent] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    // const Token = "Token " + String(localStorage.getItem("Token"));
    axios({
      method: "get",
      url: "/logout/",
      //  data: ,
      headers: {
        //    Authorization: Token,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(response.data);
        localStorage.clear();
        setIsLoggedIn(false);
        navigate("/");
      })
      .catch((error) => {
        console.error("error " + error);
      });
  };
  const handleClose = () => {
    setShowParent(false);
  };

  const handleShow = () => {
    setShowParent(true);
  };

  const handleShowLoginModal = () => {
    console.log("show");
    setShowParent(true);
    setShowLogin(true);
  };

  const handleHideLoginModal = () => {
    console.log("asd");
    setShowParent(true);
    setShowLogin(false);
  };

  const profileQuery = useQuery({
    queryKey: ["profile"],
    queryFn: () =>
      axios({
        method: "get",
        url: "/profile/",
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
    enabled: isLoggedIn,
  });
  if (profileQuery.isLoading || isLoading) return <h1>LOADING</h1>;
  if (profileQuery.isError)
    return <h1>{JSON.stringify(profileQuery.error)}</h1>;
  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        className={`${style.NavbarColor} p-0 `}
      >
        <Container>
          <Navbar.Brand href="/">
            <img
              src={logo}
              width="50"
              height="50"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />

          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav>
              <NavLink to="/">
                <FontAwesomeIcon
                  icon={faHouse}
                  size="2x"
                  className="me-4 tw-text-gray-600"
                />
              </NavLink>
              <NavLink to="/createListing">
                <FontAwesomeIcon
                  icon={faPlus}
                  size="2x"
                  className="tw-text-gray-600"
                />
              </NavLink>
            </Nav>

            <Nav className="mx-auto my-auto">
              <SearchBar />
            </Nav>
            {isLoggedIn ? (
              // <Nav.Link href="/profile">Profile</Nav.Link>

              // ms-auto means go right, me-auto means go left
              <Nav className="ms-auto">
                <Navbar.Brand className="p-0 m-0">
                  <NavLink to="/profile">
                    <Image
                      referrerPolicy="no-referrer"
                      src={profileQuery.data.pfp}
                      style={{ width: "2em", height: "2em" }}
                      roundedCircle
                    />
                  </NavLink>
                </Navbar.Brand>

                <NavDropdown title="Profile" id="collapsible-nav-dropdown">
                  <NavDropdown.Item as={NavLink} to="/profile">
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">
                    Something
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/reset_password">
                    Reset Password
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleSubmit}>
                    Log out
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            ) : (
              <>
                <Nav>
                  <Nav.Link
                    href="#"
                    className={`${style.useFont}  me-4`}
                    onClick={handleShowLoginModal}
                  >
                    Login
                  </Nav.Link>
                  <Nav.Link
                    href="#"
                    className={`${style.useFont} ${style.register}`}
                    onClick={handleHideLoginModal}
                  >
                    Register
                  </Nav.Link>
                </Nav>
              </>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <AuthModal
        showParent={showParent}
        showLogin={showLogin}
        handleClose={handleClose}
        handleShowLoginModal={handleShowLoginModal}
        handleHideLoginModal={handleHideLoginModal}
      />
    </>
  );
}

export default Navbars;
