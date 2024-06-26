'use server'
import { db } from './dbconn';
const pgp = require('pg-promise')();
const {ParameterizedQuery: PQ} = require('pg-promise');

const updateturnquery = new PQ({
  text: `
    UPDATE turnorder
    SET currentturn = false;
  `
});

const updateturnquery2 = new PQ({
  text: `
    UPDATE turnorder
    SET currentturn = true
    WHERE playercharacterid = (SELECT playercharacterid FROM playercharacter WHERE name = $1);
  `
});

export async function updateTurn (name) {
  await db.none(updateturnquery, [])
  .catch((error) => {
    console.log(error);
  });
  await db.none(updateturnquery2, [name])
  .catch((error) => {
    console.log(error);
  });
  return;
}

const removeturnquery = new PQ({
  text: `
    DELETE FROM TURNORDER
    WHERE playercharacterid = (SELECT playercharacterid FROM playercharacter WHERE name = $1);
  `
});

export async function removeTurn(name) {
  db.none(removeturnquery, [name])
  .catch((error) => {
    console.log('Unable to remove turn: ' + error);
  });
  return;
}

const clearturnorderquery = new PQ({
  text: `
    DELETE FROM turnorder;
  `
});

export async function clearTurnOrder() {
  db.none(clearturnorderquery, [])
  .catch((error) => {
    console.log('Unable to clear turn order' + error);
  });
  return;
}

const addcharactertoturnorderquery = new PQ({
  text: `
  INSERT INTO turnorder (playercharacterid, initiative, currentturn) VALUES
  ($1, $2,  $3)
  ON CONFLICT ON CONSTRAINT turnorder_playercharacterid_key DO UPDATE SET initiative = $2
  WHERE turnorder.playercharacterid = $1;
  `
});

// If you roll initiative again, it will update your initiative
export async function addCharacterToTurnOrder(playercharacterid, initiative, currentturn) {
  db.none(addcharactertoturnorderquery, [playercharacterid, initiative, currentturn])
  .catch((error) => {
    console.log('Unable to add character to turn order' + error);
  });
}