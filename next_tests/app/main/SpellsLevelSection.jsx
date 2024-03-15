import React, { useState, useEffect, useContext } from 'react';
import { Button, Table } from 'react-bootstrap';
import DiceRollButton from './DiceRollButton'; 
import { ModPosContext } from './Contexts';

function SpellsLevelSection({level, numspellslots, savedc, spells, setRollResults, unprepSpell}) {

  
  const modPos = useContext(ModPosContext);
  const [spellslots, setSpellSlots] = useState([]);
  const [dropdownshidden, setDropdownsHidden] = useState([]);


  useEffect(() => {
    setSpellSlots(createSpellSlots());
    return () => {
      console.log('This should clear the array');
    }
  }, []
  );

  useEffect(() => {
    spells.forEach((spell, index) => setDropdownsHidden[index] = false);
  }, [spells]
  )

  const toggleDropdown = (index) => {
    let newdropdowns = [...dropdownshidden];
    newdropdowns[index] = !newdropdowns[index];
    setDropdownsHidden(newdropdowns);
  }

  const createSpellSlots = () => {
    let slots = [];
    console.log(`level - ${level}   numspellslots - ${numspellslots}`);
    for (let i = 0; i < numspellslots; i++) {
      console.log("spellslot");
      /*
      let newspellslots = spellslots;
      newspellslots.push(false);
      setSpellSlots(newspellslots);
      */
      slots.push(false);
      console.log(slots);
    }
    return slots;
  }

/*
  const modPos = (bonus) => {
    if (bonus > 0) {
      return `+ ${bonus}`;
    } else if (bonus < 0) {
      return `- ${Math.abs(bonus)}`;
    } else {
      return "";
    }
  }
*/

  const titleHandler = (level) => {
    switch (level) {
      case 0:
        return "Cantrips";
        break;
      case 1:
        return "1st Level";
        break;
      case 2:
        return "2nd Level";
        break;
      case 3:
        return "3rd Level";
        break;
      default:
        return `${level}th Level`
    }
  }


  const hitDcHandler = (spell) => {
    if (spell.hitdcroll === false) {
      if (spell.hitdc !== "") {
        return `${spell.hitdc} ${savedc}`;
      }
    }
    return spell.hitdc; 
  }

  const effectHandler = (spell) => {
    let text = `${spell.effectdienum}d${spell.effectdie} ${modPos(spell.effectdiemod, true)}`;
    if (spell.effectdie === 0 || spell.effectdienum === 0) {
      return spell.effect;
    } else {
      return <DiceRollButton name={spell.name} rolltype={spell.effect} die={spell.effectdie} num={spell.effectdienum} mod={spell.effectdiemod} setRollResults={setRollResults} text={text}></DiceRollButton>
    }
  }


  return ( 
    <div className="spellsLevelSection">
      <div className="spellsLevelSectionHeader">
        <span className="characterSheetSectionTitle">{titleHandler(level)}</span>
        <div className="spellsHeaderRightSection">
          <form className='spellsHeaderFakeForm'>
          {spellslots && spellslots.length > 0 && <Button size="sm" variant='secondary' type='reset'>Clear</Button>}
            <div className="spellHeaderSpellSlots">
              {spellslots && spellslots.length > 0 && spellslots.map((spellslot, index) => <input type="checkbox" key={index} value={spellslot}></input>)}
            </div>
          </form>
        </div>
      </div>
      <Table size="sm">
        <thead>
          <tr>
            <td></td>
            <th>Name</th>
            <th>Time</th>
            <th>Range</th>
            <th>Hit/DC</th>
            <th>Effect</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {spells && spells.length > 0 && spells.map((spell, index) => 
            <React.Fragment key={index}>
              <tr>
                <td><Button size='sm'>Cast</Button></td>
                <td onClick={() => toggleDropdown(index)}>{spell.name}</td>
                <td>{spell.timetocast}</td>
                <td>{spell.range}</td>
                <td>{hitDcHandler(spell)}</td>
                <td>{effectHandler(spell)}</td>
                <td>{spell.notes}</td>
              </tr>
              <tr>
                {dropdownshidden[index] && <td colSpan="7">
                  <div className='spellsSectionTableExpandingInfoDiv'>
                    <span>Casting Time: {spell.timetocast}</span>
                    <span>Range/Area: {spell.range}</span>
                    <span>Components:</span>
                    <span>Duration:</span>
                    <span>description</span>
                    <Button variant='secondary' size="sm" onClick={() => unprepSpell(spell.name)}>Unlearn</Button>
                  </div>
                </td>}
              </tr>
            </React.Fragment>
          )}
        </tbody>
      </Table>
    </div>
  );
}

export default SpellsLevelSection;