import { Stack, Button, Tab, Tabs } from 'react-bootstrap';
import ActionsMenu from './ActionsMenu';
import SpellsMenu from './SpellsMenu';
import InventoryMenu from './InventoryMenu';
import NotesMenu from './NotesMenu';
import FeaturesMenu from './FeaturesMenu';

function CharacterInventoryArea({setRollResults}) {
  return ( 
    <div className="characterInventoryArea frontElement">
      <Tabs defaultActiveKey='actions'>
        <Tab eventKey='actions' title="Actions">  
          <ActionsMenu setRollResults={setRollResults}></ActionsMenu>
        </Tab>
        <Tab eventKey='spells' title="Spells">
          <SpellsMenu></SpellsMenu>
        </Tab>
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
  );
}

export default CharacterInventoryArea;