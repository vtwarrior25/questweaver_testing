import React, { Component } from "react";
import logo from './logo.svg';
import './App.css';
import DiceRollButton from './DiceRollButton';
import SkillSection from './SkillSection'
import AbilitySection from "./AbilitySection";

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
   //console.log(`check = ${this.state.checkResponse}`);
    return (
      <div className="App">
        <DiceRollButton name="Strength" rolltype="Ability" die="20" num="1" mod="2" />
        <SkillSection />
        <AbilitySection />
      </div>
    );
  }
}

/*
Dice Rolll API Testing URL
http://localhost:9000/rollcheck?name=Strength&rolltype=Ability&die=20&num=1&mod=2
*/

export default App;
