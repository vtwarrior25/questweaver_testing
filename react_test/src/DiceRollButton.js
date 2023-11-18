import React, { Component } from "react";
import Button from 'react-bootstrap/Button';

import io from 'socket.io-client';
const socket = io.connect('http://localhost:4000');


class DiceRollButton extends Component {
  constructor(props) {
    super(props);
    this.callCheckAPI = this.callCheckAPI.bind(this);
    this.rollDice = this.rollDice.bind(this);
    this.state = {
      checkResponse: {
        rolls: [],
        rollstring: "",
        rolltotal: "",
        basestring: "",
        name: "",
        rolltype: "",
      },
      data: {
        name: this.props.name, 
        rolltype: this.props.rolltype,
        die: this.props.die,
        num: this.props.num,
        mod: this.props.mod
      }
    }
  }

  rollDice() {
    socket.emit('rolldice', this.state.data);
  }
  
  callCheckAPI() {
    fetch(`http://localhost:9000/rollcheck?name=${this.props.name}&rolltype=${this.props.rolltype}&die=${this.props.die}&num=${this.props.num}&mod=${this.props.mod}`)
        .then(res => res.json())
        .then(res => this.setState({ checkResponse: res }));
  }
  
  render (){
    //console.log(`rollstring = ${this.state.checkResponse.rollstring}`)
    return (
    <Button variant='secondary' size='xl' onClick={this.rollDice}>{this.props.mod}</Button>
    );
  }
};


export default DiceRollButton;