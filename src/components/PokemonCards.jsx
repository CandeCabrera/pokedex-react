import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PokemonCards = ({ url }) => {
  const [pokemonUrl, setPokemonUrl] = useState({});
  const [color, setColor] = useState("");
  const [fontSize, setFontSize] = useState("25px");

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(url).then((res) => {
      setPokemonUrl(res.data);

      if ((res.data.name).length > 10 && (res.data.name).length <= 17 ) {
        setFontSize('20px')
      } else if ((res.data.name).length > 17 ) {
        setFontSize('15px')
        
      }


      let pokeType;

      if (res.data.types?.[1]?.type.name !== undefined) {
        pokeType = res.data.types?.[1].type.name;
      } else {
        pokeType = res.data.types?.[0].type.name;
      }
      let pokemonType = {
        bug: "#3c9950",
        dark: "#595978",
        dragon: "#62cad9",
        electric: "gold",
        fairy: "#e91368",
        fighting: "#ef6239",
        fire: "#fd4b5a",
        flying: "#94b3c7",
        ghost: "#906791",
        grass: "#27cb50",
        ground: "#6e491f",
        ice: "#a0c0d2",
        normal: "#ca98a6",
        poison: "#9b69da",
        psychic: "#f71d92",
        rock: "#8b3e22",
        steel: "#43bd94",
        water: "#85a8fb",
      };

      setColor(pokemonType[pokeType]);
    });
  }, []);

  function firstLetter(string) {
    if (string){
        return string.charAt(0).toUpperCase() + string.slice(1);
    } 
  }

  function separateStings (array){
    let newArray = array?.map((type)=> firstLetter(type.type.name))
    let finalArray = newArray?.join(' | ')
    return finalArray;
    
  }



  return (
    <div
      style={{ background: color }}
      className="pokemonsCardsContainer"
      onClick={() => navigate(`/pokedex/${pokemonUrl.id}`)}
    >
      <div className="pokeCardTop">
        <h2 style={{fontSize: fontSize}} className="pokeCardName">{firstLetter(pokemonUrl.name)}</h2>
        <div className="pokeCardImg">
          <img
            src={pokemonUrl.sprites?.other.home.front_default}
            height="130px"
          />
          <div className="shadow"></div>
        </div>
      </div>

      <div className="pokeData">
        <div>
          <span className="spanType" style={{ color: color }}>
            Type:
          </span>
          
          <p className="pokeInfo">{separateStings(pokemonUrl.types)}</p>
        </div>
        <div>
          <span className="spanType" style={{ color: color }}>
            HP:
          </span>

          <p className="pokeInfo">{pokemonUrl.stats?.[0].base_stat}</p>
        </div>
        <div>
          <span className="spanType" style={{ color: color }}>
            Attack:
          </span>
          <p className="pokeInfo">{pokemonUrl.stats?.[1].base_stat}</p>
        </div>
        <div>
          <span className="spanType" style={{ color: color }}>
            Defense:
          </span>
          <p className="pokeInfo">{pokemonUrl.stats?.[2].base_stat}</p>
        </div>
        <div>
          <span className="spanType" style={{ color: color }}>
            Speed:
          </span>
          <p className="pokeInfo">{pokemonUrl.stats?.[5].base_stat}</p>
        </div>
      </div>
    </div>
  );
};

export default PokemonCards;
