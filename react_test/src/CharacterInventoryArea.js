import { Stack, Button, Tab, Tabs } from 'react-bootstrap';

function CharacterInventoryArea() {
  return ( 
    <div className="characterInventoryArea frontElement">
      <Tabs defaultActiveKey='actions'>
        <Tab eventKey='actions' title="Actions">  
          Actions
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