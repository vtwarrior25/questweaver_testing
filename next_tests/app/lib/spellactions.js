'use server'
const pgp = require('pg-promise')();
const {ParameterizedQuery: PQ} = require('pg-promise');
import { db } from './dbconn';

const getspelllistquery = new PQ({
  text: `
    SELECT sp.name, sp.description FROM spell sp 
      JOIN spelllist sl ON sp.spellid = sl.spellid
    WHERE
      sl.classid = (SELECT class FROM playercharacter WHERE playercharacterid = $1) AND 
      sl.classlevel = (SELECT characterlevel FROM playercharacter WHERE playercharacterid = $1)
    EXCEPT
      SELECT sp.name, sp.description from spell sp
        JOIN preparedlist p ON sp.spellid = p.spellid
      WHERE p.playercharacterid = $1;
  `
});


const getpreparedlistquery = new PQ({
  text: `
    SELECT sp.name, sp.description from spell sp
      JOIN preparedlist p ON sp.spellid = p.spellid
    WHERE p.playercharacterid = $1;
  `
});


// TODO: talk to Chapin about this query, specifically how to handle the nulls with the joins
// I asked him, we resolved it in a boof manner
const getpreparedspellsquery = new PQ({
  text:
    `
      SELECT sl.spelllevel, s.name, s.casttime AS timetocast, s.spellrange AS range,
      a.abbrev AS saveability, d1.sides AS hitdcdie, s.hitdcdicenum, s.hitdcmod, d2.sides AS effectdicetype,
      s.effectdicenum, s.effectmod, s.levelmod, s.levelmodtype, e.name AS effect 
      FROM preparedlist p
        JOIN spell s ON p.spellid = s.spellid 
        JOIN spelllist sl ON p.spellid = sl.spellid
        JOIN ability a ON s.saveability = a.abilityid
        JOIN dice d1 ON s.hitdcdie = d1.diceid
        JOIN dice d2 ON s.effectdicetype = d2.diceid
        JOIN effecttype e ON s.effecttypeid = e.effecttypeid
      WHERE p.playercharacterid = $1 AND sl.classid = (SELECT classid FROM class WHERE name = $2);
    `
});

const preparequery = new PQ({
  text: `
  INSERT INTO preparedlist (playercharacterid, spellid) VALUES 
  ($1, (SELECT spellid FROM spell WHERE name = $2));
  `
});

const unpreparequery = new PQ({
  text: `
  DELETE FROM preparedlist c 
  WHERE c.playercharacterid = $1 AND c.spellid = (SELECT spellid FROM spell WHERE name = $2);
  `
});

export async function getSpellList(playercharacterid) {
  let spelllist = [];
  await db.any(getspelllistquery, [playercharacterid])
  .then((result) => {
    console.log('returning spell list');
    console.log(result);
    spelllist = [...result]; 
  }).catch((error) => {
    console.log(error);
    console.log("spell list not found");
    return error;
  });
  console.log("We are already returning, because why not!!");
  return spelllist;
}

export async function getPreparedList(playercharacterid) {
  let preparedlist = [];
  await db.any(getpreparedlistquery, [playercharacterid])
  .then((result) => {
    console.log('returning prepared list');
    console.log(result);
    preparedlist = [...result]; 
  }).catch((error) => {
    console.log(error);
    console.log("prepared list not found");
    return error;
  });
  console.log("We are already returning, because why not!!");
  return preparedlist;
}


export async function getPreparedSpells (playercharacterid, classname) {
  let preparedspells = [];
  console.log('Player character id: ' + playercharacterid);
  console.log(classname);
  await db.any(getpreparedspellsquery, [playercharacterid, classname])
  .then (dbinfo => {
    console.log(dbinfo);
    preparedspells = [...dbinfo];
    console.log('This should be before the return');
  })
  .catch(error => {
    console.log(error);
    console.log("prepared spells not found");
    return error;
  });
  console.log('We are returning');
  console.log('Prepared list');
  console.log(preparedspells);
  return preparedspells;
}

export async function setPreparedSpell (playercharacterid, spellname) {
  console.log(playercharacterid);
  console.log(spellname);
  db.none(preparequery, [playercharacterid, spellname])
  .catch((error) => {
    console.log(error);
    console.log("Error preparing spell");
    return error;
  });
}

export async function unsetPreparedSpell (playercharacterid, spellname) {
  db.none(unpreparequery, [playercharacterid, spellname])
  .catch((error) => {
    console.log(error);
    console.log("Error unpreparing spell");
    return error;
  });
}