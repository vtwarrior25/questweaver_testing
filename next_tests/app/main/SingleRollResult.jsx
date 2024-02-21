import React, { useEffect } from "react";
import { Button } from 'react-bootstrap';

function SingleRollResult ({rollresults, last, clearresults}) {

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
        <div className="rollDescription">{rollresults.name} - {rollresults.rolltype}</div>
        <div className="rollParts">{rollresults.rollstring}</div>
        <div className="rollBase">{rollresults.basestring}</div>
        <div className="rollTotal">{rollresults.rolltotal}</div>
      </div>
    );
  }
  
}

export default SingleRollResult;