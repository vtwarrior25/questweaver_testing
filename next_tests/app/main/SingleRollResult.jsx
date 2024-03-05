import React, { useEffect, useState } from "react";
import { Button } from 'react-bootstrap';

function SingleRollResult ({rollresults, last, clearresults}) {
  const [dropdownhidden, setDropdownHidden] = useState(true);

  if (last === true) {
    return (
      <div className="rollResults frontElement lastRollResult">
        <div className="rollDescription">{rollresults.name} - {rollresults.rolltype}</div>
        <div className="rollParts">{rollresults.rollstring}</div>
        <div className="rollBase">{rollresults.basestring}</div>
        <div className="rollTotal">{rollresults.rolltotal}</div>
        <Button variant="danger" onClick={clearresults}>X</Button>
      </div>
    );
  } else {
    return (
      <div className="rollResults frontElement">
        <div className="rollDescription" onClick={() => setDropdownHidden(!dropdownhidden)}>{rollresults.name} - {rollresults.rolltype}</div>
        {!dropdownhidden && 
        <div>
          <div className="rollParts">{rollresults.rollstring}</div>
          <div className="rollBase">{rollresults.basestring}</div>
          <div className="rollTotal">{rollresults.rolltotal}</div>
        </div>
        }
      </div>
    );
  }
  
}

export default SingleRollResult;