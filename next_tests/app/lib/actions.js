'use server'

const pgp = require('pg-promise')();
const {ParameterizedQuery: PQ} = require('pg-promise');
import { db } from '../lib/dbconn';
import { tempAuth } from '@/app/lib/tempauth';
import { createuser } from '@/app/lib/createuser';
import { redirect } from 'next/navigation';

export async function authenticate(formdata) {
  let redirecturl = '../login';
  try {
    console.log(formdata.get('username'));
    await tempAuth(formdata)
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
  redirect(redirecturl);
}

export async function signup(formdata) {
  await createuser(formdata)
  .then((result) => {
    if (result === true) {
      // Redirect to character picker
      redirect('../login');
    } else {
      redirect('../signUp');
    }});
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

export async function getCharactersForPlayer(playerid) {
  db.many(getcharactersforplayerquery, [playerid])
  .then((result) => {
    return result;
  })
  .catch((error) => {
    console.error("Error loading characters: " + error);
    return "Error loa"
  });
}