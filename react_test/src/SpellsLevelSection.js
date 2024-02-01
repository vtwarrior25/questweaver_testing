import {useState, useEffect} from 'react';
import { Button, Table } from 'react-bootstrap';
import DiceRollButton from './DiceRollButton'; 

function SpellsLevelSection({level, numspellslots, savedc, spells, setRollResults}) {

  const [spellslots, setSpellSlots] = useState([]);

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

  useEffect(() => {
    setSpellSlots(createSpellSlots());
    return () => {
      console.log('This should clear the array');
    }
  }, []
  );


  const modPos = (bonus) => {
    if (bonus > 0) {
      return `+ ${bonus}`;
    } else if (bonus < 0) {
      return `- ${bonus}`;
    } else {
      return "";
    }
  }

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
    let text = `${spell.effectdienum}d${spell.effectdie}${modPos(spell.effectdiemod)}`;
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
          <Button size="sm" variant='secondary'>Clear</Button>
          <div className="spellHeaderSpellSlots">
            {spellslots.map((spellslot, index) => <input type="checkbox" key={index} value={spellslot}></input>)}
          </div>
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
          {spells.map((spell, index) => 
            <tr key={index}>
              <td><Button size='sm'>Cast</Button></td>
              <td>{spell.name}</td>
              <td>{spell.timetocast}</td>
              <td>{spell.range}</td>
              <td>{hitDcHandler(spell)}</td>
              <td>{effectHandler(spell)}</td>
              <td>{spell.notes}</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}

export default SpellsLevelSection;