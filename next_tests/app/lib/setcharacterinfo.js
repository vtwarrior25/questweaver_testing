'use server'
import { db } from './dbconn';
const pgp = require('pg-promise')();
const {ParameterizedQuery: PQ} = require('pg-promise');

/*
export async function setCharacterHealth(playercharacterid, health) {
  console.log(`${playercharacterid} - ${health}`);
  return `Set health to ${health}`;
}
*/

const updatecharacternotesquery = new PQ({
  text: `
    UPDATE playercharacternote
    SET organizations = $2, allies = $3, enemies = $4, backstory = $5, other = $6
    WHERE playercharacterid = $1;
  `
})

export async function setCharacterNotes(playercharacterid, notes) {
  db.none(updatecharacternotesquery, [playercharacterid, notes[0].sectiontext, notes[1].sectiontext, notes[2].sectiontext, notes[3].sectiontext, notes[4].sectiontext]);
}