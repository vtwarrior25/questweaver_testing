'use server'  
const pgp = require('pg-promise')();
const {ParameterizedQuery: PQ} = require('pg-promise');
import { db } from '../lib/dbconn';

const setcharacterhealthquery = new PQ({
  text: `
    UPDATE playercharacter 
    SET currenthealth $2 
    WHERE playercharacterid = $1;
  `
});

export async function setCharacterHealth (playercharacterid, currenthealth) {
  db.none(setcharacterhealthquery, [playercharacterid, currenthealth])
  .catch((error) => {
    console.error("Errotr setting character health: " + error);
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
  db.one(getcharacterhealthquery , [playercharacterid])
  .then((result) => {
    health = {...result[0]};
    console.log(health);
  }).catch((error) => {
    console.error("Error retrieving character health: " + error);
    return;
  });
  return health;
}


