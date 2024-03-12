import { useState, useEffect } from 'react';
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
    <Button variant='secondary' className="characterSelectEntry" onClick={() => setSelectedPlayerCharacter(userid, charid)}>
      {`${charname}: Level ${charlevel} ${charrace} (${charsubrace}) ${charclass} (${charsubclass})`}
    </Button>
  );
}

export default CharacterSelectEntry;