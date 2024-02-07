import React, { useEffect, useState } from 'react';
import { Stack, Button } from 'react-bootstrap';
import DiceRollButton from './DiceRollButton';

function StaticStatsBox (setRollResults, rollresults) { 
  const [staticstats, setStaticStats] = useState({
      profbonus: 2,
      speed: 30,
      initiative: 2,
      armorclass: 14,
      perception: 5,
      investigation: 5,
      insight: 5,
      armor: "Light, Medium, Shields",
      weapons: "Martial, Simple",
      tools: "Cobbler's, Land Vehicles",
      languages: "Common, Halfling",
    });

  useEffect(() => {  
      getStats();
    }, []
  )


  const getStats = () => {
    fetch(`http://localhost:9000/getcharacterinfo?infotype=staticstats`)
    .then(res => res.json())
    .then(res => setStaticStats(res));
  }

  return ( 
    <div className="staticStatsBox frontElement">
      <div className="statsContainer senses">
        <div>Perception - {staticstats.perception}</div>
        <div>Investigation - {staticstats.investigation}</div>
        <div>Insight - {staticstats.insight}</div>
      </div>
      <div className="statsContainer generalStats">
        <div>Proficiency Bonus - {staticstats.profbonus}</div>
        <div>Speed - {staticstats.speed}</div>
        <div>Initiative - <DiceRollButton name="Initiative" rolltype="Stat" die="20" num="1" mod={staticstats.initiative} text={staticstats.initiative} setRollResults={setRollResults}>{staticstats.initiative}</DiceRollButton></div>
        <div>Armor Class - {staticstats.armorclass}</div>
      </div>
      <div className="statsContainer proficiencies">
        <div>Armor - {staticstats.armor}</div>
        <div>Weapons - {staticstats.weapons}</div>
        <div>Tools - {staticstats.tools}</div>
        <div>Languages - {staticstats.languages}</div>
      </div>
    </div>
  );
}

export default StaticStatsBox;