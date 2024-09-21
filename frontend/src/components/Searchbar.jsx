import React, { useState } from 'react';
import { InputGroup, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("search for " + query)
  };

  return (
    <>
    <Form onSubmit={handleSubmit} >
   
      <InputGroup>
        <Form.Control
        placeholder="Search"
        value={query}
        onChange={handleChange}
        />
        
        <Button variant="outline-secondary" onClick={handleSubmit}><FontAwesomeIcon icon={faMagnifyingGlass} /></Button>
      </InputGroup>
      </Form>
    </>
  );
}

export default SearchBar;
