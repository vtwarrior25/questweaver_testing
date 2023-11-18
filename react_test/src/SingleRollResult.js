import React, { Component } from "react";

class SingleRollResult extends Component {
  constructor(props) {
    super(props);
    }


  render () {
    return (
      <div className="rollResults" id="rollResult1">
        <div className="rollDescription" id="rollDescription1">{this.props.name} - {this.props.rolltype}</div>
        <div className="rollParts" id="rollParts1">{this.props.rollstring}</div>
        <div className="rollBase" id="rollBase1">{this.props.basestring}</div>
        <div className="rollTotal" id="rollTotal1">{this.props.rolltotal}</div>
      </div>
    );
  }
};

export default SingleRollResult;