'use client'

import '@/app/App.css';
import { useState, useEffect, use } from 'react';
import CharacterSelectEntry from './CharacterSelectEntry';
import './characterselect.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';


export default function Page() {

  const [playerid, setPlayerID] = useState(0);

  const [playercharacters, setPlayerCharacters] = useState([
    {
      charname: "Jerome",
      charrace: "Human",
      charsubrace: "",
      charclass: "Barbarian",
      charsubclass: "",
      charlevel: 1,
    },
    {
      charname: "Dylan",
      charrace: "Halfling",
      charsubrace: "",
      charclass: "Rogue",
      charsubclass: "",
      charlevel: 1,
    },
  ])

  /*
  useEffect(() => {
    getCharactersForPlayer(playercharacterid)
    .then((result) => {
      setPlayerCharacters(result);
    }).catch((error) => {
      console.error("Error retrieving characters: " + error);
    });
  }, [playerid]
  );
  */

  return (  
    <div className='characterselection'>
      <h4>Character Select</h4>
      {playercharacters.map((character, index) => 
        <CharacterSelectEntry key={index} charname={character.charname} charrace={character.charrace} charsubrace={character.charsubrace} charclass={character.charclass} charsubclass={character.charsubclass} charlevel={character.charlevel}></CharacterSelectEntry>
      )}
      <Button variant='primary' className='characterCreatorButton'>Create New Character</Button>
    </div>
  )
}
