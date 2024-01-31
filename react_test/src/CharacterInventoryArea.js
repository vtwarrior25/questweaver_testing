import { Stack, Button, Tab, Tabs } from 'react-bootstrap';
import ActionsMenu from './ActionsMenu';

function CharacterInventoryArea({setRollResults}) {
  return ( 
    <div className="characterInventoryArea frontElement">
      <Tabs defaultActiveKey='actions'>
        <Tab eventKey='actions' title="Actions">  
          <ActionsMenu setRollResults={setRollResults}></ActionsMenu>
        </Tab>
        <Tab eventKey='spells' title="Spells">
          Spells
        </Tab>
        <Tab eventKey='inventory' title="Inventory">
          Inventory
        </Tab>
        <Tab eventKey='features' title="Features">
          Features
        </Tab>
        <Tab eventKey='notes' title="Notes">
          Notes
        </Tab>
      </Tabs>
    </div>
  );
}

export default CharacterInventoryArea;