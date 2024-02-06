import React, { useContext } from "react";
import DiceRollButton from "./DiceRollButton";
import { ModPosContext } from "./Contexts";

function SkillRow ({name, mod, prof, bonus, setRollResults}) {

  const modPos = useContext(ModPosContext);

  return (
  <tr>
    <td><input type="checkbox" readOnly={true} checked={prof}></input></td>
    <td className="skillMod">{mod}</td>
    <td className="skillName">{name}</td>
    <td className="skillBonus">
      <DiceRollButton name={name} rolltype="Skill" die="20" num="1" mod={bonus} text={modPos(bonus, false)} setRollResults={setRollResults}/>
    </td>
  </tr>
  );

}

export default SkillRow;