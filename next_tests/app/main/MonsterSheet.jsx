import { useEffect, useState } from 'react';
import MonsterGroup from "./MonsterGroup";
import MonsterGroupForm from "./MonsterGroupForm";
import ManualDiceRoller from './ManualDiceRoller';
import { addGroupFromForm, getEncounters} from '../lib/monster';


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
            id: 0,
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
            speed: 50,
            skills: "Stealth +6; Darkvision 60",
            features: "Nimble Escape (Disengage or Hide as Bonus Action)",
            notes: "",
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
              name: "Slap",
              hit: 4,
              numdice: 1,
              dietype: 6,
              damagemod: 4,
              damagetype: "Slashing",
            },
            {
              name: "Shortbow",
              hit: 4,
              numdice: 1,
              dietype: 6,
              damagemod: 4,
              damagetype: "Piercing",
            },
            {
              name: "",
              hit: 0,
              numdice: 0,
              dietype: 0,
              damagemod: 0,
              damagetype: "Piercing",
            },
            {
              name: "",
              hit: 0,
              numdice: 0,
              dietype: 0,
              damagemod: 0,
              damagetype: "Piercing",
            },
          ],
          health: [0,0,0,0,0,0,0,0]
          },
        ]
      },
      {
        encountername: "Your Mom's House",
        monstergroups: [
          {
            basicinfo: {
              id: 0,
              name: "Bob",
              quantity: 2,
              description: "On Your Head",
              hitdicenum: 2,
              hitdicetype: 6,
              challengerating: 0.25,
              size: "Small",
              type: "Monster",
              alignment: "Neutral Evil",
              xpper: 50,
              xptotal: 100,
              ac: 13,
              speed: 50,
              skills: "Stealth +6; Darkvision 60",
              features: "Nimble Escape (Disengage or Hide as Bonus Action)",
              notes: "",
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
                name: "Slap",
                hit: 4,
                numdice: 1,
                dietype: 6,
                damagemod: 4,
                damagetype: "Slashing",
              },
              {
                name: "Shortbow",
                hit: 4,
                numdice: 1,
                dietype: 6,
                damagemod: 4,
                damagetype: "Piercing",
              },
              {
                name: "",
                hit: 0,
                numdice: 0,
                dietype: 0,
                damagemod: 0,
                damagetype: "Piercing",
              },
              {
                name: "",
                hit: 0,
                numdice: 0,
                dietype: 0,
                damagemod: 0,
                damagetype: "Piercing",
              },
            ],
            health: [0,0,0,0,0,0,0,0]
            },
            {
              basicinfo: {
                id: 0,
                name: "Bob",
                quantity: 2,
                description: "On Your Head",
                hitdicenum: 2,
                hitdicetype: 6,
                challengerating: 0.25,
                size: "Small",
                type: "Monster",
                alignment: "Neutral Evil",
                xpper: 50,
                xptotal: 100,
                ac: 13,
                speed: 50,
                skills: "Stealth +6; Darkvision 60",
                features: "Nimble Escape (Disengage or Hide as Bonus Action)",
                notes: "",
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
                  name: "Slap",
                  hit: 4,
                  numdice: 1,
                  dietype: 6,
                  damagemod: 4,
                  damagetype: "Slashing",
                },
                {
                  name: "Shortbow",
                  hit: 4,
                  numdice: 1,
                  dietype: 6,
                  damagemod: 4,
                  damagetype: "Piercing",
                },
                {
                  name: "",
                  hit: 0,
                  numdice: 0,
                  dietype: 0,
                  damagemod: 0,
                  damagetype: "Piercing",
                },
                {
                  name: "",
                  hit: 0,
                  numdice: 0,
                  dietype: 0,
                  damagemod: 0,
                  damagetype: "Piercing",
                },
              ],
              health: [0,0,0,0,0,0,0,0]
              }
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
    getEncounters()
    .then((result) => {
      setEncounters([...result]);
    })
    .catch((error) => {
      console.error("Error getting encounters from database: " + error);
    })
  }, []
  );


  useEffect(() => {
    //console.log(encounters[0].encountername);
    if (encounters.length > 0) {
      setEncounterSelected(encounters[0].encountername);
    }
  }, [encounters]
  );

  /*
  const getEncounters = () => {
    fetch(`http://localhost:9000/encounters`)
        .then(res => res.json())
        .then(res => setEncounters(res));
  }
  */

  const getMonsterGroups = (encountername) => {
    let monstergroups;
    let encountertouse = encounters.filter((encounter) => encounter.encountername === encountername);
    if (encountertouse !== null && encountertouse.length > 0) {
      monstergroups = encountertouse[0].monstergroups;
    }
    return monstergroups;
  }


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

  // TODO test this code more
  const removeMonsterGroup = (monsterinfo, encountername) => { 
    console.log("starting to remove monstergroup");
    // Grab the encounter with the same name, and grab the first array element if there are multiple encounters with the same name
    let theencounter = encounters.filter((encounter) => encounter.encountername === encountername)[0];
    // Grab all other encounters
    let otherencounters = encounters.filter((encounter) => !encounter.encountername === encountername)
    // Grab all monster groups in the encounter except for the one we want to remove
    let newmonstergroups = theencounter.monstergroups.filter((monstergroup) => monstergroup === monsterinfo);
    // Set filtered array of monster groups to monstergroups in copied encounter
    theencounter.monstergroups = newmonstergroups;
    // Set encounters to all other encounters and modified encounter
    setEncounters([otherencounters, theencounter]); 
    removeMonsterGroup()
    .catch((error) => {
      console.error("Failed to remove monster group: " + error);
    });

  } 

  /*
  const removeTurnOrderItem = (nametoremove, initiative) => {
    setTurnOrder(turnorder.filter((turn) => turn.name !== nametoremove || turn.initiative !== initiative))
  }
  */

  const addMonsterGroup = (encounter, monstergroup) => {
    console.log(encounter);
    if (encounters.length >= 1) {
      let encounterindex = encounters.findIndex((e) => {e.encountername.trim() === encounter.trim()}); // TODO this line is failing, for some reason it doesn't match strings correctly
      console.log(encounterindex);
      console.log(monstergroup);
      //let encounterlist = encounters.filter((e) => {e.encountername === encounter}) ?? [];
      if (encounterindex >= 0) {
        console.log("We are here!!");
        // If there are encounters with the name, add the new monster group to that encounter
        let newencounters = {...encounters}
        console.log(newencounters);
        newencounters[encounterindex].monstergroups = [...newencounters[encounterindex].monstergroups, {...monstergroup}];
        console.log(newencounters);
        setEncounters(newencounters);
        //setEncounters(...encounters, encounters[encounterindex].monstergroups: [...encounters[encounterindex].monstergroups, monstergroup])
      } else {
        // If there aren't encounters with the name add the monster group to a new encounter
        console.log(encounters);
        console.log("We are here2!!");
        let newencounter = {
          encountername: encounter,
          monstergroups: [
            {...monstergroup}
          ]
        }
        //console.log([...encounters, newencounter]);
        console.log(encounters);
        setEncounters([...encounters, newencounter]);
      }
    } else {
      console.log("We are here3!!");
        let newencounter = {
          encountername: encounter,
          monstergroups: [
            {...monstergroup}
          ]
        }
        setEncounters([...encounters, newencounter]);
    }
    addGroupFromForm(monstergroup, encounter)
    .catch((error) => {
      console.error("Error adding monster group to database: " + error);
    })
  }

  return ( 
    <div className="monsterSheet">
      <div className="monsterSheetTopBar frontElement">
        <div className="encounterSelectorSection">
          <label htmlFor="encounterSelector">Encounter</label>
          <select className="encounterSelector" name="encounterSelector" value={encounterselected} onChange={((e) => updateCurrentEncounter(e.target.value))}>
            {encounters && encounters.length > 0 && encounters.map((encounter, index) => 
              <option key={index} value={encounter.encountername}>{encounter.encountername}</option>
            )}
          </select>
        </div>
        <div className="monsterSheetManualRollSection">
        <ManualDiceRoller setRollResults={setRollResults} vertical={false} nice={false}></ManualDiceRoller>
        </div>
      </div>
      <div className="monsterGroupDisplaySection">
        {getMonsterGroups(encounterselected) && getMonsterGroups(encounterselected).map((monstergroup, index) => 
          <MonsterGroup key={index} encounter={encounterselected} monsterinfo={monstergroup} removeMonsterGroup={removeMonsterGroup} setRollResults={setRollResults}/>
        )}
        <MonsterGroupForm encounters={encounters} addMonsterGroup={addMonsterGroup}></MonsterGroupForm>
      </div>
    </div>
  );
}

export default MonsterSheet;