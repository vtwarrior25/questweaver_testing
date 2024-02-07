import DiceRollButton from "./DiceRollButton";
import { useContext } from "react";
import { ModPosContext } from "./Contexts";

function SavingThrow({name, prof, val, setRollResults}) {

  const modPos = useContext(ModPosContext);

  return ( 
    <div className="savingThrow">
      <input type="checkbox" value={prof}></input>
      <span>{name}</span>
      <DiceRollButton name={name} rolltype="Saving Throw" die="20" num="1" mod={val} text={modPos(val, false)} setRollResults={setRollResults}/>
    </div>
  );
}

export default SavingThrow;