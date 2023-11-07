"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Form } from "react-bootstrap";

const SearchBar = () => {
  //console.log(search);
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = async (e: any) => {
    e.preventDefault();
    e.target.reset();
    query == ""
      ? router.push(`/`)
      : router.push(`/search?query=${query.toLowerCase().trim()}`);
  };

  return (
    <Form
      onSubmit={handleSearch}
      style={{ alignItems: "center", width: "100%" }}
      className="d-flex"
    >
      <span style={{ marginRight: "10px" }} className="material-icons">
        search
      </span>
      <Form.Control
        value={query}
        type="text"
        placeholder="Shirt, Hoodie, Pant, ..."
        onChange={(e) => setQuery(e.target.value)}
      />
    </Form>
  );
};

export default SearchBar;
