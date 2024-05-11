'use client'

import '@/app/App.css';
import { useState, useEffect } from 'react';
import { useSearchParams } from "next/navigation";
import './charactercreator.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container } from 'react-bootstrap';
import CharacterCreator from '../main/CharacterCreator';
import { UserIDContext } from '../main/Contexts';


export default function Page() {

  const searchParams = useSearchParams();
  const [userid, setUserID] = useState(searchParams.get('userid') ?? 1);

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
    <Container fluid>
      <UserIDContext.Provider value={userid}>
        <div className='charactercreatorpage'>
          <div className="characterCreatorOnPage">
            <CharacterCreator loginsection={true}></CharacterCreator>
          </div>
        </div>
      </UserIDContext.Provider>
    </Container>
    
  )
}
