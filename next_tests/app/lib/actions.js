'use server'

const pgp = require('pg-promise')();
const {ParameterizedQuery: PQ} = require('pg-promise');
import { db } from '../lib/dbconn';
import { tempAuth } from '@/app/lib/tempauth';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export async function authenticate(formdata) {
  let redirecturl = '../login';
  try {
    console.log(formdata.get('username'));
    userauth(formdata.get('username'), formdata.get('password'))
    .then((result) => {
      if (result == true) {
        redirecturl = '../main';
      }
    }).catch((error) => {
      console.log(error);
    });
    /*await tempAuth(formdata)
    .then((result) => {
      console.log(result);
      console.log('We are in the good part');
      if (result == true) {
        console.log('this should redirect beans');
        //redirect('/main');
        redirecturl = '../main';
      } else {
        console.log("This shouldn't redirect");
        //redirect('/login');
      }});
      */
  } catch (error) {
    console.log('We are in the error place');
    if (error) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.'
        default:
          return 'Something went wrong.'
      }
    }
    throw error
  }
  console.log(redirecturl);
  cookies().set('userid', 0);
  redirect(redirecturl);
}

const userauthquery = new PQ({
  text: `
    SELECT playerid from player 
    WHERE username = $1 AND password = $2; 
  `
});

export async function userauth(username, password) {
  db.one(userauthquery, [username, password])
  .then((result) => {
    if (result.playerid !== null) {
      return result.playerid;
    } else {
      return null;
    }
  }).catch((error) => {
    console.log(error)
  
  });
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


