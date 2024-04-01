'use server' 
const pgp = require('pg-promise')();
const {ParameterizedQuery: PQ} = require('pg-promise');
import { db } from '../lib/dbconn';

const getmapdataquery = new PQ({
  text: `
    SELECT mapdataid, playercharacterid, monstergroupid, shape, image, scale, x, y 
    FROM mapdata;
  `
});

export async function getMapData () {
  let mapdata = [];
  await db.many(getmapdataquery)
  .then((result) => {
    mapdata = [...result];
  }).catch((error) => {
    console.error('Error getting map data: ' + error);  
  });
  return mapdata;
}


const updatemapdataquery = new PQ({
  text: `
    UPDATE mapdata
    SET x = $2, y = $3
    WHERE mapdataid = $1;
  `
});

export async function updateMapData(id, x, y) {
  
}


const updatemonsteravatarquery = new PQ({
  text: `
    UPDATE mapdata
    SET image = $2
    WHERE monstergroupid = $1;
  `
});

const updateplayeravatarquery = new PQ({
  text: `
    UPDATE mapdata
    SET image = $2
    WHERE playercharacterid = $1;
  `
});

export async function updateAvatar (type, id, newavatar) {
  if (type === 'monster') {
    db.none(updatemonsteravatarquery, [id, newavatar])
    .catch((error) => {
      console.error('Error updating monster avatar: ' + error);
    });
  } else if (type === 'player') {
    db.none(updateplayeravatarquery, [id, newavatar])
    .catch((error) => {
      console.error('Error updating player avatar: ' + error);
    });
  } else {
    return;
  }
}