import React, { Component } from "react";
import App from "./App";

class DiceRollButton extends Component {
  constructor(props) {
    super(props);
    this.callCheckAPI = this.callCheckAPI.bind(this);
    this.state = {
      checkResponse: {
        rolls: [],
        rollstring: "",
        rolltotal: "",
        basestring: "",
        name: "",
        rolltype: "",
      }
    }
  }

  callCheckAPI() {
    fetch(`http://localhost:9000/rollcheck?name=${this.props.name}&rolltype=${this.props.rolltype}&die=${this.props.die}&num=${this.props.num}&mod=${this.props.mod}`)
        .then(res => res.json())
        .then(res => this.setState({ checkResponse: res }));
  }
  
  render (){
    console.log(`rollstring = ${this.state.checkResponse.rollstring}`)
    return (
    <button onClick={this.callCheckAPI}>{this.props.mod}</button>
    );
  }
};

export default DiceRollButton;