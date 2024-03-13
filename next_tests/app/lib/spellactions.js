'use server'
const pgp = require('pg-promise')();
const {ParameterizedQuery: PQ} = require('pg-promise');
import { db } from './dbconn';

const getspelllistquery = new PQ({
  text: `
    SELECT  FROM spell sp 
      JOIN spelllist sl ON sp.spellid = sl.spellid
    WHERE sl.classid = (SELECT classid FROM playercharacter WHERE playercharacterid = $1) AND sl.spelllevel = 
  `
});

const getpreppedquery = new PQ ({text: 'SELECT * FROM prepared_list c JOIN spell p ON c.spellid = p.spellid WHERE c.playercharacterid = $1'});

const preparequery = new PQ ({text : 'INSERT INTO prepared_list (playercharacterid, spellid) VALUES (DEFAULT, $1, $2)'});

const unpreparequery = new PQ ({text: 'DELETE FROM prepared_list c JOIN spell p ON c.spellid = p.spellid WHERE c.playercharacterid = $1 AND c.spellid = $2'});

export async function getSpellList(playercharacterid) {
  db.any(getspelllistquery, [playercharacterid])
  .then((result) => {
    return result;
  }).catch((error) => {
    return "Error retrieving spell list";
  });
}

export async function getpreparedspells (playercharacterid) {
  db.any(getpreppedquery, playercharacterid)
  .then (dbinfo => {
    console.log(dbinfo);
    return dbinfo;
  })
  .catch(error => {
    error.log("prepared spells not found");
    return "prepared spells not found";
  });
}

export async function setpreparedspell (playercharacterid, spellid) {
  db.none(preparequery, playercharacterid, spellid)
  .catch((error) => {
    console.log(error);
    console.log("Error preparing spell");
  });
}

export async function unsetpreparedspell (playercharacterid, spellid) {
  db.none(unpreparequery, playercharacterid, spellid)
  .catch((error) => {
    console.log(error);
    console.log("Error unpreparing spell");
  });
}