import { Button } from 'react-bootstrap';

function WeaponCreationForm() {
  return ( 
    <div className="weaponCreationForm">
      <form class="customItemCreationForm">
        <span>Custom Weapon Form</span>
        <fieldset id="customWeaponBasicInfo">
          <div>
            <label for="nameInput">Name</label>
            <input name="nameInput"/>
          </div>
          <div class="valueWeightFields">
            <div>
              <label for="value">Value</label>
              <input type="number" class="itemNumInput" name="value"/>
            </div>
            <div>
              <label for="weight">Weight</label>
              <input type="number" class="itemNumInput" name="weight"/>
            </div>
          </div>
          <div class="customItemRarity">
            <label for="itemRarity">Rarity</label>
            <select name="itemRarity" id="itemRarity">
              <option value="common">Common</option>
              <option value="uncommon">Uncommon</option>
              <option value="rare">Rare</option>
              <option value="veryrare">Very Rare</option>
            </select>
          </div>
          <div class="customItemDescription">
            <label for="itemDescription">Description</label>
            <textarea name="itemDescription"></textarea>
          </div>
          <div class="weaponBasicRadio">
            <fieldset id="weaponTypeRadio" className='weaponTypeRadio'>
              <input type="radio" name="weapontype" value="martial"/>
              <label for="martial">Martial</label>
              <input type="radio" name="weapontype" value="simple"/>
              <label for="simple">Simple</label>
            </fieldset>
            <fieldset id="weaponRangeRadio" className='weaponTypeRadio'>
              <input type="radio" name="weaponrange" value="melee"/>
              <label for="melee">Melee</label>
              <input type="radio" name="weaponrange" value="ranged"/>
              <label for="ranged">Ranged</label>
            </fieldset>
          </div>
        </fieldset>
        <div class="customWeaponPropertiesSection" id="customWeaponPropertiesSection">
          <div name="customweaponproperties" class="customWeaponProperties">
            <div class="customWeaponPropertiesCol">
              <fieldset>
                <label for="ammunition">Ammunition</label>
                <input type="checkbox" name="ammunition" id="ammunition"/>
              </fieldset>
              <fieldset>
                <label for="finesse">Finesse</label>
                <input type="checkbox" name="finesse" id="finesse"/>
              </fieldset>
              <fieldset>
                <label for="heavy">Heavy</label>
                <input type="checkbox" name="heavy" id="heavy"/>
              </fieldset>
              <fieldset>
                <label for="light">Light</label>
                <input type="checkbox" name="light" id="light"/>
              </fieldset>
              <fieldset>
                <label for="loading">Loading</label>
                <input type="checkbox" name="loading" id="loading"/>
              </fieldset>
              <fieldset>
                <label for="range">Range</label>
                <input type="checkbox" name="range" id="range"/>
              </fieldset>
            </div>
            <div class="customWeaponPropertiesCol">
              <fieldset>
                <label for="reach">Reach</label>
                <input type="checkbox" name="reach" id="reach"/>
              </fieldset>
              <fieldset>
                <label for="special">Special</label>
                <input type="checkbox" name="special" id="special"/>
              </fieldset>
              <fieldset>
                <label for="thrown">Thrown</label>
                <input type="checkbox" name="thrown" id="thrown"/>
              </fieldset>
              <fieldset>
                <label for="twohanded">Two-Handed</label>
                <input type="checkbox" name="twohanded" id="twohanded"/>
              </fieldset>
              <fieldset>
                <label for="versatile">Versatile</label>
                <input type="checkbox" name="versatile" id="versatile"/>
              </fieldset>
            </div>
          </div>
        </div>
        <div class="customWeaponAttacks">
          <div class="customWeaponAttacksHeader">
            Attacks
            <button type="button" name="customWeaponAddAttackButton" onclick="toggleDisplay('customWeaponAttackFields2', 'block')">Add Another Attack</button>
          </div> 
          <fieldset class="customWeaponAttackFields" id="customWeaponAttackFields2">
            <div className='weaponFormRow'>
              <div>
                <label for="attackname">Attack Name</label>
                <input type="text" className='weaponFormTextInput' name="attackname"/>
              </div>
              <div>
                <label for="attackrange">Range</label>
                <input type="number" className='weaponFormTextInput' name="attackrange"/>
              </div>
            </div>
            <div className='weaponFormRow'>
              <div>
                <label for="attackmodifier">Attack Modifer</label>
                <select name="attackmodifier">
                  <option value="strength">Strength</option>
                  <option value="dexterity">Dexterity</option>
                  <option value="constitution">Constitution</option>
                  <option value="intelligence">Intelligence</option>
                  <option value="wisdom">Wisdom</option>
                  <option value="charisma">Charisma</option>
                </select>
              </div>
              <div>
                <label for="damagemodifier">Damage Modifier</label>
                <select name="damagemodifier">
                  <option value="strength">Strength</option>
                  <option value="dexterity">Dexterity</option>
                  <option value="constitution">Constitution</option>
                  <option value="intelligence">Intelligence</option>
                  <option value="wisdom">Wisdom</option>
                  <option value="charisma">Charisma</option>
                </select>
              </div>
            </div>
            <label for="damagedie">Damage Die</label>
            <select name="damagedie">
              <option value="4">d4</option>
              <option value="6">d6</option>
              <option value="8">d8</option>
              <option value="10">d10</option>
              <option value="12">d12</option>
              <option value="20">d20</option>
            </select>
            <label for="numdamagedie"># Damage Die</label>
            <input class="itemNumInput" type="number" name="numdamagedie"/>
            <label for="damagetype">Damage Type</label>
            <select name="damagetype">
              <option value="slashing">Slashing</option>
              <option value="piercing">Piercing</option>
              <option value="bludgeoning">Bludgeoning</option>
            </select>
          </fieldset>
        </div>
        <Button type="button">Create Item</Button>
      </form>
    </div>
  );
}

export default WeaponCreationForm;