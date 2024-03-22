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

export async function addItemsToCharacterInventory(playerCharacterId, items) {
  const cs = new pgp.helpers.ColumnSet(['playercharacterid', 'itemid', 'quantity'], {table: 'characterinventory'});
  const values = items.map(item => ({
    playercharacterid: playerCharacterId,
    itemid: item.itemId,
    quantity: item.quantity
  }));

  const query = pgp.helpers.insert(values, cs) + `
    ON CONFLICT (playercharacterid, itemid) DO UPDATE SET quantity = EXCLUDED.quantity + characterinventory.quantity;
  `;

  try {
    await db.none(query);
    console.log(`Added items to player character ${playerCharacterId}'s inventory.`);
  } catch (error) {
    console.error("Error adding items to character inventory:", error);
    throw error;
  }
}


export async function updateCharacterAbilityScores(playerCharacterId, abilities) {
  console.log(abilities)
  try {
      for (const ability of abilities) {
          // Check if an entry exists
          const existingEntry = await db.oneOrNone(`
              SELECT characterabilityid FROM characterability
              WHERE playercharacterid = $1 AND abilityid = $2;
          `, [playerCharacterId, ability.abilityid]);

          if (existingEntry) {
              // Entry exists, perform an update
              await db.none(`
                  UPDATE characterability
                  SET score = $3, modifier = $4
                  WHERE characterabilityid = $5;
              `, [playerCharacterId, ability.abilityid, ability.score, ability.modifier, existingEntry.characterabilityid]);
          } else {
              // No entry exists, perform an insert
              await db.none(`
                  INSERT INTO characterability (playercharacterid, abilityid, score, modifier)
                  VALUES ($1, $2, $3, $4);
              `, [playerCharacterId, ability.abilityid, ability.score, ability.modifier]);
          }
      }
  } catch (error) {
      console.error("Error updating character abilities:", error);
      throw error;
  }
}


export async function getCharacterClassInfo() {
  let classesWithSubclasses = [];

  // Step 1: Fetch all classes
  try {
      const classes = await db.many(`
          SELECT c.classid, c.name, c.hitdice, c.hitpoints1stlevel, c.hitpointshigherlevel, c.description, c.spellcastingabilityid
          FROM class c;
      `);

      // Step 2: For each class, fetch its subclasses
      for (const classItem of classes) {
          const subclasses = await db.manyOrNone(`
              SELECT s.subclassid, s.name, s.description, s.spellcastingabilityid
              FROM subclass s
              WHERE s.classid = $1;
          `, [classItem.classid]);

          // Add subclasses to the class item
          classItem.subclasses = subclasses;
      }

      classesWithSubclasses = classes;
  } catch (error) {
      console.error("Error fetching character class information:", error);
      throw error;
  }

  return classesWithSubclasses;
}



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

    // For each subrace, fetch associated features, including race features
    for (const subrace of subracesWithRaces) {
      const features = await db.many(`
        SELECT f.*
        FROM subracefeature sf
        JOIN feature f ON sf.featureid = f.featureid
        WHERE sf.subraceid = $1;
      `, [subrace.subraceid]);

      // Additionally, fetch race features for each subrace
      const raceFeatures = await db.many(`
        SELECT f.*
        FROM racefeature rf
        JOIN feature f ON rf.featureid = f.featureid
        WHERE rf.raceid = $1;
      `, [subrace.raceid]);

      // Combine race features and subrace features
      subrace.features = [...features, ...raceFeatures];
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
