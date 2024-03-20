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

const getallchatmessagesquery = new PQ({
  text: `
    SELECT * from gamelog 
    WHERE gamelogtag = 'Chat';
  `
});

const getcharacterchatmessagesquery = new PQ({
  text: `
    SELECT * FROM gamelog 
    WHERE playercharacterid = $1 AND gamelogtag = 'Chat';
  `
})

export async function setChatMessages(playercharacterid, messages) {
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

export async function getChatMessages(playercharacterid) {
  return db.any(getcharacterchatmessagesquery, [playercharacterid])
    .then(chatMessages => {
      return chatMessages;
    })
    .catch(error => {
      console.error("Error getting chat messages: ", error);
      return "Error";
    });
}

export async function getAllChatMessages() {
  db.any(getallchatmessagesquery)
  .then((result) => {
    return result;
  }).catch((error) => {
    console.log("Error getting all chat messages: " + error);
    return "Error";
  });
}

export async function addGameLog(playercharacterid, gamelogtag, content) {
  return db.none(addgamelogentry, [gamelogtag, content, playercharacterid])
    .then(() => {
      return true;
    })
    .catch(error => {
      console.error("Error adding game log entry:", error);
      return "Error";
    });
}
