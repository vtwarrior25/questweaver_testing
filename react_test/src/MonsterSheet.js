import { useEffect, useState } from 'react';
import MonsterGroup from "./MonsterGroup";
import MonsterGroupForm from "./MonsterGroupForm";
import ManualDiceRoller from './ManualDiceRoller';


function MonsterSheet({setRollResults}) {

  /*
  const [selectedencounter, setSelectedEncounter] = useState({
    encountername: "Cragmaw",
    monstergroups: [
      {
        id: 0,
        name: "Goblin",
        quantity: 2,
      },
      {
        id: 1,
        name: "Goblin",
        quantity: 2,
      },
    ]
  });
  */

  //const [encounterlist, setEncounterList] = useState([]);

  const [encounters, setEncounters] = useState([
    {
      encountername: "Cragmaw",
      monstergroups: [
        {
          basicinfo: {
            name: "Jeff",
            quantity: 2,
            description: "Cragmaw",
            hitdicenum: 2,
            hitdicetype: 6,
            challengerating: 0.25,
            size: "Small",
            type: "Monster",
            alignment: "Neutral Evil",
            xpper: 50,
            xptotal: 100,
            ac: 13,
            speed: 50
          },
          abilities: {
            init: 2,
            str: 8,
            dex: 14,
            con: 10,
            int: 10,
            wis: 8,
            cha: 8,
          },
          attacks: [
            {
              name: "Scimitar",
              hit: 4,
              numdice: 1,
              dietype: 6,
              damagemod: 4,
              damagetype: "Slashing",
              hp: 0
            },
            {
              name: "Shortbow",
              hit: 4,
              numdice: 1,
              dietype: 6,
              damagemod: 4,
              damagetype: "Piercing",
              hp: 0
            },
          ],
          skills: "Stealth +6; Darkvision 60",
          ability: "Nimble Escape (Disengage or Hide as Bonus Action)",
          notes: "",
          health: [0,0,0,0,0,0,0,0]
          },
        ]
      }
  ]);

  const [encounterselected, setEncounterSelected] = useState("Cragmaw");

  /*
  useEffect(() => {
    console.log(encounters[0].encountername);
    setEncounterSelected(encounters[0].encountername);
  }, []
  );
  */

  useEffect(() => {
    // this will call the function to retrieve encounters from the server
    //getEncounters();
  }, []
  );


  useEffect(() => {
    console.log(encounters[0].encountername);
    setEncounterSelected(encounters[0].encountername);
  }, [encounters]
  );

  const getEncounters = () => {
    fetch(`http://localhost:9000/encounters`)
        .then(res => res.json())
        .then(res => setEncounters(res));
  }

  const getMonsterGroups = (encountername) => {
    console.log(encounterselected);
    console.log(encounters[0].encountername);
    console.log(encountername);
    let encountertouse = encounters.filter((encounter) => encounter.encountername === encountername);
    console.log(encountertouse);
    let monstergroups = encountertouse[0].monstergroups;
    return monstergroups;
  }

  /*
  const getEncounters = () => {
    let newencounterlist = [];
    encounters.forEach((encounter) => newencounterlist.push(encounter.encountername));
    setEncounterList([...newencounterlist]);
    console.log(newencounterlist);
  }
  */

  const updateCurrentEncounter = (value) => {
    setEncounterSelected(value);
    console.log("encounterselector");
    console.log(value);
    /*
    let newcurrentencounter = encounters.filter((encounter) => encounter.encountername === value)[0];
    console.log(newcurrentencounter);
    setSelectedEncounter({newcurrentencounter});
    console.log("monster groups")
    console.log(selectedencounter.monstergroups);
    */
  }
  

  return ( 
    <div className="monsterSheet">
      <div className="monsterSheetTopBar frontElement">
        <div className="encounterSelectorSection">
          <label htmlFor="encounterSelector">Encounter</label>
          <select className="encounterSelector" name="encounterSelector" value={encounterselected} onChange={((e) => updateCurrentEncounter(e.target.value))}>
            {encounters.map((encounter, index) => 
              <option key={index} value={encounter.encounternamename}>{encounter.encountername}</option>
            )}
          </select>
        </div>
        <div className="monsterSheetManualRollSection">
        <ManualDiceRoller setRollResults={setRollResults} vertical={false} nice={false}></ManualDiceRoller>
        </div>
      </div>
      <div className="monsterGroupDisplaySection">
        {getMonsterGroups(encounterselected).map((monstergroup) => <MonsterGroup key={monstergroup.id} monsterinfo={monstergroup} setRollResults={setRollResults}/>)}
        <MonsterGroupForm></MonsterGroupForm>
      </div>
    </div>
  );
}

export default MonsterSheet;