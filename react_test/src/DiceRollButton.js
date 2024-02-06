import React, { useState, useContext } from "react";
import Button from 'react-bootstrap/Button';
import { ModPosContext, SetRollResultsContext } from "./Contexts";

//import io from 'socket.io-client';
//const socket = io.connect('http://localhost:4000');

function DiceRollButton ({name, rolltype, die, num, mod, setRollResults, text, advantage}) {
  
    const setRollResults2 = useContext(SetRollResultsContext);
    const modPos = useContext(ModPosContext);

  /*
  const rollDice = () => {
    socket.emit('rolldice', this.state.data);
  }
  */ 

/*
  const handleText = () => {
    if (text === undefined){
      if (die === 0 && num === 0) {
        return modPos(mod);
      } else if (die !== 0 && num !== 0 && mod === 0) {
        return `${num}d${die}`;
      } else if (die !== 0 && num !== 0 && mod !== 0) {
        return `${num}d${die} ${modPos(mod, true)}`;
      } else {
        return "";
      }
    } else {
      return text;
    }
  }
*/

  const diceRoll = (adv) => {
    let url = `http://localhost:9000/rollcheck?checkmode=single&name=${name}&rolltype=${rolltype}&die=${die}&num=${num}&mod=${mod}`;
    if (adv === true) {
      url = `http://localhost:9000/rollcheck?checkmode=advantage&name=${name}&rolltype=${rolltype}&die=${die}&num=${num}&mod=${mod}`
    } 
    fetch(url)
        .then(res => res.json())
        .then(res => setRollResults2({...res}))
  }
  
  
    //console.log(`rollstring = ${this.state.checkResponse.rollstring}`)
  if (advantage === true) {
    return (
      <Button variant='secondary' size='sm' onClick={() => diceRoll(false)} onContextMenu={(e) => {e.preventDefault(); diceRoll(true)}}>{text}</Button>
    );
  } else {
    return (
        <Button variant='secondary' size='sm' onClick={() => diceRoll(false)}>{text}</Button>
    );
  }
}


export default DiceRollButton;