import { useContext } from 'react';
import { auth } from "../api/auth";
import { AuthenticationContext } from '../utils/AuthenticationProvider';
import { EnterUsername } from '../components/EnterUsername';

function GoogleRegisterModal() {
  const { idTokenRef } = useContext(AuthenticationContext);

  const handleSubmit = (username, buttonRef) => {
    auth.registerGoogle({ id_token: idTokenRef.current, username: username })
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
      buttonText="Create my Google account"
      minLength={6}
      isGoogleRegistration={true}
    />
  );
}

export default GoogleRegisterModal;
