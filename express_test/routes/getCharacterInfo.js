var express = require('express');
var router = express.Router();

function characterInfoFromDB (infotype) {
  let dbquery = "";
  let dbresult = {}; 
  switch (infotype) {
    case 'skill':
      //dbquery = "skillquery";
      dbresult = {
        skills: [
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
        ],
      }
      break;
    case 'ability':
      dbquery = "abilityquery";
      dbresult = {
        abilities: [
          {
            abilityname: "Strength",
            abilityabbrev: "STR",
            abilityscore: 12,
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
      }
      break;
    case 'health':
      dbquery = "healthquery";
      dbresult = {
        currenthealth: 12,
        maxhealth: 22,
      }
      break;
    case 'staticstats':
      dbquery = "staticstatsquery"
      dbresult = {
        profbonus: 2,
        speed: 30,
        initiative: 2,
        armorclass: 14,
        perception: 5,
        investigation: 5,
        insight: 5,
        armor: "Light, Medium, Shields",
        weapons: "Martial, Simple",
        tools: "Cobbler's, Land Vehicles",
        languages: "Common, Halfling",
      }
      break;
  }
  //dbresult = db.query(dbquery)
  
  return dbresult;
}


router.get('/', function(req, res) {
  let q = req.query;
  let characterinfo = characterInfoFromDB(q.infotype);
  res.send(characterinfo);
});

module.exports = router;