import React, { Component } from "react";
import DiceRollButton from "./DiceRollButton";

function AbilityBox ({name, abbrev, bonus, score, setRollResults}) {
  return (
    <div className="abilityBox">
      <div className="abilityLabel">{abbrev}</div>
      <DiceRollButton name={name} rolltype="Ability" die="20" num="1" mod={bonus} text={bonus} setRollResults={setRollResults}/>
      <div className="oval">
        <h4>{score}</h4>
      </div>
    </div>
  );
}

export default AbilityBox;