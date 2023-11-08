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
    <Form className="form-search" onSubmit={handleSearch}>
      <span className="material-icons" style={{ marginRight: "10px" }}>
        search
      </span>
      <Form.Control
        id="search-form"
        value={query}
        type="text"
        placeholder="Shirt, Hoodie, Pant, ..."
        onChange={(e) => setQuery(e.target.value)}
      />
    </Form>
  );
};

export default SearchBar;
