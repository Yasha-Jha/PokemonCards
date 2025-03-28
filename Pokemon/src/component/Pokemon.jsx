import { useState, useEffect } from "react";
import { PokemonCards } from "./PokemonCards";

export const Pokemon = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  const API = "https://pokeapi.co/api/v2/pokemon?limit=124";

  //   const fetchIndividualPokemon = async (pokemonFetchApi) => {
  //     const response = await fetch(pokemonFetchApi);
  //     const data = await response.json();
  //     console.log(data);
  //     setPokemon(data);
  //     console.log(pokemon);
  //   };

  const fetchPokemon = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      console.log(data);
      //   console.log(data.results[0].url);
      //   const pokemonsApi = data.results;
      //   pokemonsApi.map((curElm) => {
      //     const pokemonFetchApi = curElm.url;
      // fetchIndividualPokemon(pokemonFetchApi); });

      const pokemonsApi = data.results.map(async (curPokemon) => {
        const response = await fetch(curPokemon.url);
        const data = await response.json();
        return data;
      });
      console.log(pokemonsApi);

      //Promise to handle data
      const detailedResponse = await Promise.all(pokemonsApi);
      console.log(detailedResponse);
      setPokemon(detailedResponse);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching Pokemon:", error);
      setLoading(false);
      setError(error);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  const searchData = pokemon.filter((curpokemon) =>
    curpokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div>
        <h1>Loading....</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1>{error.message}</h1>
      </div>
    );
  }

  return (
    <>
      <section className="container">
        <header>
          <h1>Let Catch Pokemon</h1>
        </header>
        <div className="pokemon-search">
          <input
            type="text"
            placeholder="search pokemon"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div>
          <ul className="cards">
            {/* {pokemon.map((curPokemon) => { */}
            {searchData.map((curPokemon) => {
              return (
                <PokemonCards key={curPokemon.id} pokemonData={curPokemon} />
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
};
