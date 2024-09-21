import { data } from 'jquery';
import {auth} from '../api/auth.jsx'

const handleReCaptchaVerify = (userData, setIsLoggedIn, executeRecaptcha, handleClose) => async (event) => {

  event.preventDefault();
  if (!executeRecaptcha) {
    console.log("Execute recaptcha not yet available");
    return;
  }

  const token = await executeRecaptcha("login");
  const data = {
    username: userData.username,
    password: userData.password,
    reCaptchaToken: token,
  }
  if (token) {
    auth.login(data)
      .then((response) => {
        console.log(response.data);
        setIsLoggedIn(true);
        console.log(handleClose)
        if (handleClose) handleClose();
      })
      .catch((error) => {
        alert("error");
        console.log(error);
      });
  }
};

export default handleReCaptchaVerify;
