import { useState, useEffect, useRef} from 'react';
import { Button, Overlay } from 'react-bootstrap';
import InventorySection from "./InventorySection";
import ManageInventory from './ManageInventory';

function InventoryMenu() {

  const [totalweight, setTotalWeight] = useState(0);
  const [showmoneymenu, setShowMoneyMenu] = useState(false);
  const [showmanageinventory, setShowManageInventory] = useState();

  const moneytarget = useRef(null);
  const managetarget = useRef(null);

  const [money, setMoney] = useState({
    copper: 0,
    silver: 0,
    electrum: 0,
    gold: 0,
    platinum: 0,
  });

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

  const addItem = (section, item, quantity) => {
    let otheritem;
    let matcheditems = items.filter((newitem) => newitem.name === item.name && newitem.section === item.section);
    if (matcheditems.length > 0) {
      matcheditem = matcheditems[0];
      matcheditem.quantity = matcheditems.quantity + quantity;
      let nonmatcheditems = items.filter((newitem) => newitem.name !== item.name || newitem.section !== item.section);
      setItems([...nonmatcheditems, matcheditem]);
    } else {
      otheritem = {...item, section: section, qty: quantity};
      setItems([...items, otheritem]);
    }
    
    // Check if object already exists in section, if so add quantity to add to quantity
    //setItems([...items, otheritem]);
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
          <Button variant='secondary' size='sm' ref={moneytarget} onClick={() => setShowMoneyMenu(!showmoneymenu)}>Money</Button>
          <Overlay target={moneytarget.current} show={showmoneymenu} placement="bottom">
            <div className='moneyMenu'>
              <span>Money</span>
              <table>
                <tbody>
                  <tr>
                    <td>Platinum</td>
                    <td><input type="number" size="5" value={money.platinum} onChange={(e) => setMoney({...money, platinum: Number(e.target.value)})}></input></td>
                  </tr>
                  <tr>
                    <td>Gold</td>
                    <td><input type="number" size="5" value={money.gold} onChange={(e) => setMoney({...money, gold: Number(e.target.value)})}></input></td>
                  </tr>
                  <tr>
                    <td>Electrum</td>
                    <td><input type="number" size="5" value={money.electrum} onChange={(e) => setMoney({...money, electrum: Number(e.target.value)})}></input></td>
                  </tr>
                  <tr>
                    <td>Silver</td>
                    <td><input type="number" size="5" value={money.silver} onChange={(e) => setMoney({...money, silver: Number(e.target.value)})}></input></td>
                  </tr>
                  <tr>
                    <td>Copper</td>
                    <td><input type="number" size="5" value={money.copper} onChange={(e) => setMoney({...money, copper: Number(e.target.value)})}></input></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Overlay>
          <Button variant='secondary' size='sm' ref={managetarget} onClick={() => setShowManageInventory(!showmanageinventory)}>Manage Inventory</Button>
          <Overlay target={managetarget.current} show={showmanageinventory} placement='bottom'>
            <div className='manageInventoryOverlay'>
              <ManageInventory addItem={addItem}></ManageInventory>
            </div>
          </Overlay>
        </div>
      </div>
      <div className="inventoryTablesSection">
        {sections.map((section, index) => <InventorySection key={index} className={section.sectionname} name={section.capname} items={items.filter((item) => (item.section === section.sectionname))} setSectionWeight={() => setSectionWeight}></InventorySection>)}
      </div>
    </div>
  );
}

export default InventoryMenu;