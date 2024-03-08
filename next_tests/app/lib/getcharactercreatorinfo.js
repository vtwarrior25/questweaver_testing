'use server'
const pgp = require('pg-promise')();
const {ParameterizedQuery: PQ} = require('pg-promise');
import { db } from './dbconn';
import { abilities, skills } from './resources';


const getcharactercreatorinfoquery = new PQ({
  text: `
    
  `
  // Get a list of races and subraces, remove the races from the list that have subraces
  // Using the list, grab all of the features associated with each subrace and race within the list
  
  // Do the same thing for classes and subclasses as well, but this time the main list just contains the classes,
  // with the subclass and its info being nested within the class info
});

export async function getCharacterCreatorInfo() {
  let subraces = [];
  let races = [];
  // Get list of subraces
  db.many()
  .then((result) => {
    
  }).catch((error) => {

  }); 

  // Get list of races that aren't connected to a subrace
  db.many();


  // Remove the races from the list that connect to a subrace


  // Grab all features for each race and subrace left in the lists
    
  //
}