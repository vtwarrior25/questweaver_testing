// React Imports
import React, { useState } from "react";
import logo from './logo.svg';
import './App.css';
import DiceRollButton from './DiceRollButton';
import SkillSection from './SkillSection'
import AbilitySection from "./AbilitySection";
import RollResultsSection from "./RollResultsSection";
import CharacterSheet from "./CharacterSheet";
import StaticStatsBox from "./StaticStatsBox";

// React-Bootstrap Imports
import { Container, Tabs, Tab, Row, Col, Stack }from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import AbilityBox from "./AbilityBox";


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
      <Container fluid>
        <Tabs defaultActiveKey='jerome' id="testingTabs">
            <Tab eventKey='monster' title='Monster'>
              Monster Sheet
            </Tab>
            <Tab eventKey='jerome' title='Jerome'>
              <Container className='sheetAndMap'>
                <Row>
                  <Col className="characterSheet">
                    <CharacterSheet setRollResults={setRollResults} rollresults={rollresults}></CharacterSheet>
                    <SkillSection setRollResults={setRollResults} rollresults={rollresults}/>
                    <StaticStatsBox setRollResults={setRollResults} rollresults={rollresults}></StaticStatsBox>
                    <RollResultsSection rollresults={rollresults}/>
                  </Col>
                  <Col className="mapArea">

                  </Col>
                </Row>
                
              </Container>
            </Tab>
        </Tabs>
      </Container>
    </div>
  );
}

/*
Dice Rolll API Testing URL
http://localhost:9000/rollcheck?name=Strength&rolltype=Ability&die=20&num=1&mod=2
*/

export default App;
