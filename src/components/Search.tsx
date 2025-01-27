import React, { useState, memo } from 'react';

interface SearchProps {
  onSearch: (query: string) => void;
}

const Search: React.FC<SearchProps> = memo(({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Search Pokémon"
      value={query}
      onChange={handleChange}
      style={{
        padding: "8px 15px",
        fontSize: "16px",
        borderRadius: "20px",
        border: "1px solid #ccc",
      }}
    />
  );
});

export default Search;
