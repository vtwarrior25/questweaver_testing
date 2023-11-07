import React, { Component } from "react";
import App from "./App";

class DiceRollButton extends Component {
  constructor(props) {
    super(props);
    this.callCheckAPI = this.callCheckAPI.bind(this);
    this.state = {
      checkVars: {
        name: props.name,
        rolltype: props.rolltype,
        die: props.die,
        num: props.num,
        mod: props.mod,
      },
      checkResponse: {
        rolls: [],
        rollstring: "",
        rolltotal: "0",
        basestring: "",
        name: "",
        rolltype: "",
      }
    }
  }

  callCheckAPI() {
    fetch(`http://localhost:9000/rollcheck?name=${this.state.checkVars.name}&rolltype=${this.state.checkVars.rolltype}&die=${this.state.checkVars.die}&num=${this.state.checkVars.num}&mod=${this.state.checkVars.mod}`)
        .then(res => res.text())
        .then(res => this.setState({ checkResponse: res }));
  }
  
  render (){
    return (
    <button onClick={this.callCheckAPI}>{this.state.checkResponse.rolltotal}</button>
    );
  }
};

export default DiceRollButton;