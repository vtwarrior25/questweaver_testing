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

const addgamelogentry = new PQ({
  text: `
    INSERT INTO gamelog (gamelogtag, content, playercharacterid) VALUES 
    ($1, $2, $3);
  `
});

const addchatmessage = new PQ({
  text: `
    INSERT INTO gamelog (gamelogtag, content, playercharacterid) VALUES 
    ($1, $2, $3);
  `
});

/*
export async function setChatMessages(playercharacterid, messages) {
  db.one()
}

export async function getChatMessages() {

}

export async function addGameLog(playercharacterid) {
  db.one(addgamelogentry, [playercharacterid]);
}
*/