"use client"
// React Imports
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import '@/app/App.css';
import RollResultsSection from "./RollResultsSection";
import CharacterSheet from "./CharacterSheet";
import MapSection from "./MapSection";
import MonsterSheet from "./MonsterSheet";
import ItemCreationForm from "./ItemCreationForm";
import WeaponCreationForm from "./WeaponCreationForm";
import CharacterCreator from "./CharacterCreator";
import { getBasicInfo } from "../lib/getcharacterinfo";
import { addToGameLog } from "../lib/chatandlog";


// React-Bootstrap Imports
import { Accordion, Button, Col, Container, Offcanvas, Row, Tab, Tabs } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { RollResultsContext, SetRollResultsContext, ModPosContext, URLContext, UserIDContext, PlayerCharacterContext, CharacterInfoContext, DMContext, ToggleUpdatesContext, UpdateGameLogContext}  from "./Contexts";


function App () {
  const searchParams = useSearchParams();
  const [userid, setUserID] = useState(searchParams.get('userid') ?? 1);
  const [playercharacterid, setPlayerCharacterID] = useState(searchParams.get('playercharacterid') ?? 1);
  const [characterinfo, setCharacterInfo] = useState({
    name: 'Jerome',
    race: 'Human',
    class: 'Wizard',
    characterlevel: 1
  });
  const [isDM, setIsDM] = useState(true);
  const [toggleUpdates, setToggleUpdates] = useState(true);

  const getToggleUpdates = () => {
    return toggleUpdates;
  }

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
    showmap: true,
    showchat: true,
    showrollresults: true,
  });
  

  useEffect(() => {
    console.log(showboxes);
    console.log("Refreshing showboxes");
  }, [showboxes]);


  useEffect(() => {
    getBasicInfo(playercharacterid)
    .then((result) => {
      setCharacterInfo({...result});
    }).catch((error) => {
      console.error("Error getting basic character info: " + error);
    })
  }, [playercharacterid],
  );
  


  const updateGameLog = (type, text) => {
    /*
    let newgamelogentry = {
      id: Number(gamelog.length - 1),
      character: playername,
      type: type,
      text: text
    };
    setGameLog([...gamelog, newgamelogentry]);
    */
    addToGameLog(playercharacterid, type, text);
  }


  const [showToggleMenu, setShowToggleMenu] = useState(false);

  const toggleMenuClose = () => setShowToggleMenu(false);
  const toggleMenuOpen = () => setShowToggleMenu(true);


  const changeShowBoxes = (showbox) => {
    let newshowboxes = {...showboxes};
    console.log(showbox);
    newshowboxes[showbox] = !newshowboxes[showbox];
    setShowBoxes(newshowboxes);
    console.log(showboxes);
  }

  const modPos = (modval, space) => {
    let modifier = modval;
    if (space === true) {
      modifier = ` ${modifier}`;
      if (modval === 0) {
        return "";
      }
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
    <UpdateGameLogContext.Provider value={updateGameLog}>
    <ToggleUpdatesContext.Provider value={getToggleUpdates}>
    <DMContext.Provider value={isDM}>
    <CharacterInfoContext.Provider value={characterinfo}>
    <PlayerCharacterContext.Provider value={playercharacterid}>
    <UserIDContext.Provider value={userid}>
    <ModPosContext.Provider value={modPos}>
    <SetRollResultsContext.Provider value={setRollResults}>
    <RollResultsContext.Provider value={rollresults}>
    <URLContext.Provider value={"http://localhost:3000/api"}>
    <div className="App">
      <Container fluid className="mainContainer">
        <Row>
          <Col xs={6}>
            <Tabs className="frontElement" defaultActiveKey='jerome' id="testingTabs">
              {isDM && <Tab eventKey='monster' title='Monster'>
                <MonsterSheet setRollResults={setRollResults}></MonsterSheet>
              </Tab>}
              <Tab eventKey='jerome' title='Jerome'>
                <CharacterSheet showboxes={showboxes} setShowBoxes={setShowBoxes} setRollResults={setRollResults} rollresults={rollresults}></CharacterSheet>
              </Tab>
              <Tab eventKey="characterCreator" title="Character Creator">
                <CharacterCreator loginsection={false}></CharacterCreator>
              </Tab>
            </Tabs>
          </Col>
          <Col xs={6}>
            <MapSection showboxes={showboxes} setShowBoxes={setShowBoxes} rollresults={rollresults}></MapSection>
          </Col>
        </Row>
        <Button onClick={toggleMenuOpen}>&</Button>
      </Container>
      <Offcanvas show={showToggleMenu} onHide={toggleMenuClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Dev Settings</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="offcanvasVisibilityToggles">
            <b><u>Toggle Elements</u></b>
          {Object.keys(showboxes).map((showbox, index) =>
            <div key={index}>
              <label htmlFor={showbox}>{showbox}</label>
              <input type='checkbox' name={showbox} checked={showboxes[showbox]} onChange={() => changeShowBoxes(showbox)}></input>
            </div>
          )}
          </div>
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Custom Item Form</Accordion.Header>
              <Accordion.Body>
                <ItemCreationForm></ItemCreationForm>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Custom Weapon Form</Accordion.Header>
              <Accordion.Body>
                <WeaponCreationForm></WeaponCreationForm>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          Toggle Updates
          <input type='checkbox' checked={toggleUpdates} onChange={() => setToggleUpdates(!toggleUpdates)}></input>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
    </URLContext.Provider>
    </RollResultsContext.Provider>
    </SetRollResultsContext.Provider>
    </ModPosContext.Provider>
    </UserIDContext.Provider>
    </PlayerCharacterContext.Provider>
    </CharacterInfoContext.Provider>
    </DMContext.Provider>
    </ToggleUpdatesContext.Provider>
    </UpdateGameLogContext.Provider>
  );
}

/*
Dice Roll API Testing URL
http://localhost:9000/rollcheck?name=Strength&rolltype=Ability&die=20&num=1&mod=2
*/

export default App;
