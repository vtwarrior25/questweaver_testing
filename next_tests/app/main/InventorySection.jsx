import React, { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';

function InventorySection({classname, name, items, setSectionWeight}) {

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


  const calculateWeight = () => {
    let weight = 0;
    items.forEach((item) => {
      let itemweight = (Number(item.weight)*Number(item.qty));
      weight += itemweight;
    });
    console.log(`This should print ${classname} ${weight}`);
    setInnerSectionWeight(weight);
    setSectionWeight(classname, weight);
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
    <div className={`${classname} inventorySection`}>
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
              <tr className='inventorySectionTableRow' onClick={() => toggleDropdown(index)}>
                <td><input type='checkbox'></input></td> 
                {/* TODO make this checkbox toggle if the item is active, 
                which wil toggle it showing up in Actions, this might 
                require using global context or some disgusting lifting of state.*/}
                <td>{item.name}</td>
                <td>{item.weight}</td>
                <td>{item.qty}</td>
                <td>{item.cost}</td>
                <td>{item.notes}</td>
              </tr>
              <tr>
                {dropdownshidden[index] && <td className='inventorySectionTableExpandingInfo' colSpan="6">
                  {item.description}
                  {item.weaponinfo &&
                    <>
                      <div>Proficient: {item.weaponinfo.proficient}</div>
                      <div>Attack Type: {item.weaponinfo.attacktype}</div>
                      <div>Range: {item.weaponinfo.attacktype}</div>
                    </>
                  }
                  <input type="number" placeholder='Qty' onChange={(e) => setItemQuantity(e.target.value)}></input>
                  <Button variant="secondary" size='sm' onClick={() => {addItem(destination, item, itemquantity)}}>Add</Button>
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