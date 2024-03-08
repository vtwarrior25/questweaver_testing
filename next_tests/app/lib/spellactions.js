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
})

export async function getSpellList(playercharacterid) {
  /*
  db.any(getspelllistquery, [playercharacterid])
  .then((result) => {
    return result;
  }).catch((error) => {
    return "Error retrieving spell list";
  })
  */
  return {
    
  }
}

export async function getPreparedSpells(playercharacterid) {
  
}