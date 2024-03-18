import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { setSelectedPlayerCharacter } from '../lib/actions';

function CharacterSelectEntry({userid, charid, charname, charclass, charsubclass, charrace, charsubrace, charlevel}) {
  const basetext = `${charname}: Level ${charlevel}`;
  const [displaytext, setDisplayText] = useState(basetext);

  
/*
  useEffect(() => {
    if (charsubrace !== null) {
      setDisplayText(displaytext + ` ${charrace} (${charsubrace}) `);  
    } else {
      setDisplayText(displaytext + ` ${charrace} `);
    }
  
    if (charsubclass !== null) {
      setDisplayText(displaytext + ` ${charclass} (${charsubclass}) `); 
    } else {
      setDisplayText(displaytext + ` ${charclass} `); 
    } 
  }, [charsubrace, charsubclass, charclass, charrace]
  );
*/
  

  return ( 
    <Link href={{pathname: '../main', query: {userid: userid, playercharacterid: charid}}}>
      <Button variant='secondary' className="characterSelectEntry">
        {`${charname}: Level ${charlevel} ${charrace} (${charsubrace}) ${charclass} (${charsubclass})`}
      </Button>
    </Link>
  );
}

export default CharacterSelectEntry;