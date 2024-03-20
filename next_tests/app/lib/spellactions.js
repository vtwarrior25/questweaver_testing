'use server'
const pgp = require('pg-promise')();
const {ParameterizedQuery: PQ} = require('pg-promise');
import { db } from './dbconn';

const getspelllistquery = new PQ({
  text: `
    SELECT FROM spell sp 
      JOIN spelllist sl ON sp.spellid = sl.spellid
    WHERE 
      sl.classid = (SELECT classid FROM playercharacter WHERE playercharacterid = $1) AND 
      sl.classlevel = (SELECT characterlevel FROM playerchracter WHERE playercharacterid = $1);  
  `
});

const getpreparedspellsquery = new PQ ({
  text: 
    `SELECT * FROM preparedlist c 
      JOIN spell p ON c.spellid = p.spellid 
    WHERE c.playercharacterid = $1;`
});

const preparequery = new PQ({
  text: `
  INSERT INTO preparedlist (playercharacterid, spellid) VALUES 
  (DEFAULT, $1, (SELECT spellid FROM spell WHERE name = $2));
  `
});

const unpreparequery = new PQ({
  text: `
  DELETE FROM preparedlist c 
    JOIN spell p ON c.spellid = p.spellid 
  WHERE c.playercharacterid = $1 AND c.spellid = (SELECT spellid FROM spell WHERE name = $2);
  `
});

export async function getSpellList(playercharacterid) {
  db.any(getspelllistquery, [playercharacterid])
  .then((result) => {
    return result;
  }).catch((error) => {
    console.log(error);
    console.log("spell list not found");
    return error;
  });
}

export async function getPreparedSpells (playercharacterid) {
  db.any(getpreparedspellsquery, [playercharacterid])
  .then (dbinfo => {
    console.log(dbinfo);
    return dbinfo;
  })
  .catch(error => {
    console.log(error);
    console.log("prepared spells not found");
    return error;
  });
}

export async function setPreparedSpell (playercharacterid, spellname) {
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