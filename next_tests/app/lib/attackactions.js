'use server'
const pgp = require('pg-promise')();
const {ParameterizedQuery: PQ} = require('pg-promise');
import { db } from './dbconn'; 


const getcharacterattackquery = new PQ({
  text: `
    SELECT a.name, a.range, amod.modifier, dmod.modifier, d.sides, a.numdamagedie, et.name, a.description FROM characterattack ca
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


export async function enableAttackForItem(playercharacterid, itemid) {

}


export async function disableAttackForItem(playercharacterid, itemid) {

}

