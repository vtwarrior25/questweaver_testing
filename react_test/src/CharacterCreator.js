import { useState, useEffect } from 'react';
import { Nav, Tab, Tabs, Table, Button } from 'react-bootstrap';
import AbilityBox from './AbilityBox';
import AbilitySection from './AbilitySection';

function CharacterCreator() {
  
  const [tempvalues, settempvalues] = useState([0,0,0,0,0,0]); 

  const [selectabilities, setSelectAbilities] = useState(["-", "STR", "DEX", "CON", "INT", "WIS", "CHA"]);

  const [abilities, setAbilityScores] = useState([
    {
      abilityname: "Strength",
      abilityabbrev: "STR",
      abilityscore: 0,
      abilitybonus: 0,
    },
    {
      abilityname: "Dexterity",
      abilityabbrev: "DEX",
      abilityscore: 0,
      abilitybonus: 0,
    },
    {
      abilityname: "Constitution",
      abilityabbrev: "CON",
      abilityscore: 0,
      abilitybonus: 0,
    },
    {
      abilityname: "Intelligence",
      abilityabbrev: "INT",
      abilityscore: 0,
      abilitybonus: 0,
    },
    {
      abilityname: "Wisdom",
      abilityabbrev: "WIS",
      abilityscore: 0,
      abilitybonus: 0,
    },
    {
      abilityname: "Charisma",
      abilityabbrev: "CHA",
      abilityscore: 0,
      abilitybonus: 0,
    },
  ]);

  useEffect(() => {
    setAbilities();
    }, [abilities]
  );


  const setAbilities = () => {
    console.log("Setting ability scores on server");
  }

  // This function should hide the option currently selected by each dropdown from the list of options of the other dropdowns, and should show the options again when they aren't selected anywhere
  const updateSelections = (e) => {
    let a = e.target.value;
    setSelectAbilities(selectabilities.filter(item => item !== a || item === '-'));
    
    console.log(a);
  }


  const setAbilityValues = () => {
    
  }

  return (  
    <div className="characterCreator">
      <Tabs className='characterCreatorTabs frontElement' defaultActiveKey="race">
        <Tab eventKey="race" title="Race">
          <div className='characterCreatorSection characterCreatorRace frontElement'>
            <Tab.Container defaultActiveKey="dragonborn">
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="dragonborn">Dragonborn</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="dwarf">Dwarf</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="hilldwarf">Hill Dwarf</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="mountaindwarf">Mountain Dwarf</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="highelf">High Elf</Nav.Link>
                </Nav.Item>
              </Nav>
              <Tab.Content>
                <Tab.Pane className="characterCreatorTabContent" eventKey="dragonborn">
                  <div className="characterCreatorTabContent">
                    <Table size='sm'>
                      <thead>
                        <tr>
                          <th>Dragon</th>
                          <th>Damage Type</th>
                          <th>Breath Weapon</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Black</td>
                          <td>Acid</td>
                          <td>5 by 30 ft. line (Dex save)</td>
                        </tr>
                        <tr>
                          <td>Blue</td>
                          <td>Lightning</td>
                          <td>5 by 30 ft. line (Dex save)</td>
                        </tr>
                        <tr>
                          <td>Brass</td>
                          <td>Fire</td>
                          <td>5 by 30 ft. line (Dex save)</td>
                        </tr>
                        <tr>
                          <td>Bronze</td>
                          <td>Lightning</td>
                          <td>5 by 30 ft. line (Dex save)</td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="dwarf">

                </Tab.Pane>
                <Tab.Pane eventKey="hilldwarf">

                </Tab.Pane>
                <Tab.Pane eventKey="mountaindwarf">

                </Tab.Pane>
                <Tab.Pane eventKey="high elf">

                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </div>
        </Tab>
        <Tab eventKey="class" title="Class">

        </Tab>
        <Tab eventKey="abilities" title="Abilities">
          <div className='characterCreatorSection characterCreatorAbilities frontElement'>
            <div className="abilityContainer abilityContainerDisplay frontElement">
              {abilities.map((ability, index) => 
                <div className="abilityBox" key={index}>
                  <div className="abilityLabel">{ability.abilityabbrev}</div>
                  <div className="abilityModDisplay">{ability.abilityscore}</div>
                  <div className="oval">
                    <h4>{ability.abilitybonus}</h4>
                  </div>
                </div>
              )}
            </div>
            <div className="abilityContainer abilityContainerRoll frontElement">
              {tempvalues.map((temp, index) => 
                <div className="abilityBox" key={index}>
                  <Button>{temp}</Button>
                  <select onChange={(e) => {updateSelections(e)}}>
                    {selectabilities.map((ability, index) => <option key={index} value={ability}>{ability}</option>)}
                  </select>
                </div>
              )}
              <Button onClick={() => {setAbilityValues()}}>Set</Button>
            </div>
          </div>
        </Tab>
        <Tab eventKey="equipment" title="Equipment">

        </Tab>
        <Tab eventKey="description" title="Description">

        </Tab>
      </Tabs>
    </div>
  );
}

export default CharacterCreator;