'use server'  
const pgp = require('pg-promise')();
const {ParameterizedQuery: PQ} = require('pg-promise');
import { db } from '../lib/dbconn';

export async function setpreparedspell(playercharacterid, spellid) {
    const dbquery = new PQ ({text : "INSERT INTO prepared_list (playercharacterid, spellid) VALUES (DEFAULT, $1, $2)"});
    db.none(dbquery, playercharacterid, spellid)
    .catch((error) => {
        console.log(error);
        console.log("Error preparing spell");
    })
}