'use server' 
const pgp = require('pg-promise')();
const {ParameterizedQuery: PQ} = require('pg-promise');
import { db } from '../lib/dbconn';
import path from 'path'
import fs, { renameSync } from 'fs';
import { writeFile } from 'fs/promises';
// Sources: 
//https://medium.com/@boris.poehland.business/next-js-api-routes-how-to-read-files-from-directory-compatible-with-vercel-5fb5837694b9
//https://stackoverflow.com/questions/72663673/how-do-i-get-uploaded-image-in-next-js-and-save-it


const getmapdataquery = new PQ({
  text: `
    SELECT mapdataid, playercharacterid, monstergroupid, shape, image, scale, x, y, visible 
    FROM mapdata;
  `
});

export async function getMapData () {
  let mapdata = [];
  await db.many(getmapdataquery)
  .then((result) => {
    //console.log(result);
    //console.log('Got map data');
    //console.log(`${new Date().toLocaleTimeString()}: ---------------`);
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
  db.none(updatemapdataquery, [id, x, y])
  .catch((error) => {
    console.log('' + error);
  });
}

export async function addMapData() {

}

const toggledisplaymonsteravatarquery = new PQ({
  text: `
    INSERT INTO mapdata (mapdataid, monstergroupid, shape, image, scale, x, y, visible) VALUES
    (DEFAULT, $1, 'sprite', $3, 0.25, 100, 100, true)
    ON CONFLICT (mapdataid)
    UPDATE mapdata
    SET visible = $2
    WHERE monstergroupid = $1;
  `
});

const toggledisplayplayeravatarquery = new PQ({
  text: `
    INSERT INTO mapdata (mapdataid, playercharacterid, shape, image, scale, x, y, visible) VALUES
    (DEFAULT, $1, 'sprite', $3, 0.25, 100, 100, true)
    ON CONFLICT (mapdataid)
    UPDATE mapdata
    SET visible = $2
    WHERE playercharacterid = $1;
  `
});

export async function toggleDisplayAvatar(type, id, displayavatar, image) {
  if (type === 'monster') {
    db.none(updatemonsteravatarquery, [id, displayavatar])
    .catch((error) => {
      console.error('Error updating monster avatar: ' + error);
    });
  } else if (type === 'player') {
    db.none(updateplayeravatarquery, [id, displayavatar])
    .catch((error) => {
      console.error('Error updating player avatar: ' + error);
    });
  } else {
    return;
  }
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

export async function getAvatars () {
  let avatarlist = [];
  const dir = path.resolve('./public/avatars');
  const images = fs.readdirSync(dir);
  return images;
}

/*
export async function addNewAvatar (file, name) {
  const dir = path.resolve('./public/avatars');
  if (file instanceof File) {
    const oldpath = file.filepath;
    //const newfilename = file.original
    //const newpath = path.join() 
    console.log(oldpath);
  }
}
*/




