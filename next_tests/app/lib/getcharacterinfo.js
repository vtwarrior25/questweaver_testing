'use server'

const pgp = require('pg-promise')();
const {ParameterizedQuery: PQ} = require('pg-promise');
import { db } from '../lib/dbconn';
/*
const connection = {
  host: process.env.DBHOST,
  port: process.env.DBPORT,
  database: process.env.DB,
  user: process.env.DBUSER,
  password: process.env.DBPWD,
}

const db = pgp(connection);
*/


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

function characterInfoFromDB (playercharacterid, infotype) {
  let dbquery = "";
  let dbresult = {}; 
  switch (infotype) {
    case 'skill':
      //dbquery = new PQ({text: 'SELECT * FROM skill'});
      dbresult = [
        {
          skillname: "Acrobatics",
          skillmod: "Dex",
          skillprof: false,
          skillbonus: 2,
        }, 
        {
          skillname: "Animal Handling",
          skillmod: "Wis",
          skillprof: true,
          skillbonus: 3,
        }, 
        {
          skillname: "Arcana",
          skillmod: "Int",
          skillprof: false,
          skillbonus: -1,
        }, 
        {
          skillname: "Athletics",
          skillmod: "Str",
          skillprof: false,
          skillbonus: 3,
        }, 
        {
          skillname: "Deception",
          skillmod: "Cha",
          skillprof: false,
          skillbonus: 0,
        }, 
        {
          skillname: "History",
          skillmod: "Int",
          skillprof: false,
          skillbonus: -1,
        }, 
        {
          skillname: "Insight",
          skillmod: "Wis",
          skillprof: true,
          skillbonus: 1,
        }, 
        {
          skillname: "Intimidation",
          skillmod: "Cha",
          skillprof: false,
          skillbonus: 0,
        }, 
        {
          skillname: "Investigation",
          skillmod: "Int",
          skillprof: false,
          skillbonus: -1,
        }, 
        {
          skillname: "Medicine",
          skillmod: "Wis",
          skillprof: false,
          skillbonus: +1,
        }, 
        {
          skillname: "Nature",
          skillmod: "Int",
          skillprof: false,
          skillbonus: -1,
        }, 
        {
          skillname: "Perception",
          skillmod: "Wis",
          skillprof: true,
          skillbonus: +3,
        }, 
        {
          skillname: "Performance",
          skillmod: "Cha",
          skillprof: false,
          skillbonus: 0,
        }, 
        {
          skillname: "Persuasion",
          skillmod: "Cha",
          skillprof: false,
          skillbonus: 0,
        }, 
        {
          skillname: "Religion",
          skillmod: "Int",
          skillprof: false,
          skillbonus: 0,
        }, 
        {
          skillname: "Sleight of Hand",
          skillmod: "Dex",
          skillprof: false,
          skillbonus: +2
        }, 
        {
          skillname: "Stealth",
          skillmod: "Dex",
          skillprof: true,
          skillbonus: 2,
        }, 
        {
          skillname: "Survival",
          skillmod: "Wis",
          skillprof: false,
          skillbonus: 3,
        },
      ];
      break;
    case 'ability':
      //dbquery = new PQ({text: 'SELECT * FROM ability'});
      dbresult = [
          {
            abilityname: "Strength",
            abilityabbrev: "STR",
            abilityscore: 11,
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
      //dbquery = new PQ({text: 'SELECT * FROM health'});
      dbresult = {
        currenthealth: 12,
        maxhealth: 22,
      }
      break;
    case 'staticstats':
      //dbquery = new PQ({text: 'SELECT * FROM static_stats'});
      dbresult = {
        profbonus: 2,
        speed: 30,
        initiative: 2,
        armorclass: 14,
        perception: 5,
        investigation: 5,
        insight: 5,
        armor: "Light, Medium, Heavy, Shields",
        weapons: "Martial, Simple",
        tools: "Cobbler's, Land Vehicles",
        languages: "Common, Halfling",
        defenses: "Fireproof",
        conditions: "Dry Heaving",
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
      dbresult = [
        {
          id: 0,
          name: "Jerome",
          initiative: 15,
        },
        {
          id: 1,
          name: "Dylan",
          initiative: 12,
        },
        {
          id: 2,
          name: "Greg",
          initiative: 11,
        },
        {
          id: 3,
          name: "Rebecca",
          initiative: 8,
        },
        {
          id: 4,
          name: "Jauffre",
          initiative: 7,
        },
        {
          id: 5,
          name: "Erica",
          initiative: 3,
        },
      ]; 
      //dbquery = new PQ({text: 'SELECT p.name, t.initiative FROM turnorder t JOIN playercharacter p ON t.playercharacterid = p.playercharacterid'});
      break;
    case 'alignment':
      //dbquery = new PQ({text: 'SELECT * FROM alignment'});
      break;
  }
  //dbresult = db.query(dbquery)
  //return dbquery;
  return dbresult;
}

export async function getcharacterinfo(playercharacterid, infotype) {
  let characterinfo = characterInfoFromDB(playercharacterid, infotype);
  console.log(characterInfoFromDB);
  return characterinfo;
  
  //let characterinfo = characterInfoFromDB(q.infotype);
  /*
  let characterquery = characterInfoFromDB(q.infotype, q.characterkey);
  db.any(dbresult)
    .then (dbinfo => {
      console.log("got character info from " + q);
      console.log(dbinfo);
      return dbinfo;
    }).catch (error => {
      return "not found";
    });
  */
  }