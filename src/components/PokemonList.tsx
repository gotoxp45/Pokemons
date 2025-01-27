import React, { useState, useEffect } from "react";
import Search from "./Search";
import Card from "./Card";

interface Pokemon {
  name: string;
  url: string;
}

const PokemonList: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([]);
  
  // Fetch the list of Pokémon
  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100");
        const data = await response.json();
        setPokemons(data.results);
        setFilteredPokemons(data.results);
      } catch (error) {
        console.log("Error fetching Pokémon data:", error);
      }
    };
    fetchPokemons();
  }, []);

  const handleSearch = (query: string) => {
    const filtered = pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPokemons(filtered);
  };

  return (
    <div>
      <Search onSearch={handleSearch} />
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {filteredPokemons.map((pokemon) => (
          <Card key={pokemon.name} name={pokemon.name} url={pokemon.url} />
        ))}
      </div>
    </div>
  );
};

export default PokemonList;
