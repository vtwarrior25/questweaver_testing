'use server'
const pgp = require('pg-promise')();
const {ParameterizedQuery: PQ} = require('pg-promise');
import { db } from './dbconn';
import { abilities, skills } from './resources';

  // Get a list of races and a list of subraces, remove the races from the list that have subraces
  // Using those lists, grab all of the features associated with each subrace and race within the list
  
  // Do the same thing for classes and subclasses as well, but this time the main list just contains the classes,
  // with the subclass and its info being nested within the class info

const getsubracesquery = new PQ({
  text: `
    SELECT s.subraceid, s.raceid, s.name FROM subrace s;
  `
});

const getracesquery = new PQ({
  text: `
    SELECT r.raceid, r.name, r.creaturesize FROM race r;
  `
});



const { db } = require('./dbconn');

export async function getCharacterCreatorInfo() {
  let subracesWithRaces = [];
  let racesWithoutSubraces = [];

  // Get list of subraces with their corresponding race
  try {
    subracesWithRaces = await db.many(`
      SELECT s.subraceid, s.name AS subrace_name, r.raceid, r.name AS race_name
      FROM subrace s
      JOIN race r ON s.raceid = r.raceid;
    `); 

    // For each subrace, fetch associated features
    for (const subrace of subracesWithRaces) {
      const features = await db.many(`
        SELECT f.*
        FROM subracefeature sf
        JOIN feature f ON sf.featureid = f.featureid
        WHERE sf.subraceid = $1;
      `, [subrace.subraceid]);
      subrace.features = features;
    }
  } catch (error) {
    console.error("Error fetching subraces with races and their features:", error);
  }

  // Get list of races that don't have subraces
  try {
    racesWithoutSubraces = await db.many(`
      SELECT r.*
      FROM race r
      WHERE NOT EXISTS (
        SELECT 1
        FROM subrace s
        WHERE s.raceid = r.raceid
      );
    `);

    // For each race, fetch associated features
    for (const race of racesWithoutSubraces) {
      const features = await db.many(`
        SELECT f.*
        FROM racefeature rf
        JOIN feature f ON rf.featureid = f.featureid
        WHERE rf.raceid = $1;
      `, [race.raceid]);
      race.features = features;
    }
  } catch (error) {
    console.error("Error fetching races without subraces and their features:", error);
  }

  // Combine and return the data
  return {
    subracesWithRaces,
    racesWithoutSubraces
  };
}
