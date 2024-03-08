import { useState, useEffect } from 'react';
import { Nav, Tab, Tabs, Table, Button } from 'react-bootstrap';
import AbilityBox from './AbilityBox';
import AbilitySection from './AbilitySection';
import { createCharacter } from '../lib/createcharacter';

function CharacterCreator() {
  
  const [tempvalues, settempvalues] = useState([0,0,0,0,0,0]); 

  const [dropdownvalues, setDropdownValues] = useState(["-", "-", "-", "-", "-", "-"])

  const [selectabilities, setSelectAbilities] = useState(["-", "STR", "DEX", "CON", "INT", "WIS", "CHA"]);
/*
  const [selectabilities, setSelectAbilities] = useState([
    ["-", "STR", "DEX", "CON", "INT", "WIS", "CHA"],
    ["-", "STR", "DEX", "CON", "INT", "WIS", "CHA"],
    ["-", "STR", "DEX", "CON", "INT", "WIS", "CHA"],
    ["-", "STR", "DEX", "CON", "INT", "WIS", "CHA"],
    ["-", "STR", "DEX", "CON", "INT", "WIS", "CHA"],
    ["-", "STR", "DEX", "CON", "INT", "WIS", "CHA"],
  ]);
*/
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


  const [charactercreatordata, setCharacterCreatorData] = useState({
    race: "",
    subrace: "",
    class: "",
    subclass: "",
    abilities: {
      strength: 10,
      dexterity: 10,
      constitution: 10,
      intelligence: 10,
      wisdom: 10,
      charisma: 10,
    },
    skillproficiencies: [

    ],
    equipment: [

    ],
    descriptions: [
      {
        order: 0,
        sectionname: "Organizations",
        sectiontext: "Epic beans action to the maximum moments scenario",
      },
      {
        order: 1,
        sectionname: "Allies",
        sectiontext: "Epic beans action to the maximum moments scenario",
      },
      {
        order: 2,
        sectionname: "Enemies",
        sectiontext: "Epic beans action to the maximum moments scenario",
      },
      {
        order: 3,
        sectionname: "Backstory",
        sectiontext: "Epic beans action to the maximum moments scenario",
      },
      {
        order: 4,
        sectionname: "Other",
        sectiontext: "Epic beans action to the maximum moments scenario",
      },
    ]
  })


  const [classes, setClasses] = useState([
    {

    },
    {

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
    //setDropdownValues([]);
    setSelectAbilities(selectabilities.filter(item => item !== a || item === '-'));
    console.log(a);
  }


  const setAbilityValues = () => {
    
  }

  const updateTextArea = (sectionname, text) => {
    let sections = charactercreatordata.descriptions.filter((section) => section.sectionname !== sectionname);
    let order = charactercreatordata.descriptions.filter((section) => section.sectionname === sectionname)[0].order;
    let modsection = {
      order: order,
      sectionname: sectionname,
      sectiontext: text,
    }
    setCharacterCreatorData()
    setCharacterCreatorData({...charactercreatordata, descriptions: [...sections, modsection].sort((a,b) => {return a.order - b.order})});
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
                <Tab.Pane eventKey="dragonborn">
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
                  <select onChange={(e) => {updateSelections(e, index)}}>
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
          <div className="notesMenu frontElement">
            {charactercreatordata.descriptions.map((notessection, index) =>
            <div key={index} className="notesSection">
              <span>{notessection.sectionname}</span>
              <textarea onChange={(e) => updateTextArea(notessection.sectionname, e.target.value)} defaultValue={notessection.sectiontext}></textarea>
            </div>
            )}
            <Button onClick={() => {createCharacter(charactercreatordata)}}>Create Character</Button>
          </div>
        </Tab>
      </Tabs>
    </div>
  );
}

export default CharacterCreator;