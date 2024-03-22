import { Button, Table, Overlay } from "react-bootstrap";
import { useState, useEffect, useRef, useContext} from "react";
import { getPreparedSpells } from "../lib/spellactions";
import DiceRollButton from "./DiceRollButton";
import SpellsLevelSection from "./SpellsLevelSection";
import ManageSpells from "./ManageSpells";
import { PlayerCharacterContext } from './Contexts';


function SpellsMenu({setRollResults}) {
  const playercharacterid = useContext(PlayerCharacterContext);

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
      hitdc: "n/a",
      hitdcdie: 0,
      hitdcdienum: 0,
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
      hitdcdie: 0,
      hitdcdienum: 0,
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
      hitdcdie: 0,
      hitdcdienum: 0,
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
      hitdc: "",
      hitdcdie: 0,
      hitdcdienum: 0,
      effect: "Buff",
      effectdamage: true,
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
      hitdcdie: 0,
      hitdcdienum: 0,
      effect: "Heal",
      effectdie: 8,
      effectdienum: 1,
      effectdiemod: 4,
      notes: "D: 1m, V/S",
    },
  ]);


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
    //
  }

  const prepSpell = (spellname) => {
    // This should add a spell to prepared
    console.log("prepspell " + spellname);
    setPreparedSpell(playercharacterid, spellname);
    getPreparedSpells()
    .then((result => {
      setSpells([...result]);
    }))
    .catch((error) => {
      console.log(error);
      console.log("Error retrieving prepared spells");
    });
  }

  const unprepSpell = (spellname) => {
    // This should remove a spell from prepared
    console.log("unprepspell " + spellname);
    unsetPreparedSpell(playercharacterid, spellname);
    setSpells()
    .then((result => {
      setPreparedSpells([...result]);
    }))
    .catch((error) => {
      console.log(error);
      console.log("Error retrieving prepared spells");
    });
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
              <ManageSpells addSpells={addSpells} preparedspells={spells} spelllist={spelllist}></ManageSpells>
            </div>
          </Overlay>
        </div>
      </div>
      <div className="spellsSection">
        {spelllevels && spelllevels.map((spelllevel, index) => <SpellsLevelSection  key={index} level={spelllevel} numspellslots={spellinfo.spellslots[`${spelllevel}`]} savedc={spellinfo.savedc} spells={spells.filter((spell) => (spell.level === spelllevel))} setRollResults={setRollResults} unprepSpell={unprepSpell}></SpellsLevelSection>)}
      </div>
    </div>
  );
}

export default SpellsMenu;

//setSelectAbilities(selectabilities.filter(item => item !== a || item === '-'));
