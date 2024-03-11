import { useState } from 'react';
import { Button } from 'react-bootstrap';

function CharacterSelectEntry({charname, charclass, charsubclass, charrace, charsubrace, charlevel}) {
  return ( 
    <Button variant='secondary' className="characterSelectEntry">
      {`${charname}: Level ${charlevel} ${charrace}(${charsubrace}) ${charclass}(${charsubclass})`} 
    </Button>
  );
}

export default CharacterSelectEntry;