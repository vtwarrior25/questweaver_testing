'use server'  
const pgp = require('pg-promise')();
const {ParameterizedQuery: PQ} = require('pg-promise');
import { db } from '../lib/dbconn';
/*
const connection = {
  host: process.env.DBHOST,
  port: process.env.DBPORT,
  database: process.env.DB,
  user: process.env.DBUSER,
  password: process.env.DBPWD,
};

const db = pgp(connection);
*/

function characterInventoryFromDB (playercharacterid) {
    let dbquery = new PQ({text: 'SELECT * FROM characterinventory c JOIN playercharacter p ON c.playercharacterid = p.playercharacterid JOIN characterinventory ON c.characterinventoryid = s.characterinventoryid WHERE playercharacter'});
    return dbquery;
}

export async function getinventory(playercharacterid) {
    let invQuery = characterInventoryFromDB(playercharacterid);
    db.any(invQuery)
    .then (dbinfo => {
      console.log("got character info from " + q);
      console.log(dbinfo);
      return dbinfo;
    }).catch (error => {
      error.log("not found");
      return "not found";
    });
}