import { useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';

function CharacterSelectEntry({ userid, charid, charname, charclass, charsubclass, charrace, charsubrace, charlevel }) {
  // Function to build the display text
  const buildDisplayText = () => {
    let text = `${charname}: Level ${charlevel} ${charrace}`;
    if (charsubrace) text += ` (${charsubrace})`;
    text += ` ${charclass}`;
    if (charsubclass) text += ` (${charsubclass})`;
    return text;
  };

  return (
    <Link href={{ pathname: '../main', query: { userid: userid, playercharacterid: charid } }} passHref>
      <Button as="a" variant='secondary' className="characterSelectEntry">
        {buildDisplayText()}
      </Button>
    </Link>
  );
}

export default CharacterSelectEntry;
