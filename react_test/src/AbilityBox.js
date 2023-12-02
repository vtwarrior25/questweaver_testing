import React, { Component } from "react";
import DiceRollButton from "./DiceRollButton";

function AbilityBox ({name, abbrev, bonus, score, setRollResults}) {
  return (
    <div className="abilityBox">
      <div className="abilityLabel">{abbrev}</div>
      <DiceRollButton className="abilityModifierBox" name={name} rolltype="Ability" die="20" num="1" mod={bonus} setRollResults={setRollResults}/>
      <div class="oval">
        <h4>{score}</h4>
      </div>
    </div>
  );
}

export default AbilityBox;