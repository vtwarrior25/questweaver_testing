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

/*
export async function setCharacterHealth(playercharacterid, health) {
  console.log(`${playercharacterid} - ${health}`);
  return `Set health to ${health}`;
}
*/

const updatecharacternotesquery = new PQ({
  text: `
    UPDATE playercharacternote
    SET organizations = $2, allies = $3, enemies = $4, backstory = $5, other = $6
    WHERE playercharacterid = $1;
  `
})

export async function setCharacterNotes(playercharacterid, notes) {
  db.one(updatecharacternotesquery)
}