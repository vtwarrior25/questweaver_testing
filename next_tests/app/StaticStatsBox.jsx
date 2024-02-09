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
      armor: "Light, Medium, Heavy, Shields",
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
        <div><span className='staticStatsItemName'>Perception</span> - {staticstats.perception}</div>
        <div><span className='staticStatsItemName'>Investigation</span> - {staticstats.investigation}</div>
        <div><span className='staticStatsItemName'>Insight</span> - {staticstats.insight}</div>
      </div>
      <div className="statsContainer generalStats">
        <div><span className='staticStatsItemName'>Bonus</span> - {staticstats.profbonus}</div>
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
}

export default StaticStatsBox;