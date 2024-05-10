'use client'

import '@/app/App.css';
import { useState, useEffect } from 'react';
import './charactercreator.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import CharacterCreator from '../main/CharacterCreator';


export default function Page() {

  const [userid, setUserID] = useState(0);

  const [playercharacters, setPlayerCharacters] = useState([
    {
      charid: 0,
      charname: "Jerome",
      charrace: "Human",
      charsubrace: "",
      charclass: "Barbarian",
      charsubclass: "",
      charlevel: 1,
    },
    {
      charid: 1,
      charname: "Dylan",
      charrace: "Halfling",
      charsubrace: "Lightfoot",
      charclass: "Rogue",
      charsubclass: "",
      charlevel: 1,
    },
  ])

  /*
  useEffect(() => {
    getCharactersForPlayer(userid)
    .then((result) => {
      setPlayerCharacters(result);
    }).catch((error) => {
      console.error("Error retrieving characters: " + error);
    });
  }, [playerid]
  );
  */

  return (  
    <div className='charactercreatorpage'>
      <CharacterCreator loginsection={true}></CharacterCreator>
    </div>
  )
}
