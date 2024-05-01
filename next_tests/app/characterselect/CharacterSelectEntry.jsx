import { useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';

function CharacterSelectEntry({ userid, charid, charname, charclass, charsubclass, charrace, charsubrace, charlevel }) {
  // Function to build the display text
  const buildDisplayText = () => {
    let text = `${charname}: Level ${charlevel} ${charrace} ${charclass}`;
    return text;
    /*
    if (charsubrace) text += ` (${charsubrace})`;
    text += ` ${charclass}`;
    if (charsubclass) text += ` (${charsubclass})`;
    return text;
    */
  };

  return (
    <Button as="a" variant='secondary' className="characterSelectEntry">
      <Link href={{ pathname: '../main', query: { userid: userid, playercharacterid: charid } }} passHref={true}>
        {buildDisplayText()}
      </Link>
    </Button>
  );
}

export default CharacterSelectEntry;
