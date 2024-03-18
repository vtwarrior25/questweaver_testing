'use client'

import '@/app/App.css';
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react';
import CharacterSelectEntry from './CharacterSelectEntry';
import { goToCharacterCreator, getCharactersForPlayer } from '../lib/actions';
import './characterselect.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';


export default function Page() {

  const router = useRouter();

  const [userid, setUserID] = useState(10);

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

  
  useEffect(() => {
    getCharactersForPlayer(userid)
    .then((result) => {
      setPlayerCharacters([...result]);
    }).catch((error) => {
      console.error("Error retrieving characters: " + error);
    });
  }, [userid]
  );

  return (  
    <div className='characterselection'>
      <h4>Character Select</h4>
      {playercharacters && playercharacters.length > 0 && playercharacters.map((character, index) => 
        <CharacterSelectEntry key={index} userid={userid} charid={character.charid} charname={character.charname} charrace={character.charrace} charsubrace={character.charsubrace} charclass={character.charclass} charsubclass={character.charsubclass} charlevel={character.charlevel}></CharacterSelectEntry>
      )}
      <Button variant='primary' className='characterCreatorButton' onClick={() => router.push('../charactercreator')}>Create New Character</Button>
    </div>
  )
}
