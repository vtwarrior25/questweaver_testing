import { Table } from 'react-bootstrap';

function MonsterGroupForm() {
  
  return (
    <div className="monsterGroupForm">
      <form class="monsterGroupCreationForm" id="monsterGroupCreationForm">
        <div class="monsterGroupDisplay frontElement">
          <div class="monsterGroupFormBasicInfo">
            <Table size='sm' class="monsterGroupTable1 monsterGroupTable">
              <tbody>
                <tr>
                  <th>Creature</th>
                  <td><input type="text" name="creature" placeholder="Name" size="13"/></td>
                  <td><input type="number" name="quantity" placeholder="Qty" size="4"/></td>
                </tr>
                <tr>
                  <th>Description</th>
                  <td colspan="2"><input type="text" name="description" size="15"/></td>
                </tr>
                <tr>
                  <th>HD/CR</th>
                  <td class="monsterFormHDCR"><input type="number" class="monsterHitDiceInput monsterTextSmall" name="hitdicenum" size="3" placeholder="1"/>d<input class="monsterHitDiceInput monsterTextSmall" type="number" name="hitdicetype" size="3" placeholder="6"/></td>
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
                  <td colspan="2">
                    <select name="alignment">
                      <option class="selectGreen" value="lawfulgood">Lawful Good</option>
                      <option class="selectGreen" value="neutralgood">Neutral Good</option>
                      <option class="selectGreen" value="chaoticgood">Chaotic Good</option>
                      <option value="lawfulneutral">Lawful Neutral</option>
                      <option value="neutral">Neutral</option>
                      <option value="chaoticneutral">Chaotic Neutral</option>
                      <option class="selectRed" value="lawfulevil">Lawful Evil</option>
                      <option class="selectRed" value="neutralevil">Neutral Evil</option>
                      <option class="selectRed" value="chaoticevil">Chaotic Evil</option>
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
                  <td colspan="3"><button type="button" id="monsterDuplicateButton" onclick="toggleDisplay('duplicateMonsterGroupMenu', 'flex', true, this);">Duplicate</button><button type="reset" id="monsterFormClear">Reset</button></td>
                </tr>
              </tbody>
            </Table>
          </div>
          <div className="monsterGroupFormAbilities">
            <Table class="monsterGroupTable2 monsterGroupTable">
              <tbody>
                <tr>
                  <th>Init</th>
                  <td colspan="2">+2</td>
                </tr>
                <tr>
                  <th>Str</th>
                  <td><input class="monsterSheetAbilityInput" type="number" name="abilitystr" maxlength="2" size="3"/></td>
                  <td><div class="monsterSheetAbilityMod">-1</div></td>
                </tr>
                <tr>
                  <th>Dex</th>
                  <td><input class="monsterSheetAbilityInput" type="number" name="abilitydex" maxlength="2" size="3"/></td>
                  <td><div class="monsterSheetAbilityMod">+2</div></td>
                </tr>
                <tr>
                  <th>Con</th>
                  <td><input class="monsterSheetAbilityInput" type="number" name="abilitycon" maxlength="2" size="3"/></td>
                  <td><div class="monsterSheetAbilityMod">0</div></td>
                </tr>
                <tr>
                  <th>Int</th>
                  <td><input class="monsterSheetAbilityInput" type="number" name="abilityint" maxlength="2" size="3"/></td>
                  <td><div class="monsterSheetAbilityMod">0</div></td>
                </tr>
                <tr>
                  <th>Wis</th>
                  <td><input class="monsterSheetAbilityInput" type="number" name="abilitywis" maxlength="2" size="3"/></td>
                  <td><div class="monsterSheetAbilityMod">-1</div></td>
                </tr>
                <tr>
                  <th>Cha</th>
                  <td><input class="monsterSheetAbilityInput" type="number" name="abilitycha" maxlength="2" size="3"/></td>
                  <td><div class="monsterSheetAbilityMod">-1</div></td>
                </tr>
              </tbody>
            </Table>
          </div>
          <div className="monsterGroupFormAttacks">
            <Table size='sm' class="monsterGroupTable3 monsterGroupTable">
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
                  <td class="monsterAttackDamage"><input type="number" class="monsterTextSmall" name="attack1numdice" size="3"/>d<input type="number" class="monsterTextSmall" name="attack1dice" size="4"/><input type="number" class="monsterTextSmall" name="attack1bonus" size="4"/></td>
                  <td>
                    <select name="damagetype1">
                      <option value="slashing">Slashing</option>
                      <option value="piercing">Piercing</option>
                      <option value="bludgeoning">Bludgeoning</option>
                    </select>
                  </td>
                  <td class="monsterHealth"><input class="monsterHealthInput" type="number" name="monsterhealthinput1" value="7"/></td>
                </tr>
                <tr>
                  <td><input type="text" name="attack2name" size="10"/></td>
                  <td><input type="number" name="attack2hit"size="5" /></td>
                  <td class="monsterAttackDamage"><input type="number" class="monsterTextSmall" name="attack2numdice" size="3"/>d<input type="number" class="monsterTextSmall" name="attack2dice" size="4"/><input type="number" class="monsterTextSmall" name="attack2bonus" size="4"/></td>
                  <td>
                    <select name="damagetype2">
                      <option value="slashing">Slashing</option>
                      <option value="piercing">Piercing</option>
                      <option value="bludgeoning">Bludgeoning</option>
                    </select>
                  </td>
                  <td class="monsterHealth"><input class="monsterHealthInput" type="number" name="monsterhealthinput2" value="7"/></td>
                </tr>
                <tr>
                  <td><input type="text" name="attack3name" size="10"/></td>
                  <td><input type="number" name="attack3hit" size="5" /></td>
                  <td class="monsterAttackDamage"><input type="number" class="monsterTextSmall" name="attack3numdice" size="3"/>d<input type="number" class="monsterTextSmall" name="attack3dice" size="4"/><input type="number" class="monsterTextSmall" name="attack3bonus" size="4"/></td>
                  <td>
                    <select name="damagetype3">
                      <option value="slashing">Slashing</option>
                      <option value="piercing">Piercing</option>
                      <option value="bludgeoning">Bludgeoning</option>
                    </select>
                  </td>
                  <td class="monsterHealth"><input class="monsterHealthInput" type="number" name="monsterhealthinput3" value=""/></td>
                </tr>
                <tr>
                  <td><input type="text" name="attack4name" size="10"/></td>
                  <td><input type="number" name="attack4hit" size="5" /></td>
                  <td class="monsterAttackDamage"><input type="number" class="monsterTextSmall" name="attack4numdice" size="3"/>d<input type="number" class="monsterTextSmall" name="attack4dice" size="4"/><input type="number" class="monsterTextSmall" name="attack4bonus" size="4"/></td>
                  <td>
                    <select name="damagetype4">
                      <option value="slashing">Slashing</option>
                      <option value="piercing">Piercing</option>
                      <option value="bludgeoning">Bludgeoning</option>
                    </select>
                  </td>
                  <td class="monsterHealth"><input class="monsterHealthInput" type="number" name="monsterhealthinput4" value=""/></td>
                </tr>
                <tr>
                  <td rowspan="2"><label for="skills">Skills</label></td>
                  <td colspan="3" rowspan="2"><textarea name="skills"></textarea></td>
                  <td class="monsterHealth"><input class="monsterHealthInput" type="number" name="monsterhealthinput5" value=""/></td>
                </tr>
                <tr>
                  <td class="monsterHealth"><input class="monsterHealthInput" type="number" name="monsterhealthinput6" value=""/></td>
                </tr>
                <tr>
                  <td rowspan="2"><label for="skills">Abilities</label></td>
                  <td colspan="3" rowspan="2"><textarea name="ability"></textarea></td>
                  <td class="monsterHealth"><input class="monsterHealthInput" type="number" name="monsterhealthinput7" value=""/></td>
                </tr>
                <tr>
                  <td class="monsterHealth"><input class="monsterHealthInput" type="number" name="monsterhealthinput8" value=""/></td>
                </tr>
              </tbody>
            </Table>
          </div>
          <div class="monsterGroupNotesSection">
            <div class="monsterGroupNotes"></div>
              <label for="monsterGroupNotesText">Notes</label>
              <textarea name="monsterGroupNotesText"></textarea>
            <div class="monsterGroupEncounterSelector">
              <label for="monsterGroupEncounter">Encounter</label>
              <input type="text" name="monsterGroupEncounter"/>
              <button type="button" value="Add" onclick="addEncounter();">Add</button>
            </div>
          </div>
        </div>
      </form>
    </div> 
  );
  
  
}

export default MonsterGroupForm;