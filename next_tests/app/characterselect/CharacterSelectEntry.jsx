import { useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { deleteCharacter } from '../lib/createcharacter.js';

function CharacterSelectEntry({ userid, charid, charname, charclass, charsubclass, charrace, charsubrace, charlevel }) {
  const buildDisplayText = () => {
    let text = `${charname}: Level ${charlevel} ${charrace} ${charclass}`;
    return text;
  };

  const handleDelete = async () => {
    try {
      await deleteCharacter(charid);
      window.location.reload();
    } catch (error) {
      console.error('Error deleting character:', error);
    }
  };

  return (
    <div className="characterEntry">
      <div className="characterInfo">
        <Link href={{ pathname: '../main', query: { userid: userid, playercharacterid: charid } }}>
          <Button variant='secondary' className="characterSelectEntry">  
            {buildDisplayText()}
          </Button>
        </Link>
      </div>
      <div className="deleteButton">
        <Button variant="danger" onClick={handleDelete}>Delete</Button>
      </div>
    </div>
  );
}

export default CharacterSelectEntry;
