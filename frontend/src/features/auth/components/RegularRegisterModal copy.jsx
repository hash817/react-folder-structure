import { useContext } from 'react';
import { auth } from "../api/auth.jsx";
import { EnterUsername } from '../components/EnterUsername';


function RegularRegisterModal() {
  const handleSubmit = (username, buttonRef) => {
    auth.registerRegular(username)
      .then((response) => {
        console.log(response);
        buttonRef.current.disabled = true;
      })
      .catch((error) => {
        if (error.response.data["Error"] == "USER_EXIST") {
          setError("Username already exists.");
        }
      });
  };

  return (
    <EnterUsername
      onSubmit={handleSubmit}
      buttonText="Create my account"
      minLength={6}
    />
  );
}

export default RegularRegisterModal;
