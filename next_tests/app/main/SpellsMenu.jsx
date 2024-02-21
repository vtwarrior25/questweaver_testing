import { Button, Table, Overlay } from "react-bootstrap";
import { useState, useEffect, useRef } from "react";
import DiceRollButton from "./DiceRollButton";
import SpellsLevelSection from "./SpellsLevelSection";
import ManageSpells from "./ManageSpells";


function SpellsMenu({setRollResults}) {

  const [showmanagespells, setShowManageSpells] = useState(false);
  const target = useRef(null);

  const [spelllevels, setSpellLevels] = useState([]); 

  const [spellinfo, setSpellInfo] = useState({
    castmodifier: 4,
    spellattackmod: 7,
    savedc: 15,
    spellslots: {
      0: 0,
      1: 4,
      2: 3,
    }
  });

  const [spells, setSpells] = useState([
    {
      level: 0,
      name: "Guidance",
      timetocast: "1A",
      range: "Touch",
      hitdcroll: false,
      hitdc: "",
      effect: "Buff",
      effectdie: 0,
      effectdienum: 0,
      effectdiemod: 0,
      notes: "D: 1m, V/S",
    },
    {
      level: 0,
      name: "Light",
      timetocast: "1A",
      range: "Touch",
      hitdcroll: false,
      hitdc: "Dex",
      effect: "Creation",
      effectdie: 0,
      effectdienum: 0,
      notes: "D: 1m, V/S",
    },
    {
      level: 0,
      name: "Sacred Flame",
      timetocast: "1A",
      range: "60 ft",
      hitdcroll: false,
      hitdc: "Dex",
      effect: "Damage",
      effectdie: 8,
      effectdienum: 2,
      effectdiemod: 0,
      notes: "D: 1m, V/S",
    },
    {
      level: 1,
      name: "Bless",
      timetocast: "1A",
      range: "30 ft",
      hitdcroll: false,
      hitdc: "",
      effect: "Buff",
      effectdie: 0,
      effectdienum: 0,
      effectdiemod: 0,
      notes: "D: 1m, V/S/M",
    },
    {
      level: 1,
      name: "Cure Wounds",
      timetocast: "1A",
      range: "30 ft",
      hitdcroll: false,
      hitdc: "",
      effect: "Heal",
      effectdie: 8,
      effectdienum: 1,
      effectdiemod: 7,
      notes: "D: 1m, V/S",
    },
  ]);

  useEffect(() => {
    getSpells();
    getLevels();
  }, []
  );

  // Gets spells from the server
  const getSpells = () => {
    console.log("Getting spells!");
  }

  const getLevels = () => {
    /*
    spells.forEach((spell) => {
      if (!spelllevels.includes(spell.level)) {
        setSpellLevels([...spelllevels, spell.level]);
      }});
      */
    setSpellLevels([0, 1]);
  }

  const addSpells = () => {
    console.log("This will handle adding spells from the manage spells menu");
  }


  const handleCast = () => {

  }


  return ( 
    <div className="spellsMenu characterInventoryAreaSection">
      <div className="spellsMenuHeader">
        <div className="spellsMenuHeaderInfoBox">
          <div className="spellsMenuHeaderStat">
            {/* TODO reformat this later */}
            <span>Modifier</span>
            <span>{spellinfo.castmodifier}</span>
          </div>
          <div className="spellsMenuHeaderStat">
            <span>Spell Attack</span>
            <span>{spellinfo.spellattackmod}</span>
          </div>
          <div className="spellsMenuHeaderStat">
            <span>Save DC</span>
            <span>{spellinfo.savedc}</span>
          </div>
        </div>
        <div>
          <Button variant='secondary' size='sm' ref={target} onClick={() => setShowManageSpells(!showmanagespells)}>Manage Spells</Button>
          <Overlay target={target.current} show={showmanagespells} placement='bottom'>
            <div className='manageInventoryOverlay'>
              <ManageSpells addSpells={addSpells}></ManageSpells>
            </div>
          </Overlay>
        </div>
      </div>
      <div className="spellsSection">
        {spelllevels && spelllevels.map((spelllevel, index) => <SpellsLevelSection  key={index} level={spelllevel} numspellslots={spellinfo.spellslots[`${spelllevel}`]} savedc={spellinfo.savedc} spells={spells.filter((spell) => (spell.level === spelllevel))} setRollResults={setRollResults}></SpellsLevelSection>)}
      </div>
    </div>
  );
}

export default SpellsMenu;

//setSelectAbilities(selectabilities.filter(item => item !== a || item === '-'));
