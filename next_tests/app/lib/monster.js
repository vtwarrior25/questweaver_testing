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
    return monstertypes;
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

const getencounternamequery = new PQ({
  text: 'SELECT name FROM encounter'
});

const addnewmonstergroupquery = new PQ({
  text: `
  INSERT INTO monstergroup (monstergroupid, encounterid, creaturesize, monstertypeid, alignment, groupname, description, hitdie, hitdienum, challengerating, xp, armorclass, speed, initiative, skills, features, notes)
  VALUES (DEFAULT, (SELECT encounterid FROM encounter WHERE name = $1), $2, (SELECT monstertypeid FROM monstertype WHERE name = $3), $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)`
});

const addnewencounterquery = new PQ({
  text: `
  INSERT INTO encounter (encounterid, name)
  VALUES (DEFAULT, $1)`
});

export async function addgroupfromform(formdata, encountername) {
  let encounternames = [];
  db.any(getencounternamequery)
  .then((result) => {
    encounternames = [...result];
    let ename;
    for (ename of encounternames) {
      if (ename == encountername) {
        // add monster group to monstergroup table with encounterid attatched
        db.one(addnewmonstergroupquery, [encountername, formdata.basicinfo.size, formdata.basicinfo.type, formdata.basicinfo.alignment, formdata.basicinfo.name, formdata.basicinfo.description, formdata.basicinfo.hitdicetype, formdata.basicinfo.hitdicenum, formdata.basicinfo.challengerating, formdata.basicinfo.xptotal, formdata.basicinfo.ac, formdata.basicinfo.speed, formdata.abilities.init, formdata.skills, formdata.ability, formdata.notes])
        .catch((error) => {
          console.log("Error adding new monster group to encounter: " + error);
          return;
        });
        break;
      }
    }
    if (ename != encountername) {
      // add new encounter to encounter table, and add monster group
      db.one(addnewencounterquery, encountername)
      .then((result) => {
        // add monster group to monstergroup table with encounterid attatched
        db.one(addnewmonstergroupquery, [encountername, formdata.basicinfo.size, formdata.basicinfo.type, formdata.basicinfo.alignment, formdata.basicinfo.name, formdata.basicinfo.description, formdata.basicinfo.hitdicetype, formdata.basicinfo.hitdicenum, formdata.basicinfo.challengerating, formdata.basicinfo.xptotal, formdata.basicinfo.ac, formdata.basicinfo.speed, formdata.abilities.init, formdata.skills, formdata.ability, formdata.notes])
        .catch((error) => {
          console.log("Error adding new monster group to encounter: " + error);
          return;
        });
      })
      .catch((error) => {
        console.log("Error adding new encounter: " + error);
        return;
      });
    }
    // add ability data from formdata into monsterability
    // add attack data from formdata into attack
    // link attacks to monsterattack with attackid/monsterid
  }).catch((error) => {
    console.log("Error getting encounter names: " + error);
    return;
  })
}