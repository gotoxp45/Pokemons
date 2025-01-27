import React, { createContext, useState, useEffect, useContext, memo, useCallback, useMemo } from "react";

interface PokemonProps {
  name: string;
  url: string;
}

interface PokemonContextProps {
  pokemonData: PokemonProps[];
  total: number;
  fetchPage: (page: number, limit: number) => void;
  searchPokemon: (query: string) => void;  // New searchPokemon function
}

const PokemonContext = createContext<PokemonContextProps | null>(null);

export const PokemonProvider = memo<{ children: React.ReactNode }>(({ children }) => {
  const [pokemonData, setPokemonData] = useState<PokemonProps[]>([]);
  const [total, setTotal] = useState(0);
  const [searchQuery, setSearchQuery] = useState(""); // State to track search query

  const fetchPage = useCallback(async (page: number, limit: number) => {
    const offset = (page - 1) * limit;
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
      const data = await response.json();
      setPokemonData(data.results);
      setTotal(data.count); // Total Pokémon available
    } catch (error) {
      console.log("Error fetching Pokemon Details:", error);
    }
  }, []);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!searchQuery) {
        fetchPage(1, 15); // Fetch initial page when search query is empty
      } else {
        try {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=1000`);
          const data = await response.json();
          const filteredResults = data.results.filter((pokemon: PokemonProps) =>
            pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
          );
          setPokemonData(filteredResults);
          setTotal(filteredResults.length); 
        } catch (error) {
          console.log("Error fetching Pokemon Details for search:", error);
        }
      }
    };

    fetchSearchResults();
  }, [searchQuery, fetchPage]);

  const value = useMemo(() => ({ pokemonData, total, fetchPage, searchPokemon: setSearchQuery }), [
    pokemonData,
    total,
    fetchPage,
    searchQuery
  ]);

  return (
    <PokemonContext.Provider value={value}>
      {children}
    </PokemonContext.Provider>
  );
});

export const usePokemonContext = () => {
  const context = useContext(PokemonContext);
  if (!context) {
    throw new Error("usePokemonContext must be used within a PokemonProvider");
  }
  return context;
};
