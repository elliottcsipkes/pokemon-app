import React from "react";
import Card from "./Card";
import Pokeinfo from "./Pokeinfo";
import axios from "axios";
import { useState, useEffect } from "react";
import { TbPokeball } from "react-icons/tb";
import { initialPoke } from "../initialPoke";

const Main = () => {
  const [pokeData, setPokeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/");
  const [nextUrl, setNextUrl] = useState();
  const [prevUrl, setPrevUrl] = useState();
  const [pokeDex, setPokeDex] = useState(initialPoke);

  const pokeFun = async () => {
    setLoading(true);
    const res = await axios.get(url);
    //res.data.results
    setNextUrl(res.data.next);
    setPrevUrl(res.data.previous);
    getPokemon(res.data.results);
    setLoading(false);
  };

  const getPokemon = async (res) => {
    res.map(async (item) => {
      const result = await axios.get(item.url);
      setPokeData((state) => {
        state = [...state, result.data];
        state.sort((a, b) => (a.id > b.id ? 1 : -1));
        return state;
      });
    });
  };

  useEffect(() => {
    pokeFun();
  }, [url]);

  return (
    <>
      <div className="container">
        <div className="header">
          <TbPokeball size={30} />
          <h1>Pokedex</h1>
        </div>
        <div className="content">
          <div className="left-content">
            <Card
              pokemon={pokeData}
              loading={loading}
              infoPokemon={(poke) => setPokeDex(poke)}
            />

            <div className="btn-group">
              {prevUrl && (
                <button
                  onClick={() => {
                    setPokeData([]);
                    setUrl(prevUrl);
                  }}
                >
                  Prev
                </button>
              )}
              {nextUrl && (
                <button
                  onClick={() => {
                    setPokeData([]);
                    setUrl(nextUrl);
                  }}
                >
                  Next
                </button>
              )}
            </div>
          </div>
          <div className="right-content">
            <Pokeinfo data={pokeDex} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
