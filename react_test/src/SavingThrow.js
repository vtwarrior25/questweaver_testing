import DiceRollButton from "./DiceRollButton";

function SavingThrow({name, prof, val, setRollResults}) {
  return ( 
    <div className="savingThrow">
      <input type="checkbox" value={prof}></input>
      <span>{name}</span>
      <DiceRollButton name={name} rolltype="Saving Throw" die="20" num="1" mod={val} text={val} setRollResults={setRollResults}/>
    </div>
  );
}

export default SavingThrow;