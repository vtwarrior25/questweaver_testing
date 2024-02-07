import { Button, Table } from 'react-bootstrap';
import DiceRollButton from './DiceRollButton';
import { useState, useContext } from 'react';
import { ModPosContext } from './Contexts';

function MonsterGroup({monsterinfo, setRollResults}) {

/*
TODO
- Set onChange for HP boxes and notes box
- Add functionality to "Remove From Encounter" button
*/

  const modPos = useContext(ModPosContext);

  const getModifier = (value) => {
    return Math.floor((value - 10) / 2);
  }

  const removeMonsterGroup = () => {
    console.log("This will remove the monster group");
  }

  return ( 
    <div className="monsterGroupDisplay frontElement">
      <div className="monsterGroupDisplayBasicInfo">
        <Table size="sm">
          <tbody>
            <tr>
              <th>Creature</th>
              <td><span name="creature">{monsterinfo.basicinfo.name}</span></td>
              <td><span name="quantity">{monsterinfo.basicinfo.quantity}</span></td>
            </tr>
            <tr>
              <th>Description</th>
              <td colSpan="2"><span name="description">{monsterinfo.basicinfo.description}</span></td>
            </tr>
            <tr>
              <th>HD/CR</th>
              <td><span name="hitdicenum">{monsterinfo.basicinfo.hitdicenum}</span>d<span name="hitdicetype">{monsterinfo.basicinfo.hitdicetype}</span></td>
              <td><span name="challengerating">{monsterinfo.basicinfo.challengerating}</span></td>
            </tr>
            <tr>
              <th>Size/Type</th>
              <td><span name="size">{monsterinfo.basicinfo.size}</span></td>
              <td><span name="type">{monsterinfo.basicinfo.type}</span></td>
            </tr>
            <tr>
              <th>Alignment</th>
              <td colSpan="2"><span name="alignment">{monsterinfo.basicinfo.alignment}</span></td>
            </tr>
            <tr>
              <th>XP Per/Total</th>
              <td><span name="xpper">{monsterinfo.basicinfo.xpper}</span></td>
              <td><span name="xptotal">{monsterinfo.basicinfo.xptotal}</span></td>
            </tr>
            <tr>
              <th>AC/Speed</th>
              <td><span name="ac">{monsterinfo.basicinfo.ac}</span></td>
              <td><span name="speed">{monsterinfo.basicinfo.speed}</span></td>
            </tr>
            <tr>
              <td colSpan="3"><button className="monsterRemoveFromEncounterButton" onClick={() => removeMonsterGroup()}>Remove From Encounter</button></td>
            </tr>
          </tbody>
        </Table>
      </div>
      <div className='monsterGroupDisplayAbilities'>
        <Table size="sm">
          <tbody>
            <tr>
              <th>Init</th>
              <td colSpan="2">
                <DiceRollButton name={monsterinfo.basicinfo.name} rolltype="Initiative" die={20} num={1} mod={monsterinfo.abilities.init} text={modPos(monsterinfo.abilities.init)} setRollResults={setRollResults}></DiceRollButton>
              </td>
            </tr>
            <tr>
              <th>Str</th>
              <td><span name="abilitystr">{monsterinfo.abilities.str}</span></td>
              <td><DiceRollButton name={`${monsterinfo.basicinfo.name} - Str`} rolltype="Ability" die={20} num={1} mod={getModifier(monsterinfo.abilities.str)} text={modPos(getModifier(monsterinfo.abilities.str))} setRollResults={setRollResults}></DiceRollButton></td>
            </tr>
            <tr>
              <th>Dex</th>
              <td><span name="abilitydex">{monsterinfo.abilities.dex}</span></td>
              <td><DiceRollButton name={`${monsterinfo.basicinfo.name} - Dex`} rolltype="Ability" die={20} num={1} mod={getModifier(monsterinfo.abilities.dex)} text={modPos(getModifier(monsterinfo.abilities.dex))} setRollResults={setRollResults}></DiceRollButton></td>
            </tr>
            <tr>
              <th>Con</th>
              <td><span name="abilitycon">{monsterinfo.abilities.con}</span></td>
              <td><DiceRollButton name={`${monsterinfo.basicinfo.name} - Con`} rolltype="Ability" die={20} num={1} mod={getModifier(monsterinfo.abilities.con)} text={modPos(getModifier(monsterinfo.abilities.con))} setRollResults={setRollResults}></DiceRollButton></td>
            </tr>
            <tr>
              <th>Int</th>
              <td><span name="abilityint">{monsterinfo.abilities.int}</span></td>
              <td><DiceRollButton name={`${monsterinfo.basicinfo.name} - Int`} rolltype="Ability" die={20} num={1} mod={getModifier(monsterinfo.abilities.int)} text={modPos(getModifier(monsterinfo.abilities.int))} setRollResults={setRollResults}></DiceRollButton></td>
            </tr>
            <tr>
              <th>Wis</th>
              <td><span name="abilitywis">{monsterinfo.abilities.wis}</span></td>
              <td><DiceRollButton name={`${monsterinfo.basicinfo.name} - Wis`} rolltype="Ability" die={20} num={1} mod={getModifier(monsterinfo.abilities.wis)} text={modPos(getModifier(monsterinfo.abilities.wis))} setRollResults={setRollResults}></DiceRollButton></td>
            </tr>
            <tr>
              <th>Cha</th>
              <td><span name="abilitycha">{monsterinfo.abilities.cha}</span></td>
              <td><DiceRollButton name={`${monsterinfo.basicinfo.name} - Cha`} rolltype="Ability" die={20} num={1} mod={getModifier(monsterinfo.abilities.cha)} text={modPos(getModifier(monsterinfo.abilities.cha))} setRollResults={setRollResults}></DiceRollButton></td>
            </tr>
          </tbody>
        </Table>
      </div>
      <div className="monsterGroupDisplayAttacks">
        <Table size='sm'>
          <thead>
            <tr>
              <th>Attack</th>
              <th>Hit+</th>
              <th>Damage</th>
              <th>Type</th>
              <th>HP</th>
            </tr>
          </thead>
          <tbody>
            {monsterinfo.attacks.map((attack, index) =>  
              <tr>
              <td><span name={`attack${index}name`}>{attack.name}</span></td>
              <td><DiceRollButton name={`${monsterinfo.basicinfo.name}-${attack.name}`} rolltype="Monster Attack" die={20} num={1} mod={attack.hit} text={modPos(attack.hit)} advantage={true}></DiceRollButton></td>
              <td><DiceRollButton name={`${monsterinfo.basicinfo.name}-${attack.name}`} rolltype="Monster Damage" die={attack.dietype} num={attack.numdice} mod={attack.damagemod} text={`${attack.numdice}d${attack.dietype} ${modPos(attack.damagemod, true)}`} advantage={true}></DiceRollButton></td>
              <td><span name={`damagetype${index}`}>Slashing</span></td>
              <td className="monsterHealth"><input name={`monsterhealthinput${index}`} className="monsterHealthInput" type="number" defaultValue="0"/></td>
            </tr>
            )}
            <tr>
              <td colSpan="4" rowSpan="2"><span name="skills">{monsterinfo.skills}</span></td>
              <td className="monsterHealth"><input name="monsterhealthinput5" className="monsterHealthInput" type="number" defaultValue=""/></td>
            </tr>
            <tr>
              <td className="monsterHealth"><input name="monsterhealthinput6" className="monsterHealthInput" type="number" defaultValue=""/></td>
            </tr>
            <tr>
              <td colSpan="4" rowSpan="2"><span name="ability">{monsterinfo.ability}</span></td>
              <td className="monsterHealth"><input name="monsterhealthinput7" className="monsterHealthInput" type="number" defaultValue=""/></td>
            </tr>
            <tr>
              <td className="monsterHealth"><input name="monsterhealthinput8" className="monsterHealthInput" type="text" defaultValue=""/></td>
            </tr>
          </tbody>
        </Table>
      </div>
      <div className="monsterGroupNotesSection">
        <div className="monsterGroupNotes"></div>
          <label htmlFor="monsterGroupNotesText">Notes</label>
          <textarea name="monsterGroupNotesText">Nimble Escape (Disengage or Hide as Bonus Action)</textarea>
      </div>
    </div>
  );
}

export default MonsterGroup;

