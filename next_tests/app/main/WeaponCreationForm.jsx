import React, { useState, useContext } from 'react';
import { Button } from 'react-bootstrap';
import { createWeapon } from '@/app/lib/itemcreation';
import { PlayerCharacterContext } from './Contexts';

function WeaponCreationForm() {
  const playercharacterid = useContext(PlayerCharacterContext);
  const createWeaponWithPlayerID = createWeapon.bind(playercharacterid, null);

  return ( 
    <div className="weaponCreationForm">
      <form class="customItemCreationForm" action={createWeaponWithPlayerID}>
        <fieldset id="customWeaponBasicInfo">
          <div>
            <label for="name">Name</label>
            <input name="name"/>
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
            <label htmlFor="rarity">Rarity</label>
            <select name="rarity" id="itemRarity">
              <option value="Common">Common</option>
              <option value="Uncommon">Uncommon</option>
              <option value="Rare">Rare</option>
              <option value="Very Rare">Very Rare</option>
              <option value="Legendary">Legendary</option>
              <option value="Artifact">Artifact</option>
            </select>
          </div>
          <div class="customItemDescription">
            <label for="description">Description</label>
            <textarea name="description"></textarea>
          </div>
          <div class="weaponBasicRadio">
            <fieldset id="weaponTypeRadio" className='weaponTypeRadio'>
              <input type="radio" name="weapontype" value="Martial"/>
              <label for="martial">Martial</label>
              <input type="radio" name="weapontype" value="Simple"/>
              <label for="simple">Simple</label>
            </fieldset>
            <fieldset id="weaponRangeRadio" className='weaponTypeRadio'>
              <input type="radio" name="weaponrange" value="Melee"/>
              <label for="melee">Melee</label>
              <input type="radio" name="weaponrange" value="Ranged"/>
              <label for="ranged">Ranged</label>
            </fieldset>
          </div>
        </fieldset>
        <div class="customWeaponPropertiesSection" id="customWeaponPropertiesSection">
          <div name="customweaponproperties" class="customWeaponProperties">
            <div class="customWeaponPropertiesCol">
              <fieldset>
                <label for="ammunition">Ammunition</label>
                <input type="checkbox" name='property' value="Ammunition" id="ammunition"/>
              </fieldset>
              <fieldset>
                <label for="finesse">Finesse</label>
                <input type="checkbox" name='property' value="Finesse" id="finesse"/>
              </fieldset>
              <fieldset>
                <label for="heavy">Heavy</label>
                <input type="checkbox" name='property' value="Heavy" id="heavy"/>
              </fieldset>
              <fieldset>
                <label for="light">Light</label>
                <input type="checkbox" name='property' value="Light" id="light"/>
              </fieldset>
              <fieldset>
                <label for="loading">Loading</label>
                <input type="checkbox" name='property' value="Loading" id="loading"/>
              </fieldset>
              <fieldset>
                <label for="range">Range</label>
                <input type="checkbox" name='property' value="Range" id="range"/>
              </fieldset>
            </div>
            <div class="customWeaponPropertiesCol">
              <fieldset>
                <label for="reach">Reach</label>
                <input type="checkbox" name='property' value="Reach" id="reach"/>
              </fieldset>
              <fieldset>
                <label for="special">Special</label>
                <input type="checkbox" name='property' value="Special" id="special"/>
              </fieldset>
              <fieldset>
                <label for="thrown">Thrown</label>
                <input type="checkbox" name='property' value="Thrown" id="thrown"/>
              </fieldset>
              <fieldset>
                <label for="twohanded">Two-Handed</label>
                <input type="checkbox" name='property' value="Two-Handed" id="twohanded"/>
              </fieldset>
              <fieldset>
                <label for="versatile">Versatile</label>
                <input type="checkbox" name='property' value="Versatile" id="versatile"/>
              </fieldset>
            </div>
          </div>
        </div>
        <div class="customWeaponAttacks">
          <div class="customWeaponAttacksHeader">
            Attacks
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
                  <option value="Strength">Strength</option>
                  <option value="Dexterity">Dexterity</option>
                  <option value="Constitution">Constitution</option>
                  <option value="Intelligence">Intelligence</option>
                  <option value="Wisdom">Wisdom</option>
                  <option value="Charisma">Charisma</option>
                </select>
              </div>
              <div>
                <label for="damagemodifier">Damage Modifier</label>
                <select name="damagemodifier">
                  <option value="Strength">Strength</option>
                  <option value="Dexterity">Dexterity</option>
                  <option value="Constitution">Constitution</option>
                  <option value="Intelligence">Intelligence</option>
                  <option value="Wisdom">Wisdom</option>
                  <option value="Charisma">Charisma</option>
                </select>
              </div>
            </div>
            <label for="damagedie">Damage Die</label>
            <select name="damagedie">
              <option value="20">d20</option>
              <option value="12">d12</option>
              <option value="10">d10</option>
              <option value="8">d8</option>
              <option value="6">d6</option>
              <option value="4">d4</option>
            </select>
            <label for="numdamagedie"># Damage Die</label>
            <input class="itemNumInput" type="number" name="numdamagedie"/>
            <label for="damagetype">Damage Type</label>
            <select name="damagetype">
              <option value="Slashing">Slashing</option>
              <option value="Piercing">Piercing</option>
              <option value="Bludgeoning">Bludgeoning</option>
            </select>
          </fieldset>
        </div>
        <Button type="submit">Create Weapon</Button>
      </form>
    </div>
  );
}

export default WeaponCreationForm;