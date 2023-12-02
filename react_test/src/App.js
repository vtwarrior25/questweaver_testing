// React Imports
import React, { useState } from "react";
import logo from './logo.svg';
import './App.css';
import DiceRollButton from './DiceRollButton';
import SkillSection from './SkillSection'
import AbilitySection from "./AbilitySection";
import RollResultsSection from "./RollResultsSection";

// React-Bootstrap Imports
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab'
import 'bootstrap/dist/css/bootstrap.min.css';


function App () {
  const [rollresults, setRollResults] = useState({
    rolls: [],
    rollstring: "",
    rolltotal: "",
    basestring: "",
    name: "",
    rolltype: "",
  });


  /*
  <SkillSection setRollResults={setRollResults} rollresults={rollresults}/>
  <AbilitySection setRollResults={setRollResults} rollresults={rollresults}/>
  */
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
      <DiceRollButton name="Beans" rolltype="Skill" die="20" num="1" mod="1" setRollResults={setRollResults}/>
      <SkillSection setRollResults={setRollResults} rollresults={rollresults}/>
      <AbilitySection setRollResults={setRollResults} rollresults={rollresults}/>
      <RollResultsSection rollresults={rollresults}/>
    </div>
  );
}

/*
Dice Rolll API Testing URL
http://localhost:9000/rollcheck?name=Strength&rolltype=Ability&die=20&num=1&mod=2
*/

export default App;
