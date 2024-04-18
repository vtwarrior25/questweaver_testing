import React, { useContext, useEffect, useState } from 'react';
import { Stack, Button, Accordion, Tab, Tabs } from 'react-bootstrap';
import DiceRollButton from './DiceRollButton';
import { URLContext, PlayerCharacterContext } from './Contexts';
import { useCol } from 'react-bootstrap/esm/Col';
import { getStaticStats } from '../lib/getcharacterinfo';

function StaticStatsBox (setRollResults, rollresults, collapse) { 

  const url = useContext(URLContext);
  const playercharacterid = useContext(PlayerCharacterContext);

  const [staticstats, setStaticStats] = useState({
      profbonus: 2,
      speed: 30,
      initiative: 2,
      armorclass: 14,
      passiveperception: 5,
      passiveinvestigation: 5,
      passiveinsight: 5,
      armor: "Light, Medium, Heavy, Shields",
      weapons: "Martial, Simple",
      tools: "Cobbler's, Land Vehicles",
      languages: "Common, Halfling",
      defenses: "Fireproof",
      conditions: "Dry Heaving",
      alignment: "Neutral"
    });

  useEffect(() => {  
      getStats();
    }, []
  )


  const getStats = () => {
    /*
    fetch(`http://localhost:3000/api/getcharacterinfo?infotype=staticstats`)
    .then(res => res.json())
    .then(res => setStaticStats(res));
    */
    getStaticStats(playercharacterid)
    .then(results => setStaticStats({...staticstats,...results}));
  }

{/*
  return ( 
    <div className="staticStatsBox frontElement">
      <div className="statsContainer senses">
        <div><span className='staticStatsItemName'>Perception</span> - {staticstats.perception}</div>
        <div><span className='staticStatsItemName'>Investigation</span> - {staticstats.investigation}</div>
        <div><span className='staticStatsItemName'>Insight</span> - {staticstats.insight}</div>
      </div>
      <div className="statsContainer generalStats">
        <div><span className='staticStatsItemName'>Proficiency Bonus</span> - {staticstats.profbonus}</div>
        <div><span className='staticStatsItemName'>Speed</span> - {staticstats.speed}</div>
        <div><span className='staticStatsItemName'>Initiative</span> - <DiceRollButton name="Initiative" rolltype="Stat" die="20" num="1" mod={staticstats.initiative} text={staticstats.initiative} setRollResults={setRollResults}>{staticstats.initiative}</DiceRollButton></div>
        <div><span className='staticStatsItemName'>Armor Class</span> - {staticstats.armorclass}</div>
      </div>
      <div className="statsContainer proficiencies">
        <div><span className='staticStatsItemName'>Armor</span> - {staticstats.armor}</div>
        <div><span className='staticStatsItemName'>Weapons</span> - {staticstats.weapons}</div>
        <div><span className='staticStatsItemName'>Tools</span> - {staticstats.tools}</div>
        <div><span className='staticStatsItemName'>Languages</span> - {staticstats.languages}</div>
      </div>
    </div>
  );
  */}
{/*
  return ( 
    <Accordion className="staticStatsBox frontElement" defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Senses</Accordion.Header>
        <Accordion.Body>
          <div className="statsContainer senses">
            <div><span className='staticStatsItemName'>Perception</span> - {staticstats.perception}</div>
            <div><span className='staticStatsItemName'>Investigation</span> - {staticstats.investigation}</div>
            <div><span className='staticStatsItemName'>Insight</span> - {staticstats.insight}</div>
          </div>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>General Stats</Accordion.Header>
        <Accordion.Body>
          <div className="statsContainer generalStats">
            <div><span className='staticStatsItemName'>Proficiency Bonus</span> - {staticstats.profbonus}</div>
            <div><span className='staticStatsItemName'>Speed</span> - {staticstats.speed}</div>
            <div><span className='staticStatsItemName'>Initiative</span> - <DiceRollButton name="Initiative" rolltype="Stat" die="20" num="1" mod={staticstats.initiative} text={staticstats.initiative} setRollResults={setRollResults}>{staticstats.initiative}</DiceRollButton></div>
            <div><span className='staticStatsItemName'>Armor Class</span> - {staticstats.armorclass}</div>
          </div>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>Proficiencies</Accordion.Header>
        <Accordion.Body>
          <div className="statsContainer proficiencies">
            <div><span className='staticStatsItemName'>Armor</span> - {staticstats.armor}</div>
            <div><span className='staticStatsItemName'>Weapons</span> - {staticstats.weapons}</div>
            <div><span className='staticStatsItemName'>Tools</span> - {staticstats.tools}</div>
            <div><span className='staticStatsItemName'>Languages</span> - {staticstats.languages}</div>
          </div>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
  */}


  return (
    <div className="staticStatsBox frontElement">
      <Tabs defaultActiveKey="0">
        <Tab eventKey="0" title="Senses">
          <div className="statsContainer senses">
            <div><span className='staticStatsItemName'>Perception</span> - {staticstats.passiveperception}</div>
            <div><span className='staticStatsItemName'>Investigation</span> - {staticstats.passiveinvestigation}</div>
            <div><span className='staticStatsItemName'>Insight</span> - {staticstats.passiveinsight}</div>
          </div>
        </Tab>
        <Tab eventKey="1" title="Stats">
          <div className="statsContainer generalStats">
            <div><span className='staticStatsItemName'>Proficiency Bonus</span> - {staticstats.profbonus}</div>
            <div><span className='staticStatsItemName'>Speed</span> - {staticstats.speed}</div>
            <div><span className='staticStatsItemName'>Initiative</span> - <DiceRollButton name="Initiative" rolltype="Stat" die="20" num="1" mod={staticstats.initiative} text={staticstats.initiative} setRollResults={setRollResults} advantage={false} initiative={true}>{staticstats.initiative}</DiceRollButton></div>
            <div><span className='staticStatsItemName'>Armor Class</span> - {staticstats.armorclass}</div>
            <div><span className='staticStatsItemName'>Alignment</span> - {staticstats.alignment}</div>
          </div>
        </Tab>
        <Tab eventKey="2" title="Proficiencies">
          <div className="statsContainer proficiencies">
            <div><span className='staticStatsItemName'>Armor</span> - {staticstats.armor}</div>
            <div><span className='staticStatsItemName'>Weapons</span> - {staticstats.weapons}</div>
            <div><span className='staticStatsItemName'>Tools</span> - {staticstats.tools}</div>
            <div><span className='staticStatsItemName'>Languages</span> - {staticstats.languages}</div>
          </div>
        </Tab>
        <Tab eventKey="3" title="Defenses">
          <div className='statsContainer defensesConditions'>
            <div><span className='staticStatsItemName'>Defenses</span> - {staticstats.defenses}</div>
            <div><span className='staticStatsItemName'>Conditions</span> - {staticstats.conditions}</div>          
          </div>
        </Tab>
      </Tabs>
    </div> 
  );
  
}

export default StaticStatsBox;