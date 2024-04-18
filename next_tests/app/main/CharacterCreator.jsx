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
  addItemsToCharacterInventory,
} from "../lib/getcharactercreatorinfo";

function CharacterCreator() {
  const [selectedBardWeapon, setSelectedBardWeapon] = useState("");
  const [selectedWeapon, setSelectedWeapon] = useState("");
  const [equipmentIdMapping, setEquipmentIdMapping] = useState({});
  const [selectedPack, setSelectedPack] = useState("");
  const [selectedInstrument, setSelectedInstrument] = useState("");
  const [isLeatherArmorSelected, setIsLeatherArmorSelected] = useState(true);
  const [twoHandaxesSelected, setTwoHandaxesSelected] = useState(false);
  const [simpleWeaponSelected, setSimpleWeaponSelected] = useState(false);
  const [selectedSimpleWeapon, setSelectedSimpleWeapon] = useState("");
  const [explorersPackSelected, setExplorersPackSelected] = useState(true);
  const [greataxeSelected, setGreataxeSelected] = useState(false);
  const [martialWeaponSelected, setMartialWeaponSelected] = useState(false);
  const [selectedMartialWeapon, setSelectedMartialWeapon] = useState("");
  const userid = useContext(UserIDContext);
  const playercharacterid = useContext(PlayerCharacterContext);
  const [selectedEquipmentClass, setSelectedEquipmentClass] = useState(null);
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

  const martialWeapons = [
    "Glaive",
    "Longsword",
    "Battleaxe",
    "Flail",
    "Greataxe",
    "Greatsword",
    "Halberd",
    "Lance",
    "Maul",
    "Morningstar",
    "Pike",
    "Rapier",
    "Scimitar",
    "Shortsword",
    "Trident",
    "War Pick",
    "Warhammer",
    "Whip",
  ];

  const simpleWeapons = [
    "Dagger",
    "Club",
    "Greatclub",
    "Handaxe",
    "Javelin",
    "Light Hammer",
    "Mace",
    "Quarterstaff",
    "Sickle",
    "Spear",
    "Crossbow, light",
    "Dart",
    "Shortbow",
    "Sling",
    "Boomerang",
    "Yklwa",
  ];

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

  const [classEquipment, setClassEquipment] = useState({
    Barbarian: [
      {
        id: 0,
        type: 'radio',
        options: [
          {
            name: 'Greataxe'
          },
          {
            type: 'dropdown',
            dropdowndata: 'martialMelee',
            selected: '',
          }
        ],
      },
      {
        id: 1,
        type: 'radioset',
        name: 'greatAxeOrMartialMelee',
        options: [
          {
            type: 'radiobutton'
            name: 'Two greataxes',
          },
          {
            type: 'dropdown',
            dropdowndata: 'simple',
            selected: '',
          }
        ],
      },
      {
        id: 2,
        type: 'checkbox',
        name: "Explorer's pack",
        checked: false
      }
    ],
  }); 


  // Fetch class data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCharacterClassInfo();
        setClasses(data);
        if (data.length > 0) {
          setSelectedClass(data[0]); // Set the default selected class
        }
      } catch (error) {
        console.error("Failed to fetch class data:", error);
      }
    };

    fetchData();
  }, []);

  // Handle class selection
  const handleSelectClass = (classItem) => {
    setSelectedClass(classItem);
  };

  // Handle choosing class
  // This function is called when a class is selected
  const handleChooseClass = (classItem) => {
    setSelectedClass(classItem.name);
    setSelectedEquipmentClass(classItem);
  };

  //equipment
  const handleGreataxeChange = () => {
    setGreataxeSelected(!greataxeSelected); // Toggle the greataxe selected state
    if (greataxeSelected || martialWeaponSelected) {
      setMartialWeaponSelected(false); // Ensure only one can be true at a time
      setSelectedMartialWeapon(""); // Reset the martial weapon selection
    }
  };

  const handleMartialWeaponChange = () => {
    setMartialWeaponSelected(!martialWeaponSelected); // Toggle the martial weapon selected state
    if (martialWeaponSelected || greataxeSelected) {
      setGreataxeSelected(false); // Ensure only one can be true at a time
    }
  };

  const handleTwoHandaxesChange = (e) => {
    const isChecked = e.target.checked;
    setTwoHandaxesSelected(isChecked);
    if (isChecked) {
      setSimpleWeaponSelected(false);
      setSelectedSimpleWeapon("");
      // Also reset the greataxe and martial weapon selections
      setGreataxeSelected(false);
      setMartialWeaponSelected(false);
      setSelectedMartialWeapon("");
    }
  };

  const handleSimpleWeaponChange = (e) => {
    const isChecked = e.target.checked;
    setSimpleWeaponSelected(isChecked);
    if (isChecked) {
      setTwoHandaxesSelected(false);
      // Also reset the greataxe and martial weapon selections
      setGreataxeSelected(false);
      setMartialWeaponSelected(false);
      setSelectedMartialWeapon("");
    }
  };

  // Handle changes for greataxe and martial weapon
  const handleWeaponChange = (weaponType) => {
    if (weaponType === "greataxe") {
      setGreataxeSelected(!greataxeSelected);
      if (martialWeaponSelected) {
        setMartialWeaponSelected(false);
      }
    } else if (weaponType === "martialWeapon") {
      setMartialWeaponSelected(!martialWeaponSelected);
      if (greataxeSelected) {
        setGreataxeSelected(false);
      }
    }

    // Reset the selections for the other group
    setTwoHandaxesSelected(false);
    setSimpleWeaponSelected(false);
    setSelectedSimpleWeapon("");
  };

  // Handle changes for two handaxes and simple weapon
  const handleSimpleWeaponGroupChange = (weaponType) => {
    if (weaponType === "twoHandaxes") {
      setTwoHandaxesSelected(!twoHandaxesSelected);
      setSimpleWeaponSelected(false);
    } else if (weaponType === "simpleWeapon") {
      setSimpleWeaponSelected(!simpleWeaponSelected);
      setTwoHandaxesSelected(false);
    }

    // Reset the selections for the other group
    setGreataxeSelected(false);
    setMartialWeaponSelected(false);
    setSelectedMartialWeapon("");
  };
  const handlePackChange = (packType) => {
    setSelectedPack(packType);
  };

  const handleInstrumentChange = (instrumentType) => {
    setSelectedInstrument(instrumentType);
  };
  const handleBardWeaponChange = (weaponType) => {
    if (selectedBardWeapon === weaponType) {
      setSelectedBardWeapon("");
    } else {
      setSelectedBardWeapon(weaponType);
    }
  };

  useEffect(() => {
    const fetchEquipmentIds = async () => {
      try {
        const result = await db.many('SELECT itemid, name FROM item;');
        const mapping = result.reduce((acc, item) => {
          acc[item.name.toLowerCase()] = item.itemid;
          return acc;
        }, {});
        setEquipmentIdMapping(mapping);
      } catch (error) {
        console.error("Error fetching equipment IDs:", error);
      }
    };

    fetchEquipmentIds();
  }, []);

  const addEquipmentToInventory = async () => {
    const equipmentToAdd = [];


    if (greataxeSelected) {
      equipmentToAdd.push({ itemId: equipmentIdMapping['greataxe'], quantity: 1 });
    }
    try {
    
      await addItemsToCharacterInventory(playercharacterid, equipmentToAdd);
      alert('Equipment added to inventory!');
    } catch (error) {
      console.error("Error adding equipment to inventory:", error);
    }
  };

  

  const renderEquipment = () => {
    if (selectedClass === "Barbarian") {
      return (
        <div className="equipmentContainer">
          <div className="equipmentBox">
            <h3>Barbarian Starting Equipment</h3>
            {/* Greataxe and Martial Weapon Section */}
            <div className="optionBox">
              <label className="custom-checkbox">
                <input
                  type="checkbox"
                  checked={greataxeSelected}
                  onChange={handleGreataxeChange}
                />
                <span className="weaponLabel">a greataxe</span>
              </label>
              <label className="custom-checkbox">
                <input
                  type="checkbox"
                  checked={martialWeaponSelected}
                  onChange={handleMartialWeaponChange}
                />
                <span className="weaponLabel">any martial melee weapon</span>
                {martialWeaponSelected && (
                  <div className="dropdownContainer">
                    <select
                      value={selectedMartialWeapon}
                      onChange={(e) => setSelectedMartialWeapon(e.target.value)}
                    >
                      <option value="">Select Martial Weapon</option>
                      {martialWeapons.map((weapon, index) => (
                        <option key={index} value={weapon}>
                          {weapon}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </label>
            </div>

            {/* Two Handaxes and Simple Weapon Section */}
            <div className="optionBox">
              <label className="custom-checkbox">
                <input
                  type="checkbox"
                  checked={twoHandaxesSelected}
                  onChange={handleTwoHandaxesChange}
                />
                <span className="weaponLabel">two handaxes</span>
              </label>
              <label className="custom-checkbox">
                <input
                  type="checkbox"
                  checked={simpleWeaponSelected}
                  onChange={handleSimpleWeaponChange}
                />
                <span className="weaponLabel">any simple weapon</span>
                {simpleWeaponSelected && (
                  <div className="dropdownContainer">
                    <select
                      value={selectedSimpleWeapon}
                      onChange={(e) => setSelectedSimpleWeapon(e.target.value)}
                    >
                      <option value="">Select Simple Weapon</option>
                      {simpleWeapons.map((weapon, index) => (
                        <option key={index} value={weapon}>
                          {weapon}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </label>
            </div>

            {/* Explorer's Pack Section */}
            <div className="optionBox">
              <label className="custom-checkbox">
                <input
                  type="checkbox"
                  checked={explorersPackSelected}
                  onChange={() =>
                    setExplorersPackSelected(!explorersPackSelected)
                  }
                />
                <span className="weaponLabel">
                  An explorer’s pack and four javelins
                </span>
              </label>
            </div>

            {/* Description for the Explorer's Pack */}
            {explorersPackSelected && (
              <div className="explorersPackDescription">
                Includes a backpack, a bedroll, a mess kit, a tinderbox, 10
                torches, 10 days of rations, and a waterskin. The pack also has
                50 feet of hempen rope strapped to the side of it.
              </div>
            )}
          </div>
        </div>
      );
    } else if (selectedClass === "Bard") {
      return (
        <div className="equipmentContainer">
          <div className="equipmentBox">
            <h3>Bard Starting Equipment</h3>
            <div className="optionBox">
              {/* Weapon selection */}
              <label className="custom-checkbox">
                <input
                  type="checkbox"
                  checked={selectedBardWeapon === "rapier"}
                  onChange={() => handleBardWeaponChange("rapier")}
                />
                <span className="weaponLabel">a rapier</span>
              </label>
              <label className="custom-checkbox">
                <input
                  type="checkbox"
                  checked={selectedBardWeapon === "longsword"}
                  onChange={() => handleBardWeaponChange("longsword")}
                />
                <span className="weaponLabel">a longsword</span>
              </label>
              <label className="custom-checkbox">
  <input
    type="checkbox"
    checked={selectedBardWeapon === "simpleWeapon"}
    onChange={() => handleBardWeaponChange("simpleWeapon")}
  />
  <span className="weaponLabel">any simple weapon</span>
</label>
{selectedBardWeapon === "simpleWeapon" && (
  <div className="dropdownContainer">
    <select
      value={selectedSimpleWeapon}
      onChange={(e) => setSelectedSimpleWeapon(e.target.value)}
    >
      <option value="">Select Simple Weapon</option>
      {simpleWeapons.map((weapon, index) => (
        <option key={index} value={weapon}>{weapon}</option>
      ))}
    </select>
  </div>
)}
            </div>

            {/* Pack selection */}
            <div className="optionBox">
              <label className="custom-checkbox">
                <input
                  type="checkbox"
                  checked={selectedPack === "diplomat"}
                  onChange={() => handlePackChange("diplomat")}
                />
                <span className="weaponLabel">a diplomat's pack</span>
              </label>
              <label className="custom-checkbox">
                <input
                  type="checkbox"
                  checked={selectedPack === "entertainer"}
                  onChange={() => handlePackChange("entertainer")}
                />
                <span className="weaponLabel">an entertainer's pack</span>
              </label>
            </div>

            {/* Instrument selection */}
            <div className="optionBox">
              <label className="custom-checkbox">
                <input
                  type="checkbox"
                  checked={selectedInstrument === "lute"}
                  onChange={() => handleInstrumentChange("lute")}
                />
                <span className="weaponLabel">a lute</span>
              </label>
              <label className="custom-checkbox">
                <input
                  type="checkbox"
                  checked={selectedInstrument === "otherInstrument"}
                  onChange={() => handleInstrumentChange("otherInstrument")}
                />
                <span className="weaponLabel">
                  any other musical instrument
                </span>
              </label>
            </div>

            {/* Leather armor selection */}
            <div className="optionBox">
              <label className="custom-checkbox">
                <input
                  type="checkbox"
                  checked={isLeatherArmorSelected}
                  onChange={() =>
                    setIsLeatherArmorSelected(!isLeatherArmorSelected)
                  }
                />
                <span className="weaponLabel">leather armor and a dagger</span>
              </label>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };


  const renderOption = (option) => {
    if (option.type === 'dropdown') {
      return (
        <select className="dropdownContainer">

        </select>
      )
    } else if (option.type === 'radioset') {
      return (
        <fieldset>
          {option.options.map((radio, index) => (
            <div key={index} className="characterCreatorRadioOption">
              {renderOption(radio.type)}
            </div>
          ))}
        </fieldset>
      )
    } else if (option.type === 'checkbox') {
      return (
        <label className="custom-checkbox">
          <input
            type="checkbox"
            checked={isLeatherArmorSelected}
            onChange={() =>
              setIsLeatherArmorSelected(!isLeatherArmorSelected)
            }
          />
          <span className="weaponLabel">leather armor and a dagger</span>
        </label>
      )        
    } else if (option.type === 'radiobutton') {
      return (
        <div className="option">
          <input type="radio" name=""></input>
          <label>{option.name}</label>
        </div>
      )
    }
  }


  const setItemChecked = () => {

  }

  const renderEquipmentTwo = () => {
    //let equipmentdata = classEquipment[selectedClass];
    let equipmentdata = classEquipment['Barbarian'];
    return (
      {equipmentdata.map((option, index) => (
        <div key={index} className='optionBox'>
          {renderOption(option)}
        </div>
      ))}
    );
  };

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
          abilityid: getAbilityId(ability),
          score: score,
          modifier: calculateModifier(score),
        });
      }
    });

    // Update local state
    setAbilityScores(newScores);
    setSelectedAbilities(Array(6).fill("-"));

    // Update database
    try {
      await updateCharacterAbilityScores(playercharacterid, abilitiesToUpdate);
      console.log(abilitiesToUpdate);
      console.log("Abilities successfully updated in database");
    } catch (error) {
      console.error("Error updating abilities in database:", error);
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
                    <Nav.Link
                      eventKey={subrace.subrace_name
                        .toLowerCase()
                        .replace(/\s+/g, "")}
                    >
                      {subrace.subrace_name}
                    </Nav.Link>
                  </Nav.Item>
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
          <Tab.Container defaultActiveKey="barbarian">
            <div
              className="characterCreatorSection characterCreatorClass frontElement"
              style={{ display: "flex", flexDirection: "row" }}
            >
              <Tab.Container defaultActiveKey="firstClassKey">
                <div style={{ display: "flex", width: "100%" }}>
                  <Nav
                    variant="pills"
                    className="flex-column"
                    style={{ minWidth: "200px" }}
                  >
                    {classes.map((classItem, index) => (
                      <Nav.Item key={index}>
                        <Nav.Link
                          eventKey={classItem.name
                            .toLowerCase()
                            .replace(/\s+/g, "")}
                          onClick={() => handleSelectClass(classItem)}
                        >
                          {classItem.name}
                        </Nav.Link>
                      </Nav.Item>
                    ))}
                  </Nav>
                  <Tab.Content style={{ flex: 1, paddingLeft: "20px" }}>
                    {classes.map((classItem) => (
                      <Tab.Pane
                        key={classItem.classid}
                        eventKey={classItem.name
                          .toLowerCase()
                          .replace(/\s+/g, "")}
                      >
                        <div className="characterCreatorTabContent">
                          <h3>{classItem.name}</h3>
                          <p>
                            <strong>Description:</strong>{" "}
                            {classItem.description}
                          </p>
                          <p>
                            <strong>Hit Points at 1st Level:</strong>{" "}
                            {classItem.hitpoints1stlevel}
                          </p>
                          <p>
                            <strong>Hit Points at Higher Levels:</strong>{" "}
                            {classItem.hitpointshigherlevel}
                          </p>
                          <h4>Subclasses:</h4>
                          <ul>
                            {classItem.subclasses &&
                              classItem.subclasses.map((subclass) => (
                                <li key={subclass.subclassid}>
                                  {subclass.name}: {subclass.description}
                                </li>
                              ))}
                          </ul>

                          <Button onClick={() => handleChooseClass(classItem)}>
                            Choose Class
                          </Button>
                        </div>
                      </Tab.Pane>
                    ))}
                  </Tab.Content>
                </div>
              </Tab.Container>
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
        <Tab eventKey="equipment" title="Equipment">
          {renderEquipment()}
          <Button onClick={addEquipmentToInventory}>Add Equipment to Inventory</Button>
        </Tab>
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
            <Button>
              Create Character
            </Button>
          </div>
        </Tab>
      </Tabs>
    </div>
  );
}

export default CharacterCreator;
