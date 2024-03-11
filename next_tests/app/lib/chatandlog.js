'use server'  
const pgp = require('pg-promise')();
const {ParameterizedQuery: PQ} = require('pg-promise');
import { db } from '../lib/dbconn';

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

export function setChatMessages(playercharacterid, messages) {
  // TODO maybe replace this with https://vitaly-t.github.io/pg-promise/Database.html#each
  const insertQueries = messages.map(message => {
    return db.none(addchatmessage, [message.gamelogtag, message.content, playercharacterid]);
  });

  return Promise.all(insertQueries)
    .then(() => {
      return true;
    })
    .catch(error => {
      console.error("Error setting chat messages:", error);
      return "Error";
    });
}

export function getChatMessages(playercharacterid) {
  return db.any('SELECT * FROM gamelog WHERE playercharacterid = $1', [playercharacterid])
    .then(chatMessages => {
      return chatMessages;
    })
    .catch(error => {
      console.error("Error getting chat messages:", error);
      return "Error";
    });
}

export function addGameLog(playercharacterid, gamelogtag, content) {
  return db.none(addgamelogentry, [gamelogtag, content, playercharacterid])
    .then(() => {
      return true;
    })
    .catch(error => {
      console.error("Error adding game log entry:", error);
      return "Error";
    });
}
