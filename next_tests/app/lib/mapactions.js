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
    ON CONFLICT (mapdata.monstergroupid) DO UPDATE
    SET visible = $2
    WHERE monstergroupid = $1;
  `
});

const toggledisplayplayeravatarquery = new PQ({
  text: `
    INSERT INTO mapdata (mapdataid, playercharacterid, shape, image, scale, x, y, visible) VALUES
    (DEFAULT, $1, 'sprite', $3, 0.25, 100, 100, true)
    ON CONFLICT (mapdata.playercharacterid) DO UPDATE 
    SET visible = $2
    WHERE playercharacterid = $1;
  `
});

export async function toggleDisplayAvatar(type, id, displayavatar, image) {
  if (type === 'monster') {
    db.none(toggledisplaymonsteravatarquery, [id, displayavatar, image])
    .catch((error) => {
      console.error('Error updating monster avatar display: ' + error);
    });
  } else if (type === 'player') {
    db.none(toggledisplayplayeravatarquery, [id, displayavatar, image])
    .catch((error) => {
      console.error('Error updating player avatar display: ' + error);
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

const updatemonsteravatarscalequery = new PQ({
  text: `
    UPDATE mapdata
    SET scale = $2
    WHERE monstergroupid = $1;
  `
});

const updateplayeravatarscalequery = new PQ({
  text: `
    UPDATE mapdata
    SET scale = $2
    WHERE playercharacterid = $1;
  `
});

export async function updateAvatarScale (type, id, scale) {
  if (type === 'monster') {
    db.none(updatemonsteravatarscalequery, [id, scale])
    .catch((error) => {
      console.error('Error updating monster avatar scale: ' + error);
    });
  } else if (type === 'player') {
    db.none(updateplayeravatarscalequery, [id, scale])
    .catch((error) => {
      console.error('Error updating player avatar scale: ' + error);
    });
  } else {
    return;
  }
}


const getmonsteravatarscalequery = new PQ({
  text: `
    SELECT scale, visible 
    FROM mapdata
    WHERE monstergroupid = $1;
  `
});

const getplayeravatarscalequery = new PQ({
  text: `
    SELECT scale, visible
    FROM mapdata
    WHERE playercharacterid = $1;
  `
});

export async function getAvatarInfo (type, id) {
  let info = {
    scale: 0.25,
    visible: true
  };
  if (type === 'monster') {
    await db.one(getmonsteravatarscalequery, [id])
    .then((result) => {
      info = {...result};
    })
    .catch((error) => {
      console.error('Error getting monster avatar scale: ' + error);
    });
  } else if (type === 'player') {
    await db.one(getplayeravatarscalequery, [id])
    .then((result) => {
      info = {...result};
    })
    .catch((error) => {
      console.error('Error getting player avatar scale: ' + error);
    });
  } 
  return info;
}




export async function getAvatars () {
  const dir = path.resolve('./public/avatars');
  const images = fs.readdirSync(dir);
  return images;
}

export async function getBackgrounds() {
  const dir = path.resolve('./public/backgrounds');
  const images = fs.readdirSync(dir);
  return images;
}


export async function addNewAvatar (file, name) {
  const dir = path.resolve('./public/avatars');
  if (file instanceof File) {
    const oldpath = file.filepath;
    //const newfilename = file.original
    //const newpath = path.join() 
    console.log(oldpath);
  }
}


const updatemapstatsquery = new PQ({
  text: `
    INSERT INTO mapstats (mapstatsid, mapwidth, mapheight, backgroundx, backgroundy, backgroundscale, backgroundimage) VALUES
    (1, $1, $2, $3, $4, $5, $6)
    ON CONFLICT (mapstatsid) DO UPDATE 
      SET mapwidth = $1, mapheight = $2, backgroundx = $3, backgroundy = $4, backgroundscale = $5, backgroundimage = $6
    WHERE mapstatsid = 1;
  `
});


const getmapstatsquery = new PQ({
  /*
  text: `
    SELECT mapwidth, mapheight, backgroundx, backgroundy, backgroundscale, backgroundimage
    FROM mapstats
    WHERE mapstatsid = 1;
  `
  */
  text: `
  SELECT backgroundx, backgroundy, backgroundscale, backgroundimage
  FROM mapstats
  WHERE mapstatsid = 1;
`
});

export async function updateMapStats(mapwidth, mapheight, backgroundx, backgroundy, backgroundscale, backgroundimage) {
  db.none(updatemapstatsquery, [mapwidth, mapheight, backgroundx, backgroundy, backgroundscale, backgroundimage])
  .catch((error) => {
    console.error('Error updating map stats: ' + error);
  });
}

export async function getMapStats() {
  let mapsize = {};
  let mapbackgroundsize = {};
  let mapbackground = "";
  let container = {}; 
  await db.one(getmapstatsquery)
  .then((result) => {
    /*
    mapsize.width = result.mapwidth;
    mapsize.height = result.mapheight;
    */
    mapbackgroundsize.x = result.backgroundx;
    mapbackgroundsize.y = result.backgroundy;
    mapbackgroundsize.scale = result.backgroundscale;
    mapbackground = result.backgroundimage
  }).catch((error) => {
    console.error('Error retrieving map stats: ' + error);
  });
  //container = {mapsize, mapbackgroundsize, mapbackground};
  container = {mapbackgroundsize, mapbackground};
  return container;
}




