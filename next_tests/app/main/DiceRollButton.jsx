import React, { useState, useContext, useRef } from "react";
import { Button, ButtonGroup, Overlay } from 'react-bootstrap';
import { ModPosContext, SetRollResultsContext, URLContext, PlayerCharacterContext, UpdateGameLogContext } from "./Contexts";
import { rollCheck } from "../lib/rollcheck";
import { addCharacterToTurnOrder } from "../lib/turnorder";


function DiceRollButton ({name, rolltype, die, num, mod, setRollResults, text, advantage, initiative}) {
  
    const setRollResults2 = useContext(SetRollResultsContext);
    const modPos = useContext(ModPosContext);
    const url = useContext(URLContext);
    const playercharacterid = useContext(PlayerCharacterContext);
    const updateGameLog = useContext(UpdateGameLogContext);

    const target = useRef(null);

    const [show, setShow] = useState(false);

    const [rollresult, setRollResult] = useState({});

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

  const diceRoll = (adv, initiative) => {
    /*
    let rollapi = `http://localhost:3000/api/rollcheck?checkmode=single&name=${name}&rolltype=${rolltype}&die=${die}&num=${num}&mod=${mod}`;
    if (adv === "advantage") {
      rollapi = `http://localhost:3000/api/rollcheck?checkmode=advantage&name=${name}&rolltype=${rolltype}&die=${die}&num=${num}&mod=${mod}`;
    } else if (adv === "disadvantage") {
      rollapi = `http://localhost:3000/api/rollcheck?checkmode=disadvantage&name=${name}&rolltype=${rolltype}&die=${die}&num=${num}&mod=${mod}`;
    }
    fetch(rollapi)
        .then(res => res.json())
        .then(res => setRollResults2({...res}));
    */
    rollCheck(adv, name, rolltype, die, num, mod)
    .then((results) => {
      setRollResults2({...results}); 
      updateGameLog('Diceroll', `${results.name} - ${results.rolltype} (${results.basestring}), (${results.rollstring}), (${results.rolltotal})`); 
      initiative === true && addCharacterToTurnOrder(playercharacterid, results.rolltotal, false); 
    });
    //setRollResults2({...rollresult});
    //updateGameLog('Dice Roll', `${rollresult.name} - ${rollresult.rolltype} (${rollresult.basestring}-${rollresult.rollstring}-${rollresult.rolltotal})`);
    //if (initiative === true) {
      //addCharacterToTurnOrder(playercharacterid, results.rolltotal, false);
    //} 
  }
  
  
    //console.log(`rollstring = ${this.state.checkResponse.rollstring}`)
  if (advantage === true) {
    return (
      <>
      <Button variant='secondary' size='sm' ref={target} onClick={() => diceRoll("single")} onContextMenu={(e) => {e.preventDefault(); setShow(!show)/*diceRoll("advantage")*/}}>{text}</Button>
      <Overlay target={target.current} show={show} placement="right">
        <ButtonGroup className="diceRollContextMenu">
          <Button size='sm' onClick={() => {diceRoll("advantage", initiative); setShow(!show)}}>Adv</Button>
          <Button size='sm' onClick={() => {diceRoll("disadvantage", initiative); setShow(!show)}}>Dis</Button>
        </ButtonGroup>
      </Overlay>
      </>
    );
  } else {
    return (
        <Button variant='secondary' size='sm' onClick={() => diceRoll("single", initiative)}>{text}</Button>
    );
  }
}


export default DiceRollButton;