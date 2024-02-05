import { Button, Table } from 'react-bootstrap';
import DiceRollButton from './DiceRollButton';

function MonsterGroup({monsterinfo}) {

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
              <td><span name="creature">{monsterinfo.name}</span></td>
              <td><span name="quantity">2</span></td>
            </tr>
            <tr>
              <th>Description</th>
              <td colSpan="2"><span name="description">Cragmaw</span></td>
            </tr>
            <tr>
              <th>HD/CR</th>
              <td><span name="hitdicenum">2</span>d<span name="hitdicetype">6</span></td>
              <td><span name="challengerating">0.25</span></td>
            </tr>
            <tr>
              <th>Size/Type</th>
              <td><span name="size">Small</span></td>
              <td><span name="type">Monster</span></td>
            </tr>
            <tr>
              <th>Alignment</th>
              <td colSpan="2"><span name="alignment">Neutral Evil</span></td>
            </tr>
            <tr>
              <th>XP Per/Total</th>
              <td><span name="xpper">50</span></td>
              <td><span name="xptotal">100</span></td>
            </tr>
            <tr>
              <th>AC/Speed</th>
              <td><span name="ac">13</span></td>
              <td><span name="speed">50</span></td>
            </tr>
            <tr>
              <td colSpan="3"><button className="monsterRemoveFromEncounterButton" onClick={removeMonsterGroup()}>Remove From Encounter</button></td>
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
                <button className="monsterSheetInitButton" name="Initiative"></button>
              </td>
            </tr>
            <tr>
              <th>Str</th>
              <td><span name="abilitystr">8</span></td>
              <td><button className="monsterSheetAbilityButton" name="Strength">-1</button></td>
            </tr>
            <tr>
              <th>Dex</th>
              <td><span name="abilitydex">14</span></td>
              <td><button className="monsterSheetAbilityButton" name="Dexterity">+2</button></td>
            </tr>
            <tr>
              <th>Con</th>
              <td><span name="abilitycon">10</span></td>
              <td><button className="monsterSheetAbilityButton" name="Constitution">0</button></td>
            </tr>
            <tr>
              <th>Int</th>
              <td><span name="abilityint">10</span></td>
              <td><button className="monsterSheetAbilityButton" name="Intelligence">0</button></td>
            </tr>
            <tr>
              <th>Wis</th>
              <td><span name="abilitywis">8</span></td>
              <td><button className="monsterSheetAbilityButton" name="Wisdom">-1</button></td>
            </tr>
            <tr>
              <th>Cha</th>
              <td><span name="abilitycha">8</span></td>
              <td><button className="monsterSheetAbilityButton" name="Charisma">-1</button></td>
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
            <tr>
              <td><span name="attack1name">Scimitar</span></td>
              <td><span name="attack1hit">4</span></td>
              <td><span name="attack1numdice">1</span>d<span name="attack1dice">6</span><span name="attack1bonus">+4</span></td>
              <td><span name="damagetype1">Slashing</span></td>
              <td className="monsterHealth"><input name="monsterhealthinput1" className="monsterHealthInput" type="number" defaultValue="0"/></td>
            </tr>
            <tr>
              <td><span name="attack2name">Shortbow</span></td>
              <td><span name="attack2hit">4</span></td>
              <td><span name="attack2numdice">1</span>d<span name="attack2dice">6</span><span name="attack2bonus">+4</span></td>
              <td><span name="damagetype2">Piercing</span></td>
              <td className="monsterHealth"><input name="monsterhealthinput2" className="monsterHealthInput" type="number" defaultValue=""/></td>
            </tr>
            <tr>
              <td><span name="attack3name"></span></td>
              <td><span name="attack3hit"></span></td>
              <td><span name="attack3numdice"></span>d<span name="attack3dice"></span><span name="attack3bonus"></span></td>
              <td><span name="damagetype3"></span></td>
              <td className="monsterHealth"><input name="monsterhealthinput3" className="monsterHealthInput" type="number"/></td>
            </tr>
            <tr>
              <td colSpan="4" rowSpan="2"><span name="skills">Stealth +6; Darkvision 60'</span></td>
              <td className="monsterHealth"><input name="monsterhealthinput5" className="monsterHealthInput" type="number" defaultValue=""/></td>
            </tr>
            <tr>
              <td className="monsterHealth"><input name="monsterhealthinput6" className="monsterHealthInput" type="number" defaultValue=""/></td>
            </tr>
            <tr>
              <td colSpan="4" rowSpan="2"><span name="ability">Nimble Escape (Disengage or Hide as Bonus Action)</span></td>
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
          <textarea name="monsterGroupNotesText"></textarea>
      </div>
    </div>
   );
}

export default MonsterGroup;

