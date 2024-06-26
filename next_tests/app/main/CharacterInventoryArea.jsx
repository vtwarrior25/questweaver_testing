import { useState, useEffect, useContext } from 'react';
import { Stack, Button, Tab, Tabs } from 'react-bootstrap';
import ActionsMenu from './ActionsMenu';
import SpellsMenu from './SpellsMenu';
import InventoryMenu from './InventoryMenu';
import NotesMenu from './NotesMenu';
import FeaturesMenu from './FeaturesMenu';
import { ActionUpdateContext, PlayerCharacterContext } from './Contexts';
import { getCharacterAttacks } from '../lib/attackactions';
import { doesClassHaveSpells } from '../lib/spellactions';

function CharacterInventoryArea({setRollResults}) {
  const playercharacterid = useContext(PlayerCharacterContext);
  const [doesclasshavespells, setDoesClassHaveSpells] = useState(false);
  const [actions, setActions] = useState([
    {
      name: "Mace",
      range: "5 ft",
      hitdc: 5,
      effectdie: 12,
      effectdienum: 1,
      effectbonus: 3,
      effecttype: 'Bludgeoning',
      notes: "Simple",
    },
    {
      name: "Dagger",
      range: "20 (60)",
      hitdc: 6,
      effectdie: 4,
      effectdienum: 1,
      effectbonus: 3,
      effecttype: 'Piercing',
      notes: "Simple, Light, Thrown",
    },
    {
      name: "Unarmed Strike",
      range: "5 ft",
      hitdc: 5,
      effectdie: 0,
      effectdienum: 0,
      effectbonus: 4,
      effecttype: 'Bludgeoning',
      notes: "",
    },
  ]); 
  const [bonusactions, setBonusActions] = useState([
    /*
    {
      name: "Mace",
      range: "5 ft",
      hitdc: 5,
      effectdie: 12,
      effectdienum: 1,
      effectbonus: 3,
      notes: "Simple",
    },
    */
  ]);

  const updateActions = () => {
    getCharacterAttacks(playercharacterid)
    .then((result) => {
      setActions([...result]);
    }).catch((error) => {
      console.error("Error retrieving character attacks: " + error);
    })
  }


  useEffect(() => {
    updateActions();
    doesClassHaveSpells(playercharacterid)
    .then((result) => {
      setDoesClassHaveSpells(result);
    }).catch((error) => {
      console.error("Error checking if character class has spells: " + error);
    }) 
  }, [playercharacterid],
  );
  

  return ( 
    <ActionUpdateContext.Provider value={updateActions}>
    <div className="characterInventoryArea frontElement">
      <Tabs defaultActiveKey='actions'>
        <Tab eventKey='actions' title="Actions">  
          <ActionsMenu actions={actions} bonusactions={bonusactions}></ActionsMenu>
        </Tab>
        {doesclasshavespells && 
        <Tab eventKey='spells' title="Spells">
          <SpellsMenu></SpellsMenu>
        </Tab>
        }
        <Tab eventKey='inventory' title="Inventory">
          <InventoryMenu></InventoryMenu>
        </Tab>
        <Tab eventKey='features' title="Features">
          <FeaturesMenu></FeaturesMenu>
        </Tab>
        <Tab eventKey='notes' title="Notes">
          <NotesMenu></NotesMenu>
        </Tab>
      </Tabs>
    </div>
    </ActionUpdateContext.Provider>
  );
}

export default CharacterInventoryArea;