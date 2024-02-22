'use server'  
const pgp = require('pg-promise')();
const {ParameterizedQuery: PQ} = require('pg-promise');

const connection = {
  host: process.env.DBHOST,
  port: process.env.DBPORT,
  database: process.env.DB,
  user: process.env.DBUSER,
  password: process.env.DBPWD,
};

const db = pgp(connection);

export const itemaddquery = new PQ({
  text:`
    INSERT INTO item (name, value, weight, description, rarityid) VALUES
    ($1, $2, $3, $5, $4);
  `
});

export const weaponaddquery = newPQ({
  // Need to insert the attacks into the attack tables, and insert the weapon properties into the weapon property table
  text:`
    INSERT INTO weapon (itemid, range, damagebonus) VALUES
    ((SELECT itemid FROM item WHERE name = $1), $2, $3);
  `
})

export const weaponpropertyaddquery = newPQ({
  // Need to insert the attacks into the attack tables, and insert the weapon properties into the weapon property table
  text:`
    INSERT INTO weaponproperty (weaponid, possibleweaponpropertyid) VALUES
    ((SELECT weaponid FROM weapon WHERE itemid = (SELECT itemid FROM item WHERE name = $1)), (SELECT possibleweaponpropertyid from possibleweaponproperty WHERE name = $2));
  `
})

export const weaponattackaddquery = newPQ({
  // Need to insert the attacks into the attack tables, and insert the weapon properties into the weapon property table
  text:`
    INSERT INTO attack (name, range, attackmodifierid, ) VALUES
    ((SELECT itemid FROM item WHERE );
  `
})



export async function createItem(userid, formdata) {
  console.log(formdata.get('name'));
  console.log(formdata);
  db.none(itemaddquery, [formdata.get('name'), formdata.get('value'), formdata.get('weight'), formdata.get('rarity'), formdata.get('description')])
  .then (()=> {
    return "Item added";
  }).catch(error => {
    return "Error adding item";
  });
}

export async function createWeapon(userid, formdata) {
  console.log(formdata.get(''));
  console.log(formdata);
  db.none(itemaddquery, [formdata.get('itemName'), formdata.get('value'), formdata.get('weight'), formdata.get('itemRarity'), formdata.get('itemDescription')])
  .then (()=> {
    return "Item added";
  }).catch(error => {
    return "Error adding item";
  });
}