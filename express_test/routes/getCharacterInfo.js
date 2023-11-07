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
            abilitybonus: 3
          },
          {
            abilityname: "Dexterity",
            abilityabbrev: "DEX",
            abilitybonus: 2
          },
          {
            abilityname: "Constitution",
            abilityabbrev: "CON",
            abilitybonus: 2
          },
          {
            abilityname: "Intelligence",
            abilityabbrev: "INT",
            abilitybonus: -1
          },
          {
            abilityname: "Wisdom",
            abilityabbrev: "WIS",
            abilitybonus: +1
          },
          {
            abilityname: "Charisma",
            abilityabbrev: "CHA",
            abilitybonus: 0
          },
        ]
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