import { Form, FloatingLabel } from "react-bootstrap";

import React from "react";

function FormInput({ label, setter, ...props }) {
  return (
    <FloatingLabel controlId={label} label={label}>
      <Form.Control {...props} placeholder={label} onChange={setter} />
    </FloatingLabel>
  );
}

export default FormInput;
