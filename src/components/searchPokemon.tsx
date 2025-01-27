import React, { useState, useEffect } from 'react';

interface Pokemon {
  name: string;
  url: string;
}

interface SearchPokemonProps {
  data: Pokemon[];
  setFilteredData: React.Dispatch<React.SetStateAction<Pokemon[]>>;
}

const SearchPokemon: React.FC<SearchPokemonProps> = ({ data, setFilteredData }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (query === '') {
      setFilteredData(data); // When query is empty, reset the filtered data
    } else {
      const filtered = data.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredData(filtered); // Filter data based on query
    }
  }, [query, data, setFilteredData]);

  return (
    <input
      type="text"
      placeholder="Search Pokémon..."
      value={query}
      onChange={(e) => setQuery(e.target.value)} // Set the query state on input change
      style={{
        position: 'absolute',
        top: '10px',
        right: '10px',
        padding: '5px',
        fontSize: '16px',
        borderRadius: '5px',
      }}
    />
  );
};

export default SearchPokemon;
