import { useEffect, useState, useContext } from 'react';
import { Button } from 'react-bootstrap';
import { PlayerCharacterContext } from './Contexts';
import { getSpellList, getPreparedSpells, setPreparedSpell, unsetPreparedSpell } from '../lib/spellactions';


function ManageSpells() {
  const playercharacterid = useContext(PlayerCharacterContext);

  const [spelllist, setSpellList] = useState([
    {
      name: "Guidance",
      description: "It shows you the way, man",
    },
    {
      name: "Light",
      description: "Light, it's bright",
    },
    {
      name: "Sacred Flame",
      description: "Burn moment.",
    },
    {
      name: "Bless",
      description: "Bless up, life is roblox.",
    },
    {
      name: "Cure Wounds",
      description: "Like a hospital.",
    },
  ]);

  const [preparedspells, setPreparedSpells] = useState([
    {
      name: "Guidance",
      description: "It shows you the way, man",
    },
    {
      name: "Light",
      description: "Light, it's bright",
    },
    {
      name: "Sacred Flame",
      description: "Burn moment.",
    },
    {
      name: "Bless",
      description: "Bless up, life is roblox.",
    },
    {
      name: "Cure Wounds",
      description: "Like a hospital.",
    }
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

  /*
  useEffect(() => {
    // Get spell list and prepared spells lists
    getSpellList(playercharacterid)
    .then(results => setSpellList(results))
    .catch((error) => {console.error("Error getting spell list" + error)});
    getPreparedSpells(playercharacterid)
    .then(results => setPreparedSpells(results))
    .catch((error) => {console.error("Error getting prepared spells" + error)});
  }, [playercharacterid],
  );
  */
  

  useEffect(() => {
    spelllist ?? spelllist.forEach((spell, index) => setSearchListDropdownsHidden[index] = false);
  }, [spelllist],
  );

  useEffect(() => {
    preparedspells ?? preparedspells.forEach((spell, index) => setPreparedListDropdownsHidden[index] = false);
  }, [preparedspells],
  );

  const prepSpell = (spellname) => {
    // This should add a spell to prepared
    console.log("prepspell");
    setPreparedSpell(playercharacterid, spellname);
    getPreparedSpells()
    .then((result => {
      setPreparedSpells([...result]);
    }))
    .catch((error) => {
      console.log(error);
      console.log("Error retrieving prepared spells");
    });
  }

  const unprepSpell = (spellname) => {
    // This should remove a spell from prepared
    console.log("prepspell");
    unsetPreparedSpell(playercharacterid, spellname);
    getPreparedSpells()
    .then((result => {
      setPreparedSpells([...result]);
    }))
    .catch((error) => {
      console.log(error);
      console.log("Error retrieving prepared spells");
    });
  }
  

  return ( 
      <div className='manageSpellsMenu frontElement'>
        <input placeholder="Search.." onChange={(e) => filter(e)}></input>
        <div className='searchSpellList'>
          {spelllist && spelllist.length > 0 && (
            foundspells.map((spell, index) => 
            <div key={index}>
            <div className="spellListItem" key={index}>
              <span onClick={() => toggleSearchDropdown(index)}>{spell.name}</span>
              <Button variant="secondary" size='sm' onClick={() => {prepSpell(spell.name)}}>Prepare</Button>
            </div>
            {searchlistdropdownshidden[index] && 
              <div className='preparedSpellListItemDropdown'>
                <span>Description: {spell.description}</span>
                <div className='preparedSpellListItemDropdownControls'>
                  <Button variant="secondary" size='sm' onClick={() => {prepSpell(spell.name)}}>Prepare</Button>
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
            <div className="spellListItem" key={index} onClick={() => togglePreparedDropdown(index)}>
              <span>{prepspell.name}</span>
              <Button variant="secondary" size='sm' onClick={() => {unprepSpell(prepspell.name)}}>Unprepare</Button>
            </div>
            {preparedlistdropdownshidden[index] && 
              <div className='preparedSpellListItemDropdown'>
                <span>Description: {prepspell.description}</span>
                <div className='preparedSpellListItemDropdownControls'>
                  <Button variant="secondary" size='sm' onClick={() => {unprepSpell(prepspell.name)}}>Unprepare</Button>
                </div>
              </div>}
          </div>
        )}
        </div>
      </div>
  );
}

export default ManageSpells;