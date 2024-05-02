import React, { useEffect, useState, useContext } from 'react';
import { Stack, Button } from 'react-bootstrap';
import DiceRollButton from './DiceRollButton'
import SavingThrow from './SavingThrow';
import { getProfBonus, getSavingThrows } from '../lib/getcharacterinfo';
import { PlayerCharacterContext } from './Contexts';

function SavingThrowSection ({setRollResults}) { 
  const playercharacterid = useContext(PlayerCharacterContext);
  const [profbonus, setProfBonus] = useState(0);

  const [savingthrows, setSavingThrows] = useState([
    {
      name: 'STR',
      prof: false,
      val: +5,
    },
    {
      name: 'DEX',
      prof: false,
      val: +5,
    },
    {
      name: 'CON',
      prof: false,
      val: +5,
    },
    {
      name: 'INT',
      prof: false,
      val: +5,
    },
    {
      name: 'WIS',
      prof: false,
      val: +5,
    },
    {
      name: 'CHA',
      prof: false,
      val: +5,
    },
    ]);

  useEffect(() => {  
    getSavingThrows(playercharacterid)
    .then((results) => {
      setSavingThrows([...results])
    }).catch((error) => {
      console.error("Error retrieving saving throws: " + error);
    });
    getProfBonus(playercharacterid)
    .then((results) => {
      console.log(results);
      setProfBonus(results);
    }).catch((error) => {
      console.error("Error retrieving saving throws: " + error);
    });
    }, [playercharacterid]
  )

  return (
    /* 
    <div className="staticStatsBox frontElement">
      <Stack className="statsContainer senses" gap={1}>
        <div>Perception - {staticstats.perception}</div>
        <div>Investigation - {staticstats.investigation}</div>
        <div>Insight - {staticstats.insight}</div>
      </Stack>
      <Stack className="statsContainer generalStats" gap={1}>
        <div>Proficiency Bonus - {staticstats.profbonus}</div>
        <div>Speed - {staticstats.speed}</div>
        <div>Initiative - <DiceRollButton name="Initiative" rolltype="Stat" die="20" num="1" mod={staticstats.initiative} setRollResults={setRollResults}>{staticstats.initiative}</DiceRollButton></div>
        <div>Armor Class - {staticstats.armorclass}</div>
      </Stack>
      <Stack className="statsContainer proficiencies">
        <div>Armor - {staticstats.armor}</div>
        <div>Weapons - {staticstats.weapons}</div>
        <div>Tools - {staticstats.tools}</div>
        <div>Languages - {staticstats.languages}</div>
      </Stack>
    </div>
    */
    <div className="characterSavingThrowSectionBox frontElement">
      <span className='characterSheetSectionTitle'>Saving Throws</span>
      <div className="characterSavingThrowSection">
        {savingthrows && savingthrows.length > 0 && savingthrows.map((savingthrow) => <SavingThrow key={savingthrow.name} name={savingthrow.name} prof={savingthrow.prof} val={savingthrow.val} profbonus={profbonus} setRollResults={setRollResults}/>)}
      </div>
    </div>
  );
}

export default SavingThrowSection;