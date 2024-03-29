'use server'  
const pgp = require('pg-promise')();
const {ParameterizedQuery: PQ} = require('pg-promise');
import { db } from '../lib/dbconn';

const addgamelogentry = new PQ({
  text: `
    INSERT INTO gamelog (gamelogtag, content, playercharacterid, timeadded) VALUES 
    ($1, $2, $3, $4);
  `
});


const getchatmessageswithlimitquery = new PQ({
  text: `
    SELECT g.gamelogtag, g.content, p.name, g.timeadded FROM gamelog g
      JOIN playercharacter p ON g.playercharacterid = p.playercharacterid
    WHERE gamelogtag = 'Chat' LIMIT $1;
  `
});


const getallchatmessagesquery = new PQ({
  text: `
    SELECT g.gamelogtag, g.content, p.name, g.timeadded FROM gamelog g
      JOIN playercharacter p ON g.playercharacterid = p.playercharacterid
    WHERE gamelogtag = 'Chat';
  `
});

const gettodaychatmessagesquery = new PQ({
  text: `
  SELECT g.gamelogtag, g.content, p.name, g.timeadded FROM gamelog g
  JOIN playercharacter p ON g.playercharacterid = p.playercharacterid
WHERE g.gamelogtag = 'Chat' AND date_trunc('day', g.timeadded) = date_trunc('day', CURRENT_TIMESTAMP);
  `
})

const getcharacterchatmessagesquery = new PQ({
  text: `
    SELECT * FROM gamelog 
    WHERE playercharacterid = $1 AND gamelogtag = 'Chat';
  `
})

const getallgamelogquery = new PQ({
  text: `
  SELECT g.gamelogtag AS type, g.content AS text, p.name AS character, g.timeadded FROM gamelog g
    JOIN playercharacter p ON g.playercharacterid = p.playercharacterid;
  `
});

const getallgamelogwithlimitquery = new PQ({
  text: `
  SELECT g.gamelogtag AS type, g.content AS text, p.name AS character, g.timeadded FROM gamelog g
    JOIN playercharacter p ON g.playercharacterid = p.playercharacterid LIMIT $1;
  `
});


export async function setChatMessages(playercharacterid, messages) {
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
  db.any(getcharacterchatmessagesquery, [playercharacterid])
  .then(chatMessages => {
    return chatMessages;
  })
  .catch(error => {
    console.error("Error getting chat messages: ", error);
    return;
  });
}

export async function getAllChatMessages(number) {
  let chatmessages = []; 
  if (number !== 0 && number !== undefined) {
    await db.any(getchatmessageswithlimitquery, [number])
    .then((result) => {
      console.log("Got chat messages: " + number);
      chatmessages = [...result];
    }).catch((error) => {
      console.log("Error getting all chat messages: " + error);
      return;
    });
  } else {
    await db.any(getallchatmessagesquery)
    .then((result) => {
      console.log("Got chat messages");
      //console.log(result[result.length-1].timeadded.toISOString());
      chatmessages = [...result];
    }).catch((error) => {
      console.log("Error getting all chat messages: " + error);
      return;
    });
  }
  for (let message of chatmessages) {
    if (message.timeadded !== null) {
      message.timeadded = message.timeadded.toLocaleString();
    }
  }
  return chatmessages;
}

export async function addToGameLog(playercharacterid, gamelogtag, content) {
  let timestamp = new Date().toISOString();
  db.none(addgamelogentry, [gamelogtag, content, playercharacterid, timestamp])
  .catch(error => {
    console.error("Error adding game log entry:", error);
    return;
  });
}

/*
export async function getAllGameLog(number) {
  let defaultresult = [];
  console.log('Getting game log');
  await db.any(getallgamelogquery)
  .then((result) => {
    console.log(result);
    defaultresult = [...result];
  })
  .catch(error => {
    console.error("Error adding game log entry:", error);
  });
  console.log(defaultresult);
  return defaultresult;
}
*/

export async function getAllGameLog(number) {
  let defaultresult = [];
  let today = new Date();
  if (number !== 0 && number !== undefined) {
    await db.any(getallgamelogwithlimitquery, [number])
    .then((result) => {
      console.log("Got game log entries: " + number);
      defaultresult = [...result];
    }).catch((error) => {
      console.log("Error getting all game log entries: " + error);
      return;
    });
  } else {
    await db.any(getallgamelogquery)
    .then((result) => {
      console.log("Got game log entries");
      defaultresult = [...result];
    }).catch((error) => {
      console.log("Error getting all game log entries: " + error);
      return;
    });
  }
  for (let message of defaultresult) {
    if (message.timeadded !== null) {
      let split = message.timeadded.toLocaleString().split(','); 
      if (message.timeadded > today) {
        message.timeadded = split[1];
      } else {
        message.timeadded = split[0];
      }
    }
  }
  return defaultresult;
}

/*
export async function handleLogChange(status) {
  
}
*/