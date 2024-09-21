import { useState, useRef } from 'react';

export function useUsernameForm(onSubmit, minLength = 6, isGoogleRegistration = false) {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const submitButtonRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.length < minLength) {
      setError(`That's too short. A great username must include at least ${minLength} characters.`);
    } else {
      setError('');
      onSubmit(username, submitButtonRef, isGoogleRegistration);
    }
  };

  return {
    username,
    setUsername,
    error,
    setError,
    handleSubmit,
    submitButtonRef
  };
}