'use server'  
const pgp = require('pg-promise')();
const {ParameterizedQuery: PQ} = require('pg-promise');
import { db } from '../lib/dbconn';

export async function setCharacterHealth (playercharacterid, currenthealth) {
    const dbquery = new PQ ({text: 'UPDATE playercharacter SET currenthealth $2 WHERE playercharacter-d = $1'});
    db.one(dbquery, [playercharacterid, currenthealth])
    .catch((error) => {
        return "Error setting health";
    });
}
