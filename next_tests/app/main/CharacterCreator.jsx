import { useState, useEffect, useContext } from "react";
import { Nav, Tab, Tabs, Table, Button } from "react-bootstrap";
import { PlayerCharacterContext, UserIDContext } from "./Contexts";
import AbilityBox from "./AbilityBox";
import AbilitySection from "./AbilitySection";
import { createCharacter } from "../lib/createcharacter";
import {
  getCharacterClassInfo,
  getCharacterCreatorInfo,
  updateCharacterAbilityScores,
} from "../lib/getcharactercreatorinfo";

function CharacterCreator() {
  const userid = useContext(UserIDContext);
  const playercharacterid = useContext(PlayerCharacterContext);

  const initialScores = { STR: 0, DEX: 0, CON: 0, INT: 0, WIS: 0, CHA: 0 };
  const [raceData, setRaceData] = useState({
    subracesWithRaces: [],
    racesWithoutSubraces: [],
  });
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [error, setError] = useState(null);
  const [abilityScores, setAbilityScores] = useState(initialScores);
  const [tempValues, setTempValues] = useState([0, 0, 0, 0, 0, 0]);
  const [playerCharacterId, setPlayerCharacterId] = useState(null);
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
    skillproficiencies: [],
    equipment: [],
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
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCharacterClassInfo();
        setClasses(data);
        if (data.length > 0) {
          setSelectedClass(data[0]);
        }
      } catch (error) {
        console.error("Failed to fetch class data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSelectClass = (classItem) => {
    setSelectedClass(classItem);
  };
  //class tab

  //race tab

  useEffect(() => {
    const fetchRaceData = async () => {
      try {
        const data = await getCharacterCreatorInfo();
        console.log("Fetched data:", data); 
        setRaceData(data);
      } catch (error) {
        console.error("Failed to fetch race data:", error);
      }
    };

    fetchRaceData();
  }, []);

  //race tab


  //ability tab

  const updateAbilityScores = async () => {
    const calculateModifier = (score) => Math.floor((score - 10) / 2);
  
    let newScores = { ...abilityScores };
    let abilitiesToUpdate = [];
  
    selectedAbilities.forEach((ability, index) => {
      if (ability !== "-") {
        const score = diceRolls[index];
        newScores[ability] = score;
        abilitiesToUpdate.push({
          abilityid: getAbilityId(ability), // Implement getAbilityId to map abilities to IDs
          score: score,
          modifier: calculateModifier(score),
        });
      }
    });
  
    // Update local state
    setAbilityScores(newScores);
    setSelectedAbilities(Array(6).fill("-"));
  
    // Update database (ensure playerCharacterId is set properly in your state)
    try {
      await updateCharacterAbilityScores(playerCharacterId, abilitiesToUpdate);
      console.log('Abilities successfully updated in database');
    } catch (error) {
      console.error('Error updating abilities in database:', error);
    }
  };
  

  const getAbilityId = (abilityName) => {
    const mapping = {
      STR: 1,
      DEX: 2,
      CON: 3,
      INT: 4,
      WIS: 5, 
      CHA: 6,
    };
  
    return mapping[abilityName];
  };
  
  //ability tab
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
    <Tab.Container defaultActiveKey="firstRaceOrSubraceKey">
      <Nav variant="pills" className="flex-column">
        {raceData.subracesWithRaces.map((subrace, index) => (
          <Nav.Item key={index}>
            <Nav.Link eventKey={subrace.subrace_name.toLowerCase().replace(/\s+/g, '')}>{subrace.subrace_name}</Nav.Link>
          </Nav.Item>
        ))}
        {raceData.racesWithoutSubraces.map((race, index) => (
          <Nav.Item key={index}>
            <Nav.Link eventKey={race.name.toLowerCase().replace(/\s+/g, '')}>{race.name}</Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
      <Tab.Content>
        {raceData.subracesWithRaces.concat(raceData.racesWithoutSubraces).map((item, index) => (
          <Tab.Pane key={index} eventKey={(item.subrace_name || item.name).toLowerCase().replace(/\s+/g, '')}>
            <div className="characterCreatorTabContent">
              <h3>{item.subrace_name || item.name}</h3>
              <ul>
                {item.features && item.features.map((feature, featureIndex) => (
                  <li key={featureIndex}>{feature.name}: {feature.description}</li>
                ))}
                {raceData.racesWithoutSubraces.map((race, index) => (
                  <Nav.Item key={index}>
                    <Nav.Link
                      eventKey={race.name.toLowerCase().replace(/\s+/g, "")}
                    >
                      {race.name}
                    </Nav.Link>
                  </Nav.Item>
                ))}
              </Nav>
              <Tab.Content>
                {raceData.subracesWithRaces
                  .concat(raceData.racesWithoutSubraces)
                  .map((item, index) => (
                    <Tab.Pane
                      key={index}
                      eventKey={(item.subrace_name || item.name)
                        .toLowerCase()
                        .replace(/\s+/g, "")}
                    >
                      <div className="characterCreatorTabContent">
                        <h3>{item.subrace_name || item.name}</h3>
                        <ul>
                          {item.features &&
                            item.features.map((feature, featureIndex) => (
                              <li key={featureIndex}>
                                {feature.name}: {feature.description}
                              </li>
                            ))}
                        </ul>
                      </div>
                    </Tab.Pane>
                  ))}
              </Tab.Content>
            </Tab.Container>
          </div>
        </Tab>

        <Tab eventKey="class" title="Class">
  <Tab.Container defaultActiveKey="firstClassKey">
    <div
      className="characterCreatorSection characterCreatorClass frontElement"
      style={{ display: "flex", flexDirection: "row" }}
    >
      <Nav
        variant="pills"
        className="flex-column classNav"
        style={{ minWidth: "200px" }}
      >
        {classes.map((classItem, index) => (
          <Nav.Item key={classItem.classid}>
            <Nav.Link
              eventKey={classItem.name.toLowerCase().replace(/\s+/g, "")}
            >
              {classItem.name}
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
      <Tab.Content className="classContent">
        {classes.map((classItem) => (
          <Tab.Pane
            key={classItem.classid}
            eventKey={classItem.name.toLowerCase().replace(/\s+/g, "")}
          >
            <div className="characterCreatorTabContent">
              <h3>{classItem.name}</h3>
              <p><strong>Hit Points at 1st Level:</strong> {classItem.hitpoints1stlevel}</p>
              <p><strong>Hit Points at Higher Levels:</strong> {classItem.hitpointshigherlevel}</p>
              <p><strong>Description:</strong> {classItem.description}</p>
              <div className="subclassesSection">
                <h4>Subclasses:</h4>
                <ul>
                  {classItem.subclasses && classItem.subclasses.map((subclass) => (
                    <li key={subclass.subclassid}>
                      {subclass.name}: {subclass.description}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Tab.Pane>
        ))}
      </Tab.Content>
    </div>
  </Tab.Container>
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
