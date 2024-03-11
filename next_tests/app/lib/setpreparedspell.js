'use server'  
const pgp = require('pg-promise')();
const {ParameterizedQuery: PQ} = require('pg-promise');
import { db } from '../lib/dbconn';

const preparequery = new PQ ({text : "INSERT INTO prepared_list (playercharacterid, spellid) VALUES (DEFAULT, $1, $2)"});

const unpreparequery = new PQ ({text: 'DELETE FROM prepared_list c JOIN spell p ON c.spellid = p.spellid WHERE c.playercharacterid = $1 AND c.spellid = $2'});

export async function setpreparedspell(queryaction, playercharacterid, spellid) {
    if (queryaction == "prepare") {
        db.none(preparequery, playercharacterid, spellid)
        .catch((error) => {
            console.log(error);
            console.log("Error preparing spell");
        });
    } else if (queryaction == "unprepare") {
        db.none(unpreparequery, playercharacterid, spellid)
        .catch((error) => {
            console.log(error);
            console.log("Error unpreparing spell");
        });
    }
    
}