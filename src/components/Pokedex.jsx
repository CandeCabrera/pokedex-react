import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import axios from "axios";
import Loader from "./Loader";
import PokemonCards from "./PokemonCards";
import { useNavigate } from "react-router-dom";

const Pokedex = () => {
  const userName = useSelector((state) => state.userName);

  const [pokemons, setPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fontSize, setFontSize] = useState("100px");
  const [nameInput, setNameInput] = useState("");
  const [inputList, setInputList] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon/?offset=20&limit=1154")
      .then((res) => {
        setPokemons(res?.data.results);
        setTimeout(() => {
          setIsLoading(false);
        }, 4000);

        if (userName.length > 9) {
          setFontSize("75px");
        }
      });
    axios
      .get("https://pokeapi.co/api/v2/type")
      .then((res) => setInputList(res?.data.results));
  }, []);

  //console.log(inputList);

  function firstLetter(string) {
    let stringLength = string?.length;
    let firstLetter = string?.[0].toUpperCase();
    let lastLetters = string?.slice(1, stringLength);
    let newString = firstLetter + lastLetters;
    return newString;
  }

  const searchName = () => {
    const inputInLow = nameInput.toLowerCase();
    navigate(`/pokedex/${inputInLow}`);
  };

  const searchByType = (typeUrl) => {
    if (typeUrl === "all") {
      axios
        .get("https://pokeapi.co/api/v2/pokemon/?offset=20&limit=1154")
        .then((res) => setPokemons(res?.data.results));
    } else {
      axios.get(typeUrl).then((res) => setPokemons(res.data?.pokemon));
    }
  };

  const [page, setPage] = useState(1);
  const pokemonPerPage = 12;
  const lastPokemonIndex = page * pokemonPerPage;
  const firstPokemonIndex = lastPokemonIndex - pokemonPerPage;
  const pokemonPaginated = pokemons.slice(firstPokemonIndex, lastPokemonIndex);
  const totalPages = Math.ceil(pokemons.length / pokemonPerPage);
  // const pagesNumbers = [];
  // for (let i = 1; i <= totalPages; i++) {
  //   pagesNumbers.push(i);
  // }



  const changePage = ({ selected }) => {
    setPage(selected + 1);
  };

  console.log(page);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="pokedexContainer">
      <header className="welcomeContainer">
        <img src="https://pbs.twimg.com/media/ERPRinWUwAQVZsj.png" alt="" />
        <h1 className="welcome">
          <span className="welcomeWord">Welcome</span>
          <br />
          <span className="userName" style={{ fontSize: fontSize }}>
            {userName}
          </span>
          <br />
          <span className="welcomeEnd">to your Pokedex!</span>
        </h1>
      </header>

      <div className="findPoke">
        <h2>Find your favourite Pokemon here!</h2>
        <div className="searchers">
          <div className="searcherContainer">
            <form onSubmit={searchName}>
              <input
                className="searcher"
                type="text"
                placeholder="Search by Name..."
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
              />
              <i
                onClick={searchName}
                className="fa-solid fa-magnifying-glass"
              ></i>
            </form>
          </div>

          <div className="selectContainer">
            <select onChange={(e) => searchByType(e.target.value)}>
              <option value="all">All Pokemon</option>

              {inputList.map((type) => (
                <option key={type.name} value={type.url}>
                  {firstLetter(type.name)}
                </option>
              ))}
            </select>
            <i id="filter" className="fa-solid fa-angles-down"></i>
          </div>
        </div>
      </div>

      <div className="cardsContainer">
        {pokemonPaginated?.map((pokemon) => (
          <PokemonCards
            url={pokemon.url ? pokemon.url : pokemon.pokemon.url}
            key={pokemon.url ? pokemon.url : pokemon.pokemon.url}
          />
        ))}
      </div>

      <ReactPaginate
        previousLabel={"<"}
        nextLabel={">"}
        pageCount={totalPages}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      />
    </div>
  );
};

export default Pokedex;
