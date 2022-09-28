import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Loader2 from "./Loader2";

const PokedexId = () => {
  let { name } = useParams();
  const [character, setCharacter] = useState({});
  const colors = [
    "rgba(51, 51, 51, 0.200)",
    "rgba(51, 51, 51, 0.350)",
    "rgba(51, 51, 51, 0.550)",
    "rgba(51, 51, 51, 0.680)",
  ];
  const [color, setColor] = useState("");
  const [fontSize, setFontSize] = useState("80px");
  const [id, setId] = useState(name);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

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
    ground: "#96662f",
    ice: "#bcd9ea",
    normal: "#ca98a6",
    poison: "#9b69da",
    psychic: "#f71d92",
    rock: "#9e9e9e",
    steel: "#43bd94",
    water: "#85a8fb",
  };

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`).then((res) => {
      setCharacter(res.data);

      setId(res.data.id);

      setTimeout(() => {
        setIsLoading(false);
      }, 3000);

      if ((res.data?.name).length > 10 && res.data.name.length <= 17) {
        setFontSize("63px");
      } else if ((res.data?.name).length > 17) {
        setFontSize("49px");
      }

      let pokeType;

      if (res.data.types?.[1]?.type.name !== undefined) {
        pokeType = res.data.types?.[1].type.name;
      } else {
        pokeType = res.data.types?.[0].type.name;
      }
      setColor(pokemonType[pokeType]);
    });
  }, [name]);

  //`````````

console.log(character);

  function firstLetter(string) {
    if (string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  }

  const goBack = ()=>{navigate(-1)}

  const previous = (id) => {
    if (id > 1) {
      setId(id - 1);
    } else {
      setId(1);
    }
  };

  const goNext = (id) => {
    setId(id + 1);
  };

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`).then((res) => {
      setCharacter(res.data);
      let pokeType;

      if (res.data.types?.[1]?.type.name !== undefined) {
        pokeType = res.data.types?.[1].type.name;
      } else {
        pokeType = res.data.types?.[0].type.name;
      }
      setColor(pokemonType[pokeType]);

      if ((res.data?.name).length > 10 && res.data.name.length <= 17) {
        setFontSize("63px");
      } else if ((res.data?.name).length > 17) {
        setFontSize("49px");
      }
    });
  }, [id]);

  return isLoading ? (
    <Loader2 />
  ) : (
    <div className="pokemonInfoApp" style={{ background: color }}>
      <div className="pokemonInfoFilter">
        <div className="pokeballBG one"></div>
        <div className="pokeballBG two"></div>
        <div className="pokeballBG three"></div>
        <div className="pokeballBG four"></div>
        <div className="pokeballBG five"></div>
        <div className="pokeballBG six"></div>
        <div className="pokeballBG one2"></div>
        <div className="pokeballBG two2"></div>
        <div className="pokeballBG three2"></div>
        <div className="pokeballBG four2"></div>
        <div className="pokeballBG five2"></div>
        <div className="pokeballBG six2"></div>
        <div className="pokeballBG one3"></div>
        <div className="pokeballBG two3"></div>
        <div className="pokeballBG three3"></div>
        <div className="pokeballBG four3"></div>
        <div className="pokeballBG five3"></div>
        <div className="pokeballBG six3"></div>
        <div className="pokemonInfoRoute" style={{ background: color }}>
          <div className="singleCharacterContainer gridBg">

         <div className="goBack">
         <i onClick={goBack} style={{color: color}} className="fa-solid fa-backward "></i>
         <p style={{color: color}}></p>
         </div>

            <h1
              style={{
                fontSize: fontSize,
                textShadow: `4.5px 4.5px 1px ${color}`,
              }}
              className="pokemonInfoName"
            >
              {firstLetter(character.name)}
            </h1>
            <p style={{ background: color }} className="pokemonId">
              N° {character.id}
            </p>

            <div className="carousel">
              <div
              className="arrowLeftContainer"
                style={{ color: color }}
                onClick={() => previous(character.id)}
              >
                <i className="fa-solid fa-arrow-left arrowLeft"></i>
              </div>
              <img
                src={character.sprites?.other.home.front_default}
                alt=""
                height="500px"
              />

              <div
              className="arrowRightContainer"
                style={{ color: color }}
                onClick={() => goNext(character.id)}
              >
                <i className="fa-solid fa-arrow-right arrowRight"></i>
              </div>
            </div>

            <div className="weightHeightContainer">
              <div className="weightHeight">
                <p>
                  {" "}
                  <span style={{ color: color }} className="weightHeghtSpan">
                    WEIGHT
                  </span>{" "}
                  {character.weight / 10} kg
                </p>

                <div
                  className="verticalLine"
                  style={{ background: "white" }}
                ></div>

                <p>
                  {" "}
                  <span style={{ color: color }} className="weightHeghtSpan">
                    HEIGHT
                  </span>{" "}
                  {character.height / 10} m
                </p>

                <div
                  className="verticalLine"
                  style={{ background: "white" }}
                ></div>

                <p>
                  {" "}
                  <span style={{ color: color }} className="weightHeghtSpan">
                    HP
                  </span>{" "}
                  {character.stats?.[0].base_stat}
                </p>

                <div
                  className="verticalLine"
                  style={{ background: "white" }}
                ></div>

                <p>
                  {" "}
                  <span style={{ color: color }} className="weightHeghtSpan">
                    ATTACK
                  </span>{" "}
                  {character.stats?.[1].base_stat}
                </p>

                <div
                  className="verticalLine"
                  style={{ background: "white" }}
                ></div>

                <p>
                  {" "}
                  <span style={{ color: color }} className="weightHeghtSpan">
                    DEFENSE
                  </span>{" "}
                  {character.stats?.[2].base_stat}
                </p>

                <div
                  className="verticalLine"
                  style={{ background: "white" }}
                ></div>

                <p>
                  {" "}
                  <span style={{ color: color }} className="weightHeghtSpan">
                    SPEED
                  </span>{" "}
                  {character.stats?.[5].base_stat}
                </p>

                {/* <div className="pokeData">
                  <div>
                    <span className="spanType" style={{ color: color }}>
                      HP:
                    </span>

                    <p className="pokeInfo">{character.stats?.[0].base_stat}</p>
                  </div>
                  <div>
                    <span className="spanType" style={{ color: color }}>
                      Attack:
                    </span>
                    <p className="pokeInfo">{character.stats?.[1].base_stat}</p>
                  </div>
                  <div>
                    <span className="spanType" style={{ color: color }}>
                      Defense:
                    </span>
                    <p className="pokeInfo">{character.stats?.[2].base_stat}</p>
                  </div>
                  <div>
                    <span className="spanType" style={{ color: color }}>
                      Speed:
                    </span>
                    <p className="pokeInfo">{character.stats?.[5].base_stat}</p>
                  </div>
                </div> */}
              </div>
            </div>
          </div>

          <div className="movesContainer gridBg">
            <h6
              style={{
                textShadow: `3px 2px 1px ${color}`,
              }}
              className="titleMoves"
            >
              MOVES:
            </h6>
            <div className="movesMap">
              {character.moves?.map((move) => (
                <p key={move.move?.name}>{firstLetter(move.move?.name)}</p>
              ))}
            </div>
          </div>

          <div className="abilitiesContainer gridBg">
            <p
              style={{
                textShadow: `2.5px 1.5px 1px ${color}`,
              }}
              className="titleInfo"
            >
              ABILITIES:
            </p>
            <div className="abilitesMap">
              {character.abilities?.map((ability, index) => (
                <p
                  className="abilitiesInfo"
                  style={{ background: colors[index] }}
                  key={ability.ability?.name}
                >
                  {firstLetter(ability.ability?.name)}
                </p>
              ))}
            </div>
          </div>

          <div className="typeContainer gridBg">
            <p
              style={{
                textShadow: `2.5px 1.5px 1px ${color}`,
              }}
              className="titleInfo"
            >
              TYPE:
            </p>
            <div className="typesMap">
              {character.types?.map((type, index) => (
                <p
                  className="typeInfo"
                  style={{ background: pokemonType[type.type?.name] }}
                  key={type.type?.name}
                >
                  {firstLetter(type.type?.name)}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokedexId;
