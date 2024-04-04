import { setConfig } from 'next/config';
import React, { useState, useEffect, useContext } from 'react';
import { Button, Table } from 'react-bootstrap';
import { ActionUpdateContext, PlayerCharacterContext } from './Contexts';

function InventorySection({sectionname, name, items, setSectionWeight, removeItem, setItems}) {
  const updateActions = useContext(ActionUpdateContext);
  const [sectionweight, setInnerSectionWeight] = useState(0);
  const [dropdownshidden, setDropdownsHidden] = useState([]);


  useEffect(() => {
    calculateWeight();
    items.forEach((item, index) => setDropdownsHidden[index] = false);
  }, [items],
  );


  const toggleDropdown = (index) => {
    let newdropdowns = [...dropdownshidden];
    newdropdowns[index] = !newdropdowns[index];
    setDropdownsHidden(newdropdowns);
  }

  const setItemQuantity = (section, item, quantity) => {
    let matcheditems = items.filter((newitem) => {newitem.section === section && newitem.name === item.name});
    let nonmatcheditems = items.filter((otheritem) => {otheritem.section !== section || otheritem.name !== item.name});
    if (matcheditems.length > 0) {
      let matcheditem = matcheditems[0];
      matcheditem.quantity = quantity;
      setItems([...nonmatcheditems, matcheditem]);
    } else {
      console.log("Item not found");
    }
  }

  const calculateWeight = () => {
    let weight = 0;
    items.forEach((item) => {
      let itemweight = (Number(item.weight)*Number(item.quantity));
      weight += itemweight;
    });
    console.log(`This should print ${sectionname} ${weight}`);
    setInnerSectionWeight(weight);
    console.log(sectionname);
    setSectionWeight(sectionname, weight);
  }

  const toggleActiveAction = (weaponname, state) => {
    
    updateActions();
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
                  <td>{item.weaponinfo && <input type='checkbox'></input>}</td>
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
                      <div>Attack Type: {item.weaponinfo.attacktype}</div>
                      <div>Range: {item.weaponinfo.attacktype}</div>
                    </>
                  }
                  <input type="number" placeholder='Qty' value={item.quantity} onChange={(e) => setItemQuantity(sectionname, item, e.target.value)}></input>
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