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

export async function sethealth (playercharacterid, currenthealth) {
    const dbquery = new PQ ({text: 'INSERT INTO playercharacter c (currenthealth) JOIN playercharacter p ON c.playercharacterid = p.playercharacterid VALUES ($10) WHERE playercharacter'});
}