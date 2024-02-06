import React, { useContext } from "react";
import DiceRollButton from "./DiceRollButton";
import { ModPosContext } from "./Contexts";

function AbilityBox ({name, abbrev, bonus, score, setRollResults}) {

  const modPos = useContext(ModPosContext); 

  return (
    <div className="abilityBox">
      <div className="abilityLabel">{abbrev}</div>
      <DiceRollButton name={name} rolltype="Ability" die="20" num="1" mod={bonus} text={modPos(bonus, false)} setRollResults={setRollResults}/>
      <div className="oval">
        <h4>{score}</h4>
      </div>
    </div>
  );
}

export default AbilityBox;