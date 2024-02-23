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

const itemaddquery = new PQ({
  text:`
    INSERT INTO item (itemid, name, value, weight, description, rarity) VALUES
    (DEFAULT, $1, $2, $3, $5, $4)
    RETURNING itemid;
  `
});

const weaponaddquery = new PQ({
  // Need to insert the attacks into the attack tables, and insert the weapon properties into the weapon property table
  text:`
    INSERT INTO weapon (weaponid, itemid, weapontype, weaponrange) VALUES
    (DEFAULT, $1, $2, $3)
    RETURNING weaponid;
  `
})

const weaponpropertyaddquery = new PQ({
  // Need to insert the attacks into the attack tables, and insert the weapon properties into the weapon property table
  text:`
    INSERT INTO weaponproperty (weaponid, possibleweaponproperty) VALUES
    ($1, $2);
  `
})

const weaponattackaddquery = new PQ({
  // Need to insert the attacks into the attack tables, and insert the weapon properties into the weapon property table
  text:`
    WITH atid AS (
      INSERT INTO attack (name, range, attackmodifierid, damagemodifierid, diceid, numdamagedie, effecttypeid) VALUES
      ($2, $3, $4, $5, $6, $7, $8)
    )
    INSERT INTO weaponattack (weaponid, attackid)
    VALUES ($1, atid);
  `
})




export async function createItem(userid, formdata) {
  console.log(formdata.get('name'));
  console.log(formdata);
  db.one(itemaddquery, [formdata.get('name'), formdata.get('value'), formdata.get('weight'), formdata.get('rarity'), formdata.get('description')])
  .then ((result)=> {
    console.log("result");
    console.log(result);
    return "Item added";
  }).catch(error => {
    return "Error adding item";
  });
}

export async function createWeapon(userid, formdata) {
  console.log(formdata);
  db.one(itemaddquery, [formdata.get('name'), formdata.get('value'), formdata.get('weight'), formdata.get('rarity'), formdata.get('description')])
  .then ((result) => {
    db.one(weaponaddquery, [result.itemid, formdata.get('weapontype'), formdata.get('weaponrange')])
    .then((result) => {
      // These for loops will iterate on the weapon properties and attacks
      let properties = formdata.getAll('property');
      console.log(properties);
      for (const property of properties) {
        db.none(weaponpropertyaddquery, [result.weaponid, property]);
      }
      db.none(weaponattackaddquery, []);
    }).catch((error) => {
      return "Error adding weapon";
    })
  }).catch(error => {
    return "Error adding item";
  });
}


// Create Weapon Form Data

/*
FormData {
  [Symbol(state)]: [
    { name: 'nameInput', value: 'Axe' },
    { name: 'value', value: '1' },
    { name: 'weight', value: '1' },
    { name: 'itemRarity', value: 'common' },
    { name: 'itemDescription', value: 'sfdsfsdf' },
    { name: 'weapontype', value: 'martial' },
    { name: 'weaponrange', value: 'ranged' },
    { name: 'property', value: 'ammunition' },
    { name: 'property', value: 'finesse' },
    { name: 'property', value: 'heavy' },
    { name: 'property', value: 'loading' },
    { name: 'property', value: 'thrown' },
    { name: 'attackname', value: 'Chop' },
    { name: 'attackrange', value: '5' },
    { name: 'attackmodifier', value: 'strength' },
    { name: 'damagemodifier', value: 'strength' },
    { name: 'damagedie', value: '10' },
    { name: 'numdamagedie', value: '2' },
    { name: 'damagetype', value: 'slashing' }
  ]
}
*/