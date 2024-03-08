'use server'  
const pgp = require('pg-promise')();
const {ParameterizedQuery: PQ} = require('pg-promise');
import { db } from '../lib/dbconn';

export async function getpreparedspells(playercharacterid) {
    const dbquery = new PQ ({text: 'SELECT * FROM prepared_list c JOIN spell p ON c.spellid = p.spellid WHERE c.playercharacterid = $1'});
    db.any(dbquery, playercharacterid)
    .then (dbinfo => {
        console.log(dbinfo);
        return dbinfo;
    })
    .catch(error => {
        error.log("prepared spells not found");
        return "prepared spells not found";
    });
}