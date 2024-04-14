'use server' 
const pgp = require('pg-promise')();
const {ParameterizedQuery: PQ} = require('pg-promise');
import { db } from '../lib/dbconn';

const getallitemsquery = new PQ ({
  text: `
    SELECT i.itemid, i.name, i.weight, i.value, i.currency, i.description FROM item i;
  `
});

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

const updateweaponpropertyquery = new PQ({
  text: `
    UPDATE weapon
    SET weaponproperties = $2
    WHERE weaponid = $1;
  `
});


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


export async function getAllItems() {
  let allitems = [];
  await db.any(getallitemsquery)
  .then(dbinfo => {
      console.log(dbinfo);
      allitems = [...dbinfo];
  }).catch(error => {
      console.log("Error getting all items:" + error);
      //return "Error getting items";
  });
  return allitems;
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
      let propertystring = "";
      for (const property of properties) {
        /*
        db.none(weaponpropertyaddquery, [result.weaponid, property])
        .catch((error) => {
          console.error("Error inserting properties: " + error);
        });
        */
        propertystring += `${property}`;
      }
      db.none(updateweaponpropertyquery)
      .catch((error) => {
        console.error('Error setting weapon properties: ' + error);
      });
      db.one(attackaddquery, [formdata.get('attackname'), formdata.get('attackrange'), formdata.get('attackmodifier'), formdata.get('damagemodifier'), formdata.get('damagedie'), formdata.get('numdamagedie'), formdata.get('damagetype')])
      .then((result) => { 
        console.log(result.attackid);
        db.none(weaponattackaddquery, [weaponid, result.attackid])
        .catch((error) => {
          console.log(error);
        });
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
    });
  }).catch((error) => {
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
    (DEFAULT, $1, $2, (SELECT itemid FROM item WHERE name = $3), $4);
  `
});


export async function setCharacterInventory(playercharacterid, items) {
  // Check if an item exists in the table already (check for itemid from name, section, playercharacterid)
  for (let item of items) {
    db.one(checkcharacterinventoryforitem, [item.name, item.section, playercharacterid])
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
      db.none(addnewinventoryitemquery, [playercharacterid, item.section, item.name, item.quantity])
      .catch(error => {
        console.log("Error adding new item to inventory: " + error);
      });
    });
  }
}



export async function addItemToInventory(playercharacterid, item) {
  db.none(addnewinventoryitemquery, [playercharacterid, item.section, item.name, item.quantity])
  .catch(error => {
    console.log("Error adding new item to inventory: " + error);
  });
}


export async function updateItemInInventory(playercharacterid, item, quantity) {
  db.none(updateitemquantityquery, [playercharacterid, item.name, quantity])
  .catch(error => {
    console.log("Error setting inventory item quantity, " + error);
  });
}



const removeitemfrominventoryquery = new PQ({
  text: `
    DELETE FROM characterinventory
    WHERE playercharacterid = $1 AND itemid = (SELECT itemid FROM item WHERE name = $2) AND characterinventorysection = $3;
  `
});


export async function removeItemFromInventory(playercharacterid, item) {
  db.none(removeitemfrominventoryquery, [playercharacterid, item.name, item.sectionname])
  .catch((error) => {
    console.error('Error removing item from character inventory: ' + error);
  });
}


const getplayercharacterinventoryquery = new PQ({
  text: `
    SELECT i.itemid, c.characterinventorysection AS section, i.name, i.weight, 
    i.value, i.currency, c.quantity FROM characterinventory c 
      JOIN item i ON c.itemid = i.itemid 
    WHERE c.playercharacterid = $1;
  `
});

const getinventoryweaponinfo = new PQ({
  /*
  text: `
    SELECT w.weapontype, w.weaponrange, a.range, a.numdamagedie, d.name, et.name, w.properties,
    ab.name AS attackmodifier, ac.name AS damagemodifier
    FROM weapon w
      JOIN weaponattack wa ON w.weaponid = wa.weaponid
      JOIN attack a ON wa.attackid = a.attackid
      JOIN dice d ON a.diceid = d.diceid
      JOIN effecttype et ON a.effecttypeid = et.effecttypeid
      JOIN ability ab ON a.attackmodifierid = ab.abilityid
      JOIN ability ac ON a.attackmodifierid = ac.abilityid
    WHERE w.itemid = 13;
  `
  */
  text: `
    SELECT w.weapontype, w.weaponrange, a.range, a.numdamagedie AS numdice, d.name AS dietype, et.name AS damagetype, w.properties
    FROM weapon w
      JOIN weaponattack wa ON w.weaponid = wa.weaponid
      JOIN attack a ON wa.attackid = a.attackid
      JOIN dice d ON a.diceid = d.diceid
      JOIN effecttype et ON a.effecttypeid = et.effecttypeid
    WHERE w.itemid = $1;
  `
});


// TODO: to fix this, we need to ensure that the for loop on 288 finishes before we return
export async function getInventory(playercharacterid) {
  let inventory = [];
  await db.many(getplayercharacterinventoryquery, [playercharacterid])
  .then ((dbinfo) => {
    console.log("Got character inventory");
    console.log(dbinfo);
    for (let item of dbinfo) {
      let itemprototype = {...item};
      db.any(getinventoryweaponinfo, [item.itemid])
      .then((result) => {
        console.log(result);
        if (result.length >= 1) {
          itemprototype.weaponinfo = {...result[0]};
          //console.log('itemprototype')
          //console.log(itemprototype);
        }
      }).catch((error) => {
        console.error("Error getting weapon info for item " + item.name + ": " + error);
      }).finally(() => {
        inventory = [...inventory, {...itemprototype}];
        console.log('inventory');
        console.log(inventory);
      })
    }
  }).catch (error => {
    console.error("Unable to get character inventory: " + error);
  });
  console.log('Epic mode');
  console.log(inventory);
  return inventory; 
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

const getcharactermoneyquery = new PQ({
  text: `
    SELECT cp, sp, ep, gp, pp FROM playercharacternote
    WHERE playercharacterid = $1;
  `
});

export async function getCharacterMoney (playercharacterid) {
  let money = {};
  await db.any(getcharactermoneyquery, [playercharacterid])
  .then((result) => {
    if (result.length > 0) {
      console.log('Got character money');
      money = {...result[0]};
      console.log(money)
    }
  }).catch((error) => {
    console.log('Unable to get money for character' + error);
  });
  return money;
}


const setcharactermoneyquery = new PQ({
  text: `
    UPDATE playercharacternote
    SET cp = $2, sp = $3, ep = $4, gp = $5, pp = $6
    WHERE playercharacterid = $1;
  `
});

export async function setCharacterMoney (playercharacterid, money) {
  db.none(setcharactermoneyquery, [playercharacterid, money.cp, money.sp, money.ep, money.gp, money.pp])
  .catch((error) => {
    console.log('Unable to get money for character' + error);
    return;
  });
  return;
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