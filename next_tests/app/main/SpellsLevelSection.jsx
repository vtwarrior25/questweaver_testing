import React, { useState, useEffect, useContext } from 'react';
import { Button, Table } from 'react-bootstrap';
import DiceRollButton from './DiceRollButton'; 
import { ModPosContext } from './Contexts';

function SpellsLevelSection({level, numspellslots, spellinfo, spells, setRollResults, unprepSpell}) {

  
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

  const updateSpellSlots = () => {
    
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
    // 3 conditions
    // hitdcdie = 0 or null, hitdcmod = 0 or null, hitdcmod = 'None' or null, save ability = "" or null  
    if ((spell.hitdcdie === 0 || spell.hitdcdie === null) && (spell.hitdcdicenum === 0 || spell.hitdcdicenum === null)) {
      console.log("beans1");
      if ((spell.hitdcmod === "None" || spell.hitdcmod === null) && (spell.saveability === "Non" || spell.saveability === null)) {
        return 'n/a';
      } else if (spell.hitdcmod === 'Save DC' && (spell.saveability !== "Non" || spell.saveability !== null)) {
        return `${spell.saveability} ${spellinfo.savedc}`
      }
    } else if (spell.hitdcdie > 0 && spell.hitdcdicenum > 0){
      if (spell.hitdcmod === 'Spell Ability') {
        return <DiceRollButton name={spell.name} rolltype={"Cast"} die={spell.hitdcdie} num={spell.hitdcdicenum} mod={spellinfo.spellabilitymod} setRollResults={setRollResults} text={`${spell.hitdcdicenum}d${spell.hitdcdie} ${modPos(spellinfo.spellabilitymod, true)}`}></DiceRollButton>
      } else if (spell.hitdcmod === 'Spell Attack') {
        return <DiceRollButton name={spell.name} rolltype={"Attack"} die={spell.hitdcdie} num={spell.hitdcdicenum} mod={spellinfo.spellattackmod} setRollResults={setRollResults} text={`${spell.hitdcdicenum}d${spell.hitdcdie} ${modPos(spellinfo.spellattackmod, true)}`}></DiceRollButton>
      }
    }
  }

  const effectHandler = (spell) => {
    //let text = `${spell.effectdienum}d${spell.effectdie} ${modPos(spell.effectdiemod, true)}`;
    if ((spell.effectdicetype === 0 || spell.effectdicetype === null) && (spell.effectdicenum === 0 || spell.effectdicenum === null)) {
      return spell.effect;
    } else if (spell.effectmod === "Spell Ability") {
      return <DiceRollButton name={spell.name} rolltype={spell.effect} die={spell.effectdicetype} num={spell.effectdicenum} mod={spellinfo.spellabilitymod} setRollResults={setRollResults} text={`${spell.effectdicenum}d${spell.effectdicetype} ${modPos(spellinfo.spellabilitymod, true)}`}></DiceRollButton>
    } else if (spell.effectmod === "None") {
      return <DiceRollButton name={spell.name} rolltype={spell.effect} die={spell.effectdicetype} num={spell.effectdicenum} mod={0} setRollResults={setRollResults} text={`${spell.effectdicenum}d${spell.effectdicetype} ${modPos(0, true)}`}></DiceRollButton>
    } else {
      return 'n/a'
    }
  }

  const castHandler = (spell) => {
    let text = "Cast";
    if (spell.hitdcdie > 0 && spell.hitdcdicenum > 0 && spell.hitdcmod === 'Spell Ability') {
      return <DiceRollButton name={spell.name} rolltype={"Cast"} die={spell.hitdcdie} num={spell.hitdcdicenum} mod={spellinfo.spellabilitymod} setRollResults={setRollResults} text={text}></DiceRollButton>
    } else if (spell.hitdcdie > 0 && spell.hitdcdicenum > 0 && spell.hitdcmod === 'Spell Attack') {
      return <DiceRollButton name={spell.name} rolltype={"Attack"} die={spell.hitdcdie} num={spell.hitdcdicenum} mod={spellinfo.spellattackmod} setRollResults={setRollResults} text={text}></DiceRollButton>
    } else if (spell.effectmod === "Spell Ability") {
      return <DiceRollButton name={spell.name} rolltype={spell.effect} die={spell.effectdicetype} num={spell.effectdicenum} mod={spellinfo.spellabilitymod} setRollResults={setRollResults} text={text}></DiceRollButton>
    } else if (spell.effectmod === "None" && spell.effectdicetype > 0 && spell.effectdicenum > 0) {
      return <DiceRollButton name={spell.name} rolltype={spell.effect} die={spell.effectdicetype} num={spell.effectdicenum} mod={0} setRollResults={setRollResults} text={text}></DiceRollButton>
    } else {
      return "-";
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
                <td>{castHandler(spell)}</td>
                <td onClick={() => toggleDropdown(index)}>{spell.name}</td>
                <td onClick={() => toggleDropdown(index)}>{spell.timetocast}</td>
                <td onClick={() => toggleDropdown(index)}>{spell.range}</td>
                <td>{hitDcHandler(spell)}</td>
                <td>{effectHandler(spell)}</td>
                <td onClick={() => toggleDropdown(index)}>{/*spell.notes*/}</td>
              </tr>
              <tr>
                {dropdownshidden[index] && <td colSpan="7">
                  <div className='spellsSectionTableExpandingInfoDiv'>
                    <span>Casting Time: {spell.timetocast}</span>
                    <span>Range/Area: {spell.range}</span>
                    <span>Components: {spell.components}</span>
                    <span>Duration: {spell.duration}</span>
                    <span>Description: {spell.description}</span>
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