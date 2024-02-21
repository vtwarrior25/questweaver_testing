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

export async function createItem(userid, formdata) {
  console.log(formdata.get('itemName'));
  console.log(formdata);
  const itemaddquery = new PQ({
    text:`
      INSERT INTO item (name, value, weight, description, rarityid) VALUES
      ($1, $2, $3, $5, (SELECT rarityid FROM rarity WHERE name = $4));
    `
  });
  db.none(itemaddquery, [formdata.get('itemName'), formdata.get('value'), formdata.get('weight'), formdata.get('itemRarity'), formdata.get('itemDescription')]);
}