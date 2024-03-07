'use server'
const pgp = require('pg-promise')();
const {ParameterizedQuery: PQ} = require('pg-promise');
import { db } from '../lib/dbconn';


const playercharacteraddquery = new PQ({
  text: `
  WITH pcid AS (
    INSERT INTO playercharacter (playercharacterid, name, race, subrace, class, subclass, armorclass, maxhealth, currenthealth, speed, initiative, proficiencybonus, characterlevel, spellsavedc, spellattackmodifier, spellabilitymodifier, totalhitdice, numhitdice) VALUES
    (DEFAULT, $1, (SELECT raceid FROM race WHERE name = $2), $3, (SELECT classid FROM class WHERE name = $4), $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) RETURNING playercharacterid
  ) 
  INSERT INTO playercharacternote (playercharacterid, alignmentid, organizations, allies, enemies, backstory, other) VALUES
  (pcid, (SELECT alignmentid FROM alignment WHERE name = $17), $18, $19, $20, $21, $22)
  RETURNING pcid;
  `
});

const playercharacterabilityquery = new PQ({
  text: `
    
  `
});

const playerskillquery = new PQ({
  text: `

  `
});


export async function createCharacter(formdata) {
  db.one(playercharacteraddquery, [formdata])
  .then((result) => {
    db.one()
  }).catch((error) => {
    return "Error inserting player character";
  })
}



/*

-- Inserting the basic character info
WITH pcid AS (
  INSERT INTO playercharacter (playercharacterid, name, race, subrace, class, subclass, armorclass, maxhealth, currenthealth, speed, initiative, proficiencybonus, characterlevel, spellsavedc, spellattackmodifier, spellabilitymodifier, totalhitdice, numhitdice) VALUES
  (DEFAULT, "Jerome", (SELECT raceid FROM race WHERE name = 'Human'), NULL, (SELECT classid FROM class WHERE name = 'Barbarian'), 14, 20, 20, 30, 12, 2, 1, NULL, NULL, NULL, 2, 2) RETURNING playercharacterid
) 
INSERT INTO playercharacternote (playercharacterid, alignmentid, organizations, allies, enemies, backstory, other) VALUES
(pcid, (SELECT alignmentid FROM alignment WHERE name = "Neutral"), 'This is Organizations', 'This is Allies', 'This is Enemies', 'This is Backstory', 'This is Other');


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