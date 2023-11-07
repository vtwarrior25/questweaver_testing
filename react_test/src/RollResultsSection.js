import React, { Component, memo } from "react";
import SingleRollResult from './SingleRollResult'

class RollResultsSection extends Component {
  constructor(props) {
    super(props);
    this.callCheckAPI = this.getSkills.bind(this);
    this.state = {
      checkResponse: {
        skills: []
        }
      }
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
      <SingleRollResult />
    );
  }
};

export default memo(RollResultsSection);