import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeName } from "../store/slices/userName.slice";
import { useNavigate } from "react-router-dom";
import trainer from "../assets/trainer.webp";
import backgroundPic from "../assets/inputBackground.jpeg";

const UserInput = () => {
  const [userName, setUserName] = useState("");
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const dispatchName = () => {
    if (userName) {
      dispatch(changeName(userName));
      navigate("/pokedex");
    } else {
      alert('Type your name to start')
    }
  };

  return (
    <div className="userInputApp">
      <div className="inputAndImg">
      <h1 className="sayHello">Hello trainer!</h1>
      <div className="userInputContainer">
        <h4>
          Give me your name to <span className="spanStart">start</span>
        </h4>
        <div className="enterName">
         <form onSubmit={dispatchName}>
         <input
            required
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />

          <div onClick={dispatchName} className="start">
            <i className="fa-solid fa-play"></i>
          </div>
         </form>
        </div>
      </div>
      </div>
      <img className="tainerInput" src='https://i.pinimg.com/originals/af/59/87/af5987f360655e744edcf2fce1387083.png' alt="trainer" width='1000px' />
    </div>
  );
};

export default UserInput;
