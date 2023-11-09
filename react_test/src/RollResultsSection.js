import React, { Component, memo } from "react";
import SingleRollResult from './SingleRollResult'

class RollResultsSection extends Component {
  constructor(props) {
    super(props);
    this.callCheckAPI = this.displayRollResults.bind(this);
    this.state = {
      checkResponse: {
        rolls: []
        }
      }
    }

  displayRollResults (name, rolltype, rollstring, rolltotal, basestring) {
    //Add new single roll result with
    console.log(`Name = ${name}, rolltype = ${rolltype}, rollstring = ${rollstring}, rolltotal = ${rolltotal}, basestring = ${basestring}`)
  }

/*
  getSkills() {
    fetch(`http://localhost:9000/getcharacterinfo?infotype=skill`)
        .then(res => res.json())
        .then(res => this.setState({ checkResponse: res }));
  }

  componentDidMount () {
    this.getSkills();
  }
*/
  render () {
    console.log(`rollstring = ${this.state.checkResponse.rollstring}`)
    return (
      <div id="rollContainer">
        <SingleRollResult />
      </div>  
    );
  }
};

export default memo(RollResultsSection);