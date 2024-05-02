import DiceRollButton from "./DiceRollButton";
import { useContext } from "react";
import { ModPosContext } from "./Contexts";

function SavingThrow({name, prof, val, profbonus, setRollResults}) {

  const modPos = useContext(ModPosContext);

  const calcBonus = () => {
    if (prof === true) {
      return val + profbonus;
    } else {
      return val;
    }
  }

  return ( 
    <div className="savingThrow">
      <input type="checkbox" checked={prof}></input>
      <span>{name}</span>
      <DiceRollButton name={name} rolltype="Saving Throw" die="20" num="1" mod={calcBonus()} text={modPos(calcBonus(), false)} setRollResults={setRollResults}/>
    </div>
  );
}

export default SavingThrow;