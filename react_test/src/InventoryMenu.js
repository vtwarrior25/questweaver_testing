import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import InventorySection from "./InventorySection";

function InventoryMenu() {

  const [totalweight, setTotalWeight] = useState(0);

  const [sections, setSections] = useState([
    {
      sectionname: "equipment",
      capname: "Equipment",
      sectionweight: 0,
    },
    {
      sectionname: "backpack",
      capname: "Backpack",
      sectionweight: 0,
    }
  ]);

  const setSectionWeight = (sectionname, weight) => {
    console.log("Before setting");
    console.log(sections);
    let newsections = sections.filter((section) => section.sectionname = sectionname);
    let newsection = newsections[0];
    newsection.sectionweight = weight;
    setSections({...sections, newsection});
    console.log("After setting");
    console.log(sections); // This will show sections in console
  } 

  useEffect(() => {
    let weightcount = 0;
    sections.forEach((section) => weightcount += section.sectionweight);
    setTotalWeight(weightcount);
  }, [sections]
  )
  
  

  const [items, setItems] = useState([
    {
      section: "equipment",
      name: "Dagger",
      weight: 1,
      qty: 1,
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
    {
      section: "equipment",
      name: "Mace",
      weight: 4,
      qty: 1,
      cost: 5,
      notes: "",
    },
    {
      section: "equipment",
      name: "Scale Mail",
      weight: 45,
      qty: 1,
      cost: 50,
      notes: "",
    },
    {
      section: "backpack",
      name: "Blanket",
      weight: 3,
      qty: 1,
      cost: 0.5,
      notes: "",
    },
    {
      section: "backpack",
      name: "Block of Incense",
      weight: 0,
      qty: 2,
      cost: 0,
      notes: "",
    },
    {
      section: "backpack",
      name: "Candle",
      weight: 0,
      qty: 10,
      cost: 0.1,
      notes: "",
    },
    {
      section: "backpack",
      name: "Vestments",
      weight: 0,
      qty: 1,
      cost: 0,
      notes: "",
    },
    {
      section: "backpack",
      name: "Waterskin",
      weight: 5,
      qty: 2,
      cost: 0.2,
      notes: "",
    },
  ]);




  return ( 
    <div className="inventoryMenu characterInventoryAreaSection">
      <div className="inventoryMenuHeader">
        <div className="weightSection">{totalweight} lb</div>
        <div className='inventoryHeaderButtonSection'>
          <Button variant='secondary' size='sm'>Money</Button>
          <Button variant='secondary' size='sm'>Manage Inventory</Button>
        </div>
      </div>
      <div className="inventoryTablesSection">
        {sections.map((section, index) => <InventorySection key={index} className={section.sectionname} name={section.capname} items={items.filter((item) => (item.section === section.sectionname))} setSectionWeight={() => setSectionWeight}></InventorySection>)}
      </div>
    </div>
  );
}

export default InventoryMenu;