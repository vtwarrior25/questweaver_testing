import React from "react";

function SingleRollResult ({rollresults}) {
  return (
    <div className="rollResults" id="rollResult1">
      <div className="rollDescription" id="rollDescription1">{rollresults.rollresults.name} - {rollresults.rollresults.rolltype}</div>
      <div className="rollParts" id="rollParts1">{rollresults.rollresults.rollstring}</div>
      <div className="rollBase" id="rollBase1">{rollresults.rollresults.basestring}</div>
      <div className="rollTotal" id="rollTotal1">{rollresults.rollresults.rolltotal}</div>
    </div>
  );
}

export default SingleRollResult;