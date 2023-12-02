import { useEffect, useState, Component, componentWillRecieveProps } from 'react';
import SingleRollResult from './SingleRollResult';
import io from 'socket.io-client';


export default class RollResultsSection extends Component() {
  constructor(props) {
    this.state = {
      rolllist: [],
    }
    const socket = io.connect('http://localhost:4000');
  }
 
  
/*
  componentWillRecieveProps(() => {
    socket.on('rolldiceresult', (data) => {
      this.setState({rolllist: data});
      console.log(`Rolllist:  ${rolllist}`);
      setBeans('Ye Ye brother');
  })});
  */
//{rolllist.map((roll) => <SingleRollResult name={roll.name} rolltype={roll.rolltype} rollstring={roll.rollstring} basestring={roll.basestring} rolltotal={roll.rolltotal}/>)}

  render() {
    return (
      <div id="rollContainer">
        <h1>{beans}</h1>
      </div> 
    );
  }

  
}
