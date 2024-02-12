/*
Reference: https://www.kindacode.com/article/how-to-create-a-filter-search-list-in-react/
*/

import { useEffect, useState } from 'react';

function ManageInventory() {

  const [destination, setDestination] = useState("equipment");

  const [itemlist, setEquipmentList] = useState([
    {
      name: "Longsword",
      description: "Proficiency with a longsword allows you to add your proficiency bonus to the attack roll for any attack you make with it. ",
    },
    {
      name: "Longbow",
      description: "This is the longbow description",
    },
  ]);

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

  return (  
    <div className="manageInventoryMenu">
      <select onChange={(e) => setDestination(e.target.value)} value={destination}>
        <option value='equipment'>Equipment</option>
        <option value="backpack">Backpack</option>
      </select>
      <input placeholder="Search.." onChange={(e) => filter(e)}></input>
      <div className='searchEquipmentList'>
        {itemlist && itemlist.length > 0 ? (
          founditems.map((item, index) => 
            <div key={index}>{item.name}</div>
          )
        )
        : (<span>No Results Found</span>)
        }
      </div>
    </div>
    );
}

export default ManageInventory;