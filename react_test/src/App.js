// React Imports
import React, { useEffect, useState } from "react";
import './App.css';
import RollResultsSection from "./RollResultsSection";
import CharacterSheet from "./CharacterSheet";
import StaticStatsBox from "./StaticStatsBox";
import MapSection from "./MapSection";
import MonsterSheet from "./MonsterSheet";

// React-Bootstrap Imports
import { Button, Container, Offcanvas, Tab, Tabs, Row, Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import AbilityBox from "./AbilityBox";
import ManualDiceRoller from "./ManualDiceRoller";
import CharacterCreator from "./CharacterCreator";


function App () {
  const [rollresults, setRollResults] = useState({
    rolls: [],
    rollstring: "",
    rolltotal: "",
    basestring: "",
    name: "",
    rolltype: "",
  });

  const [showboxes, setShowBoxes] = useState({
    showAbilitySection: true,
    showHealthSection: true,
    showStaticStatsBox: true,
    showManualDiceRoller: true,
    showSavingThrowSection: true,
    showSkillSection: true,
    showCharacterInventoryArea: true,
  })

  useEffect(() => {
    console.log(showboxes);
  }, [showboxes]);

  const [showToggleMenu, setShowToggleMenu] = useState(false);

  const toggleMenuClose = () => setShowToggleMenu(false);
  const toggleMenuOpen = () => setShowToggleMenu(true);


  /*
  <SkillSection setRollResults={setRollResults} rollresults={rollresults}/>
  <AbilitySection setRollResults={setRollResults} rollresults={rollresults}/>
  */
  return (
    <div className="App">
      <Container fluid className="mainContainer">
        <Row>
          <Col>
            <Tabs className="frontElement" defaultActiveKey='monster' id="testingTabs">
              <Tab eventKey='monster' title='Monster'>
                <MonsterSheet></MonsterSheet>
              </Tab>
              <Tab eventKey='jerome' title='Jerome'>
                <div className='sheetAndMap'>
                  <CharacterSheet showboxes={showboxes} setShowBoxes={setShowBoxes} setRollResults={setRollResults} rollresults={rollresults}></CharacterSheet>
                </div>
              </Tab>
              <Tab eventKey="characterCreator" title="Character Creator">
                <CharacterCreator></CharacterCreator>
              </Tab>
            </Tabs>
          </Col>
          <Col>
            <MapSection></MapSection>
            <RollResultsSection rollresults={rollresults}/>
          </Col>
        </Row>
        <Button onClick={toggleMenuOpen}>&</Button>
      </Container>
      <Offcanvas show={showToggleMenu} onHide={toggleMenuClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <label for="showAbilitySection">Ability</label>
          <input type='checkbox' name='showAbilitySection' value={showboxes.showAbilitySection} onChange={(e) => {setShowBoxes({...showboxes, showAbilitySection: e.target.value})}}></input>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

/*
Dice Rolll API Testing URL
http://localhost:9000/rollcheck?name=Strength&rolltype=Ability&die=20&num=1&mod=2
*/

export default App;
