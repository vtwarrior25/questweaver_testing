'use server'  
const pgp = require('pg-promise')();
const {ParameterizedQuery: PQ} = require('pg-promise');
import { db } from '../lib/dbconn';

const setcharacterhealthquery = new PQ({
  text: `
    UPDATE playercharacter 
    SET currenthealth = $2 
    WHERE playercharacterid = $1;
  `
});

export async function setCharacterHealth (playercharacterid, currenthealth) {
  db.none(setcharacterhealthquery, [playercharacterid, currenthealth])
  .catch((error) => {
    console.error("Error setting character health: " + error);
    return "Error setting health";
  });
}


const getcharacterhealthquery = new PQ({
  text: `
    SELECT c.currenthealth, c.maxhealth FROM playercharacter c
    WHERE c.playercharacterid = $1;
  `
});

export async function getCharacterHealth (playercharacterid) {
  let health = {};
  await db.any(getcharacterhealthquery, [playercharacterid])
  .then((result) => {
    console.log('got character health for ' + playercharacterid);
    health = {...result[0]};
    console.log(health);
    return health;
  }).catch((error) => {
    console.error("Error retrieving character health: " + error);
    return;
  });
  return health;
}


