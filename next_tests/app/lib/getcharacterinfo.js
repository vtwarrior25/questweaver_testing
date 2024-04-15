'use server'

const pgp = require('pg-promise')();
const {ParameterizedQuery: PQ} = require('pg-promise');
import { db } from '../lib/dbconn';

/*
Example query

// This is the query text
const getAlignments = new PQ({text: 'SELECT * FROM alignment'});

// This runs the query and handles success and failure
db.any(getAlignments)
  .then (alignments => {
    //console.log("got alignments");
    //console.log(alignments);
    return alignments;
  }).catch (error => {
    error.log("bad");
    return "bad";
});
*/

export async function getcharacterinfo(playercharacterid, infotype) {
  let dbquery = "";
  let dbresult = {}; 
  switch (infotype) {
    case 'skill':
      dbquery = new PQ({
        text: `
          SELECT s.name, a.abbrev AS mod, c.proficient AS prof, c.bonus FROM characterskill c
            JOIN skill s ON c.skillid = s.skillid
            JOIN ability a ON s.abilityid = a.abilityid
          WHERE c.playercharacterid = $1;
        `
      });
      dbresult = [
        {
          name: "Acrobatics",
          mod: "Dex",
          prof: false,
          bonus: 2,
        }, 
        {
          name: "Animal Handling",
          mod: "Wis",
          prof: true,
          bonus: 3,
        }, 
        {
          name: "Arcana",
          mod: "Int",
          prof: false,
          bonus: -1,
        }, 
        {
          name: "Athletics",
          mod: "Str",
          prof: false,
          bonus: 3,
        }, 
        {
          name: "Deception",
          mod: "Cha",
          prof: false,
          bonus: 0,
        }, 
        {
          name: "History",
          mod: "Int",
          prof: false,
          bonus: -1,
        }, 
        {
          name: "Insight",
          mod: "Wis",
          prof: true,
          bonus: 1,
        }, 
        {
          name: "Intimidation",
          mod: "Cha",
          prof: false,
          bonus: 0,
        }, 
        {
          name: "Investigation",
          mod: "Int",
          prof: false,
          bonus: -1,
        }, 
        {
          name: "Medicine",
          mod: "Wis",
          prof: false,
          bonus: +1,
        }, 
        {
          name: "Nature",
          mod: "Int",
          prof: false,
          bonus: -1,
        }, 
        {
          name: "Perception",
          mod: "Wis",
          prof: true,
          bonus: +3,
        }, 
        {
          name: "Performance",
          mod: "Cha",
          prof: false,
          bonus: 0,
        }, 
        {
          name: "Persuasion",
          mod: "Cha",
          prof: false,
          bonus: 0,
        }, 
        {
          name: "Religion",
          mod: "Int",
          prof: false,
          bonus: 0,
        }, 
        {
          name: "Sleight of Hand",
          mod: "Dex",
          prof: false,
          bonus: +2
        }, 
        {
          name: "Stealth",
          mod: "Dex",
          prof: true,
          bonus: 2,
        }, 
        {
          name: "Survival",
          mod: "Wis",
          prof: false,
          bonus: 3,
        },
      ];
      break;
    case 'ability':
      dbquery = new PQ({
        text: `
          SELECT a.name, a.abbrev, c.score, c.modifier FROM characterability c
            JOIN ability a ON c.abilityid = a.abilityid
          WHERE c.playercharacterid = $1;
        `
      });
      dbresult = [
          {
            abilityname: "Strength",
            abilityabbrev: "STR",
            abilityscore: 18,
            abilitybonus: 3,
          },
          {
            abilityname: "Dexterity",
            abilityabbrev: "DEX",
            abilityscore: 12,
            abilitybonus: 2,
          },
          {
            abilityname: "Constitution",
            abilityabbrev: "CON",
            abilityscore: 12,
            abilitybonus: 2,
          },
          {
            abilityname: "Intelligence",
            abilityabbrev: "INT",
            abilityscore: 12,
            abilitybonus: -1,
          },
          {
            abilityname: "Wisdom",
            abilityabbrev: "WIS",
            abilityscore: 12,
            abilitybonus: +1,
          },
          {
            abilityname: "Charisma",
            abilityabbrev: "CHA",
            abilityscore: 12,
            abilitybonus: 0,
          },
        ]
      break;
    case 'health':
      dbquery = new PQ({
        text: `
          SELECT c.currenthealth, c.maxhealth FROM playercharacter c
          WHERE c.playercharacterid = $1;
        `
      });
      dbresult = {
        currenthealth: 12,
        maxhealth: 22,
      }
      break;
    case 'staticstats':
      dbquery = new PQ({
        // TODO: figure out how to make this query grab the proficiencies and defenses/conditions
        text: `
          SELECT c.proficiencybonus AS profbonus, c.speed, c.initiative, c.armorclass, p.passiveperception,
          p.passiveinvestigation, p.passiveinsight, a.name AS alignment FROM playercharacter c
            JOIN characterpassiveability p ON c.playercharacterid = p.playercharacterid
            JOIN playercharacternote n ON c.playercharacterid = n.playercharacterid
            JOIN alignment a ON n.alignmentid = a.alignmentid
          WHERE c.playercharacterid = $1;
        `
      });
      dbresult = {
        profbonus: 2,
        speed: 30,
        initiative: 2,
        armorclass: 14,
        passiveperception: 5,
        passiveinvestigation: 5,
        passiveinsight: 5,
        armor: "Light, Medium, Heavy, Shields",
        weapons: "Martial, Simple",
        tools: "Cobbler's, Land Vehicles",
        languages: "Common, Halfling",
        defenses: "Fireproof",
        conditions: "Dry Heaving",
        alignment: "Neutral Good"
      };
      break;
    case 'savingthrow':
      /**
      dbquery = new PQ({text: 'SELECT * FROM charactersavingthrow c JOIN playercharacter p ON c.playercharacterid = p.playercharacterid JOIN savingthrow s ON c.savingthrowid = s.savingthrowid WHERE playercharacter'});
      db.any(dbquery)
        .then (savingthrows => {
          //console.log("got alignments");
          //console.log(alignments);
          return savingthrows;
        }).catch (error => {
          error.log("bad");
          return "bad";
      });
      */
      dbquery = new PQ({
        text: ` 
          SELECT s.name, c.proficient, c.bonus FROM charactersavingthrow c
            JOIN savingthrow s ON c.savingthrowid = s.savingthrowid
          WHERE c.playercharacterid = $1;
        `
      });
      dbresult = [
        {
          name: 'STR',
          prof: false,
          val: +5,
        },
        {
          name: 'DEX',
          prof: false,
          val: +5,
        },
        {
          name: 'CON',
          prof: false,
          val: +5,
        },
        {
          name: 'INT',
          prof: false,
          val: +5,
        },
        {
          name: 'WIS',
          prof: false,
          val: +5,
        },
        {
          name: 'CHA',
          prof: false,
          val: +5,
        }
        ];
      break;
    case 'turnorder':
      //dbquery = "turnorderquery";
      dbquery = new PQ({
        text: `
          SELECT c.name, t.initiative FROM turnorder t
            JOIN playercharacter c ON t.playercharacterid = c.playercharacterid;
        `
      });
      dbresult = [
        {
          name: "Jerome",
          initiative: 15,
        },
        {
          name: "Dylan",
          initiative: 12,
        },
        {
          name: "Greg",
          initiative: 11,
        },
        {
          name: "Rebecca",
          initiative: 8,
        },
        {
          name: "Jauffre",
          initiative: 7,
        },
        {
          name: "Erica",
          initiative: 3,
        },
      ]; 
      //dbquery = new PQ({text: 'SELECT p.name, t.initiative FROM turnorder t JOIN playercharacter p ON t.playercharacterid = p.playercharacterid'});
      break;
    case basicdata:
      dbquery = new PQ({
        text: `
          SELECT c.name, r.name AS race, cl.name AS class, c.characterlevel
          FROM playercharacter c
            JOIN race r ON c.race = r.raceid
            JOIN class cl ON c.class = cl.classid
          WHERE playercharacterid = $1; 
        `
      });
      dbresult = {
        name: "Jerome",
        race: "Elf",
        class: "Barbarian",
        characterlevel: 1,
      };
      break;
  }

  await db.any(dbquery, [playercharacterid])
    .then ((dbinfo) => {
      console.log("got character info from " + infotype);
      console.log(dbinfo);
      return dbinfo;
    }).catch (error => {
      console.error("Error retrieving character info " + error);
    })
  return dbresult;
}



const staticstatsdefaultresult = {
  profbonus: 2,
  speed: 30,
  initiative: 2,
  armorclass: 14,
  passiveperception: 5,
  passiveinvestigation: 5,
  passiveinsight: 5,
  armor: "Light, Medium, Heavy, Shields",
  weapons: "Martial, Simple",
  tools: "Cobbler's, Land Vehicles",
  languages: "Common, Halfling",
  defenses: "Fireproof",
  conditions: "Dry Heaving",
  alignment: "Neutral Good"
};

const basicdatadefaultresult = {
  name: "Jerome",
  race: "Elf",
  class: "Barbarian",
  characterlevel: 1,
};

const turnorderdefaultresult = [
  {
    name: "Jerome",
    initiative: 15,
  },
  {
    name: "Dylan",
    initiative: 12,
  },
  {
    name: "Greg",
    initiative: 11,
  },
  {
    name: "Rebecca",
    initiative: 8,
  },
  {
    name: "Jauffre",
    initiative: 7,
  },
  {
    name: "Erica",
    initiative: 3,
  }
]


const savingthrowdefaultresult = [
  {
    name: 'STR',
    prof: false,
    val: +1,
  },
  {
    name: 'DEX',
    prof: false,
    val: +2,
  },
  {
    name: 'CON',
    prof: false,
    val: +3,
  },
  {
    name: 'INT',
    prof: false,
    val: +4,
  },
  {
    name: 'WIS',
    prof: false,
    val: +5,
  },
  {
    name: 'CHA',
    prof: false,
    val: +6,
  }
];

const skilldefaultresult = [
  {
    name: "Acrobatics",
    mod: "Dex",
    prof: false,
    bonus: 2,
  }, 
  {
    name: "Animal Handling",
    mod: "Wis",
    prof: true,
    bonus: 3,
  }, 
  {
    name: "Arcana",
    mod: "Int",
    prof: false,
    bonus: -1,
  }, 
  {
    name: "Athletics",
    mod: "Str",
    prof: false,
    bonus: 3,
  }, 
  {
    name: "Deception",
    mod: "Cha",
    prof: false,
    bonus: 0,
  }, 
  {
    name: "History",
    mod: "Int",
    prof: false,
    bonus: -1,
  }, 
  {
    name: "Insight",
    mod: "Wis",
    prof: true,
    bonus: 1,
  }, 
  {
    name: "Intimidation",
    mod: "Cha",
    prof: false,
    bonus: 0,
  }, 
  {
    name: "Investigation",
    mod: "Int",
    prof: false,
    bonus: -1,
  }, 
  {
    name: "Medicine",
    mod: "Wis",
    prof: false,
    bonus: +1,
  }, 
  {
    name: "Nature",
    mod: "Int",
    prof: false,
    bonus: -1,
  }, 
  {
    name: "Perception",
    mod: "Wis",
    prof: true,
    bonus: +3,
  }, 
  {
    name: "Performance",
    mod: "Cha",
    prof: false,
    bonus: 0,
  }, 
  {
    name: "Persuasion",
    mod: "Cha",
    prof: false,
    bonus: 0,
  }, 
  {
    name: "Religion",
    mod: "Int",
    prof: false,
    bonus: 0,
  }, 
  {
    name: "Sleight of Hand",
    mod: "Dex",
    prof: false,
    bonus: +2
  }, 
  {
    name: "Stealth",
    mod: "Dex",
    prof: true,
    bonus: 2,
  }, 
  {
    name: "Survival",
    mod: "Wis",
    prof: false,
    bonus: 3,
  },
];

const abilitydefaultresult = [
  {
    abilityname: "Strength",
    abilityabbrev: "STR",
    abilityscore: 18,
    abilitybonus: 3,
  },
  {
    abilityname: "Dexterity",
    abilityabbrev: "DEX",
    abilityscore: 12,
    abilitybonus: 2,
  },
  {
    abilityname: "Constitution",
    abilityabbrev: "CON",
    abilityscore: 12,
    abilitybonus: 2,
  },
  {
    abilityname: "Intelligence",
    abilityabbrev: "INT",
    abilityscore: 12,
    abilitybonus: -1,
  },
  {
    abilityname: "Wisdom",
    abilityabbrev: "WIS",
    abilityscore: 12,
    abilitybonus: +1,
  },
  {
    abilityname: "Charisma",
    abilityabbrev: "CHA",
    abilityscore: 12,
    abilitybonus: 0,
  },
]

const getcharacterstaticstatsquery = new PQ({
  text: `
    SELECT c.proficiencybonus AS profbonus, c.speed, c.initiative, c.armorclass, p.passiveperception,
    p.passiveinvestigation, p.passiveinsight, a.name AS alignment FROM playercharacter c
      JOIN characterpassiveability p ON c.playercharacterid = p.playercharacterid
      JOIN playercharacternote n ON c.playercharacterid = n.playercharacterid
      JOIN alignment a ON n.alignmentid = a.alignmentid
    WHERE c.playercharacterid = $1;
    `
});



const getcharacterbasicdataquery = new PQ({
  text: `
    SELECT c.name, r.name AS race, cl.name AS class, c.characterlevel
    FROM playercharacter c
      JOIN race r ON c.race = r.raceid
      JOIN class cl ON c.class = cl.classid
    WHERE playercharacterid = $1; 
  `
});

const setturnorderquery = new PQ({
  text: `
    
  `
});

const getturnorderquery = new PQ({
  text: `
    SELECT c.name, t.initiative, t.currentturn FROM turnorder t
    JOIN playercharacter c ON t.playercharacterid = c.playercharacterid;
  `
});

const charactergetsavingthrowquery = new PQ({
  text: `
    SELECT a.abbrev AS name, c.proficient AS prof, c.bonus AS val FROM charactersavingthrow c
      JOIN savingthrow s ON c.savingthrowid = s.savingthrowid
      JOIN ability a ON s.abilityid = a.abilityid 
    WHERE c.playercharacterid = $1;
  `
});


const charactergetskillquery = new PQ({
  text: `
    SELECT s.name, a.abbrev AS mod, c.proficient AS prof, c.bonus FROM characterskill c
      JOIN skill s ON c.skillid = s.skillid
      JOIN ability a ON s.abilityid = a.abilityid
    WHERE c.playercharacterid = $1;
  `
});


const charactergetabilityquery = new PQ({
  text: `
    SELECT a.name AS abilityname, a.abbrev AS abilityabbrev, c.score AS abilityscore, c.modifier AS abilitybonus FROM characterability c
      JOIN ability a ON c.abilityid = a.abilityid
    WHERE c.playercharacterid = $1;
  `
});


export async function getSkills (playercharacterid) {
  let result = skilldefaultresult;
  await db.any(charactergetskillquery, [playercharacterid])
    .then ((dbinfo) => {
      console.log("got saving throw data");
      console.log(dbinfo);
      result = [...dbinfo];
    }).catch (error => {
      console.error("Error retrieving character info " + error);
    });
  return result;
}


export async function getSavingThrows (playercharacterid) {
  let result = savingthrowdefaultresult;
  await db.any(charactergetsavingthrowquery, [playercharacterid])
    .then ((dbinfo) => {
      console.log("got skills data");
      console.log(dbinfo);
      result = [...dbinfo];
    }).catch (error => {
      console.error("Error retrieving character info " + error);
    })
  return result;
}

export async function getAbilities (playercharacterid) {
  let result = abilitydefaultresult;
  await db.any(charactergetabilityquery, [playercharacterid])
    .then ((dbinfo) => {
      console.log("got abilities data");
      console.log(dbinfo);
      result = [...dbinfo];
      console.log(result);
      return result;
    }).catch (error => {
      console.error("Error retrieving character info " + error);
    });
  return result;
}


export async function getTurnOrder () {
  let result = turnorderdefaultresult;
  await db.any(getturnorderquery)
    .then ((dbinfo) => {
      console.log("got turn order data");
      //console.log(dbinfo);
      result = [...dbinfo];
      //console.log(result);
      return result;
    }).catch (error => {
      console.error("Error retrieving character info " + error);
    });
  return result;
}

export async function getBasicInfo (playercharacterid) {
  let result = basicdatadefaultresult;
  await db.any(getcharacterbasicdataquery, [playercharacterid])
    .then ((dbinfo) => {
      console.log("got basic info data");
      result = {...dbinfo[0]};
      console.log(result);
      return result;
    }).catch (error => {
      console.error("Error retrieving character info " + error);
    });
  return result;
}


export async function getStaticStats(playercharacterid) {
  let result = staticstatsdefaultresult;
  await db.any(getcharacterstaticstatsquery, [playercharacterid])
    .then ((dbinfo) => {
      console.log("got static stats data");
      result = {...dbinfo[0]};
      console.log(result);
      return result;
    }).catch (error => {
      console.error("Error retrieving character info " + error);
    });
  return result;
}


const featuresdefaultresult = [
  {
    sectionname: "Class Features",
    sectionfeatures: [
      {
        featuretitle: "Rage",
        featuretext: "As a bonus action enter a rage for up to 1 minute (10 rounds). You gain advantage on STR checks and saving throws (not attacks), melee damage with STR weapons, resistance to bludgeoning, piercing, slashing damage. You can't cast or concentrate on spells while raging. \n Your rage ends early if you are knocked unconscious or if your turn ends and you haven’t attacked a hostile creature since your last turn or taken damage since then. You can also end your rage as a bonus action.",
      },
      {
        featuretitle: "Unarmored Defense",
        featuretext: "While not wearing armor, your AC equals 10 + DEX modifier + CON modifier + any shield bonus. ",
      },
    ],
  },
  {
    sectionname: "Race Features",
    sectionfeatures: [
      {
        featuretitle: "Darkvision",
        featuretext: "You can see in darkness (shades of gray) up to 60 ft.",
      },
      {
        featuretitle: "Keen Senses",
        featuretext: "You have proficiency in the Perception skill.",
      },
      {
        featuretitle: "Fleet of Foot",
        featuretext: "Your base walking speed increases to 35 feet.",
      },
    ],
  },
];


const getcharacterfeatures = new PQ({
  text: `

  `
});


const getclassfeatures = new PQ({
  text: `
  
  `
});


const getracefeatures = new PQ({
  text: `
  
  `
});


export async function getFeatures(playercharacterid) {
  let result = featuresdefaultresult;
  await db.any(getcharacterfeaturesquery, [playercharacterid])
    .then ((dbinfo) => {
      for (const feature of db) {
        featuredata = getFeatureData(feature);
      }
      console.log("got features!!"); 
      console.log(result);
      return result;
    }).catch (error => {
      console.error("Error retrieving character info " + error);
    });
  return result;
}


function getFeatureData(feature) {
  featuredata = {};
  featuredata.name = feature.name;
  featuredata.description = feature.description;
  featuredata.featuretype = feature.featuretype;
  switch (feature.featuretype) {
    case 'Proficiency':
      // Get info from proficiency, add to featuredata
      break;
    case 'Action':
      // Get info from proficiency, add to featuredata
      break;
    case 'Speed':
      // Get info from proficiency, add to featuredata
      break;
    case 'Ability Score':
      // Get info from proficiency, add to featuredata
      break;
    case 'Ability Action':
      // Get info from proficiency, add to featuredata
      break;
  }
  return featuredata;
}


const getcharinfoforfeaturesquery = new PQ({
  text: `
    SELECT race, subrace, class, subclass, characterlevel FROM playercharacter
    WHERE playercharacterid = $1;
  `
});

export async function addFeaturesToCharacter(playercharacterid) {
  let charinfo = {};
  // Get characterlevel, class, race, subclass, subrace 
  await db.one(getcharinfoforfeaturesquery, [playercharacterid])
  .then((result) => {
    charinfo = {...result[0]};
  }).catch((error) => {
    console.error('Error getting basic character info for features:' + error);
  });
  // Get class features for class id and level

  // Get race features for class id and level
}
