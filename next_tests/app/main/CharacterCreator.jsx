import { useState, useEffect } from "react";
import { Nav, Tab, Tabs, Table, Button } from "react-bootstrap";
import AbilityBox from "./AbilityBox";
import AbilitySection from "./AbilitySection";
import { createCharacter } from "../lib/createcharacter";
import { getCharacterClassInfo } from '../lib/getcharactercreatorinfo';

function CharacterCreator() {
  const initialScores = { STR: 0, DEX: 0, CON: 0, INT: 0, WIS: 0, CHA: 0 };
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [error, setError] = useState(null);
  const [abilityScores, setAbilityScores] = useState(initialScores);
  const [tempValues, setTempValues] = useState([0, 0, 0, 0, 0, 0]);
  const [selectedAbilities, setSelectedAbilities] = useState(
    Array(6).fill("-")
  );

  const handleSelectionChange = (index, value) => {
    const newSelections = [...selectedAbilities];
    newSelections[index] = value;
    setSelectedAbilities(newSelections);
  };

  const getDropdownOptions = (currentIndex) => {
    return [
      "-",
      ...["STR", "DEX", "CON", "INT", "WIS", "CHA"].filter(
        (ability) =>
          !selectedAbilities.includes(ability) ||
          selectedAbilities[currentIndex] === ability
      ),
    ];
  };

  const updateAbilityScores = () => {
    const newScores = { ...abilityScores };
    selectedAbilities.forEach((ability, index) => {
      if (ability !== "-") {
        newScores[ability] = diceRolls[index] || newScores[ability];
      }
    });
    setAbilityScores(newScores);

    setSelectedAbilities(Array(6).fill("-"));
  };

  const [abilities, setAbilities] = useState([
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
    ],
  });
  //class tab
  const fetchData = async () => {
    try {
        const classData = await getCharacterClassInfo();
        console.log("Fetched class data:", classData); 
        setClasses(classData);
        if (classData.length > 0) {
            setSelectedClass(classData[0]);
        }
    } catch (error) {
        console.error("Failed to fetch class data:", error);
    }
};

const handleSelectClass = (classItem) => {
    setSelectedClass(classItem);
};
  //class tab 


  const rollDice = () => {
    const rolls = Array.from(
      { length: 4 },
      () => Math.floor(Math.random() * 6) + 1
    );
    const sum = rolls
      .sort((a, b) => b - a)
      .slice(0, 3)
      .reduce((total, current) => total + current, 0);
    return sum;
  };

  const [diceRolls, setDiceRolls] = useState(Array(6).fill(0));

  const handleRollClick = (index) => {
    const result = rollDice();

    const updatedRolls = [...diceRolls];
    updatedRolls[index] = result;
    setDiceRolls(updatedRolls);
  };

  useEffect(() => {
    setAbilities();
  }, [abilities]);

  // This function should hide the option currently selected by each dropdown from the list of options of the other dropdowns, and should show the options again when they aren't selected anywhere
  const updateSelections = (e) => {
    let a = e.target.value;
    //setDropdownValues([]);
    setSelectAbilities(
      selectabilities.filter((item) => item !== a || item === "-")
    );
    console.log(a);
  };

  const updateTextArea = (sectionname, text) => {
    let sections = charactercreatordata.descriptions.filter(
      (section) => section.sectionname !== sectionname
    );
    let order = charactercreatordata.descriptions.filter(
      (section) => section.sectionname === sectionname
    )[0].order;
    let modsection = {
      order: order,
      sectionname: sectionname,
      sectiontext: text,
    };
    setCharacterCreatorData();
    setCharacterCreatorData({
      ...charactercreatordata,
      descriptions: [...sections, modsection].sort((a, b) => {
        return a.order - b.order;
      }),
    });
  };

  return (
    <div className="characterCreator">
      <Tabs
        className="characterCreatorTabs frontElement"
        defaultActiveKey="race"
      >
        <Tab eventKey="race" title="Race">
          <div className="characterCreatorSection characterCreatorRace frontElement">
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
                    <Table size="sm">
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
                <Tab.Pane eventKey="dwarf"></Tab.Pane>
                <Tab.Pane eventKey="hilldwarf"></Tab.Pane>
                <Tab.Pane eventKey="mountaindwarf"></Tab.Pane>
                <Tab.Pane eventKey="high elf"></Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </div>
        </Tab>
        <Tab eventKey="class" title="Class">
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{ flex: 1, overflow: 'auto' }}>
                {classes.map((classItem) => (
                    <div key={classItem.classid} style={{ padding: '10px', border: '1px solid black', margin: '5px', cursor: 'pointer' }} onClick={() => handleSelectClass(classItem)}>
                        {classItem.name}
                    </div>
                ))}
            </div>
            <div style={{ flex: 3, overflow: 'auto', padding: '10px', border: '1px solid black', marginLeft: '5px' }}>
                {selectedClass ? (
                    <>
                        <h3>{selectedClass.name}</h3>
                        <p><strong>Description:</strong> {selectedClass.description}</p>
                        <p><strong>Hit Points at 1st Level:</strong> {selectedClass.hitpoints1stlevel}</p>
                        <p><strong>Hit Points at Higher Levels:</strong> {selectedClass.hitpointshigherlevel}</p>
                        {/* Display other class details as needed */}
                        <h4>Subclasses:</h4>
                        <ul>
                            {selectedClass.subclasses && selectedClass.subclasses.map((subclass) => (
                                <li key={subclass.subclassid}>{subclass.name}: {subclass.description}</li>
                            ))}
                        </ul>
                    </>
                ) : (
                    <p>Please select a class to see its details.</p>
                )}
            </div>
        </div>
        </Tab>
        <Tab eventKey="abilities" title="Abilities">
          <div className="characterCreator">
            <div className="abilityScoresDisplay">
              {Object.entries(abilityScores).map(([ability, score], index) => (
                <div className="abilityScoreBox" key={index}>
                  <div className="abilityName">{ability}</div>
                  <div className="abilityScore">{score}</div>
                </div>
              ))}
            </div>
            <div className="abilityContainer abilityContainerRoll frontElement">
              <div className="diceRollContainer"></div>
              {tempValues.map((temp, index) => (
                <div className="abilityBox" key={index}>
                  <Button onClick={() => handleRollClick(index)}>
                    {diceRolls[index] > 0 ? diceRolls[index] : "Roll"}
                  </Button>
                  <select
                    value={selectedAbilities[index]}
                    onChange={(e) =>
                      handleSelectionChange(index, e.target.value)
                    }
                  >
                    {getDropdownOptions(index).map((ability, idx) => (
                      <option key={idx} value={ability}>
                        {ability}
                      </option>
                    ))}
                  </select>
                </div>
              ))}

              <Button onClick={updateAbilityScores}>Set Value</Button>
            </div>
          </div>
        </Tab>
        <Tab eventKey="equipment" title="Equipment"></Tab>
        <Tab eventKey="description" title="Description">
          <div className="notesMenu frontElement">
            {charactercreatordata.descriptions.map((notessection, index) => (
              <div key={index} className="notesSection">
                <span>{notessection.sectionname}</span>
                <textarea
                  onChange={(e) =>
                    updateTextArea(notessection.sectionname, e.target.value)
                  }
                  defaultValue={notessection.sectiontext}
                ></textarea>
              </div>
            ))}
            <Button
              onClick={() => {
                createCharacter(charactercreatordata);
              }}
            >
              Create Character
            </Button>
          </div>
        </Tab>
      </Tabs>
    </div>
  );
}

export default CharacterCreator;
