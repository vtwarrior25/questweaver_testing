import React, { useState, useContext } from 'react';
import { Button } from 'react-bootstrap';
import { createWeapon } from '@/app/lib/itemactions';
import { PlayerCharacterContext } from './Contexts';

function WeaponCreationForm() {
  const playercharacterid = useContext(PlayerCharacterContext);
  const createWeaponWithPlayerID = createWeapon.bind(playercharacterid, null);

  return ( 
    <div className="weaponCreationForm">
      <form className="customItemCreationForm" action={createWeaponWithPlayerID}>
        <fieldset id="customWeaponBasicInfo">
          <div>
            <label htmlFor="name">Name</label>
            <input name="name"/>
          </div>
          <div className="valueWeightFields">
            <div>
              <label htmlFor="value">Value</label>
              <input type="number" className="itemNumInput" name="value"/>
            </div>
            <div>
              <label htmlFor="weight">Weight</label>
              <input type="number" className="itemNumInput" name="weight"/>
            </div>
          </div>
          <div className="customItemRarity">
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
          <div className="customItemDescription">
            <label htmlFor="description">Description</label>
            <textarea name="description"></textarea>
          </div>
          <div className="weaponBasicRadio">
            <fieldset id="weaponTypeRadio" className='weaponTypeRadio'>
              <input type="radio" name="weapontype" value="Simple" checked="checked"/>
              <label htmlFor="simple">Simple</label>
              <input type="radio" name="weapontype" value="Martial"/>
              <label htmlFor="martial">Martial</label>
            </fieldset>
            <fieldset id="weaponRangeRadio" className='weaponTypeRadio'>
              <input type="radio" name="weaponrange" value="Melee" checked="checked"/>
              <label htmlFor="melee">Melee</label>
              <input type="radio" name="weaponrange" value="Ranged"/>
              <label htmlFor="ranged">Ranged</label>
            </fieldset>
          </div>
        </fieldset>
        <div className="customWeaponPropertiesSection" id="customWeaponPropertiesSection">
          <div name="customweaponproperties" className="customWeaponProperties">
            <div className="customWeaponPropertiesCol">
              <fieldset>
                <label htmlFor="ammunition">Ammunition</label>
                <input type="checkbox" name='property' value="Ammunition" id="ammunition"/>
              </fieldset>
              <fieldset>
                <label htmlFor="finesse">Finesse</label>
                <input type="checkbox" name='property' value="Finesse" id="finesse"/>
              </fieldset>
              <fieldset>
                <label htmlFor="heavy">Heavy</label>
                <input type="checkbox" name='property' value="Heavy" id="heavy"/>
              </fieldset>
              <fieldset>
                <label htmlFor="light">Light</label>
                <input type="checkbox" name='property' value="Light" id="light"/>
              </fieldset>
              <fieldset>
                <label htmlFor="loading">Loading</label>
                <input type="checkbox" name='property' value="Loading" id="loading"/>
              </fieldset>
              <fieldset>
                <label htmlFor="range">Range</label>
                <input type="checkbox" name='property' value="Range" id="range"/>
              </fieldset>
            </div>
            <div className="customWeaponPropertiesCol">
              <fieldset>
                <label htmlFor="reach">Reach</label>
                <input type="checkbox" name='property' value="Reach" id="reach"/>
              </fieldset>
              <fieldset>
                <label htmlFor="special">Special</label>
                <input type="checkbox" name='property' value="Special" id="special"/>
              </fieldset>
              <fieldset>
                <label htmlFor="thrown">Thrown</label>
                <input type="checkbox" name='property' value="Thrown" id="thrown"/>
              </fieldset>
              <fieldset>
                <label htmlFor="twohanded">Two-Handed</label>
                <input type="checkbox" name='property' value="Two-Handed" id="twohanded"/>
              </fieldset>
              <fieldset>
                <label htmlFor="versatile">Versatile</label>
                <input type="checkbox" name='property' value="Versatile" id="versatile"/>
              </fieldset>
            </div>
          </div>
        </div>
        <div className="customWeaponAttacks">
          <div className="customWeaponAttacksHeader">
            Attacks
          </div> 
          <fieldset className="customWeaponAttackFields" id="customWeaponAttackFields2">
            <div className='weaponFormRow'>
              <div>
                <label htmlFor="attackname">Attack Name</label>
                <input type="text" className='weaponFormTextInput' name="attackname"/>
              </div>
              <div>
                <label htmlFor="attackrange">Range</label>
                <input type="number" className='weaponFormTextInput' name="attackrange" defaultValue={5}/>
              </div>
            </div>
            <div className='weaponFormRow'>
              <div>
                <label htmlFor="attackmodifier">Attack Modifer</label>
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
                <label htmlFor="damagemodifier">Damage Modifier</label>
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
            <label htmlFor="damagedie">Damage Die</label>
            <select name="damagedie">
              <option value="20">d20</option>
              <option value="12">d12</option>
              <option value="10">d10</option>
              <option value="8">d8</option>
              <option value="6">d6</option>
              <option value="4">d4</option>
            </select>
            <label htmlFor="numdamagedie"># Damage Die</label>
            <input className="itemNumInput" type="number" name="numdamagedie" defaultValue={1}/>
            <label htmlFor="damagetype">Damage Type</label>
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