import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';

function ManageSpells() {

  const [spelllist, setEquipmentList] = useState([
    {
      name: "Longsword",
      description: "Proficiency with a longsword allows you to add your proficiency bonus to the attack roll for any attack you make with it. ",
    },
    {
      name: "Longbow",
      description: "This is the longbow description",
    },
  ]);

  const [preparedspells, setPreparedSpells] = useState([
    {
      name: "Longsword",
      description: "Proficiency with a longsword allows you to add your proficiency bonus to the attack roll for any attack you make with it. ",
    },
    {
      name: "Longbow",
      description: "This is the longbow description",
    },
  ])

  const [searchlistdropdownshidden, setSearchListDropdownsHidden] = useState([]);
  const [preparedlistdropdownshidden, setPreparedListDropdownsHidden] = useState([]);

  const [searchterm, setSearchTerm] = useState("");
  const [foundspells, setFoundSpells] = useState(spelllist);

  const filter = (e) => {
    const keyword = e.target.value;
    if (keyword !== '') {
      const results = spelllist.filter((spell) => {
        return spell.name.toLowerCase().indexOf(keyword.toLowerCase()) > -1;
      });
      setFoundSpells(results);
    } else {
      setFoundSpells(spelllist);
    }
  } 

  const toggleSearchDropdown = (index) => {
    let newdropdowns = [...searchlistdropdownshidden];
    newdropdowns[index] = !newdropdowns[index];
    setSearchListDropdownsHidden(newdropdowns);
  }

  const togglePreparedDropdown = (index) => {
    let newdropdowns = [...preparedlistdropdownshidden];
    newdropdowns[index] = !newdropdowns[index];
    setPreparedListDropdownsHidden(newdropdowns);
  }

  useEffect(() => {
    spelllist.forEach((spell, index) => setSearchListDropdownsHidden[index] = false);
  }, [spelllist],
  );

  useEffect(() => {
    preparedspells.forEach((spell, index) => setPreparedListDropdownsHidden[index] = false);
  }, [preparedspells],
  );

  const prepSpell = (spell) => {
    console.log("prepspell");
    // This should add a spell to prepared
  }

  const unprepSpell = (spell) => {
    console.log("prepspell");
    // This should remove a spell from prepared
  }

  return ( 
      <div className='manageSpellsMenu frontElement'>
        <input placeholder="Search.." onChange={(e) => filter(e)}></input>
        <div className='searchSpellList'>
          {spelllist && spelllist.length > 0 && (
            foundspells.map((spell, index) => 
            <div key={index}>
            <div className="preparedSpellListItem" key={index} onClick={() => toggleSearchDropdown(index)}>
              <span>{spell.name}</span>
              <Button variant="secondary" size='sm' onClick={() => {prepSpell(spell)}}>Prepare</Button>
            </div>
            {searchlistdropdownshidden[index] && 
              <div className='preparedSpellListItemDropdown'>
                <span>Description: {spell.description}</span>
                <div className='preparedSpellListItemDropdownControls'>
                  <Button variant="secondary" size='sm' onClick={() => {prepSpell(spell)}}>Prepare</Button>
                </div>
              </div>}
          </div>
            )
          )}
        </div>
        <span>Prepared Spells</span>
        <div className='preparedSpellList'>
        {/* TODO see if we need to have entries in this list for each combination of spell and level*/}
        {preparedspells && preparedspells.length > 0 && 
          preparedspells.map((prepspell, index) => 
          <div key={index}>
            <div className="preparedSpellListItem" key={index} onClick={() => togglePreparedDropdown(index)}>
              <span>{prepspell.name}</span>
              <Button variant="secondary" size='sm' onClick={() => {unprepSpell(prepspell)}}>Unprepare</Button>
            </div>
            {preparedlistdropdownshidden[index] && 
              <div className='preparedSpellListItemDropdown'>
                <span>Description: {prepspell.description}</span>
                <div className='preparedSpellListItemDropdownControls'>
                  <Button variant="secondary" size='sm' onClick={() => {unprepSpell(prepspell)}}>Unprepare</Button>
                </div>
              </div>}
          </div>
        )}
        </div>
      </div>
  );
}

export default ManageSpells;