import { useState } from 'react';
import { Table } from 'react-bootstrap';

function MonsterGroupForm() {
  
  const [duplicatemenudisplay, setDuplicateMenuDisplay] = useState(false);

  const addEncounter = () => {
    console.log("This should add a new encounter, or something");
  }

  const toggleDuplicateMenu = () => {
    if (duplicatemenudisplay === false) {
      setDuplicateMenuDisplay(true);
    } else {
      setDuplicateMenuDisplay(false);
    }
    console.log("This should toggle the visibility of the duplicate menu");
  }

  return (
    <div className="monsterGroupForm">
      <form className="monsterGroupCreationForm" id="monsterGroupCreationForm">
        <div className="monsterGroupDisplay frontElement">
          <div className="monsterGroupFormBasicInfo">
            <Table size='sm' className="monsterGroupTable1 monsterGroupTable">
              <tbody>
                <tr>
                  <th>Creature</th>
                  <td><input type="text" name="creature" placeholder="Name" size="13"/></td>
                  <td><input type="number" name="quantity" placeholder="Qty" size="4"/></td>
                </tr>
                <tr>
                  <th>Description</th>
                  <td colSpan="2"><input type="text" name="description" size="15"/></td>
                </tr>
                <tr>
                  <th>HD/CR</th>
                  <td className="monsterFormHDCR"><input type="number" className="monsterHitDiceInput monsterTextSmall" name="hitdicenum" size="3" placeholder="1"/>d<input className="monsterHitDiceInput monsterTextSmall" type="number" name="hitdicetype" size="3" placeholder="6"/></td>
                  <td><input type="number" name="challengerating" placeholder="CR" size="3" /></td>
                </tr>
                <tr>
                  <th>Size/Type</th>
                  <td>
                    <select name="size">
                      <option value="Tiny">Tiny</option>
                      <option value="Small">Small</option>
                      <option value="Medium">Medium</option>
                      <option value="Large">Large</option>
                      <option value="Huge">Huge</option>
                      <option value="Gargantuan">Gargantuan</option>
                    </select>
                  </td>
                  <td>
                    <select name="type">
                      <option value=""></option>
                      <option value="Aberrations">Aberrations</option>
                      <option value="Monster">Monster</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <th>Alignment</th>
                  <td colSpan="2">
                    <select name="alignment">
                      <option className="selectGreen" value="lawfulgood">Lawful Good</option>
                      <option className="selectGreen" value="neutralgood">Neutral Good</option>
                      <option className="selectGreen" value="chaoticgood">Chaotic Good</option>
                      <option value="lawfulneutral">Lawful Neutral</option>
                      <option value="neutral">Neutral</option>
                      <option value="chaoticneutral">Chaotic Neutral</option>
                      <option className="selectRed" value="lawfulevil">Lawful Evil</option>
                      <option className="selectRed" value="neutralevil">Neutral Evil</option>
                      <option className="selectRed" value="chaoticevil">Chaotic Evil</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <th>XP Per/Total</th>
                  <td><input type="number" name="xpper" placeholder="XP Per" size="5"/></td>
                  <td><input type="number" name="xptotal" placeholder="XP Total" size="5"/></td>
                </tr>
                <tr>
                  <th>AC/Speed</th>
                  <td><input type="number" name="ac" placeholder="Armor Class" size="5"/></td>
                  <td><input type="number" name="speed" placeholder="Speed" size="5" /></td>
                </tr>
                <tr>
                  <td colSpan="3"><button type="button" id="monsterDuplicateButton" onClick={toggleDuplicateMenu}>Duplicate</button><button type="reset" id="monsterFormClear">Reset</button></td>
                </tr>
              </tbody>
            </Table>
          </div>
          <div className="monsterGroupFormAbilities">
            <Table className="monsterGroupTable2 monsterGroupTable">
              <tbody>
                <tr>
                  <th>Init</th>
                  <td colSpan="2">+2</td>
                </tr>
                <tr>
                  <th>Str</th>
                  <td><input className="monsterSheetAbilityInput" type="number" name="abilitystr" maxLength="2" size="3"/></td>
                  <td><div className="monsterSheetAbilityMod">-1</div></td>
                </tr>
                <tr>
                  <th>Dex</th>
                  <td><input className="monsterSheetAbilityInput" type="number" name="abilitydex" maxLength="2" size="3"/></td>
                  <td><div className="monsterSheetAbilityMod">+2</div></td>
                </tr>
                <tr>
                  <th>Con</th>
                  <td><input className="monsterSheetAbilityInput" type="number" name="abilitycon" maxLength="2" size="3"/></td>
                  <td><div className="monsterSheetAbilityMod">0</div></td>
                </tr>
                <tr>
                  <th>Int</th>
                  <td><input className="monsterSheetAbilityInput" type="number" name="abilityint" maxLength="2" size="3"/></td>
                  <td><div className="monsterSheetAbilityMod">0</div></td>
                </tr>
                <tr>
                  <th>Wis</th>
                  <td><input className="monsterSheetAbilityInput" type="number" name="abilitywis" maxLength="2" size="3"/></td>
                  <td><div className="monsterSheetAbilityMod">-1</div></td>
                </tr>
                <tr>
                  <th>Cha</th>
                  <td><input className="monsterSheetAbilityInput" type="number" name="abilitycha" maxLength="2" size="3"/></td>
                  <td><div className="monsterSheetAbilityMod">-1</div></td>
                </tr>
              </tbody>
            </Table>
          </div>
          <div className="monsterGroupFormAttacks">
            <Table size='sm' className="monsterGroupTable3 monsterGroupTable">
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
                  <td><input type="text" name="attack1name" size="10"/></td>
                  <td><input type="number" name="attack1hit" size="5"/></td>
                  <td className="monsterAttackDamage"><input type="number" className="monsterTextSmall" name="attack1numdice" size="3"/>d<input type="number" className="monsterTextSmall" name="attack1dice" size="4"/><input type="number" className="monsterTextSmall" name="attack1bonus" size="4"/></td>
                  <td>
                    <select name="damagetype1">
                      <option value="slashing">Slashing</option>
                      <option value="piercing">Piercing</option>
                      <option value="bludgeoning">Bludgeoning</option>
                    </select>
                  </td>
                  <td className="monsterHealth"><input className="monsterHealthInput" type="number" name="monsterhealthinput1" defaultValue=""/></td>
                </tr>
                <tr>
                  <td><input type="text" name="attack2name" size="10"/></td>
                  <td><input type="number" name="attack2hit"size="5" /></td>
                  <td className="monsterAttackDamage"><input type="number" className="monsterTextSmall" name="attack2numdice" size="3"/>d<input type="number" className="monsterTextSmall" name="attack2dice" size="4"/><input type="number" className="monsterTextSmall" name="attack2bonus" size="4"/></td>
                  <td>
                    <select name="damagetype2">
                      <option value="slashing">Slashing</option>
                      <option value="piercing">Piercing</option>
                      <option value="bludgeoning">Bludgeoning</option>
                    </select>
                  </td>
                  <td className="monsterHealth"><input className="monsterHealthInput" type="number" name="monsterhealthinput2" defaultValue=""/></td>
                </tr>
                <tr>
                  <td><input type="text" name="attack3name" size="10"/></td>
                  <td><input type="number" name="attack3hit" size="5" /></td>
                  <td className="monsterAttackDamage"><input type="number" className="monsterTextSmall" name="attack3numdice" size="3"/>d<input type="number" className="monsterTextSmall" name="attack3dice" size="4"/><input type="number" className="monsterTextSmall" name="attack3bonus" size="4"/></td>
                  <td>
                    <select name="damagetype3">
                      <option value="slashing">Slashing</option>
                      <option value="piercing">Piercing</option>
                      <option value="bludgeoning">Bludgeoning</option>
                    </select>
                  </td>
                  <td className="monsterHealth"><input className="monsterHealthInput" type="number" name="monsterhealthinput3" defaultValue=""/></td>
                </tr>
                <tr>
                  <td><input type="text" name="attack4name" size="10"/></td>
                  <td><input type="number" name="attack4hit" size="5" /></td>
                  <td className="monsterAttackDamage"><input type="number" className="monsterTextSmall" name="attack4numdice" size="3"/>d<input type="number" className="monsterTextSmall" name="attack4dice" size="4"/><input type="number" className="monsterTextSmall" name="attack4bonus" size="4"/></td>
                  <td>
                    <select name="damagetype4">
                      <option value="slashing">Slashing</option>
                      <option value="piercing">Piercing</option>
                      <option value="bludgeoning">Bludgeoning</option>
                    </select>
                  </td>
                  <td className="monsterHealth"><input className="monsterHealthInput" type="number" name="monsterhealthinput4" defaultValue=""/></td>
                </tr>
                <tr>
                  <td rowSpan="2"><label htmlFor="skills">Skills</label></td>
                  <td colSpan="3" rowSpan="2"><textarea name="skills"></textarea></td>
                  <td className="monsterHealth"><input className="monsterHealthInput" type="number" name="monsterhealthinput5" defaultValue=""/></td>
                </tr>
                <tr>
                  <td className="monsterHealth"><input className="monsterHealthInput" type="number" name="monsterhealthinput6" defaultValue=""/></td>
                </tr>
                <tr>
                  <td rowSpan="2"><label htmlFor="skills">Abilities</label></td>
                  <td colSpan="3" rowSpan="2"><textarea name="ability"></textarea></td>
                  <td className="monsterHealth"><input className="monsterHealthInput" type="number" name="monsterhealthinput7" defaultValue=""/></td>
                </tr>
                <tr>
                  <td className="monsterHealth"><input className="monsterHealthInput" type="number" name="monsterhealthinput8" defaultValue=""/></td>
                </tr>
              </tbody>
            </Table>
          </div>
          <div className="monsterGroupNotesSection">
            <div className="monsterGroupNotes"></div>
              <label htmlFor="monsterGroupNotesText">Notes</label>
              <textarea name="monsterGroupNotesText"></textarea>
            <div className="monsterGroupEncounterSelector">
              <label htmlFor="monsterGroupEncounter">Encounter</label>
              <input type="text" name="monsterGroupEncounter"/>
              <button type="button" value="Add" onClick={addEncounter}>Add</button>
            </div>
          </div>
        </div>
      </form>
    </div> 
  );
  
  
}

export default MonsterGroupForm;