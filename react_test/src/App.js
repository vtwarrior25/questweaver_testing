// React Imports
import React, { Component } from "react";
import logo from './logo.svg';
import './App.css';
import DiceRollButton from './DiceRollButton';
import SkillSection from './SkillSection'
import AbilitySection from "./AbilitySection";
import RollResultsSection from "./RollResultsSectionFunc";

// React-Bootstrap Imports
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab'
import 'bootstrap/dist/css/bootstrap.min.css';


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
      data: {
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

  showrollresults(data) {
    this.state.data = data;
  } 


  render () {
   //console.log(`check = ${this.state.checkResponse}`);
    return (
      <div className="App">
        <Tabs defaultActiveKey='jerome' id="testingTabs">
          <Tab eventKey='monster' title='Monster'>
            Monster Sheet
          </Tab>
          <Tab eventKey='jerome' title='Jerome'>
            Jerome character sheet
          </Tab>
        </Tabs>
        <SkillSection showrollresults={this.showrollresults} rollresults={this.state.data}/>
        <RollResultsSection showrollresults={this.showrollresults} rollresults={this.state.data}/>
      </div>
    );
  }
}

/*
Dice Rolll API Testing URL
http://localhost:9000/rollcheck?name=Strength&rolltype=Ability&die=20&num=1&mod=2
*/

export default App;
