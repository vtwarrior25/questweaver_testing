// This should add a new custom item to the database
const pgp = require('pg-promise')();
const {ParameterizedQuery: PQ} = require('pg-promise');

const connection = {
  host: process.env.DBHOST,
  port: process.env.DBPORT,
  database: process.env.DB,
  user: process.env.DBUSER,
  password: process.env.DBPWD,
}

/*
const itemaddquery = new PQ({
  text:`
    INSERT INTO item (name, value, weight, description, rarity) VALUES
    ($1, $2, $3, $4, (SELECT rarityid FROM rarity WHERE name = $5));
  `
})
*/

const db = pgp(connection);

export default function handler (req, res) {
  let body = req.body;
  let q = req.query;
  console.log('body');
  console.log(body);
  console.log(body.itemRarity);
  if (q.type === 'item') {
    console.log('beans');
    //db.none(itemaddquery, [q.itemName, ])
  } else if (q.type === 'weapon') {
    console.log('beans');
  } else {
    console.log('beans');
    // How should we handle a create item query that isn't for a weapon or item???
  }
}