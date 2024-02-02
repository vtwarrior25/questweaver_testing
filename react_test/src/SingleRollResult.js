import React, { useEffect } from "react";

function SingleRollResult ({rollresults, last}) {

  return (
    <div className={last?"rollResults frontElement lastRollResult":"rollResults frontElement"}>
      <div className="rollDescription">{rollresults.name} - {rollresults.rolltype}</div>
      <div className="rollParts">{rollresults.rollstring}</div>
      <div className="rollBase">{rollresults.basestring}</div>
      <div className="rollTotal">{rollresults.rolltotal}</div>
    </div>
  );
}

export default SingleRollResult;