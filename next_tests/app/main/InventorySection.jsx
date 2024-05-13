import { setConfig } from 'next/config';
import React, { useState, useEffect, useContext } from 'react';
import { Button, Table } from 'react-bootstrap';
import { ActionUpdateContext, PlayerCharacterContext } from './Contexts';
import { enableAttackForItem, disableAttackForItem } from '../lib/attackactions';

function InventorySection({sectionname, name, items, setSectionWeight, removeItem, setItems}) {
  const updateActions = useContext(ActionUpdateContext);
  const playercharacterid = useContext(PlayerCharacterContext);
  const [sectionweight, setInnerSectionWeight] = useState(0);
  const [dropdownshidden, setDropdownsHidden] = useState([]);
  const [tempitemquantities, setTempItemQuantities] = useState([]);


  useEffect(() => {
    console.log("we are in the inventorysection useeffect");
    let weight = 0;
    const tempitems = [...items];
    let quantities = [];
    tempitems.forEach((item) => {
      let itemweight = (Number(item.weight)*Number(item.quantity));
      quantities = [...quantities, item.quantity];
      weight += itemweight;
    });
    setTempItemQuantities([...quantities]);
    console.log(`This should print ${sectionname} ${weight}`);
    setInnerSectionWeight(weight);
    console.log(sectionname);
    //setSectionWeight(sectionname, weight);
    /*
    let dropdowns = [];
    let quantities = [];
    items.forEach((item, index) => dropdowns[index] = false);
    items.forEach((item, index) => setTempItemQuantities[index] = item.weight);
    setDropdownsHidden([...dropdowns]);
    setTempItemQuantities([...quantities]);
    */
  }, [items, sectionname, setSectionWeight],
  );


  const toggleDropdown = (index) => {
    let newdropdowns = [...dropdownshidden];
    newdropdowns[index] = !newdropdowns[index];
    setDropdownsHidden(newdropdowns);
  }

  const setItemQuantity = (section, item, index, quantity) => {
    let itemquantities = [...tempitemquantities];
    itemquantities[index] = quantity;
    setTempItemQuantities([...itemquantities]);
    console.log(items);
    console.log(section);
    console.log(item.name);
    let matcheditems = items.filter((newitem) => {section === newitem.section && item.itemid === newitem.itemid});
    let nonmatcheditems = items.filter((otheritem) => {otheritem.section !== section || otheritem.itemid !== item.itemid});
    console.log("matcheditems");
    console.log(matcheditems);
    console.log("nonmatcheditems");
    console.log(nonmatcheditems);
    if (matcheditems.length > 0) {
      matcheditems[0].quantity = quantity;
      console.log("we should be in here");
      setItems([...nonmatcheditems,...matcheditems]);
    } else {
      console.log("Item not found");
    }
  }


  const toggleActiveAction = (itemid, section, status) => {
    console.log(itemid  + " " + section);
    let matcheditems = items.filter((newitem) => section === newitem.section && itemid === newitem.itemid);
    let nonmatcheditems = items.filter((otheritem) => otheritem.section !== section || otheritem.itemid !== itemid);
    console.log("matcheditems");
    console.log(matcheditems);
    console.log("nonmatcheditems");
    console.log(nonmatcheditems);
    if (matcheditems.length > 0) {
      matcheditems[0].active = !status;
      console.log([...nonmatcheditems,...matcheditems]);
      setItems([...nonmatcheditems,...matcheditems]);
      console.log(status);
      if (status === true) {
        enableAttackForItem(playercharacterid, section, itemid)
        .catch((error) => {
          console.error('Error enabling attack for item: ' + error);
        })
        updateActions();
      } else if (status === false) {
        disableAttackForItem(playercharacterid, section, itemid)
        .catch((error) => {
          console.error('Error disabling attack for item: ' + error);
        })
        updateActions();
      }
    } else {
      console.log("Item not found");
    }
    /*
    console.log(status);
    if (status === true) {
      enableAttackForItem(playercharacterid, section, itemid)
      .catch((error) => {
        console.error('Error enabling attack for item: ' + error);
      })
      updateActions();
    } else if (status === false) {
      disableAttackForItem(playercharacterid, section, itemid)
      .catch((error) => {
        console.error('Error disabling attack for item: ' + error);
      })
      updateActions();
    }
    */
  }

/*
  const datadisplay = (
    <React.Fragment>
      <td><input type='checkbox'></input></td> 
      <td>{data.name}</td>
      <td>{data.weight}</td>
      <td>{data.qty}</td>
      <td>{data.cost}</td>
      <td>{data.notes}</td>
    </React.Fragment>  
  )
*/

  return ( 
    <div className={`${sectionname} inventorySection`}>
      <div className="inventorySectionHeader">
        <span>{name}</span>
        <span><b>{sectionweight}</b> lb</span>
      </div>
      <Table size="sm" className='inventorySectionTable'>
        <thead>
          <tr>
            <td>Active</td>
            <th>Name</th>
            <th>Weight</th>
            <th>Qty</th>
            <th>Cost (GP)</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => 
            <React.Fragment key={index}>
              <tr className='inventorySectionTableRow'>
                  <td>{item.weaponinfo && <input type='checkbox' defaultChecked={item.active} onClick={(e) => toggleActiveAction(item.itemid, item.section, e.target.checked)}></input>}</td>
                {/* TODO make this checkbox toggle if the item is active, 
                which wil toggle it showing up in Actions, this might 
                require using global context or some disgusting lifting of state.*/}
                <td onClick={() => toggleDropdown(index)}>{item.name}</td>
                <td onClick={() => toggleDropdown(index)}>{item.weight}</td>
                <td onClick={() => toggleDropdown(index)}>{item.quantity}</td>
                <td onClick={() => toggleDropdown(index)}>{item.value} {item.currency}</td>
                <td onClick={() => toggleDropdown(index)}>{item.notes}</td>
              </tr>
              <tr>
                {dropdownshidden[index] && <td className='inventorySectionTableExpandingInfo' colSpan="6">
                  {item.description}
                  {item.weaponinfo &&
                    <>
                      <div>Attack Type: {item.weaponinfo.weapontype} {item.weaponinfo.weaponrange}</div>
                      <div>Range: {item.weaponinfo.range}</div>
                      <div>Damage: {item.weaponinfo.numdice}{item.weaponinfo.dietype} {item.weaponinfo.damagetype}</div>
                      <div>Properties: {item.weaponinfo.properties}</div>
                    </>
                  }
                  <input type="number" placeholder='Qty' value={tempitemquantities[index]} onChange={(e) => setItemQuantity(item.section, item, index, Number(e.target.value))}></input>
                  <Button variant="secondary" size='sm' onClick={() => {removeItem(sectionname, item)}}>Remove</Button>
                </td>}
              </tr>
            </React.Fragment>
          )}
        </tbody>
      </Table>
    </div>
  );
}

export default InventorySection;