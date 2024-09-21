// React hooks
import React, { useState, useContext } from "react";

// React router dom
import { useNavigate } from "react-router-dom";

// React bootstrap
import { Container, Row, Col, Form, Button } from "react-bootstrap";

// Axios
import axios from "axios";

// CSS & Default image
import style from "../css/CreateListing.module.css";
import logo from '../logo.svg';

// Image Resizer
import Resizer from "react-image-file-resizer";


function CreateListing() {
  const [listData, setListData] = useState({
    category: "O Level",
    price: "0",
    listingName: "Null",
    image: logo,
    imageName: 'logo.svg'
  });
  const navigate = useNavigate();
  //const csrfToken = useContext(csrf)
  const handleSubmit = (event) => {
    event.preventDefault();

    //const Token = "Token " + String(localStorage.getItem("Token"));
    const csrfToken = document.cookie.split('; ').find(cookie => cookie.startsWith('csrftoken=')).split('=')[1];
    console.log(csrfToken)

    let form_data = new FormData();
    if (listData.image !== logo) {
      form_data.append("image", listData.image, listData.imageName);
    }

    form_data.append("category", listData.category);
    form_data.append("price", listData.price);
    form_data.append("listingName", listData.listingName);
    console.log(listData)
    //let csrf_token = 
    axios({
      method: "post",
      url: "/listing/",
      data: form_data,
      headers: {
        "X-CSRFToken": csrfToken,
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        console.log(response.data);
        navigate("/")
      })
      .catch((error) => {
        alert("log in first");
        console.error(error);
      });
  };


  const handleUpload = async (e) => {
    //console.log(e.target.files[0].name)
    if (e.target.files[0]) {

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
            setListData({
              ...listData,
              imageName: e.target.files[0].name,
              image: uri,
            });
          },
          "blob",
          0,
          0
        );
      } catch (error) { }
    }
  };

  return (
    <>

      <Container>
        <Row className={`${style.test1} mt-2`}>
          <Col className={style.group1} xs={4}>
            <Form.Group controlId="formFile" className="mb-3">
              <div className={`${style.borderImg} mt-3 mb-3`}>

                <Form.Label className="uploadBtn">
                  Select photos
                </Form.Label>
                <Form.Control
                  onChange={handleUpload}
                  type="file"
                  style={{ display: "none" }}
                  accept=".jpg,.gif,.png"
                />
              </div>

              {listData.image === logo ? <img src={listData.image} alt="default" className={style.listingImage} /> : <img src={URL.createObjectURL(listData.image)} alt="" width={250} height={250} className={style.listingImage} />}


            </Form.Group>
          </Col>

          <Col className={style.group2} xs={{ span: 7, offset: 1 }}>
            <Form>
              <h2 className="mt-3">Category</h2>
              <Form.Select
                onChange={(evt) => {
                  listData.category = evt.target.value;
                }}
              >
                <option value="O Level">O Level</option>
                <option value="PSLE">PSLE</option>
                <option value="A Level">A Level</option>
                <option value="N Level">N Level</option>
              </Form.Select>

              <h2 className="mt-3">Listing Details</h2>
              <Form.Group className="mb-3">
                <Form.Label>Listing Title</Form.Label>
                <Form.Control
                  className=""
                  type="text"
                  placeholder="Listing Title"
                  onChange={(evt) => {
                    listData.listingName = evt.target.value;
                  }}
                />
              </Form.Group>

              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Listing Description</Form.Label>
                <Form.Control as="textarea" rows={3} />
              </Form.Group>

              <h2 className="mt-3">Price</h2>
              <Form.Group className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  className=""
                  type="text"
                  placeholder="Price of your listing"
                  onChange={(evt) => {
                    listData.price = evt.target.value;
                  }}
                />
              </Form.Group>
            </Form>

          </Col>


          <Col className="mt-2 p-0">
            <Button
              onClick={handleSubmit}
              variant="primary"
              type="submit"
              style={{ float: "right" }}
            >
              Submit
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default CreateListing;
