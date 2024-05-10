'use server'
const pgp = require('pg-promise')();
const {ParameterizedQuery: PQ} = require('pg-promise');
import { db } from '../lib/dbconn';
import { addFeaturesToCharacter } from './getcharacterinfo';
import { abilities } from './resources';

const checkforplayerexistencequery = new PQ({
  text: `
    SELECT playercharacterid 
    FROM playercharacter
    WHERE playerid = $1 AND name = $2;
  `
});

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
    INSERT INTO playercharacter (playercharacterid, name, race, subrace, class, subclass, maxhealth, currenthealth, proficiencybonus, characterlevel, totalhitdice, numhitdice) VALUES
    (DEFAULT, $1, (SELECT raceid FROM race WHERE name = $2), (SELECT subraceid FROM subrace WHERE name = $3), (SELECT classid FROM class WHERE name = $4), (SELECT subclassid FROM subclass WHERE name = $5), (SELECT hitpoints1stlevel FROM class WHERE name = $4), (SELECT hitpoints1stlevel FROM class WHERE name = $4), 2, 1, 1, 1) RETURNING playercharacterid
  ) 
  INSERT INTO playercharacternote (playercharacterid, alignmentid, organizations, allies, enemies, backstory, other) VALUES
  ((SELECT * from pcid), (SELECT alignmentid FROM alignment WHERE name = $6), $7, $8, $9, $10, $11)
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

/*
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
*/

const playercharacterfeaturequery = new PQ({
  text: `
    INSERT INTO characterfeature (playercharacterid, featureid) VALUES
    ($1, (SELECT featureid FROM feature WHERE name = $2));
  `
});

const getspellcastingabilitymodquery = new PQ({
  text: `
    SELECT ca.modifier
    FROM characterability ca
    WHERE abilityid = (SELECT spellcastingabilityid FROM class WHERE name = $1);
  `
});

const setcharacterspellmodifiersquery = new PQ({
  text: `
    UPDATE playercharacter 
    SET spellsavedc = $2, spellattackmodifier = $3, spellabilitymodifier = $4
    WHERE playercharacterid = $1; 
  `
});

const setcharacterpassiveabilityquery = new PQ({
  text: `
    INSERT INTO characterpasssiveability (playercharacterid, passiveperception, passiveinvestigation, passiveinsight) VALUES
    ($1, $2, $3, $4);
  `
});

const updateplayercharacterquery = new PQ({
  text: `
  WITH pcid AS (
    UPDATE playercharacter
    SET name = $1, race = (SELECT raceid FROM race WHERE name = $2), subrace = (SELECT subraceid FROM subrace WHERE name = $3), class = (SELECT classid FROM class WHERE name = $4), subclass = (SELECT subclassid FROM subclass WHERE name = $5), maxhealth = (SELECT hitpoints1stlevel FROM class WHERE name = $4), currenthealth = (SELECT hitpoints1stlevel FROM class WHERE name = $4), proficiencybonus = 2, characterlevel = 1, totalhitdice = 1, numhitdice = 1
    WHERE playercharacterid = $6
  )
  UPDATE playercharacternote
  SET alignmentid = (SELECT alignmentid FROM alignment WHERE name = $7), organizations = $8, allies = $9, enemies = $10, backstory = $11, other = $12
  WHERE playercharacterid = $6;`
});

const updateplayercharacterabilityquery = new PQ({
  text: ``
});

const updateplayercharacterskillquery = new PQ({
  text: ``
});

const updateplayercharacterfeaturequery = new PQ({
  text: ``
});

const updatecharacterspellmodifierquery = new PQ({
  text: ``
});

const updatecharacterpassiveabilityquery = new PQ({
  text: ``
});


export async function checkIfPlayerExists(playerid, name) {
 // let data = {};
  await db.oneOrNone(checkforplayerexistencequery, [playerid, name])
  .then((result) => {
    console.log(result);
  }).catch((error) => {
    console.error('Error retrieving thing: ' + error);
  }); 
  //return data;
}

export async function createCharacter(formdata, playerid) {
  // Check if they have a character already???
  let doescharacterexist = false;
  let playercharacterid;
  await db.one(checkforplayerexistencequery, [playerid, formdata.name])
  .then((result) => {
    if (result !== null) {
      playercharacterid = result;
      doescharacterexist = true;
    }
  }).catch((error) => {
    console.error('Error running character existence query: ' + error);
    return;
  }); 
  if (doescharacterexist) { // Update character info if exists
    await db.none(updateplayercharacterquery, [formdata.name, formdata.race, formdata.subrace, formdata.class, formdata.subclass, playercharacterid, formdata.alignment, formdata.descriptions[0], formdata.descriptions[1], formdata.descriptions[2], formdata.descriptions[3], formdata.descriptions[4]])
    .then((playerresult) => {

    }).catch((error) => {
      console.error("Error updating existing player character: " + error);
    });
  }
  let abilities = [];
  let playercharacterabilityscores = {
    Strength: formdata.abilities.STR,
    Dexterity: formdata.abilities.DEX,
    Constitution: formdata.abilities.CON,
    Intelligence: formdata.abilities.INT,
    Wisdom: formdata.abilities.WIS,
    Charisma: formdata.abilities.CHA,
  }
  // Create new character
  await db.one(playercharacteraddquery, [formdata.name, formdata.race, 
  formdata.subrace, formdata.class, formdata.subclass,
  formdata.alignment, formdata.descriptions[0], formdata.descriptions[1], formdata.descriptions[2],
  formdata.descriptions[3], formdata.descriptions[4]])
  .then((playerresult) => {
    playercharacterid = playerresult.pcid;
  }).catch((error) => {
    return "Error inserting player character";
  });
  // Add ability scores for character
  for (ability of abilities) {
    //db.none(playercharacterabilityquery, [playercharacterid, ability, formdata.abilties[(ability.toLowerCase())], (Number(formdata.abilties[(ability.toLowerCase())])-10)/2]);
    await db.none(playercharacterabilityquery, [playercharacterid, ability, playercharacterabilityscores[ability], (Number(playercharacterabilityscores[ability])-10)/2]);
  }
  // Add skills for character
  await db.many(skillsquery, [playercharacterid])
  .then((skillresult) => {
    for (skill of skillresult) {
      // Need to provide a way of sending which skills the character is proficient in
      db.none(playercharacterskillquery, [playercharacterid, skill.skillid, false, skill.modifier]);
    }
  });
  let abilitymod = 0;
  // Handle spellcasting ability things
  await db.oneOrNone(getspellcastingabilitymodquery, [formdata.class])
  .then((result) => {
    abilitymod = result.modifier;
  })
  .catch((error) => {
    console.error("Error getting spellcasting ability mod" + error);
  })
  let spellsavedc = 8 + abilitymod + 2;
  let spellattackmod = abilitymod + 2;
  let spellabilitymod = abilitymod;
  // Set spellsavedc and spellattackmod
  await db.none(setcharacterspellmodifiersquery, [playercharacterid, spellsavedc, spellattackmod, spellabilitymod])
  .catch((error) => {
    console.error("Error setting character spell modifiers: " + error);
  })
  //
  await db.none(setcharacterpassiveabilityquery, [playercharacterid, Number(formdata.abilities.WIS + 10), Number(formdata.abilities.INT + 10), Number(formdata.abiliites.WIS + 10)])
  .catch((error) => {
    console.error('Error adding passive abilities: ' + error);
  });

  // Add features to character
  await addFeaturesToCharacter(playercharacterid, true)
  .catch((error) => {
    console.error("Error adding features to character: " + error);
  });
  
}

function levelUp(playercharacterid) {
  // Get current characterlevel
  
}


const addtempplayercharacterid = new PQ({
  text: `
    INSERT INTO playercharacter (playercharacterid) VALUES
    (DEFAULT);
  `
});


export async function addTempCharacterID () {

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