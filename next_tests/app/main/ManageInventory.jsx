/*
Reference: https://www.kindacode.com/article/how-to-create-a-filter-search-list-in-react/
*/

import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { getAllItems } from '../lib/itemactions';

function ManageInventory({addItem}) {

  const [destination, setDestination] = useState("equipment");

  const [itemquantity, setItemQuantity] = useState(0);

  const [itemlist, setEquipmentList] = useState([
    {
      name: "Longsword",
      weight: 12,
      cost: 2,
      description: "Proficiency with a longsword allows you to add your proficiency bonus to the attack roll for any attack you make with it. ",
    },
    {
      name: "Longbow",
      description: "This is the longbow description",
    },
    {
      name: "Dagger",
      weight: 1,
      cost: 2,
      notes: "",
      weaponinfo : {
        proficient: true,
        attacktype: "Melee",
        range: "20 ft/60 ft",
        damage: "1d4",
        damagetype: 'piercing',
        properties: "Finesse, Light, Thrown",
      },
      description: "Proficiency with a dagger allows you to add your proficiency bonus to the attack roll for any attack you make with it. "
    },
  ]);

  const [dropdownshidden, setDropdownsHidden] = useState([]);

  const [searchterm, setSearchTerm] = useState("");
  const [founditems, setFoundItems] = useState(itemlist);

  const filter = (e) => {
    const keyword = e.target.value;
    if (keyword !== '') {
      const results = itemlist.filter((item) => {
        return item.name.toLowerCase().indexOf(keyword.toLowerCase()) > -1;
      });
      setFoundItems(results);
    } else {
      setFoundItems(itemlist);
    }
  } 

  const toggleDropdown = (index) => {
    let newdropdowns = [...dropdownshidden];
    newdropdowns[index] = !newdropdowns[index];
    setDropdownsHidden(newdropdowns);
  }

  useEffect(() => {
    itemlist.forEach((item, index) => setDropdownsHidden[index] = false);
  }, [itemlist],
  );

  useEffect(() => {
    getAllItems()
    .then((result) => {
      setEquipmentList([...result]);
    }).catch((error) => {
      console.error("Error getting all items: " + error);
    })
    
  }, [],
  );
  

  return (  
    <div className="manageInventoryMenu">
      <span>Destination</span>
      <select onChange={(e) => setDestination(e.target.value)} value={destination}>
        <option value='equipment'>Equipment</option>
        <option value="backpack">Backpack</option>
      </select>
      <input placeholder="Search.." onChange={(e) => filter(e)}></input>
      <div className='searchEquipmentList'>
        {itemlist && itemlist.length > 0 && (
          founditems.map((item, index) => 
          <div key={index}>
            <div className="equipmentListItem" key={index}>
              <span onClick={() => toggleDropdown(index)}>{item.name}</span>
              <Button variant="secondary" size='sm' onClick={() => {addItem(destination, item, 1)}}>Add</Button>
            </div>
            {dropdownshidden[index] && 
              <div className='equipmentListItemDropdown'>
                <span>Description: {item.description}</span>
                <div className='equipmentListItemDropdownControls'>
                  <input type="number" placeholder='Qty' onChange={(e) => setItemQuantity(e.target.value)}></input>
                  <Button variant="secondary" size='sm' onClick={() => {addItem(destination, item, itemquantity)}}>Add</Button>
                </div>
              </div>}
          </div>
          )
        )}
      </div>
    </div>
    );
}

export default ManageInventory;