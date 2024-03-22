'use server' 
const pgp = require('pg-promise')();
const {ParameterizedQuery: PQ} = require('pg-promise');
import { db } from '../lib/dbconn';

const getallitemsquery = new PQ ({text: 'SELECT * FROM item'});

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


const attackaddquery = new PQ({
  text: `
    INSERT INTO attack (attackid, name, range, attackmodifierid, damagemodifierid, diceid, numdamagedie, effecttypeid) VALUES
    (DEFAULT, $1, $2, (SELECT abilityid FROM ability WHERE name = $3), (SELECT abilityid FROM ability WHERE name = $4), (SELECT diceid from dice where sides = $5), $6, (SELECT effecttypeid FROM effecttype WHERE name = $7))
    RETURNING attackid;
  `
});

const weaponattackaddquery = new PQ({
  text: `
    INSERT INTO weaponattack (weaponid, attackid) VALUES
    ($1, $2);
  `
});


/*
const weaponattackaddquery = new PQ({
  // Need to insert the attacks into the attack tables, and insert the weapon properties into the weapon property table
  text:`
    WITH aid AS (
      INSERT INTO attack (attackid, name, range, attackmodifierid, damagemodifierid, diceid, numdamagedie, effecttypeid) VALUES
      (DEFAULT, $2, $3, (SELECT abilityid FROM ability WHERE name = $4), (SELECT abilityid FROM ability WHERE name = $5), (SELECT diceid from dice where sides = $6), $7, (SELECT effecttypeid FROM effecttype WHERE name = $8))
      RETURNING attackid
    )
    INSERT INTO weaponattack (weaponid, attackid)
    VALUES ($1, aid);
  `
});
*/


export async function getallitems() {
  db.any(getallitemsquery)
  .then(dbinfo => {
      console.log(dbinfo);
      return dbinfo;
  }).catch(error => {
      console.log("Error getting all items:" + error);
      return "Error getting items";
  });
}

export async function createItem(userid, formdata) {
  console.log(formdata.get('name'));
  console.log(formdata);
  db.one(itemaddquery, [formdata.get('name'), formdata.get('value'), formdata.get('weight'), formdata.get('rarity'), formdata.get('description')])
  .then ((result)=> {
    console.log("result");
    console.log(result);
    return "Item added";
  }).catch(error => {
    console.error("Error adding item: " + error);
    return "Error";
  });
}

export async function createWeapon(userid, formdata) {
  console.log("In weaponcreation");
  console.log(formdata);
  db.one(itemaddquery, [formdata.get('name'), formdata.get('value'), formdata.get('weight'), formdata.get('rarity'), formdata.get('description')])
  .then ((result) => {
    console.log(result);
    db.one(weaponaddquery, [result.itemid, formdata.get('weapontype'), formdata.get('weaponrange')])
    .then((result) => {
      let weaponid = result.weaponid
      console.log(result);
      // These for loops will iterate on the weapon properties and attacks
      let properties = formdata.getAll('property');
      console.log(properties);
      for (const property of properties) {
        db.none(weaponpropertyaddquery, [result.weaponid, property])
        .catch((error) => {
          console.error("Error inserting properties: " + error);
        });
      }
      db.one(attackaddquery, [formdata.get('attackname'), formdata.get('attackrange'), formdata.get('attackmodifier'), formdata.get('damagemodifier'), formdata.get('damagedie'), formdata.get('numdamagedie'), formdata.get('damagetype')])
      .then((result) => { 
        console.log(result.attackid);
        db.none(weaponattackaddquery, [weaponid, result.attackid])
        .catch((error) => {
          console.log(error);
        })
      }).catch((error) => {
        console.error("Error adding attacks: " + error);
        return "Error";
      });
      /*
      db.none(weaponattackaddquery, [result.weaponid, formdata.get('attackname'), formdata.get('attackrange'), formdata.get('attackmodifier'), formdata.get('damagemodifier'), formdata.get('damagedie'), formdata.get('numdamagedie'), formdata.get('damagetype')])
      .catch((error) => {
        console.log(error);
        console.log("Error inserting attack")
      });
      */
    }).catch((error) => {
      console.error("Error adding weapon: " + error);
      return "Error";
    })
  }).catch(error => {
    console.error("Error adding item: " + error);
    return "Error";
  });
}


const checkcharacterinventoryforitem = new PQ({
  text: `
    SELECT DISTINCT itemid, quantity
    FROM characterinventory
    WHERE itemid = (SELECT itemid FROM item WHERE name = $1) AND characterinventorysection = $2 AND playercharacterid = $3;
  `
});

const updateitemquantityquery = new PQ({
  text:`
    UPDATE characterinventory 
    SET quantity = $3 
    WHERE playercharacterid = $1 AND itemid = (SELECT itemid FROM item WHERE name = $2);
  `
});

const addnewinventoryitemquery = new PQ({
  text:`
    INSERT INTO characterinventory (characterinventoryid, playercharacterid, characterinventorysection, itemid, quantity) VALUES 
    (DEFAULT, $1, $2, (SELECT itemid FROM item WHERE name = $3), $4)});
  `
});


export async function setCharacterInventory(playercharacterid, items) {
  // Check if an item exists in the table already (check for itemid from name, section, playercharacterid)
  for (let item of items) {
    db.one(checkcharacterinventoryforitem, [item.name, item.sectionname, playercharacterid])
    .then((checkitemresult) => {
      if (checkitemresult.quantity === item.quantity) {
        // If it does exist and the quantity is the same, do nothing
        console.log("Item with same quantity already exists in specified inventory");
      } else {
        // If it does exist and the quantity is different, update the quantity
        db.none(updateitemquantityquery, playercharacterid, item.name, checkitemresult.quantity)
        .catch(error => {
          console.log("Error setting inventory item quantity, " + error);
        });
      }
    }).catch((error) => {
      // If it doesn't exist, add the new item
      db.none(addnewinventoryitemquery, playercharacterid, item.sectionname, item.quantity)
      .catch(error => {
        console.log("Error adding new item to inventory, " + error);
      });
    });
  }
}

const charactergetactionsquery = new PQ({
  // TODO ask Chapin about this
  text: `
    SELECT a.name, a.range,  FROM characterattack c 
      JOIN attack a ON c.attackid = a.attackid
      
    WHERE c.playercharacterid = $1
  `
});


export async function getCharacterActions (playercharacterid) {

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