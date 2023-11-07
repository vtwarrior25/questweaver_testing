import React, { Component } from "react";

class SingleRollResult extends Component {
  constructor(props) {
    super(props);
    }


  render () {
    return (
      <div class="rollResults" id="rollResult1">
        <div class="rollDescription" id="rollDescription1"></div>
        <div class="rollParts" id="rollParts1">{}</div>
        <div class="rollBase" id="rollBase1"></div>
        <div class="rollTotal" id="rollTotal1"></div>
      </div>
    );
  }
};

export default SingleRollResult;