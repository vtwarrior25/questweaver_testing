'use server'  
const pgp = require('pg-promise')();
const {ParameterizedQuery: PQ} = require('pg-promise');
import { db } from '../lib/dbconn';

const getmonstertypesquery = new PQ({
  text: `
    SELECT name FROM monstertype;
  `
});

export async function createMonsterGroup(formdata) {
  console.log(formdata.get('name'));
}

export async function getMonsterTypes() {
  let monstertypes = [];
  db.any(getmonstertypesquery)
  .then((result) => {
    console.log("getting monster types");
    console.log(result);
    monstertypes = [...result];
  }).catch((error) => {
    console.error("Error getting monster types: " + error);
    return;
  })
  return monstertypes;
}

// To add monster group from form
  // Check if an encounter exists with the given name
    // If an encounter exists with that name, add the monster group to the monstergroup table with that encounterid attached (join from encounter using name)
    // If no encounter exists with that name, add a new encounter to the encounter table, and then add the monster group to the monster group table with the new encounterid
  // Add data of each ability into monsterability
  // Add data for each attack into attack, then attach the attacks to monsterattack using attackid and monsterid 
