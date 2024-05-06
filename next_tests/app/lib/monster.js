'use server'  
const pgp = require('pg-promise')();
const {ParameterizedQuery: PQ} = require('pg-promise');
import { db } from '../lib/dbconn';
import { scoreToMod }  from '../lib/calcs.js';

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
    console.log("monstertypesagain");
    console.log(monstertypes);
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
  text: 'SELECT name FROM encounter;'
});

const getencounterfornamequery  = new PQ({
  text: `
    SELECT encounterid, name FROM encounter
    WHERE name = $1;
  `
});

const addnewmonstergroupquery = new PQ({
  text: `
    INSERT INTO monstergroup (monstergroupid, encounterid, creaturesize, 
      monstertypeid, alignment, groupname, description, quantity, hitdie, hitdienum, 
      challengerating, xpper, xptotal, armorclass, speed, initiative, skills, features, 
      notes, health)
    VALUES (DEFAULT, (SELECT encounterid FROM encounter WHERE name = $1), 
      $2, (SELECT monstertypeid FROM monstertype WHERE name = $3), 
      $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
    RETURNING monstergroupid;
  `
});

const addnewencounterquery = new PQ({
  text: `
    INSERT INTO encounter (encounterid, name)
    VALUES (DEFAULT, $1)
    RETURNING encounterid;
  `
});

const addmonsterabilitiesquery = new PQ({
  text: `
    INSERT INTO monsterability (monsterabilityid, monstergroupid, abilityid, score, modifier)
    VALUES (DEFAULT, $1, (SELECT abilityid FROM ability WHERE abbrev = $2), $3, $4);
  `
});

const checkattackquery = new PQ({
  text: `
    SELECT a.attackid, a.name FROM attack a
    WHERE a.name = $1;
  `
});

const addmonsterattackquery = new PQ({
  text: `
    INSERT INTO attack (attackid, name, flatdamagemod, diceid, numdamagedie, effecttypeid)
    VALUES (DEFAULT, $1, $2, (SELECT diceid FROM dice WHERE sides = $3), $4, (SELECT effecttypeid FROM effecttype WHERE name = $5))
    ON CONFLICT (name) DO NOTHING
    RETURNING attackid;
  `
});

const linkmonsterattackquery = new PQ ({
  text: `
  INSERT INTO monsterattack (monsterattackid, monstergroupid, attackid)
  VALUES (DEFAULT, $1, $2);`
});

export async function addGroupFromForm(formdata, encountername) {
  //let encounternames = [];
  let encounter = "";
  let encounterid = -1;
  let newmonstergroupid = 0;
  console.log("We are running, oh YEAH!!");
  /*
  await db.any(getencounternamequery)
  .then((result) => {
    encounternames = [...result];
  }).catch((error) => {
    console.log("Error getting encounter names: " + error);
    return;
  });
  */
  await db.one(getencounterfornamequery, [encountername])
  .then((result) => {
    encounter = result.name;
    encounterid = result.id
  }).catch((error) => {
    console.log("Error getting encounter names: " + error);
    return;
  });

  // Add a new encounter if we need to
  if (encounter !== encountername) {
    // We found an encounter that matches the provided name
    await db.one(addnewencounterquery, [encountername])
    .then((result) => {
      encounterid = result.encounterid;
    })
    .catch((error) => {
      console.error('Error creating a new encounter with the provided name: ' + error);
    });
  }

  // Adding most of the monster info to the database
  await db.one(addnewmonstergroupquery, [encountername, 
    formdata.basicinfo.size, formdata.basicinfo.type, 
    formdata.basicinfo.alignment, formdata.basicinfo.name, formdata.basicinfo.quantity,
    formdata.basicinfo.description, formdata.basicinfo.hitdicetype, 
    formdata.basicinfo.hitdicenum, formdata.basicinfo.challengerating, formdata.basicinfo.xpper,
    formdata.basicinfo.xptotal, formdata.basicinfo.ac, formdata.basicinfo.speed, 
    formdata.abilities.init, formdata.basicinfo.skills, formdata.basicinfo.features, 
    formdata.basicinfo.notes, formdata.health])
  .then((result) => {
    newmonstergroupid = result.monstergroupid;
  })
  .catch((error) => {
    console.log("Error adding new monster group to encounter: " + error);
    return;
  });

  // add ability data from formdata into monsterability
  for (const ab of Object.keys(formdata.abilities)) {
    console.log(ab.charAt(0).toUpperCase() + ab.slice(1));
    console.log(formdata.abilities[ab]);
    console.log(scoreToMod(formdata.abilities[ab]));
    await db.one(addmonsterabilitiesquery, [newmonstergroupid, ab.charAt(0).toUpperCase() + ab.slice(1), Number(formdata.abilities[ab]), Number(scoreToMod(formdata.abilities[ab]))])
    .catch((error) => {
      console.log("Error inserting monster ability data: " + error);
    });
  }
  // add attack data from formdata into attack
  for (const atk of formdata.attacks) {
    let attackid = -1;
    if (atk.name !== "") {
      // Check if the attack exists already based on the name
      await db.one(checkattackquery, [atk.name])
      .then((result) => {
        // Set attackid to the id of the existing attack with the name provided
        attackid = result.attackid;
      }).catch((error) => {
        console.error('Error retrieving ' + error);
      });
    
    // If an attack with the name doesn't already exist, add one
    if (attackid === -1) {
      await db.one(addmonsterattackquery, [atk.name, atk.damagemod, atk.dietype, atk.numdice, atk.damagetype])
      .then ((result) => {
        // set attackid to the id of the added attack
        attackid = result.attackid;
      })
      .catch((error) => {
        console.log("Error inserting monster attack data: " + error);
      });
    }

    // link attacks to monsterattack with attackid/monsterid
    db.one(linkmonsterattackquery, [newmonstergroupid, attackid])
    .catch((error) => {
      console.log("Error linking attack as monster attack: " + error)
    });

    }
  }
}

const removemonstergroupquery = new PQ({
  text: `
    DELETE FROM monstergroup 
    WHERE monstergroupid = $1;
  `
}); 

const removemonstergroupabilitiesquery = new PQ({
  text: `
    DELETE FROM monsterability
    WHERE monstergroupid = $1;
  `
}); 

/*
const removemonstergroupattacksquery = new PQ({
  text: `
    DELETE FROM attack
    WHERE monstergroupid = $1;
  `
});
*/ 

export async function removeMonsterGroupFromDB(monstergroupid) {
  db.none(removemonstergroupquery, [monstergroupid])
  .catch((error) => {
    console.error('Failed to remove monster group: ' + error);
  });
  db.none(removemonstergroupabilitiesquery, [monstergroupid])
  .catch((error) => {
    console.error('Failed to remove monster group: ' + error);
  });
}

const getencountersquery = new PQ({
  text: `
    SELECT encounterid, name AS encountername FROM encounter;
  `
});

const getmonstergroupquery = new PQ({
  text: `
    SELECT mg.monstergroupid, mg.encounterid, creaturesize AS size, mt.name AS type, 
    alignment, groupname AS name, quantity, description, hitdie, hitdienum, 
    challengerating, xpper, xptotal, armorclass, speed, initiative, 
    skills, features, notes, health
    FROM monstergroup mg
      JOIN encounter e ON mg.encounterid = e.encounterid
      JOIN monstertype mt ON mg.monstertypeid = mt.monstertypeid
    WHERE mg.encounterid = $1;
  `
});

const getmonsterabilitiesquery = new PQ({
  text: `
    SELECT m.monstergroupid, a.abbrev, m.score 
    FROM monsterability m
      JOIN ability a ON m.abilityid = a.abilityid
    WHERE monstergroupid = $1;
  `
});

const getmonsterattackquery = new PQ({
  text: `
    SELECT a.name, a.range, amod.modifier, dmod.modifier, 
    d.sides, a.numdamagedie, et.name, a.description
    FROM monsterattack m
      JOIN attack a ON m.attackid = a.attackid;
      JOIN monsterability amod ON amod.monstergroupid = $1 AND a.attackmodifierid = amod.abilityid
      JOIN monsterability dmod ON dmod.monstergroupid = $1 AND a.damagemodifierid = dmod.abilityid
      JOIN dice d ON a.diceid = d.diceid
      JOIN effecttype et ON a.effecttypeid = et.effecttypeid
    WHERE monstergroupid = $1;
  `
});

/*
  SELECT a.name, a.range, amod.modifier, dmod.modifier, d.sides, a.numdamagedie, et.name, a.description FROM characterattack ca
      JOIN attack a ON ca.attackid = a.attackid
      JOIN characterability amod ON amod.playercharacterid = $1 AND a.attackmodifierid = amod.abilityid
      JOIN characterability dmod ON dmod.playercharacterid = $1 AND a.damagemodifierid = dmod.abilityid
      JOIN dice d ON a.diceid = d.diceid
      JOIN effecttype et ON a.effecttypeid = et.effecttypeid
    WHERE ca.playercharacterid = $1;

  INSERT INTO attack (attackid, name, range, attackmodifierid, damagemodifierid, diceid, numdamagedie, effecttypeid, description)
  VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, (SELECT effecttypeid FROM effecttype WHERE name = $7), $8)
  RETURNING attackid;

*/

/*
const linkmonsterattackquery = new PQ ({
  text: `
  INSERT INTO monsterattack (monsterattackid, monstergroupid, attackid)
  VALUES (DEFAULT, $1, $2)`
})
*/

export async function getEncounters() {
  //let abilitylist = ['Str', 'Dex', 'Con', 'Int', 'Wis', 'Cha']
  let encounters = [];
  let encounterlisttemp = [];
  let monstergroupstemp = [];
  // Get list of encounterid
  await db.many(getencountersquery)
  .then((encounterresult) => {
    encounterlisttemp = [...encounterresult];
  }).catch((error) => {
    console.error("Error retrieving encounters" + error);
  });
  if (encounterlisttemp.length <= 0) {
    return encounters;
  } 
  for (let result of encounterlisttemp) {
    let blankencounter = {};
    blankencounter.encountername = result.encountername;
    // For each encounterid, grab monstergroups.
    await db.many(getmonstergroupquery, [result.encounterid])
    .then((monstergroupresult) => {
      monstergroupstemp = [...monstergroupresult];
    }).catch((error) => {
      console.error("Error retrieving encounters" + error);
    });
    for (const monstergroup of monstergroupstemp) {
      let blankmonstergroup = {};
      blankmonstergroup.basicinfo = {...monstergroup};
      let abilityobject = {
        str: 0,
        dex: 0,
        con: 0,
        int: 0,
        wis: 0,
        cha: 0,
      }
      await db.many(getmonsterabilitiesquery, [monstergroup.monstergroupid])
      .then((monsterabilityresult) => {
        for (let ability of monsterabilityresult) {
          abilityobject[ability.abbrev.toLowerCase()] = ability.score;
        }
        abilityobject.init = abilityobject.dex;  
      }).catch((error) => {
        console.log(error);
      });
      blankmonstergroup.abilities = {...abilityobject}; 
      // For each monstergroupid, get attacks from monsterattack
      await db.many(getmonsterattackquery, [monstergroup.monstergroupid])
      .then((monsterattackresult) => {
        blankencounter.attacks = [...monsterattackresult];
      }).catch((error) => {
        console.log(error);
      });
      if (blankencounter.monstergroups === undefined) {
        blankencounter.monstergroups = [blankmonstergroup];
      } else {
        blankencounter.monstergroups = [...blankencounter.monstergroups, blankmonstergroup]
      }
    }
  }
  return encounters;
}

const setmonstergroupnotesquery = new PQ({
  text: `
  UPDATE monstergroup
  SET notes = $2
  WHERE monstergroupid = $1;
  `
});

const setmonstergrouphealthquery = new PQ({
  text: `
    UPDATE monstergroup
    SET health = $2
    WHERE monstergroupid = $1;
  `
});

export async function setMonsterGroupNotesServer(monstergroupid, notes) {
  db.none(setmonstergroupnotesquery, [monstergroupid, notes])
  .catch((error) => {
    console.error('Error setting monster group notes: ' + error);
  });
}

export async function setMonsterGroupHealthServer(monstergroupid, health) {
  db.none(setmonstergrouphealthquery, [monstergroupid, health])
  .catch((error) => {
    console.error('Error setting monster group health: ' + error);
  });
}
