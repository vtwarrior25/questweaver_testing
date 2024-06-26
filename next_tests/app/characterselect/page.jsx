'use client'

import '@/app/App.css';
import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import CharacterSelectEntry from './CharacterSelectEntry';
import { goToCharacterCreator, getCharactersForPlayer } from '../lib/actions';
import './characterselect.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container } from 'react-bootstrap';


export default function Page() {

  const router = useRouter();

  const searchParams = useSearchParams()
  const [userid, setUserID] = useState(searchParams.get('userid') ?? 1);

  const [playercharacters, setPlayerCharacters] = useState([
    /*
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
    }, */
  ])
  
  useEffect(() => {
    getCharactersForPlayer(userid)
    .then((result) => {
      console.log(result);
      setPlayerCharacters([...result]);
    }).catch((error) => {
      console.error("Error retrieving characters: " + error);
    });
  }, [userid]
  );

  return (  
    <Container className="Page" fluid>
      <div className='characterselection'>
        <h4>Character Select</h4>
        <div className="characterSelectionList">
          {playercharacters && playercharacters.length > 0 && playercharacters.map((character, index) => 
            <CharacterSelectEntry key={index} userid={userid} charid={character.charid} charname={character.charname} charrace={character.charrace} charsubrace={character.charsubrace} charclass={character.charclass} charsubclass={character.charsubclass} charlevel={character.charlevel}></CharacterSelectEntry>
          )}
        </div>
        <Link href={{ pathname: '../charactercreator', query: { userid: userid }}} passHref={true}>
          <Button variant='primary' className="characterSelectEntry">  
          Create New Character
          </Button>
        </Link>
      </div>
    </Container>
  )
}
