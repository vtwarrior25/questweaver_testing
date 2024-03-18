'use server'
const pgp = require('pg-promise')();
const {ParameterizedQuery: PQ} = require('pg-promise');
import { db } from '../lib/dbconn';
import { abilities } from './resources';


const skillsquery = new PQ({
  text: `
    SELECT s.skillid, c.modifier FROM skill
    JOIN characterability c ON s.abilityid = c.abilityid
    WHERE c.playercharacterid = $1; 
  `
});

const playercharacteraddquery = new PQ({
  text: `
  WITH pcid AS (
    INSERT INTO playercharacter (playercharacterid, name, race, subrace, class, subclass, armorclass, maxhealth, currenthealth, speed, initiative, proficiencybonus, characterlevel, spellsavedc, spellattackmodifier, spellabilitymodifier, totalhitdice, numhitdice) VALUES
    (DEFAULT, $1, (SELECT raceid FROM race WHERE name = $2), $3, (SELECT classid FROM class WHERE name = $4), $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) RETURNING playercharacterid
  ) 
  INSERT INTO playercharacternote (playercharacterid, alignmentid, organizations, allies, enemies, backstory, other) VALUES
  ((SELECT * from pcid), (SELECT alignmentid FROM alignment WHERE name = $17), $18, $19, $20, $21, $22)
  RETURNING playercharacterid;
  `
});

const playercharacterabilityquery = new PQ({
  text: `
    INSERT INTO characterability (playercharacterid, abilityid, score, modifier) VALUES
    ($1, (SELECT abilityid FROM ability WHERE name = $2), $3, $4);
  `
});

const playercharacterskillquery = new PQ({
  text: `
    INSERT INTO characterskill (playercharacterid, skillid, proficient, bonus) VALUES
    ($1, (SELECT skillid FROM skill WHERE name = $2), $3, $4);
  `
}); 

const playercharacterpassiveabilityquery = new PQ({
  text: `
    INSERT INTO characterpassiveability (playercharacterid, passiveperception, passiveinvestigation, passiveinsight) VALUES 
    ($1, $2, $3, $4);
  `
});

const playercharacterfeaturequery = new PQ({
  text: `
    INSERT INTO characterfeature (playercharacterid, featureid) VALUES
    ($1, (SELECT featureid FROM feature WHERE name = $2));
  `
});

const playercharacterproficiencyquery = new PQ({
  text: `
    INSERT INTO characterproficiency (playercharacterid, proficiencyid) VALUES
    ($1, (SELECT proficiencyid FROM proficiency WHERE name = $2));
  `
});

const playercharacterdefensequery = new PQ({
  text: `
    INSERT INTO characterdefense (playercharacterid, defenseid, defensestatus) VALUES
    ($1, (SELECT defenseid FROM defense WHERE name = $2), $3);
  `
});


export async function createCharacter(formdata) {
  let playercharacterid;
  let playercharacterabilityscores = {
    Strength: formdata.abilties.strength,
    Dexterity: formdata.abilities.dexterity,
    Constitution: formdata.abilities.constitution,
    Intelligence: formdata.abilities.intelligence,
    Wisdom: formdata.abilities.wisdom,
    Charisma: formdata.abilities.charisma,
  }
  db.one(playercharacteraddquery, [formdata])
  .then((playerresult) => {
    playercharacterid = playerresult.pcid;
    for (ability of abilities) {
      //db.none(playercharacterabilityquery, [playercharacterid, ability, formdata.abilties[(ability.toLowerCase())], (Number(formdata.abilties[(ability.toLowerCase())])-10)/2]);
      db.none(playercharacterabilityquery, [playercharacterid, ability, playercharacterabilityscores[ability], (Number(playercharacterabilityscores[ability])-10)/2]);
    }
    db.many(skillsquery, [playercharacterid])
    .then((skillresult) => {
      for (skill of skillresult) {
        // Need to provide a way of sending which skills the character is proficient in
        db.none(playercharacterskillquery, [playercharacterid, skill.skillid, false, skill.modifier]);
      }
    })
    for (feature of features) {
      db.many(playercharacterfeaturequery, [playercharacterid, feature.name])
      .then((featureresult) => {

      }).catch((error) => {
        console.error("Error adding features to character: " + error);
      })
    }
  }).catch((error) => {
    return "Error inserting player character";
  })
}


/*

-- Inserting the ability, skill, saving throw, passive ability, defense, proficiency, and features
WITH pcid AS (
  SELECT playercharacterid FROM playercharacter WHERE name = 'Jerome'
)
INSERT INTO characterability (playercharacterid, abilityid, score, modifier) VALUES
(pcid, (SELECT abilityid FROM ability WHERE name = 'Strength'), 17, +1),
(pcid, (SELECT abilityid FROM ability WHERE name = 'Dexterity'), 12, +1),
(pcid, (SELECT abilityid FROM ability WHERE name = 'Constitution'), 14, +1),
(pcid, (SELECT abilityid FROM ability WHERE name = 'Intelligence'), 8, +1),
(pcid, (SELECT abilityid FROM ability WHERE name = 'Wisdom'), 10, +1),
(pcid, (SELECT abilityid FROM ability WHERE name = 'Charisma'), 13, +1),


WITH pcid AS (
  SELECT playercharacterid FROM playercharacter WHERE name = 'Jerome'
)
INSERT INTO characterskill (playercharacterid, skillid, proficient, bonus) VALUES
(pcid, (SELECT skillid FROM skill WHERE name = 'Acrobatics'), false, 2),
(pcid, (SELECT skillid FROM skill WHERE name = 'Animal Handling'), false, 2),
(pcid, (SELECT skillid FROM skill WHERE name = 'Arcana'), false, 2),
(pcid, (SELECT skillid FROM skill WHERE name = 'Athletics'), false, 2),
(pcid, (SELECT skillid FROM skill WHERE name = 'Deception'), false, 2),
(pcid, (SELECT skillid FROM skill WHERE name = 'History'), false, 2),
(pcid, (SELECT skillid FROM skill WHERE name = 'Insight'), false, 2),
(pcid, (SELECT skillid FROM skill WHERE name = 'Intimidation'), false, 2),
(pcid, (SELECT skillid FROM skill WHERE name = 'Investigation'), false, 2),
(pcid, (SELECT skillid FROM skill WHERE name = 'Medicine'), false, 2),
(pcid, (SELECT skillid FROM skill WHERE name = 'Nature'), false, 2),
(pcid, (SELECT skillid FROM skill WHERE name = 'Perception'), false, 2),
(pcid, (SELECT skillid FROM skill WHERE name = 'Performance'), false, 2),
(pcid, (SELECT skillid FROM skill WHERE name = 'Persuasion'), false, 2),
(pcid, (SELECT skillid FROM skill WHERE name = 'Religion'), false, 2),
(pcid, (SELECT skillid FROM skill WHERE name = 'Sleight of Hand'), false, 2),
(pcid, (SELECT skillid FROM skill WHERE name = 'Stealth'), false, 2),
(pcid, (SELECT skillid FROM skill WHERE name = 'Survival'), false, 2);

WITH pcid AS (
  SELECT playercharacterid FROM playercharacter WHERE name = 'Jerome'
)
INSERT INTO charactersavingthrow (playercharacterid, savingthrowid, proficient, bonus) VALUES 
(pcid, (SELECT savingthrowid FROM savingthrow WHERE name = 'Strength', false, 2)),
(pcid, (SELECT savingthrowid FROM savingthrow WHERE name = 'Dexterity', false, 2)),
(pcid, (SELECT savingthrowid FROM savingthrow WHERE name = 'Constitution', false, 2)),
(pcid, (SELECT savingthrowid FROM savingthrow WHERE name = 'Intelligence', false, 2)),
(pcid, (SELECT savingthrowid FROM savingthrow WHERE name = 'Wisdom', false, 2)),
(pcid, (SELECT savingthrowid FROM savingthrow WHERE name = 'Charisma', false, 2));






SELECT * 
FROM charactersavingthrow c 
  JOIN playercharacter p ON c.playercharacterid = p.playercharacterid 
  JOIN savingthrow s ON c.savingthrowid = s.savingthrowid 
  JOIN ability a ON s.abilityid = a.abilityid
WHERE c.playercharacter = //provide characterid or token thing


*/