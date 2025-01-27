import React, { useState, useCallback, memo } from 'react';
import { usePokemonContext } from "../contexts/Pokemon";
import Pagination from "../components/Pagination";
import Card from "../components/Card";
import Search from "../components/Search"; 
import logo from "./../assets/Pokémon_logo.png"

const Home: React.FC = memo(() => {
  const [currentPage, setCurrentPage] = useState(1);
  const { pokemonData, total, fetchPage, searchPokemon } = usePokemonContext();
  const limit = 15;

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    fetchPage(page, limit);
  }, [fetchPage, limit]);

  const handleSearch = (query: string) => {
    searchPokemon(query); // Call the searchPokemon method from context
  };

  return (
    <div>
      <h1 style={{ textAlign: "center", margin: "20px 0" }}>
        <img src={logo} alt="Pokémon Data" />
      </h1>
      
      <div style={{ position: "absolute", top: "10px", right: "20px" }}>
        <Search onSearch={handleSearch}/>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
        {pokemonData.map((pokemon, index) => (
          <Card key={index} name={pokemon.name} url={pokemon.url} />
        ))}
      </div>
      
      <Pagination
        currentPage={currentPage}
        totalPage={Math.ceil(total / limit)}
        setCurrentPage={handlePageChange}
      />
    </div>
  );
});

export default Home;
