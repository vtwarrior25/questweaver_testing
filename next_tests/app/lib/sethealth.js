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

export async function setCharacterHealth (playercharacterid, currenthealth) {
    const dbquery = new PQ ({text: 'UPDATE playercharacter SET currenthealth $2 WHERE playercharacter-d = $1'});
    db.one(dbquery, [playercharacterid, currenthealth])
    .catch((error) => {
        error.log("Error setting health");
        return "Error setting health";
    });
}
