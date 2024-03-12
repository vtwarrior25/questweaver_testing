'use server'

const pgp = require('pg-promise')();
const {ParameterizedQuery: PQ} = require('pg-promise');
import { db } from '../lib/dbconn';
import { tempAuth } from '@/app/lib/tempauth';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export async function authenticate(formdata) {
  let redirecturl = '../login';
  //console.log(formdata.get('username'));
  console.log(formdata.get('username') + " " + formdata.get('password'));
  userauth(formdata.get('username'), formdata.get('password'))
  .then((result) => {
    console.log("this is the result in authenticate");
    console.log(result);
    if (result !== null) {
      redirecturl = '../main';
    }
  }).catch((error) => {
    console.log("fucked");
    console.log(error);
  });
  redirect(redirecturl);
}

const userauthquery = new PQ({
  text: `
    SELECT playerid from player 
    WHERE username = $1 AND password = $2; 
  `
});

export async function userauth(username, password) {
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
      redirect('../characterselect');
    }).catch((error) => {
      console.log(error);
      return "Username already exists";
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

export async function getCharactersForPlayer(userid) {
  db.many(getcharactersforplayerquery, [userid])
  .then((result) => {
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

