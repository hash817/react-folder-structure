import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import LoginModal from "@/features/auth/components/LoginModal";
import RegisterModal from "@/features/auth/components/RegisterModal";
import logo from "../../../logo.svg";

function AuthModal({ showParent, showLogin, handleClose, handleShowLoginModal, handleHideLoginModal }) {  

//   handleLogin = () => {
//     setShowLogin()
//   }

  return (
    <>
      <Modal show={showParent} onHide={handleClose}>
        <Modal.Header closeButton>
          <img
            src={logo}
            width="50"
            height="50"
            className=""
            alt="React Bootstrap logo"
          />
        </Modal.Header>
        <Modal.Body>
            {showLogin && <LoginModal handleClose={handleClose} onClick={handleHideLoginModal} />}
            {!showLogin && <RegisterModal onClick={handleShowLoginModal} />}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AuthModal;
