"use client"
// React Imports
import React, { useEffect, useState } from "react";
import '@/app/App.css';
import RollResultsSection from "./RollResultsSection";
import CharacterSheet from "./CharacterSheet";
import StaticStatsBox from "./StaticStatsBox";
import MapSection from "./MapSection";
import MonsterSheet from "./MonsterSheet";

// React-Bootstrap Imports
import { Accordion, Button, Col, Container, Offcanvas, Row, Tab, Tabs } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import AbilityBox from "./AbilityBox";
import ManualDiceRoller from "./ManualDiceRoller";
import CharacterCreator from "./CharacterCreator";
import { RollResultsContext, SetRollResultsContext, ModPosContext, URLContext, UserIDContext, PlayerCharacterContext, DMContext }  from "./Contexts";
import ItemCreationForm from "./ItemCreationForm";
import WeaponCreationForm from "./WeaponCreationForm";


function App () {

  const [userid, setUserID] = useState(0); 
  const [playercharacterid, setPlayerCharacterID] = useState(0);
  const [isDM, setIsDM] = useState(true);

  const [rollresults, setRollResults] = useState({
    /*
    rolls: [],
    rollstring: "",
    rolltotal: "",
    basestring: "",
    name: "",
    rolltype: "",
    */
  });

  const [showboxes, setShowBoxes] = useState({
    showabilitysection: true,
    showhealthsection: true,
    showstaticstatsbox: true,
    showmanualdiceroller: true,
    showsavingthrowsection: true,
    showskillsection: true,
    showcharacterinventoryarea: true,
    showdefensesconditions: true,
    showturnorderbox: true,
  })



  useEffect(() => {
    console.log(showboxes);
    console.log("Refreshing showboxes");
  }, [showboxes]);

  const [showToggleMenu, setShowToggleMenu] = useState(false);

  const toggleMenuClose = () => setShowToggleMenu(false);
  const toggleMenuOpen = () => setShowToggleMenu(true);


  const changeShowBoxes = (showbox) => {
    let newshowboxes = {...showboxes};
    console.log('epic shit brothers');
    console.log(showbox);
    newshowboxes[showbox] = !newshowboxes[showbox];
    setShowBoxes(newshowboxes);
    console.log(showboxes);
  }

  const modPos = (modval, space) => {
    let modifier = modval;
    if (space === true) {
      modifier = ` ${modifier}`;
    }
    if (modifier > 0) {
      return `+${modifier}`;
    } else if (modifier < 0) {
      return `-${Math.abs(modifier)}`;
    } else {
      return `${modifier}`;
    }
  }

  /*
  <SkillSection setRollResults={setRollResults} rollresults={rollresults}/>
  <AbilitySection setRollResults={setRollResults} rollresults={rollresults}/>
  */
  return (
    <DMContext.Provider value={isDM}>
    <PlayerCharacterContext.Provider value={playercharacterid}>
    <UserIDContext.Provider value={userid}>
    <ModPosContext.Provider value={modPos}>
    <SetRollResultsContext.Provider value={setRollResults}>
    <RollResultsContext.Provider value={rollresults}>
    <URLContext.Provider value={"http://localhost:3000/api"}>
    <div className="App">
      <Container fluid className="mainContainer">
        <Row>
          <Col>
            <Tabs className="frontElement" defaultActiveKey='jerome' id="testingTabs">
              {isDM && <Tab eventKey='monster' title='Monster'>
                <MonsterSheet setRollResults={setRollResults}></MonsterSheet>
              </Tab>}
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
            <MapSection showboxes={showboxes} setShowBoxes={setShowBoxes}></MapSection>
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
          <div className="offcanvasVisibilityToggles">
          {Object.keys(showboxes).map((showbox, index) =>
            <div key={index}>
              <label htmlFor={showbox}>{showbox}</label>
              <input type='checkbox' name={showbox} checked={showboxes[showbox]} onChange={() => changeShowBoxes(showbox)}></input>
            </div>
          )}
          </div>
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Custom Item</Accordion.Header>
              <Accordion.Body>
                <ItemCreationForm></ItemCreationForm>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Custom Weapon</Accordion.Header>
              <Accordion.Body>
                <WeaponCreationForm></WeaponCreationForm>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
    </URLContext.Provider>
    </RollResultsContext.Provider>
    </SetRollResultsContext.Provider>
    </ModPosContext.Provider>
    </UserIDContext.Provider>
    </PlayerCharacterContext.Provider>
    </DMContext.Provider>
  );
}

/*
Dice Roll API Testing URL
http://localhost:9000/rollcheck?name=Strength&rolltype=Ability&die=20&num=1&mod=2
*/

export default App;
