  /*
  Resources: 
  - https://stackoverflow.com/questions/19874555/how-do-i-convert-array-of-objects-into-one-object-in-javascript
  - https://bobbyhadz.com/blog/javascript-convert-object-to-array-of-objects
  */
  
  import { useState, useEffect, useContext } from "react";
  import { Nav, Tab, Tabs, Table, Button } from "react-bootstrap";
  import { CharacterInfoContext, PlayerCharacterContext, UserIDContext, CharacterAbilityScoreContext} from "./Contexts";
  import { useRouter} from 'next/navigation'

  import AbilityBox from "./AbilityBox";
  import AbilitySection from "./AbilitySection";
  import { createCharacter, checkIfPlayerExists} from "../lib/createcharacter";
  import {
    getCharacterClassInfo,
    getCharacterCreatorInfo,
    updateCharacterAbilityScores,
    addItemsToCharacterInventory,
  } from "../lib/getcharactercreatorinfo";
  import AvatarUpload from "./AvatarUpload";
  import { addFeaturesToCharacter, levelUpFeatures } from "../lib/getcharacterinfo";
  
  function CharacterCreator(loginsection) {
    const [selectedAbility1, setSelectedAbility1] = useState(null);
    const [selectedAbility2, setSelectedAbility2] = useState(null);
    const [selectedAbility3, setSelectedAbility3] = useState(null);
    const [oneortwoabilities, setOneOrTwoAbilities] = useState(1); 
    const [classInfo, setClassInfo] = useState([]);
    const characterinfo = useContext(CharacterInfoContext);
    const characterabilityscores = useContext(CharacterAbilityScoreContext);
    const [showConfirmTab, setShowConfirmTab] = useState(true);
    const router = useRouter();
    const [selectedLevel, setSelectedLevel] = useState(1);
    const [levelUpInfo, setLevelUpInfo] = useState(null);
    const [characterConfirmed, setCharacterConfirmed] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState({});
    const userid = useContext(UserIDContext);
    const playercharacterid = useContext(PlayerCharacterContext);
    const initialScores = { STR: 0, DEX: 0, CON: 0, INT: 0, WIS: 0, CHA: 0 };
    const [raceData, setRaceData] = useState({
      subracesWithRaces: [],
      racesWithoutSubraces: [],
    });
    const [classes, setClasses] = useState([]);
    const [selectedClass, setSelectedClass] = useState('Barbarian');
    const [showclasstable, showClassTable] = useState(false);
    const [equipmentForCharacter, setEquipmentForCharacter] = useState([]);
    const [dropdownvalues, setDropdownValues] = useState({});
    const [error, setError] = useState(null);
    const [abilityScores, setAbilityScores] = useState(initialScores);
    const [tempValues, setTempValues] = useState([0, 0, 0, 0, 0, 0]);
    const [selectedAbilities, setSelectedAbilities] = useState(
      Array(6).fill("-")
    );
    const [selectedskills, setSelectedSkills] = useState([]);
    const [namereadonly, setNameReadOnly] = useState(true);

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

    const handleSkillSelectionChange = (index, value) => {
      const newSelections = [...selectedskills];
      newSelections[index] = value;
      setSelectedSkills(newSelections);
    }

    const getSkillDropdownOptions = (classname, currentIndex) => {
      return [
        "-",
        ...classSkills[classname].skills.filter(
          (skill) => 
            !selectedskills.includes(skill) ||
          selectedskills[currentIndex] === skill
        ),
      ];
    }
    
    const martialWeapons = [
      "- Choose -",
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
      "- Choose -",
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

    const holySymbol = [
      "- Choose -",
      "Amulet",
      "Emblem",
      "Reqiquary",
      "Holy Symbols",
    ]


    const druidicFocus = [
      "- Choose -",
      "Sprig of Mistletoe",
      "Totem",
      "wooden Staff",
      "Yew Wand",
      "Druidic Focus",

    ]
    const arcaneFocus = [
    '- Choose -',
    'Crystal',
    'Orb',
    'Rod',
    'Staff',
    'Wand',
    'Arcane Focus'
    ]

    const musicalInstruments = [
      'Lute',
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
      name: "",
      level: 1,
      alignment: "Lawful Good",
      race: "",
      subrace: "",
      class: "",
      subclass: "",
      skillproficiencies: [],
      equipment: ["Greataxe", "Dagger"],
      abilityscores: {},
      oneortwo: 1,
      oneabilityscoreimprovement: "",
      twoabilityscoreimprovements1: "",
      twoabilityscoreimprovements2: "",
      descriptions: [
        {
          order: 0,
          sectionname: "Organizations",
          sectiontext: "",
        },
        {
          order: 1,
          sectionname: "Allies",
          sectiontext: "",
        },
        {
          order: 2,
          sectionname: "Enemies",
          sectiontext: "",
        },
        {
          order: 3,
          sectionname: "Backstory",
          sectiontext: "",
        },
        {
          order: 4,
          sectionname: "Other",
          sectiontext: "",
        },
      ],
    });

    const [classSkills, setClassSkills] = useState({
      Barbarian: {
        numskills: [0, 1],
        skills: [
          "Animal Handling",
          "Athletics",
          "Intimidation",
          "Nature",
          "Perception",
          "Survival"
        ]
      },
      Bard: {
        numskills: [0, 1, 2],
        skills: [
          'Acrobatics',
          'Animal Handling',
          'Arcana',
          'Athletics',
          'Deception',
          'History',
          'Insight',
          'Intimidation',
          'Investigation',
          'Medicine',
          'Nature',
          'Perception',
          'Performance',
          'Persuasion',
          'Religion',
          'Sleight of Hand',
          'Stealth',
          'Survival'
        ]
      },
      Cleric: {
        numskills: [0, 1],
        skills: [
          "History",
          "Insight",
          "Medicine",
          "Persuasion",
          "Religion"
        ]
      },
      Druid: {
        numskills: [0, 1],
        skills: [
          "Arcana",
          "Animal Handling",
          "Insight",
          "Medicine",
          "Nature",
          "Perception",
          "Religion",
          "Survival"
        ]
      },
      Fighter: {
        numskills: [0, 1],
        skills: [
          "Acrobatics",
          "Animal Handling",
          "Athletics",
          "History",
          "Insight",
          "Intimidation",
          "Perception",
          "Survival"
        ]
      },
      Monk: {
        numskills: [0, 1],
        skills: [
          "Acrobatics",
          "Athletics",
          "History",
          "Insight",
          "Religion",
          "Stealth",
        ]
      },
      Paladin: {
        numskills: [0, 1],
        skills: [
          "Athletics",
          "Insight",
          "Intimidation",
          "Medicine",
          "Persuasion",
          "Religion",
        ]
      },
      Ranger: {
        numskills: [0, 1, 2],
        skills: [
          "Animal Handling",
          "Athletics",
          "Insight",
          "Investigation",
          "Nature",
          "Perception",
          "Stealth",
          "Survival"
        ]
      },
      Rogue: {
        numskills: [0, 1, 2, 3],
        skills: [
          "Acrobatics",
          "Athletics",
          "Deception",
          "Insight",
          "Intimidation",
          "Investigation",
          "Perception",
          "Performance",
          "Persuasion",
          "Sleight of Hand",
          "Stealth",
        ]
      },
      Sorcerer: {
        numskills: [0, 1],
        skills: [
          "Arcana",
          "Deception",
          "Insight",
          "Intimidation",
          "Persuasion",
          "Religion",
        ]
      },
      Warlock: {
        numskills: [0, 1],
        skills: [
          "Arcana",
          "Deception",
          "History",
          "Intimidation",
          "Investigation",
          "Nature",
          "Religion",
        ]
      },
      Wizard: {
        numskills: [0, 1],
        skills: [
          "Arcana",
          "History",
          "Insight",
          "Investigation",
          "Medicine",
          "Religion",
        ]
      },
    });

    const [classEquipment, setClassEquipment] = useState({
      Barbarian: [
        {
          id: 0,
          type: 'radioset',
          name: 'greatAxeOrMartialMelee',
          options: [
            {
              type: 'radio',
              name: 'Greataxe',
            },
            {
              type: 'dropdown',
              name: 'Martial Melee',
              dropdowndata: 'martialMelee',
            },
          ],
        },
        {
          id: 1,
          type: 'radioset',
          name: 'twoHandaxesOrSimpleWeapon',
          options: [
            {
              type: 'radio',
              name: 'Two Handaxes',
            },
            {
              type: 'dropdown',
              name: 'Simple Weapon',
              dropdowndata: 'simple',
            }
          ],
        },
        {
          id: 2,
          type: 'checkbox',
          name: "Explorer's pack",
        }
      ],
      Bard: [
        {
          id: 0,
          type: 'radioset',
          name: 'rapierLongSwordSimpleWeapon',
          options: [
            {
              type: 'radio',
              name: 'Rapier',
            },
            {
              type: 'radio',
              name: 'Longsword',
            },
            {
              type: 'dropdown',
              name: 'Simple Weapon',
              dropdowndata: 'simple',
            },
          ],
        },
        {
          id: 1,
          type: 'radioset',
          name: 'Diplomat/Entertainer pack',
          options: [
            {
              type: 'radio',
              name: "Diplomat's Pack",
            },
            {
              type: 'radio',
              name: "Entertainer's Pack",
            }
          ],
        },
        {
          id: 2,
          type: 'radioset',
          name: "Musical Instrument",
          options: [
            {
              type: 'radio',
              name: "Lute",
            },
            {
              type: 'dropdown',
              name: 'Musical Instrument',
              dropdowndata: 'musicalInstruments'
            }
          ]
        },
        {
          id: 3,
          type: 'checkbox',
          name: "Leather Armor",
        },
        {
          id: 4,
          type: 'checkbox',
          name: "Dagger",
        }
      ],
       Cleric: [
    {
      id: 0,
      type: 'radioset',
      name: 'Mace/Warhammer',
      options: [
        {
          type: 'radio',
          name: 'Mace',
        },
        {
          type: 'radio',
          name: 'WarHammer',
        },
      ],
    },
    {
      id: 1,
      type: 'radioset',
      name: 'LightCrossbow/SimpleWeapon',
      options: [
        {
          type: 'radio',
          name: 'A light Crossbow and 20 bolts',
        },
        {
          type: 'dropdown',
          name: 'Simple Weapon',
          dropdowndata: 'simple',
        }
      ],
    },
    {
      id: 2,
      type: 'radioset',
      name: 'ArmorChoices',
      options: [
        {
          type: 'radio',
          name: 'scale mail',
        },
        {
          type: 'radio',
          name: 'leather armor',
        },
        {
          type: 'radio',
          name: 'chain mail',
        }
      ],
    },
    {
      id: 3,
      type: 'radioset',
      name: "PriestPack/ExplorersPack",
      options: [
        {
          type: 'radio',
          name: "Priest Pack",
        },
        {
          type: 'radio',
          name: 'Explorers Pack',
        }
      ]
    },
    {
      id: 4,
      type: 'dropdown',
      name: 'Shield and a Holy Symbol',
      dropdowndata: 'holySymbol',
    }
  ],
  Druid: [
    {
      id: 0,
      type: 'radioset',
      name: 'Shield and Simple Weapon',
      options: [
        {
          type: 'radio',
          name: 'Wooden Shield',
        },
        {
          type: 'dropdown',
          name: 'Simple Weapon',
          dropdowndata: 'simple',
        }
      ],
    },
    {
      id: 1,
      type: 'radioset',
      name: 'Scimitar and Simple Melee Weapon',
      options: [
        {
          type: 'radio',
          name: 'Scimitar',
        },
        {
          type: 'dropdown',
              name: 'Simple Weapon',
              dropdowndata: 'simple',
        }
      ],
    },
    {
      id: 2,
      type: 'checkbox',
      name: 'Leather Armor, Explorer’s Pack, and Druidic Focus',
      checked: false,
      
      type: 'dropdown',
      name: 'Druidic Focus',
      dropdowndata: 'focuses',
    }
  ],
  Fighter: [
    {
      id: 0,
      type: 'radioset',
      name: 'Armor',
      options: [
        {
          type: 'radio',
          name: 'Chain Mail',
        },
        {
          type: 'radio',
          name: 'Leather Armor, Longbow, and 20 Arrows',
        },
      ],
    },
    {
      id: 1,
      type: 'radioset',
      name: 'Weapon and Shield',
      options: [
        {
          
          type: 'dropdown',
          name: 'Martial Melee and a shield',
          dropdowndata: 'martialMelee',
        
        },
        {
          type: 'dropdown',
          name: 'Martial Melee',
          dropdowndata: 'martialMelee',
        },
      ],
    },
    {
      id: 2,
      type: 'radioset',
      name: 'Ranged Weapons',
      options: [
        {
          type: 'radio',
          name: 'A Light Crossbow and 20 Bolts',
        },
        {
          type: 'radio',
          name: 'Two Handaxes',
        },
      ],
    },
    {
      id: 3,
      type: 'radioset',
      name: 'Packs',
      options: [
        {
          type: 'radio',
          name: "Dungeoneer's Pack",
        },
        {
          type: 'radio',
          name: "Explorer's Pack",
        },
      ],
    },
  ],
  Monk: [
    {
  id: 0,  
  type: 'radioset',
  name: 'Shortsword/SimpleWeapon',
  options: [
  {
  type: 'radio', 
  name: 'Shortsword',  
  },
  {
   type: 'dropdown',
   name: 'Simple Weapon',
   dropdowndata: 'simple'
  }
  ]
  },
  {
    id: 1,
    type: 'radioset',
    name: 'Packs',
    options: [
      {
        type: 'radio',
        name: "Dungeoneer's Pack",
      },
      {
        type: 'radio',
        name: "Explorer's Pack",
      },
    ],
  },
  {
    id: 4,
    type: 'checkbox',
    name: "10 darts",
  }
],
Paladin: [
  {
    id: 0,
    type: 'radioset',
    name: 'Weapon and Shield/Two Martial Weapons',
    options: [
      {
        
        type: 'dropdown',
        name: 'Martial Melee and a shield',
        dropdowndata: 'martialMelee',
      
      },
      {
        type: 'dropdown',
        name: 'Martial Melee',
        dropdowndata: 'martialMelee',
      },
    ],
  },
  {
    id: 1,  
    type: 'radioset',
    name: 'Five Javalins/Simple Weapon',
    options: [
    {
    type: 'radio', 
    name: 'Five Javelins',  
    },
    {
     type: 'dropdown',
     name: 'Simple Weapon',
     dropdowndata: 'simple'
    }
    ]
    },
    {
      id: 1,
      type: 'radioset',
      name: 'Packs',
      options: [
        {
          type: 'radio',
          name: "Priest's Pack",
        },
        {
          type: 'radio',
          name: "Explorer's Pack",
        },
      ],
    },
],
Ranger: [
  {
    id: 0,
    type: 'radioset',
    name: 'LightCrossbow/SimpleWeapon',
    options: [
      {
        type: 'radio',
        name: 'Shortsword',
      },
      {
        type: 'dropdown',
        name: 'Simple Weapon',
        dropdowndata: 'simple',
      }
    ],
  },
  {
    id: 1,
    type: 'radioset',
    name: 'ArmorChoices',
    options: [
      {
        type: 'radio',
        name: 'scale mail',
      },
      {
        type: 'radio',
        name: 'leather armor',
      },
    ],
  },
  {
    id: 2,
    type: 'radioset',
    name: 'Packs',
    options: [
      {
        type: 'radio',
        name: "Priest's Pack",
      },
      {
        type: 'radio',
        name: "Explorer's Pack",
      },
    ],
  },
  {
    id: 4,
    type: 'checkbox',
    name: "A longbow and a quiver of 20 arrows",
  }
],
Rogue: [
  {
    id: 0,
    type: 'radioset',
    name: 'Rapier/Shortsword',
    options: [
      {
        type: 'radio',
        name: 'Rapier',
      },
      {
        type: 'radio',
        name: 'Shortsword',
        
      }
    ],
  },
  {
    id: 1,
    type: 'radioset',
    name: 'Shortbow/Shortsword',
    options: [
      {
        type: 'radio',
        name: 'Shortbow and Quiver of 20 arrows',
      },
      {
        type: 'radio',
        name: 'Shortsword',
        
      }
    ],
  },
  {
    id: 2,
    type: 'radioset',
    name: 'Packs',
    options: [
      {
        type: 'radio',
        name: "Burglar's Pack",
      },
      {
        type: 'radio',
        name: "Dungeoneer's Pack",
      },
      {
      type: 'radio',
      name: "Explorer's Pack",
      }
    ],
  }
],
Sorcerer: [
  {
    id: 0,
    type: 'radioset',
    name: 'LightCrossbow/SimpleWeapon',
    options: [
      {
        type: 'radio',
        name: 'A light Crossbow and 20 bolts',
      },
      {
        type: 'dropdown',
        name: 'Simple Weapon',
        dropdowndata: 'simple',
      }
    ],
  },
  {
    id: 1,
    type: 'radioset',
    name: 'CompnentPouch/ArcaneFocus',
    options: [
      {
        type: 'radio',
        name: 'Component Pouch',
      },
      {
        type: 'dropdown',
        name: 'arcaneFocus',
        dropdowndata: 'arcaneFocus',
      }
    ],
  },
  {
    id: 2,
    type: 'radioset',
    name: 'Packs',
    options: [
      {
        type: 'radio',
        name: "Dungeoneer's Pack",
      },
      {
      type: 'radio',
      name: "Explorer's Pack",
      }
    ],
  }
],
Warlock: [
  {
    id: 0,
    type: 'radioset',
    name: 'LightCrossbow/SimpleWeapon',
    options: [
      {
        type: 'radio',
        name: 'A light Crossbow and 20 bolts',
      },
      {
        type: 'dropdown',
        name: 'Simple Weapon',
        dropdowndata: 'simple',
      }
    ],
  },
  {
    id: 1,
    type: 'radioset',
    name: 'CompnentPouch/ArcaneFocus',
    options: [
      {
        type: 'radio',
        name: 'Component Pouch',
      },
      {
        type: 'dropdown',
        name: 'arcaneFocus',
        dropdowndata: 'arcaneFocus',
      }
    ],
  },
  {
    id: 2,
    type: 'radioset',
    name: 'Packs',
    options: [
      {
        type: 'radio',
        name: "Dungeoneer's Pack",
      },
      {
      type: 'radio',
      name: "Scholar's Pack",
      }
    ],
  },
  {
    id: 3,
    type: 'checkbox',
    name: 'Leather Armor, Any Simple Weapon, and two Daggers',
    checked: false,
    
    type: 'dropdown',
    name: 'Simple Weapon',
    dropdowndata: 'simple',
  }
  ],
  Wizard: [
    {
      id: 0,
      type: 'radioset',
      name: 'Quarterstaff/Dagger',
      options: [
        {
          type: 'radio',
          name: 'Quarterstaff',
        },
        {
          type: 'radio',
          name: 'Dagger'
        }
      ],
    },
    {
      id: 1,
      type: 'radioset',
      name: 'CompnentPouch/ArcaneFocus',
      options: [
        {
          type: 'radio',
          name: 'Component Pouch',
        },
        {
          type: 'dropdown',
          name: 'arcaneFocus',
          dropdowndata: 'arcaneFocus',
        }
      ],
    },
    {
      id: 2,
      type: 'radioset',
      name: 'Packs',
      options: [
        {
          type: 'radio',
          name: "Explorer's's Pack",
        },
        {
        type: 'radio',
        name: "Scholar's Pack",
        }
      ],
    },
    {
      id: 3,
      type: 'checkbox',
      name: "10 darts",
    }
    ]
  }); 
    
    //TODO this for some reason is failing
    const handleChooseRace = (raceName, subraceName) => {
      const newData = {
        ...charactercreatordata,
        race: raceName
      };
      console.log("Selected race:", raceName);
      if (subraceName != undefined && subraceName != null) {
        //updateCharacterData("subrace", subraceName);
        newData.subrace = subraceName;
      } else {
        //updateCharacterData("subrace", "");
        newData.subrace = "";
      }
      setCharacterCreatorData({...newData});
    };
    
    const updateCharacterData = (key, value) => {
      console.log("Updating character data for key:", key, "with value:", value);
      const newData = {
        ...charactercreatordata,
        [key]: value,
      };
      console.log("Updated Character Data:", newData);
      setCharacterCreatorData(newData);
    };
    // Function to update the description text
    const updateDescription = (index, newText) => {
      const newDescriptions = charactercreatordata.descriptions.map((desc, i) =>
        i === index ? { ...desc, sectiontext: newText } : desc
      );
      const newData = {
        ...charactercreatordata,
        descriptions: newDescriptions,
      };
      console.log("Updated Character Data:", newData);
      setCharacterCreatorData(newData);
    };

    // Fetch class data
    useEffect(() => {
      const fetchData = async () => {
        try {
          const data = await getCharacterClassInfo();
          console.log(data);
          setClasses(data);
          if (data.length > 0) {
            setSelectedClass(data[0].name); // Set the default selected class
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
      //setSelectedClassEquipment(classEquipment[classItem]); 
    };


  useEffect(() => {
    if (playercharacterid !== null && playercharacterid !== undefined && characterinfo !== null && characterinfo !== undefined) {
      if (characterConfirmed) {
        levelUpFeatures(playercharacterid, characterinfo.characterlevel)
          .then((features) => {
            setLevelUpInfo(features);
          })
          .catch((error) => {
            console.error("Error retrieving level up features: " + error);
          });
      }
    }
  }, [characterConfirmed, playercharacterid, characterinfo]);


  useEffect(() => {
    if (characterinfo !== null && characterinfo !== undefined) {
      setCharacterCreatorData({...charactercreatordata, 
      name: characterinfo.name, class: characterinfo.class, 
      race: characterinfo.race, level: characterinfo.characterlevel,
      subrace: characterinfo.subrace, subclass: characterinfo.subclass});
    }
  }, [characterinfo]
  );

  useEffect(() => {
    if (characterabilityscores !== null && characterabilityscores !== undefined) {
      let copyarray = Object.values(structuredClone(characterabilityscores));
      let abilityscores = {};
      abilityscores = copyarray.reduce((obj, item) => Object.assign(obj, { [item.abilityabbrev.toUpperCase()]: item.abilityscore}), {})
      console.log(copyarray);
      console.log(abilityscores)
      console.log(characterabilityscores);
      /*
      console.log(copyarray);
      for (let obj in copyarray) {
        console.log(JSON.stringify(obj));
        console.log(obj["abilityname"]);
        console.log(obj["abilityscore"]);
        abilityscores[obj.abilityname] = obj.abilityscore;
      }
      */
      setCharacterCreatorData({...charactercreatordata, abilityscores});
    }
  }, [characterabilityscores]
  );
  
const handleConfirmClick = async () => {
  console.log("We are here gamer");
  setShowConfirmTab(false);
  setCharacterConfirmed(true);
  console.log("userid = " + userid); 
  try {
    const result = await createCharacter(charactercreatordata, userid);

    const newPlayerCharacterId = await checkIfPlayerExists(userid, charactercreatordata.name);

    console.log("new character id = " + newPlayerCharacterId);

    console.log('This should redirect brothers');
    
    router.push(`../main?userid=${userid}&playercharacterid=${newPlayerCharacterId}`);
  } catch (error) {
    console.error("Error creating character: " + error);
  }
};

  const handleSwitchBack = () => {
    setShowConfirmTab(true); 
    setCharacterConfirmed(false);
  };


  const [dropdownOptions, setDropdownOptions] = useState({
    martialMelee: martialWeapons,
    simple: simpleWeapons,
    musicalInstruments: musicalInstruments,
  });



  const handleChooseClass = (classitem) => {
    setSelectedClass(classitem.name);
    console.log(classEquipment['Barbarian']);
    let equipmentarray = [];
    console.log(classEquipment[classitem.name]);
    /*
    for (let option in classEquipment[classitem.name]) {
      console.log(option);  
      equipmentarray.push({name: option, value: ''});
    }
    */
    classEquipment[classitem.name].forEach((option) => {equipmentarray.push({name: option.name, value: ''})})
    
    console.log(equipmentarray);
    setEquipmentForCharacter([...equipmentarray]);
    const newData = {
      ...charactercreatordata,
      skillproficiencies: selectedskills,
      class: classitem.name,
      subclass: classitem.subclasses[0].name
    }
    setCharacterCreatorData({...newData});
    //updateCharacterData("skillproficiencies", selectedskills);
    //updateCharacterData("class", classitem.name);
    //setSelectedClassEquipment(classEquipment[classitem.name]); 
    //setSelectedEquipmentClass(classEquipment[classitem.name]); 
  };

  const updateEquipmentForCharacter = (optionname, value) => {
    console.log(equipmentForCharacter);
    console.log(optionname);
    console.log(value);
    if (equipmentForCharacter.length > 0) {
      let matcheditems = equipmentForCharacter.filter((option) => option.name === optionname);
      console.log(matcheditems);
      let nonmatcheditems = equipmentForCharacter.filter((option) => option.name !== optionname);
      console.log(nonmatcheditems);
      if (matcheditems.length !== 1) {
        console.error("There is more than one character creator equipment option with the same name. Fix that!!");
        return;
      } else {
        matcheditems[0].value = value;
      }
      setEquipmentForCharacter([...matcheditems, ...nonmatcheditems]);
      console.log(equipmentForCharacter);
    }
    console.log(equipmentForCharacter);
  }

  const handleRadioChange = (groupName, value) => {
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [groupName]: value,
    }));
    updateEquipmentForCharacter(groupName, value); 
  };


  const handleDropdownChange = (groupName, value) => {
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [groupName]: value,
    }));
    updateEquipmentForCharacter(groupName, value); 
  };

  const printChosenEquipment = () => {
    console.log("Chosen Equipment:");
    equipmentForCharacter.forEach((option) => {
      console.log(option.name + ": " + option.value);
    });
  };
  

  const renderEquipmentOptions = () => {
    //if (!selectedClassEquipment) return null;
    if (classEquipment[selectedClass] == undefined || classEquipment[selectedClass]  == null) return null;
    return (
      <div className="characterCreatorEquipmentSection">
      {classEquipment[selectedClass].map((optionGroup, groupIndex) => (
        <div key={groupIndex} className="optionGroup">
          {renderOption(optionGroup)}
        </div>
      ))}
            <Button onClick={printEquipmentArray}>Print Equipment Array</Button>

            <Button onClick={printChosenEquipment}>Print Chosen Equipment</Button>

    </div>
      );
  };


  const printEquipmentArray = () => {
    console.log("Equipment Array:", charactercreatordata.equipment);
  };
  
  const renderOption = (option, superoptionname) => {
    switch (option.type) {
      case "radioset":
        return (
          <div className="characterCreatorOptionGroup characterCreatorRadioSection">
            {option.options.map((radio, index) => (
              <div key={index} className="characterCreatorRadioOption">
                <input
                  type="radio"
                  name={option.name}
                  value={radio.name}
                  checked={selectedOptions[option.name] === radio.name}
                  onChange={() => {
                    console.log(option.name);
                    handleRadioChange(option.name, radio.name);
                  }}
                />
                  {renderOption(radio, option.name)}            
                {(radio.name === 'Martial Melee' || radio.name === 'Simple Weapon' || radio.name === 'Martial Melee and a shield' || radio.name === 'Two Martial Weapons' || radio.name === 'arcaneFocus') && selectedOptions[option.name] === radio.name && (
                  <select
                    className="dropdownContainer"
                    value={selectedOptions[radio.dropdowndata]}
                    onChange={(e) => handleDropdownChange(radio.dropdowndata, e.target.value)}
                  >
                    {dropdownOptions[radio.dropdowndata].map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            ))}
          </div>
        );
      case "radio":
        return (
          <div>
            {option.name}
          </div>
        );
      case "dropdown":
        return (
          <div className="characterCreatorOption">
            {option.name}
            {(selectedOptions[option.name] === 'Martial Melee' || selectedOptions[option.name] === 'Simple Weapon' || selectedOptions[option.name] === 'Martial Melee and a shield' || selectedOptions[option.name] === 'Two Martial Weapons' || selectedOptions[option.name] === 'arcaneFocus') && (
              <select
                className="dropdownContainer"
                value={selectedOptions[option.dropdowndata]}
                onChange={(e) => handleDropdownChange(option.dropdowndata, e.target.value)}
              >
                {dropdownOptions[option.dropdowndata].map((item, index) => (
                  <option key={index} value={item} disabled={() => {return item.name === "- Choose -"}}>
                    {item}
                  </option>
                ))}
              </select>
            )}
          </div>
        );
          case "checkbox":
            return (
            
                <div className="characterCreatorOptionGroup">
                  <input
                    type="checkbox"
                  // checked={selectedEquipmentClass[option.name] || false}
                    //onChange={(e) => handleCheckboxChange(e, option)}
                    //onChange={(e) => updateEquipmentForCharacter(option.name, e.target.checked)}
                    //checked={selectedEquipmentClass[option.name] || false}
                    //onChange={(e) => handleCheckboxChange(e, option)}
                  />
                  <span className="weaponLabel">{option.name}</span>
                
                </div>
        );
        
      default:
        return null;
    }
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
      console.log("Before update:", charactercreatordata);
      setCharacterCreatorData({...charactercreatordata, abilityscores: {...newScores}});  
      console.log("After update:", charactercreatordata);
      // Update database
      /*
      try {
        await updateCharacterAbilityScores(playercharacterid, abilitiesToUpdate);
        console.log(abilitiesToUpdate);
        console.log("Abilities successfully updated in database");
      } catch (error) {
        console.error("Error updating abilities in database:", error);
      }
      */
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

    const printTextWithCommas = (textlist) => {
      let first = true;
      let returntext = "";
      for (const text of textlist) {
        if (first == true) {
          returntext = returntext + text;
          first = false;
        } else {
          returntext = returntext + ", " + text; 
        }
      }
      return returntext;
    }

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
    
    useEffect(() => {
      fetchLevelUpInfo(); 
    }, [selectedLevel]); 
    const fetchLevelUpInfo = async () => {
      try {
        const levelUpFeaturesData = await levelUpFeatures(playercharacterid, selectedLevel);
        console.log("Level up features data:", levelUpFeaturesData); 
        if (levelUpFeaturesData.length > 0) {
          setClassInfo(levelUpFeaturesData.flat());
        } else {
          console.log("No level up features data found.");
        }
      } catch (error) {
        console.error('Error fetching level up features:', error);
      }
    };
    
    const handleAbility1Change = (e) => {
      const selectedAbility = e.target.value;
      setSelectedAbility1(selectedAbility);
      if (selectedAbility) {
        setCharacterCreatorData({...charactercreatordata, twoabilityscoreimprovements1: e.target.value});
        /*
        const updatedAbilityScores = { ...abilityScores };
        updatedAbilityScores[selectedAbility] += 1;
        setAbilityScores(updatedAbilityScores);
        */
      }
    };
    
    const handleAbility2Change = (e) => {
      const selectedAbility = e.target.value;
      setSelectedAbility2(selectedAbility);
      if (selectedAbility) {
        setCharacterCreatorData({...charactercreatordata, twoabilityscoreimprovements2: e.target.value});
        /*
        const updatedAbilityScores = { ...abilityScores };
        updatedAbilityScores[selectedAbility] += 1; 
        setAbilityScores(updatedAbilityScores);
        */
      }
    };

    const handleAbility3Change = (e) => {
      const selectedAbility = e.target.value;
      setSelectedAbility3(selectedAbility);
      if (selectedAbility) {
        setCharacterCreatorData({...charactercreatordata, oneabilityscoreimprovements: e.target.value});
        /*
        const updatedAbilityScores = { ...abilityScores };
        updatedAbilityScores[selectedAbility] += 1; 
        setAbilityScores(updatedAbilityScores);
        */
      }
    };
    
    const handleAbilityImprovementRadio = (value) => {
      setOneOrTwoAbilities(value);
      setCharacterCreatorData({...charactercreatordata, oneortwo: value});
    }


    return (
      <div className="characterCreator">
        <Tabs
          className="characterCreatorTabs frontElement"
          defaultActiveKey="race"
        >
          <Tab eventKey="race" title="Race"  disabled={!showConfirmTab}>
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
                        eventKey={race.race_name.toLowerCase().replace(/\s+/g, "")}
                      >
                        {race.race_name}
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
                        eventKey={(item.subrace_name || item.race_name)
                          .toLowerCase()
                          .replace(/\s+/g, "")}
                      >
                        <div className="characterCreatorTabContent">
                          <h3>{item.subrace_name || item.race_name}</h3>
                          <h4>Features:</h4>
                          <ul>
                            {item.features &&
                              item.features.map((feature, featureIndex) => (
                                <li key={featureIndex}>
                                  <span className="featureTitle">{feature.name}:</span> {feature.description}
                                </li>
                              ))}
                          </ul>
                        </div>
                        <Button onClick={() => handleChooseRace(item.race_name, item.subrace_name)}>Choose Race</Button>
                      </Tab.Pane>
                    ))}
                </Tab.Content>
              </Tab.Container>
            </div>
          </Tab>
          <Tab eventKey="class" title="Class" disabled={!showConfirmTab}>
  <Tab.Container defaultActiveKey="firstClassKey">
    <div className="characterCreatorSection characterCreatorClass frontElement" style={{ display: "flex", flexDirection: "row" }}>
      <Tab.Container defaultActiveKey="firstClassKey">
        <div style={{ display: "flex", width: "100%" }}>
          <Nav variant="pills" className="flex-column" style={{ minWidth: "200px" }} onSelect={() => { showClassTable(false); setSelectedSkills([]) }}>
            {classes.map((classItem, index) => (
              <Nav.Item key={index}>
                <Nav.Link eventKey={classItem.name.toLowerCase().replace(/\s+/g, "")} onClick={() => handleSelectClass(classItem)}>
                  {classItem.name}
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
          <Tab.Content style={{ flex: 1, paddingLeft: "20px" }}>
            {classes.map((classItem) => (
              <Tab.Pane key={classItem.classid} eventKey={classItem.name.toLowerCase().replace(/\s+/g, "")}>
                <div className="characterCreatorTabContent">
                  <h3>{classItem.name}</h3>
                  <p><strong>Description:</strong> {classItem.description}</p>
                  {classItem.infotable && 
                    <div>
                      <Button variant="secondary" onClick={() => showClassTable(!showclasstable)}>Show Class Table</Button>
                      {showclasstable && <Table size="sm">
                        <thead>
                          <tr>
                            {classItem.infotable.cols.map((col, index) => (
                              <th key={index}>{col}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {classItem.infotable.rows.map((row, index) => (
                            <tr key={index}>
                              {row.map((col, index) => (
                                <td key={index}>{col}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </Table>}
                    </div>
                  } 
                  <p><strong>Hit Points at 1st Level:</strong> {classItem.hitpoints1stlevel}</p>
                  <p><strong>Hit Points at Higher Levels:</strong> {classItem.hitpointshigherlevel}</p>
                  <h4>Subclasses:</h4>
                  <ul>
                    {classItem.subclasses && classItem.subclasses.map((subclass, index) => (
                      <li key={index}>
                        {subclass.name}: {subclass.description}
                      </li>
                    ))}
                  </ul>
                  <h4>Features:</h4>
                  <ul>
                    {classItem.features && classItem.features.map((feature, index) => (
                      <li key={index}>
                        <strong>{feature.name}</strong>: {feature.description}
                      </li>
                    ))}
                  </ul>
                  <div className="classSkillDropdowns">
                    Skill Dropdowns: 
                    {classItem.name && classSkills[classItem.name].numskills && classSkills[classItem.name].numskills.map((skillitem, index) => (
                      <select key={index} onChange={(e) => handleSkillSelectionChange(index, e.target.value)}>
                        {classItem.name && classSkills[classItem.name].skills && getSkillDropdownOptions(classItem.name, index).map((skill, index2) => (
                          <option key={index2} value={skill}>{skill}</option>
                        ))}
                      </select>
                    ))}
                  </div>
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


          <Tab eventKey="abilities" title="Abilities" disabled={!showConfirmTab}>
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
          <Tab eventKey="equipment" title="Equipment" disabled={!showConfirmTab}>
          {renderEquipmentOptions()}
          </Tab>
          <Tab eventKey="description" title="Description" disabled={!showConfirmTab}>
            <div className="notesMenu frontElement">
              {charactercreatordata.descriptions.map((notessection, index) => (
                <div key={index} className="notesSection">
                  <span>{notessection.sectionname}</span>
                  <textarea
                    onChange={(e) => updateDescription(index, e.target.value)
                    }
                    defaultValue={notessection.sectiontext}
                  ></textarea>
                </div>
              ))}
              
            </div>
          </Tab>
          <Tab eventKey="confirmAndLevelUp" title="Confirm">
          <div className="confirmCharacterSection">          
            {characterConfirmed ? (
    <div className="levelUpSection">
          <label htmlFor="level">Select Level:</label>
          <select name="level" value={selectedLevel} onChange={(e) => setSelectedLevel(parseInt(e.target.value))}>
            {[1, 2, 3, 4, 5].map(level => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
          
          
          <h4>Class Information for Level {selectedLevel}</h4>
          <div className="levelUpFeatureDisplay">
            {classInfo.map((classFeature, index) => (
              <>
                <strong>{classFeature.name}</strong>:
                {classFeature.description.split(';;').map((featuretextpart, index) => (
                  <p className="singleFeatureParagraph" key={index}>{featuretextpart}</p>
                ))}
              </>
            ))}
          </div>
          {selectedLevel === 4 && (
            <>
            <h5>Ability Score Improvement</h5>
            <fieldset>
              <label for="oneortwofalse">One Ability By 2 Points</label>
              <input type="radio" name="oneortwoabilities" value="1" id="oneortwofalse" onChange={(e) => handleAbilityImprovementRadio(Number(e.target.value))} defaultChecked></input>
              <label for="oneortwotrue">Two Abilities By 1 Point</label>
              <input type="radio" name="oneortwoabilities" value="2" id="oneortwotrue" onChange={(e) => handleAbilityImprovementRadio(Number(e.target.value))}></input>
            </fieldset>
            {oneortwoabilities === 1 && (<>
              <h5>Select 2 Abilities to Improve By 1:</h5>
              <div>
                <select value={selectedAbility1} onChange={handleAbility1Change}>
                  <option value="" disabled>Select Ability 1</option>
                  <option value="Strength">Strength</option>
                  <option value="Dexterity">Dexterity</option>
                  <option value="Constitution">Constitution</option>
                  <option value="Intelligence">Intelligence</option>
                  <option value="Wisdom">Wisdom</option>
                  <option value="Charisma">Charisma</option>
                </select>
                <select value={selectedAbility2} onChange={handleAbility2Change}>
                  <option value="" disabled>Select Ability 2</option>
                  <option value="Strength" disabled={selectedAbility1 === "Strength"}>Strength</option>
                  <option value="Dexterity" disabled={selectedAbility1 === "Dexterity"}>Dexterity</option>
                  <option value="Constitution" disabled={selectedAbility1 === "Constitution"}>Constitution</option>
                  <option value="Intelligence" disabled={selectedAbility1 === "Intelligence"}>Intelligence</option>
                  <option value="Wisdom" disabled={selectedAbility1 === "Wisdom"}>Wisdom</option>
                  <option value="Charisma" disabled={selectedAbility1 === "Charisma"}>Charisma</option>
                </select>
              </div>
            </>)}
            {oneortwoabilities === 2 && (<>
              <h5>Select 1 Ability to Improve By 2:</h5>
              <div>
                <select value={selectedAbility3} onChange={handleAbility3Change}>
                  <option value="" disabled>Select Ability</option>
                  <option value="Strength">Strength</option>
                  <option value="Dexterity">Dexterity</option>
                  <option value="Constitution">Constitution</option>
                  <option value="Intelligence">Intelligence</option>
                  <option value="Wisdom">Wisdom</option>
                  <option value="Charisma">Charisma</option>
                </select>
              </div>
            </>)}
            </>
          )}
          <Button>Confirm Level Up</Button>
          <Button onClick={handleSwitchBack}>Change Character</Button>
        </div>
      ) : (
              // Content to display before confirming character
              <>
                <div className="characterInfoDisplay">
                  <div className="characterInfoDisplayColumn">
                    <h5>Basic Info:</h5>
                    <div>
                      <div>
                        <label htmlFor="name">Character Name:</label>
                        <input name="name" type="text" readOnly={namereadonly} value={charactercreatordata.name} onChange={(e) => setCharacterCreatorData({...charactercreatordata, name: e.target.value})}></input>
                      </div>
                      <div>
                        <label htmlFor="namereadonlytoggle">Lock Name</label>
                        <input name="namereadonlytoggle" type="checkbox" checked={namereadonly} onChange={(e) => setNameReadOnly(e.target.checked)}></input>
                      </div>
                    </div>
                    <label htmlFor="alignment">Alignment:</label>
                    <select name="alignment" onChange={(e) => setCharacterCreatorData({...charactercreatordata, alignment: e.target.value})}>
                      <option value="Lawful Good">Lawful Good</option>
                      <option value="Neutral Good">Neutral Good</option>
                      <option value="Chaotic Good">Chaotic Good</option>
                      <option value="Lawful Neutral">Lawful Neutral</option>
                      <option value="Neutral">Neutral</option>
                      <option value="Chaotic Neutral">Chaotic Neutral</option>
                      <option value="Lawful Evil">Lawful Evil</option>
                      <option value="Neutral Evil">Neutral Evil</option>
                      <option value="Chaotic Evil">Chaotic Evil</option>
                    </select>
                    <p><span className="characterInfoDisplayItemName">Race:</span> {charactercreatordata.race}</p>
                    <p><span className="characterInfoDisplayItemName">Subrace:</span> {charactercreatordata.subrace}</p>
                    <p><span className="characterInfoDisplayItemName">Class:</span> {charactercreatordata.class}</p>
                    <p><span className="characterInfoDisplayItemName">Subclass:</span> {charactercreatordata.subclass}</p>
                  </div>
                  <div className="characterInfoDisplayColumn">
                    <h5>Abilities:</h5>
                    <p><span className="characterInfoDisplayItemName">Strength:</span> {charactercreatordata.abilityscores.STR}</p>
                    <p><span className="characterInfoDisplayItemName">Dexterity:</span> {charactercreatordata.abilityscores.DEX}</p>
                    <p><span className="characterInfoDisplayItemName">Constitution:</span> {charactercreatordata.abilityscores.CON}</p>
                    <p><span className="characterInfoDisplayItemName">Intelligence</span> {charactercreatordata.abilityscores.INT}</p>
                    <p><span className="characterInfoDisplayItemName">Wisdom:</span> {charactercreatordata.abilityscores.WIS}</p>
                    <p><span className="characterInfoDisplayItemName">Charisma:</span> {charactercreatordata.abilityscores.CHA}</p>
                    <p><span className="characterInfoDisplayItemName">Skill Proficiencies:</span> {printTextWithCommas(charactercreatordata.skillproficiencies)}</p>
                  </div>
                  <div className="characterInfoDisplayColumn">
                    <AvatarUpload type="player" id={playercharacterid} upload={false}></AvatarUpload>
                  </div>
                </div>
                
                
                <Button onClick={() => {
                  handleConfirmClick();
                  //router.push('../main');
                }}>Confirm Character</Button>

              </>   
            )}
          </div>
        </Tab>    
        </Tabs>
      </div>
    );
  }

  export default CharacterCreator;