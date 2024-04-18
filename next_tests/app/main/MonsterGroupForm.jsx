import { useState, useRef, useEffect } from 'react';
import { Button, ButtonGroup, Table, Overlay } from 'react-bootstrap';
import { getMonsterTypes } from '../lib/monster';

function MonsterGroupForm({encounters, addMonsterGroup}) {
  
  let [encounterscopy, setEncountersCopy] = useState([]); 

  const [duplicatemenudisplay, setDuplicateMenuDisplay] = useState(false);
  const duplicatetarget = useRef(null);

  const [duplicatemenustate, setDuplicateMenuState] = useState({
    encounter: "",
    monster: "",
  })

  const [abilitymodifiers, setAbilityModifiers] = useState({
    init: 0,
    str: 0,
    dex: 0,
    con: 0,
    int: 0,
    wis: 0,
    cha: 0,
  });

  const [monstertypes, setMonsterTypes] = useState([]);

  const [formdata, setFormData] = useState({
    basicinfo: {
      encounter: "Cragmaw",
      name: "Jeff",
      quantity: 2,
      description: "Cragmaw",
      hitdicenum: 2,
      hitdicetype: 6,
      challengerating: 0.25,
      size: "Small",
      type: "Monster",
      alignment: "Neutral Evil",
      xpper: 50,
      xptotal: 100,
      ac: 13,
      speed: 50,
      skills: "Stealth +6; Darkvision 60",
      features: "Nimble Escape (Disengage or Hide as Bonus Action)",
      notes: "",
    },
    abilities: {
      init: 2,
      str: 8,
      dex: 14,
      con: 10,
      int: 10,
      wis: 8,
      cha: 8,
    },
    attacks: [
      {
        name: "Scimitar",
        hit: 4,
        numdice: 1,
        dietype: 6,
        damagemod: 4,
        damagetype: "Slashing",
      },
      {
        name: "Shortbow",
        hit: 4,
        numdice: 1,
        dietype: 6,
        damagemod: 4,
        damagetype: "Piercing",
      },
      {
        name: "",
        hit: 0,
        numdice: 0,
        dietype: 0,
        damagemod: 0,
        damagetype: "Piercing",
      },
      {
        name: "",
        hit: 0,
        numdice: 0,
        dietype: 0,
        damagemod: 0,
        damagetype: "Piercing",
      },
    ],
    health: [0,0,0,0,0,0,0,0]
    });

  useEffect(() => {
    getMonsterTypes()
    .then((result) => {
      console.log('getting monster types');
      console.log(result);
      setMonsterTypes([...result]);
    });
    setEncountersCopy([...encounters]);
    console.log("beans encounters");
    console.log(encounters);
    setDuplicateMenuState({...duplicatemenustate, encounter: encounters[0].encountername})
  }, [encounters],
  );
  
  /*
  const addEncounter = () => {
    console.log("This should add a new encounter, or something");
  }
  */

  const getModifier = (value) => {
    return Math.floor((value - 10) / 2);
  }

  const updateFormValue = (section, field, value, attacknumber) => {
    let formdatacopy = {...formdata};
    console.log(section + field); 
    /*if (section === "skills" || section === "ability" || section === "notes") {  
      formdatacopy[section] = value;
    } else*/ 
    if (section === "health") {
      formdatacopy[section][attacknumber] = value;
    } else if (attacknumber){
      formdatacopy[section][attacknumber][field] = value;
    } else {
      formdatacopy[section][field] = value;
    }
    setFormData(formdatacopy);
  }

  const duplicateMonsterGroup = (monstergroup) => {
    setFormData({...monstergroup})
    //setFormData(monstergroup);
  }

  const monsterGroupsInSelectedEncounter = (selectedencountername) => {
    const errorencounter = {
      encountername: "Default",
      monstergroups: [
        {
          basicinfo: {
            id: 0,
            name: "--",
            quantity: 0,
            description: "",
          }
        }
      ]
    };
    console.log("selectedencountername");
    console.log(selectedencountername);
    // Get all encounters with the same name as the selected one
    let selectedencounters = encounters.filter((encounter) => encounter.encountername === duplicatemenustate.encounter);
    // We should only find 1 with the selected name, but if there are multiple, we handle it decently
    if (selectedencounters.length > 0) {
      // Get the single object out of the array
      let encountertoparse = selectedencounters[0];
      // Return the object
      return encountertoparse; 
    } else {
      return errorencounter;
    }
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
                  <td><input className="monsterGroupFormNameInput" type="text" maxLength="20" name="name" placeholder="Name" onChange={(e) => updateFormValue("basicinfo", e.target.name, e.target.value)} value={formdata.basicinfo.name}/></td>
                  <td><input className="monsterGroupFormQtyInput" type="number" name="quantity" placeholder="Qty" onChange={(e) => updateFormValue("basicinfo", e.target.name, Number(e.target.value))} value={formdata.basicinfo.quantity}/></td>
                </tr>
                <tr>
                  <th>Description</th>
                  <td colSpan="2"><input className="monsterGroupFormDescriptionInput" type="text" maxLength="100" name="description" onChange={(e) => updateFormValue("basicinfo", e.target.name, e.target.value)} value={formdata.basicinfo.description}/></td>
                </tr>
                <tr>
                  <th>HD/CR</th>
                  <td className="monsterFormHDCR"><input type="number" className="monsterHitDiceInput monsterTextSmall" name="hitdicenum" size="3" placeholder="1" onChange={(e) => updateFormValue("basicinfo", e.target.name, Number(e.target.value))} value={formdata.basicinfo.hitdicenum}/><input className="monsterHitDiceInput monsterTextSmall" type="number" name="hitdicetype" size="3" placeholder="6" onChange={(e) => updateFormValue("basicinfo", e.target.name, Number(e.target.value))} value={formdata.basicinfo.hitdicetype}/></td>
                  <td><input className="monsterGroupFormCRInput" type="number" name="challengerating" placeholder="CR" size="3" onChange={(e) => updateFormValue("basicinfo", e.target.name, Number(e.target.value))} value={formdata.basicinfo.challengerating}/></td>
                </tr>
                <tr>
                  <th>Size/Type</th>
                  <td>
                    <select name="size" onChange={(e) => updateFormValue("basicinfo", e.target.name, e.target.value)} value={formdata.basicinfo.size}>
                      <option value="Tiny">Tiny</option>
                      <option value="Small">Small</option>
                      <option value="Medium">Medium</option>
                      <option value="Large">Large</option>
                      <option value="Huge">Huge</option>
                      <option value="Gargantuan">Gargantuan</option>
                    </select>
                  </td>
                  <td>
                    <select name="type" onChange={(e) => updateFormValue("basicinfo", e.target.name, e.target.value)} value={formdata.basicinfo.type}>
                      <option value=""></option>
                      <option value="Aberrations">Aberrations</option>
                      <option value="Monster">Monster</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <th>Alignment</th>
                  <td colSpan="2">
                    <select name="alignment" onChange={(e) => updateFormValue("basicinfo", e.target.name, e.target.value)} value={formdata.basicinfo.alignment}>
                      <option className="selectGreen" value="Lawful Good">Lawful Good</option>
                      <option className="selectGreen" value="Neutral Good">Neutral Good</option>
                      <option className="selectGreen" value="Chaotic Good">Chaotic Good</option>
                      <option value="Lawful Neutral">Lawful Neutral</option>
                      <option value="Neutral">Neutral</option>
                      <option value="Chaotic Neutral">Chaotic Neutral</option>
                      <option className="selectRed" value="Lawful Evil">Lawful Evil</option>
                      <option className="selectRed" value="Neutral Evil">Neutral Evil</option>
                      <option className="selectRed" value="Chaotic Evil">Chaotic Evil</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <th>XP Per/Total</th>
                  <td><input className='monsterGroupFormSmallNumInput' type="number" name="xpper" placeholder="XP Per" size="5" onChange={(e) => updateFormValue("basicinfo", e.target.name, e.target.value)} value={formdata.basicinfo.xpper}/></td>
                  <td><input className='monsterGroupFormSmallNumInput' type="number" name="xptotal" placeholder="XP Total" size="5" onChange={(e) => updateFormValue("basicinfo", e.target.name, e.target.value)} value={formdata.basicinfo.xptotal}/></td>
                </tr>
                <tr>
                  <th>AC/Speed</th>
                  <td><input className='monsterGroupFormSmallNumInput' type="number" name="ac" placeholder="Armor Class" size="5" onChange={(e) => updateFormValue("basicinfo", e.target.name, e.target.value)} value={formdata.basicinfo.ac}/></td>
                  <td><input className='monsterGroupFormSmallNumInput' type="number" name="speed" placeholder="Speed" size="5" onChange={(e) => updateFormValue("basicinfo", e.target.name, e.target.value)} value={formdata.basicinfo.speed}/></td>
                </tr>
                <tr>
                  <td colSpan="3">
                    <ButtonGroup>
                      <Button type="button" ref={duplicatetarget} onClick={() => setDuplicateMenuDisplay(!duplicatemenudisplay)}>Duplicate</Button>
                      <Button type="reset" id="monsterFormClear">Reset</Button>
                    </ButtonGroup>
                    <Overlay target={duplicatetarget.current} show={duplicatemenudisplay} placement='top'> 
                      <div className='monsterGroupDuplicateMenu frontElement'>
                        <label htmlFor="encounter">Encounter</label>
                        <select name="encounter" onChange={(e) => setDuplicateMenuState({...duplicatemenustate, encounter: e.target.value})}>
                          {encounters.map((encounter, index) => 
                            <option key={index} value={encounter.encountername}>{encounter.encountername}</option>
                          )}
                        </select>
                        <label htmlFor="monster">Monster</label>
                        <select name="monster" onChange={(e) => setDuplicateMenuState({...duplicatemenustate, monster: e.target.value})}>
                          {monsterGroupsInSelectedEncounter(duplicatemenustate.encounter).monstergroups.map((monstergroup, index) => 
                            <option key={index} value={monstergroup.basicinfo.id}>{monstergroup.basicinfo.name} ({monstergroup.basicinfo.quantity}, {monstergroup.basicinfo.description})</option>
                          )}
                        </select>
                        <Button variant='secondary' size='sm' onClick={() => duplicateMonsterGroup}>Duplicate Monster Group</Button>
                      </div>
                    </Overlay>
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
          <div className="monsterGroupFormAbilities">
            <Table className="monsterGroupTable2 monsterGroupTable">
              <tbody>
                <tr>
                  <th>Init</th>
                  <td colSpan="2">+{getModifier(formdata.abilities.init)}</td>
                </tr>
                <tr>
                  <th>Str</th>
                  <td><input className="monsterSheetAbilityInput" type="number" name="str" maxLength="2" size="3" onChange={(e) => {setAbilityModifiers({...abilitymodifiers, str: e.target.value}); updateFormValue("abilities", e.target.name, Number(e.target.value))}} value={formdata.abilities.str}/></td>
                  <td><div className="monsterSheetAbilityMod">{getModifier(formdata.abilities.str)}</div></td>
                </tr>
                <tr>
                  <th>Dex</th>
                  <td><input className="monsterSheetAbilityInput" type="number" name="dex" maxLength="2" size="3" onChange={(e) => {setAbilityModifiers({...abilitymodifiers, dex: e.target.value, init: e.target.value}); updateFormValue("abilities", e.target.name, Number(e.target.value)); updateFormValue("abilities", "init", Number(e.target.value))}} value={formdata.abilities.dex}/></td>
                  <td><div className="monsterSheetAbilityMod">{getModifier(formdata.abilities.dex)}</div></td>
                </tr>
                <tr>
                  <th>Con</th>
                  <td><input className="monsterSheetAbilityInput" type="number" name="con" maxLength="2" size="3" onChange={(e) => {setAbilityModifiers({...abilitymodifiers, con: e.target.value}); updateFormValue("abilities", e.target.name, Number(e.target.value))}} value={formdata.abilities.con}/></td>
                  <td><div className="monsterSheetAbilityMod">{getModifier(formdata.abilities.con)}</div></td>
                </tr>
                <tr>
                  <th>Int</th>
                  <td><input className="monsterSheetAbilityInput" type="number" name="int" maxLength="2" size="3" onChange={(e) => {setAbilityModifiers({...abilitymodifiers, int: e.target.value}); updateFormValue("abilities", e.target.name, Number(e.target.value))}} value={formdata.abilities.int}/></td>
                  <td><div className="monsterSheetAbilityMod">{getModifier(formdata.abilities.int)}</div></td>
                </tr>
                <tr>
                  <th>Wis</th>
                  <td><input className="monsterSheetAbilityInput" type="number" name="wis" maxLength="2" size="3" onChange={(e) => {setAbilityModifiers({...abilitymodifiers, wis: e.target.value}); updateFormValue("abilities", e.target.name, Number(e.target.value))}} value={formdata.abilities.wis}/></td>
                  <td><div className="monsterSheetAbilityMod">{getModifier(formdata.abilities.wis)}</div></td>
                </tr>
                <tr>
                  <th>Cha</th>
                  <td><input className="monsterSheetAbilityInput" type="number" name="cha" maxLength="2" size="3" onChange={(e) => {setAbilityModifiers({...abilitymodifiers, cha: e.target.value}); updateFormValue("abilities", e.target.name, Number(e.target.value))}} value={formdata.abilities.cha}/></td>
                  <td><div className="monsterSheetAbilityMod">{getModifier(formdata.abilities.cha)}</div></td>
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
                  <td><input className="monsterGroupFormAttackNameInput" type="text" name="attack1name" onChange={(e) => updateFormValue("attacks", "name", e.target.value, 0)} value={formdata.attacks[0].name}/></td>
                  <td><input className="monsterGroupFormAttackHitInput" type="number" name="attack1hit" onChange={(e) => updateFormValue("attacks", "hit", e.target.value, 0)} value={formdata.attacks[0].hit}/></td>
                  <td className="monsterAttackDamage"><input type="number" className="monsterGroupFormAttackNumDiceInput monsterTextSmall" name="attack1numdice" size="3" onChange={(e) => updateFormValue("attacks", "numdice", e.target.value, 0)} value={formdata.attacks[0].numdice}/>d<input type="number" className="monsterTextSmall monsterGroupFormAttackDiceTypeInput" name="attack1dietype" size="4" onChange={(e) => updateFormValue("attacks", "dietype", e.target.value, 0)} value={formdata.attacks[0].dietype}/><input type="number" className="monsterTextSmall monsterGroupFormAttackBonusInput" name="attack1damagemod" size="4" onChange={(e) => updateFormValue("attacks", "damagemod", e.target.value, 0)} value={formdata.attacks[0].damagemod}/></td>
                  <td>
                    <select name="damagetype1" onChange={(e) => updateFormValue("attacks", "damagetype", e.target.value, 0)} value={formdata.attacks[0].damagetype}>
                      <option value="Slashing">Slashing</option>
                      <option value="Piercing">Piercing</option>
                      <option value="Bludgeoning">Bludgeoning</option>
                    </select>
                  </td>
                  <td className="monsterHealth"><input className="monsterHealthInput" type="number" name="monsterhealthinput1" onChange={(e) => updateFormValue("health", "", Number(e.target.value), 0)} value={formdata.health[0]}/></td>
                </tr>
                <tr>
                  <td><input className="monsterGroupFormAttackNameInput" type="text" name="attack2name" onChange={(e) => updateFormValue("attacks", "name", e.target.value, 1)} value={formdata.attacks[1].name}/></td>
                  <td><input className="monsterGroupFormAttackHitInput" type="number" name="attack2hit" onChange={(e) => updateFormValue("attacks", "hit", e.target.value, 1)} value={formdata.attacks[1].hit}/></td>
                  <td className="monsterAttackDamage"><input type="number" className="monsterGroupFormAttackNumDiceInput monsterTextSmall" name="attack2numdice" size="3" onChange={(e) => updateFormValue("attacks", "numdice", e.target.value, 1)} value={formdata.attacks[1].numdice}/>d<input type="number" className="monsterTextSmall monsterGroupFormAttackDiceTypeInput" name="attack2dietype" size="4" onChange={(e) => updateFormValue("attacks", "dietype", e.target.value, 1)} value={formdata.attacks[1].dietype}/><input type="number" className="monsterTextSmall monsterGroupFormAttackBonusInput" name="attack2damagemod" size="4" onChange={(e) => updateFormValue("attacks", "damagemod", e.target.value, 1)} value={formdata.attacks[1].damagemod}/></td>
                  <td>
                    <select name="damagetype2" onChange={(e) => updateFormValue("attacks", "damagetype", e.target.value, 1)} value={formdata.attacks[1].damagetype}>
                      <option value="Slashing">Slashing</option>
                      <option value="Piercing">Piercing</option>
                      <option value="Bludgeoning">Bludgeoning</option>
                    </select>
                  </td>
                  <td className="monsterHealth"><input className="monsterHealthInput" type="number" name="monsterhealthinput2" onChange={(e) => updateFormValue("health", "", Number(e.target.value), 1)} value={formdata.health[1]}/></td>
                </tr>
                <tr>
                  <td><input className="monsterGroupFormAttackNameInput" type="text" name="attack3name" onChange={(e) => updateFormValue("attacks", "name", e.target.value, 2)} value={formdata.attacks[2].name}/></td>
                  <td><input className="monsterGroupFormAttackHitInput" type="number" name="attack3hit" onChange={(e) => updateFormValue("attacks", "hit", e.target.value, 2)} value={formdata.attacks[2].hit}/></td>
                  <td className="monsterAttackDamage"><input type="number" className="monsterGroupFormAttackNumDiceInput monsterTextSmall" name="attack3numdice" size="3" onChange={(e) => updateFormValue("attacks", "numdice", e.target.value, 2)} value={formdata.attacks[2].numdice}/>d<input type="number" className="monsterTextSmall monsterGroupFormAttackDiceTypeInput" name="attack3dietype" size="4" onChange={(e) => updateFormValue("attacks", "dietype", e.target.value, 2)} value={formdata.attacks[2].dietype}/><input type="number" className="monsterTextSmall monsterGroupFormAttackBonusInput" name="attack3damagemod" size="4" onChange={(e) => updateFormValue("attacks", "damagemod", e.target.value, 2)} value={formdata.attacks[2].damagemod}/></td>
                  <td>
                    <select name="damagetype3" onChange={(e) => updateFormValue("attacks", "damagetype", e.target.value, 2)} value={formdata.attacks[2].damagetype}>
                      <option value="Slashing">Slashing</option>
                      <option value="Piercing">Piercing</option>
                      <option value="Bludgeoning">Bludgeoning</option>
                    </select>
                  </td>
                  <td className="monsterHealth"><input className="monsterHealthInput" type="number" name="monsterhealthinput3" onChange={(e) => updateFormValue("health", "", Number(e.target.value), 2)} value={formdata.health[2]}/></td>
                </tr>
                <tr>
                  <td><input className="monsterGroupFormAttackNameInput" type="text" name="attack4name" onChange={(e) => updateFormValue("attacks", "name", e.target.value, 3)} value={formdata.attacks[3].name}/></td>
                  <td><input className="monsterGroupFormAttackHitInput" type="number" name="attack4hit" onChange={(e) => updateFormValue("attacks", "hit", e.target.value, 3)} value={formdata.attacks[3].hit}/></td>
                  <td className="monsterAttackDamage"><input type="number" className="monsterGroupFormAttackNumDiceInput monsterTextSmall" name="attack4numdice" size="3" onChange={(e) => updateFormValue("attacks", "numdice", e.target.value, 3)} value={formdata.attacks[3].name}/>d<input type="number" className="monsterTextSmall monsterGroupFormAttackDiceTypeInput" name="attack4dietype" size="4" onChange={(e) => updateFormValue("attacks", "dietype", e.target.value, 3)} value={formdata.attacks[3].dietype}/><input type="number" className="monsterTextSmall monsterGroupFormAttackBonusInput" name="attack4damagemod" size="4" onChange={(e) => updateFormValue("attacks", "damagemod", e.target.value, 3)} value={formdata.attacks[3].damagemod}/></td>
                  <td>
                    <select name="damagetype4" onChange={(e) => updateFormValue("attacks", "damagetype", e.target.value, 3)} value={formdata.attacks[3].damagetype}>
                      <option value="Slashing">Slashing</option>
                      <option value="Piercing">Piercing</option>
                      <option value="Pludgeoning">Bludgeoning</option>
                    </select>
                  </td>
                  <td className="monsterHealth"><input className="monsterHealthInput" type="number" name="monsterhealthinput4" onChange={(e) => updateFormValue("health", "", Number(e.target.value), 3)} value={formdata.health[3]}/></td>
                </tr>
                <tr>
                  <td rowSpan="2"><label htmlFor="skills">Skills</label></td>
                  <td colSpan="3" rowSpan="2"><textarea className="monsterGroupFormSkillAbilityBox" maxLength="500" name="skills" onChange={(e) => updateFormValue("basicinfo", "skills", e.target.value)} value={formdata.basicinfo.skills}></textarea></td>
                  <td className="monsterHealth"><input className="monsterHealthInput" type="number" name="monsterhealthinput5" onChange={(e) => updateFormValue("health", "", Number(e.target.value), 4)} value={formdata.health[4]}/></td>
                </tr>
                <tr>
                  <td className="monsterHealth"><input className="monsterHealthInput" type="number" name="monsterhealthinput6" onChange={(e) => updateFormValue("health", "", Number(e.target.value), 5)} value={formdata.health[5]}/></td>
                </tr>
                <tr>
                  <td rowSpan="2"><label htmlFor="skills">Features</label></td>
                  <td colSpan="3" rowSpan="2"><textarea className="monsterGroupFormSkillAbilityBox" maxLength="500" name="features" onChange={(e) => updateFormValue("basicinfo", "features", e.target.value)} value={formdata.basicinfo.features}></textarea></td>
                  <td className="monsterHealth"><input className="monsterHealthInput" type="number" name="monsterhealthinput7" onChange={(e) => updateFormValue("health", "", Number(e.target.value), 6)} value={formdata.health[6]}/></td>
                </tr>
                <tr>
                  <td className="monsterHealth"><input className="monsterHealthInput" type="number" name="monsterhealthinput8" onChange={(e) => updateFormValue("health", "", Number(e.target.value), 7)} value={formdata.health[7]}/></td>
                </tr>
              </tbody>
            </Table>
          </div>
          <div className="monsterGroupNotesSection">
            <div className="monsterGroupNotes"></div>
              <label htmlFor="monsterGroupNotesText">Notes</label>
              <textarea name="monsterGroupNotesText" onChange={(e) => updateFormValue("basicinfo", "notes", e.target.value)} maxLength="2000" value={formdata.basicinfo.notes}></textarea>
            <div className="monsterGroupEncounterSelector">
              <label htmlFor="monsterGroupEncounter">Encounter</label>
              <input type="text" name="monsterGroupEncounter" onChange={(e) => updateFormValue("basicinfo", "encounter", e.target.value)} value={formdata.basicinfo.encounter}/>
              <Button type="button" variant="secondary" size="sm" value="Add" onClick={() => {addMonsterGroup(formdata.basicinfo.encounter, formdata)}}>Add</Button>
            </div>
          </div>
        </div>
      </form>
    </div> 
  );
  
  
}

export default MonsterGroupForm;