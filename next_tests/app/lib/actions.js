'use server'

const pgp = require('pg-promise')();
const {ParameterizedQuery: PQ} = require('pg-promise');
import { db } from '../lib/dbconn';
import { tempAuth } from '@/app/lib/tempauth';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

/* 
export async function authenticate(formdata) {
  let redirecturl = '../login';
  //console.log(formdata.get('username'));
  console.log(formdata.get('username') + " " + formdata.get('password'));
  await userauth(formdata.get('username'), formdata.get('password'))
  .then((result) => {
    console.log("this is the result in authenticate");
    console.log(result);
    if (result !== null) {
      redirecturl = '../main';
    }
  }).catch((error) => {
    console.log("whoops");
    console.log(error);
  });
  redirect(redirecturl);
} */

const userauthquery = new PQ({
  text: `
    SELECT playerid from player 
    WHERE username = $1 AND password = $2; 
  `
});

/* export async function userauth(username, password) {
  console.log(username + ' ' + password);
  await db.one(userauthquery, [username, password])
  .then((result) => {
    console.log(result.playerid);
    return result.playerid;
  }).catch((error) => {
    console.log("Unable to retrieve a user with those credentials");
    console.log(error)
    return null;
  });
  return null;
} */

export async function auth2(formdata) {
  let redirecturl = '../login';
  console.log(formdata.get('username') + " " + formdata.get('password'));

  // Use try/catch for async/await error handling
  try {
    const result = await db.one(userauthquery, [formdata.get('username'), formdata.get('password')]);
    console.log("this is the result in authenticate");
    console.log(result);

    if (result !== null) {
      redirecturl = `../characterselect?userid=${result.playerid}`;
      console.log(redirecturl);
    }
  } catch (error) {
    console.log("whoops");
    console.log(error);
    // Handle error (e.g., incorrect credentials or database error)
    // Optionally, set redirecturl to a specific "error" page or keep it as '../login'
  }

  // Return the determined redirect URL
  return redirecturl;
}


export async function loginredirect(redirecturl) {
  if (typeof window !== 'undefined') {
    Router.push(redirecturl);
  }
}


export async function gotosignup () {
  redirect('../signup');
}


const signupquery = new PQ({
  text: `
    INSERT INTO player (playerid, username, password) VALUES
    (DEFAULT, $1, $2)
    RETURNING playerid;
  `
});


export async function createuser(formdata) {
  // Insert username and password into db
  if (formdata.get('password') === formdata.get('password2')) {
    db.one(signupquery, [formdata.get('username'), formdata.get('password')])
    .then((result) => {
      // TODO Write the resulting playerid out to state (cookies)?? 
      console.log(result);
      redirect(`../characterselect?userid=${result.playerid}`);
    }).catch((error) => {
      console.error("Username already exists" + error);
    });
  } else {
    return "Passwords didn't match";
  }
  console.log(`${formdata.get('username')} - ${formdata.get('password')}`);
}


const getcharactersforplayerquery = new PQ({
  text: `
    SELECT c.playercharacterid, c.name AS charname, r.name AS charrace, sr.name AS charsubrace, cl.name AS charclassname, sc.name AS charsubclassname, c.characterlevel AS charlevel FROM playercharacter c
      JOIN race r ON c.race = r.raceid
      JOIN subrace sr ON c.subrace = sr.subraceid
      JOIN class cl ON c.class = cl.classid
      JOIN subclass sc ON c.subclass = sc.subclassid
    WHERE c.playerid = $1
  `
});

const getcharactersforplayerquery2 = new PQ({
  text: `
  SELECT c.playercharacterid as charid, c.name AS charname, r.name AS charrace, cl.name AS charclassname, c.characterlevel AS charlevel FROM playercharacter c
    JOIN race r ON c.race = r.raceid
    JOIN class cl ON c.class = cl.classid
  WHERE c.playerid = 10;
  `
});

export async function getCharactersForPlayer(userid) {
  db.many(getcharactersforplayerquery2)
  .then((result) => {
    console.log(result);
    return result;
  })
  .catch((error) => {
    console.error("Error loading characters: " + error);
    return "Error loading characters";
  });
}

export async function setSelectedPlayerCharacter(userid, playercharacterid) {
  redirect('../main');
}

export async function goToCharacterCreator(userid) {
  redirect('../charactercreator');
}

