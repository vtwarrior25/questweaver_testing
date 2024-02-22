import React, { useState, useEffect, useContext } from "react";
import AbilityBox from './AbilityBox'
import { ModPosContext, PlayerCharacterContext} from "./Contexts";
import { getcharacterinfo } from "./getcharacterinfo";

/*
export async function getServerSideProps () {
  console.log("We are vibin brothers");
  const res = await fetch("http://localhost:9000/getcharacterinfo?infotype=ability");
  const repo = await res.json();
  return { props: {abilities} };
}
*/

function AbilitySection ({setRollResults, rollresults}) {
  const playercharacterid = useContext(PlayerCharacterContext);

  const [abilities, setAbilities] = useState([
    {
      abilityname: "Strength",
      abilityabbrev: "STR",
      abilityscore: 12,
      abilitybonus: 3,
    },
    {
      abilityname: "Dexterity",
      abilityabbrev: "DEX",
      abilityscore: 12,
      abilitybonus: 2,
    },
    {
      abilityname: "Constitution",
      abilityabbrev: "CON",
      abilityscore: 12,
      abilitybonus: 2,
    },
    {
      abilityname: "Intelligence",
      abilityabbrev: "INT",
      abilityscore: 12,
      abilitybonus: -1,
    },
    {
      abilityname: "Wisdom",
      abilityabbrev: "WIS",
      abilityscore: 12,
      abilitybonus: +1,
    },
    {
      abilityname: "Charisma",
      abilityabbrev: "CHA",
      abilityscore: 12,
      abilitybonus: 0,
    },
  ]);

  
  const getAbilities = () => {
  /*
  fetch(`http://localhost:3000/api/getcharacterinfo?infotype=ability`)
      .then(res => res.json())
      .then(res => setAbilities(res));
  console.log(abilities);
  */
  getcharacterinfo(playercharacterid, 'ability')
  .then(results => setAbilities(results));
  }
  
  useEffect(() => {
    getAbilities();
  }, []
  );
  
  

  return (
      <div className="abilityContainer characterAbilityContainer frontElement">
        {abilities.map((ability, index) => <AbilityBox key={index} name={ability.abilityname} abbrev={ability.abilityabbrev} score={ability.abilityscore} bonus={ability.abilitybonus} setRollResults={setRollResults} rollresults={rollresults}/>)}
      </div>
  );
};

export default AbilitySection;