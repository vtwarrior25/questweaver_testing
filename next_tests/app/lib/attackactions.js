'use server'
const pgp = require('pg-promise')();
const {ParameterizedQuery: PQ} = require('pg-promise');
import { db } from './dbconn'; 

const getcharacterattackquery = new PQ({
  text: `
    SELECT a.name, a.range, amod.modifier AS hitdc, dmod.modifier AS effectbonus, d.sides AS effectdie, a.numdamagedie AS effectdienum, et.name AS effecttype, a.description AS notes FROM characterattack ca
      JOIN attack a ON ca.attackid = a.attackid
      JOIN characterability amod ON amod.playercharacterid = $1 AND a.attackmodifierid = amod.abilityid
      JOIN characterability dmod ON dmod.playercharacterid = $1 AND a.damagemodifierid = dmod.abilityid
      JOIN dice d ON a.diceid = d.diceid
      JOIN effecttype et ON a.effecttypeid = et.effecttypeid
    WHERE ca.playercharacterid = $1;
  `
});

export async function getCharacterAttacks(playercharacterid) {
  let attacks = [];
  await db.many(getcharacterattackquery, [playercharacterid])
  .then((result) => {
    attacks = [...result];
  }).catch((error) => {
    console.error('Error retrieving character attacks: ' + error);
  });
  return attacks;
}

const setcharacterinventoryitemactivequery = new PQ({
  text: `
    UPDATE characterinventory ci
    SET active = $4
    WHERE ci.playercharacterid = $1 AND ci.characterinventorysection = $2 AND ci.itemid = $3;  
  `
});

const enableattackforitemquery = new PQ({
  text: `
    INSERT INTO characterattack (playercharacterid, attackid) VALUES
    ($1, (
      SELECT wa.attackid FROM weaponattack wa
        JOIN weapon w ON w.weaponid = wa.weaponid
      WHERE w.itemid = $2
    )) ON CONFLICT (playercharacterid, attackid) DO NOTHING;
  `
});

const disableattackforitemquery = new PQ({
  text: `
    DELETE FROM characterattack ca 
    WHERE ca.attackid = (
      SELECT wa.attackid FROM weaponattack wa
      JOIN weapon w ON w.weaponid = wa.weaponid
      WHERE w.itemid = $2
    ) AND ca.playercharacterid = $1;
  `
});

export async function enableAttackForItem(playercharacterid, section, itemid) {
  // set characterinventory item to active
  await db.none(setcharacterinventoryitemactivequery, [playercharacterid, section, itemid, true])
  .catch((error) => {
    console.error('Error setting item to active (server): ' + error);
  });
  // add attack to characterattack
  await db.none(enableattackforitemquery, [playercharacterid, itemid])
  .catch((error) => {
    console.error('Error enabling attack for item: ' + error);
  });
  
}

export async function disableAttackForItem(playercharacterid, section, itemid) {
  // set characterinventory item to not active
  await db.none(setcharacterinventoryitemactivequery, [playercharacterid, section, itemid, false])
  .catch((error) => {
    console.error('Error setting item to inactive (server): ' + error);
  });
  // add attack to characterattack
  await db.none(disableattackforitemquery, [playercharacterid, itemid])
  .catch((error) => {
    console.error('Error disabling attack for item: ' + error);
  });
}
