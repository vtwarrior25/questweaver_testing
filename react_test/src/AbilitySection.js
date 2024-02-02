import React, { useState, useEffect } from "react";
import AbilityBox from './AbilityBox'

function AbilitySection ({setRollResults, rollresults}) {
  
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
    fetch(`http://localhost:9000/getcharacterinfo?infotype=ability`)
        .then(res => res.json())
        .then(res => setAbilities(res));
    console.log(abilities);
  }
  
  useEffect(() => {
    getAbilities();
  }, []
  );
  

  return (
      <div className="abilityContainer frontElement">
        {abilities.map((ability, index) => <AbilityBox key={index} name={ability.abilityname} abbrev={ability.abilityabbrev} score={ability.abilityscore} bonus={ability.abilitybonus} setRollResults={setRollResults} rollresults={rollresults}/>)}
      </div>
  );
};

export default AbilitySection;