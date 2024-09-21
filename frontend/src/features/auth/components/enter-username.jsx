import React from "react";
import { Button, Form } from "react-bootstrap";
import { useUsernameForm } from "../hooks/useUsernameForm";

function EnterUsername({
  onSubmit,
  buttonText = "Create my account",
  minLength = 6,
  className,
  isGoogleRegistration = false
}) {

  const { username, setUsername, error, handleSubmit, submitButtonRef } = useUsernameForm(onSubmit, minLength, isGoogleRegistration);

  return (
    <Form onSubmit={handleSubmit} className={className}>
      <Form.Group controlId="formUsername">
        <Form.Text className="tw-text-gray-500 tw-block mb-4">
          You can't change your username, so choose wisely.
        </Form.Text>
        <Form.Label className="tw-font-bold">Choose a username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          isInvalid={!!error}
          className="tw-border tw-border-gray-300 tw-rounded-lg tw-p-2 tw-mt-1"
        />
        <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      </Form.Group>
      <Button
        variant="dark"
        type="submit"
        ref={submitButtonRef}
        className="tw-mt-3 tw-w-full tw-bg-black tw-text-white tw-py-2 tw-rounded-lg"
      >
        {buttonText}
      </Button>
    </Form>
  );
}

export default EnterUsername;
