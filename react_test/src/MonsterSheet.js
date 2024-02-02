import { useEffect, useState } from 'react';
import MonsterGroup from "./MonsterGroup";
import MonsterGroupForm from "./MonsterGroupForm";
import ManualDiceRoller from './ManualDiceRoller';


function MonsterSheet({setRollResults}) {

  const [monstergroups, setMonsterGroups] = useState([
    {
      id: 0,
      name: "Goblin",
      quantity: 2,
    },
  ]);

  return ( 
    <div className="monsterSheet">
      <div className="monsterSheetTopBar frontElement">
        <div className="encounterSelectorSection">
          <label htmlFor="encounterSelector">Encounter</label>
          <select className="encounterSelector" name="encounterSelector">
            <option value="cragmaw">Cragmaw</option>
          </select>
        </div>
        <div className="monsterSheetManualRollSection">
        <ManualDiceRoller setRollResults={setRollResults} vertical={false} nice={false}></ManualDiceRoller>
        </div>
      </div>
      <div className="monsterGroupDisplaySection">
        {monstergroups.map((monstergroup) => <MonsterGroup key={monstergroup.id} monsterinfo={monstergroup}/>)}
        <MonsterGroupForm></MonsterGroupForm>
      </div>
    </div>
  );
}

export default MonsterSheet;