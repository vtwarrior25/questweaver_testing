import React, { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import Reorder, { reorder } from 'react-reorder'; 

function InventorySection({classname, name, items, setSectionWeight}) {

  const [sectionweight, setInnerSectionWeight] = useState(0);

  useEffect(() => {
    calculateWeight();
  }, [items],
  );

  const onReorder = () => {
    console.log("Things were reordered!!");
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
              <tr className='inventorySectionTableRow'>
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
                <td className='inventorySectionTableExpandingInfo' colSpan="6">
                  Epic beans mode mo bamba
                  <Button variant='secondary' size="sm"></Button>
                </td>
              </tr>
            </React.Fragment>
          )}
        </tbody>
      </Table>
    </div>
  );
}

export default InventorySection;