import React, { Component } from "react";
import logo from './logo.svg';
import './App.css';
import DiceRollButton from './DiceRollButton';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bum: "Hell yeah brothers",
      checkVars: {
        name: "Strength",
        rolltype: "Ability",
        die: 20,
        num: 1,
        mod: 2,
      },
      checkResponse: {
        rolls: [],
        rollstring: "",
        rolltotal: "",
        basestring: "",
        name: "",
        rolltype: "",
      }
      /*
      apiResponse: {
        item: {
          name: "",
          value: 0,
          description: "",
          weight: 0,
          rarity: {
            rarityname: "",
            raritydescription: "",
          }
        },
        armorclass: 0,
        strengthreq: 0,
        stealthdisadvantage: false,
        word: 'neat mode',
      }
      */
    }
  }



  render () {
    console.log(`check = ${this.state.checkResponse}`);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <p className="App-intro">{this.state.checkResponse.rollstring}</p>
        <DiceRollButton name="Strength" rolltype="Ability" die="20" num="1" mod="2" />
      </div>
    );
  }
}

export default App;
