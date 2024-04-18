import { useState, useEffect, useRef, useContext} from 'react';
import { Button, Overlay } from 'react-bootstrap';
import InventorySection from "./InventorySection";
import ManageInventory from './ManageInventory';
import { PlayerCharacterContext } from './Contexts';
import { getCharacterMoney, getInventory, setCharacterMoney, setCharacterInventory, addItemToInventory, updateItemInInventory, removeItemFromInventory } from '../lib/itemactions';

function InventoryMenu() {

  const [totalweight, setTotalWeight] = useState(0);
  const [showmoneymenu, setShowMoneyMenu] = useState(false);
  const [showmanageinventory, setShowManageInventory] = useState(false);
  const playercharacterid = useContext(PlayerCharacterContext);

  const moneytarget = useRef(null);
  const managetarget = useRef(null);
  const moneymenuref = useRef(null);

  const [money, setMoney] = useState({
    cp: 0,
    sp: 0,
    ep: 0,
    gp: 0,
    pp: 0,
  });

  const [sections, setSections] = useState([
    {
      sectionname: "Equipment",
      sectionweight: 0,
    },
    {
      sectionname: "Backpack",
      sectionweight: 0,
    }
  ]); 

  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (moneymenuref.current && !moneymenuref.current.contains(event.target)) {
        setShowMoneyMenu(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [moneymenuref]);


  const toggleManageInventory = () => {
    if (showmanageinventory === false) {
      setShowManageInventory(true);
      console.log('Show manage inventory');
    }
  }

  const toggleMoneyMenu = () => {
    if (showmoneymenu === false) {
      setShowMoneyMenu(true);
      console.log('Show money inventory');
    }
  }

  const setSectionWeight = (sectionname, weight) => {
    console.log("Before setting");
    console.log(sectionname);
    console.log(sections);
    let newsections = sections.filter((section) => section.sectionname === sectionname);
    let othersections = sections.filter((section) => section.sectionname !== sectionname)
    if (newsections.length > 0) {
      let newsection = newsections[0];
      newsection.sectionweight = weight;
      setSections([...othersections, newsection]);
      updateTotalWeight();
      console.log("After setting");
      console.log(sections); // This will show sections in console
    } else {
      console.log("Unable to find provided section: " + sectionname);
    }
  } 


  const addItem = (section, item, quantity) => {
    console.log(section + " " + item.name + " " + quantity);
    let otheritem;
    let matcheditems = items.filter((newitem) => newitem.name === item.name && newitem.section === section);
    console.log(matcheditems);
    if (matcheditems.length > 0) {
      console.log('found');
      let matcheditem = matcheditems[0];
      let newquantity = Number(matcheditem.quantity) + Number(quantity);
      matcheditem.quantity = newquantity;
      let nonmatcheditems = items.filter((newitem) => newitem.name !== item.name || newitem.section !== section);
      console.log(nonmatcheditems);
      setItems([...nonmatcheditems, matcheditem]);
      updateItemInInventory(playercharacterid, matcheditem, newquantity);
      //setCharacterInventory(playercharacterid, [...nonmatcheditems, matcheditem])
    } else {
      console.log('not found');
      otheritem = {...item, section: section, quantity: quantity};
      setItems([...items, otheritem]);
      console.log(otheritem);
      addItemToInventory(playercharacterid, otheritem)
      .catch((error) => {
        console.error('Error adding item to inventory: ' + error);
      });
      //setCharacterInventory(playercharacterid, [...items, otheritem])
    }
    
    // Check if object already exists in section, if so add quantity to add to quantity
    //setItems([...items, otheritem]);
  } 

  const removeItem = (section, item) => {
    // Remove the item from the inventory section
    let newitems = items.filter((i) => i.section !== section || i.name !== item.name);
    setItems([...newitems]);
    console.log(item);
    removeItemFromInventory(playercharacterid, item)
    .catch((error) => {
      console.error('Error removing item from inventory: ' + error);
    });
  }


  const updateTotalWeight = () => {
    let weightcount = 0;
    sections.forEach((section) => weightcount += section.sectionweight);
    setTotalWeight(weightcount);
  }

  useEffect(() => {
    console.log("In the useeffect");
    updateTotalWeight();
  }, [sections]
  )

  useEffect(() => {
    getInventory(playercharacterid)
    .then((result) => {
      console.log('Setting items!!');
      console.log(result);
      setItems([...result]);
    }).catch((error) => {
      console.error("Error getting character inventory: " + error);
    });
    getCharacterMoney(playercharacterid)
    .then((result) => {
      setMoney({...result});
    }).catch((error) => {
      console.error("Error getting character money: " + error);
    });
  }, [playercharacterid],
  );


  const [items, setItems] = useState([
    {/*
      section: "equipment",
      name: "Dagger",
      weight: 1,
      quantity: 1,
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
      description: "Proficiency with a dagger allows you to add your proficiency bonus to the attack roll for any attack you make with it."
    */
      section: "Equipment",
      name: "Dagger",
      weight: 1,
      quantity: 1,
      value: 2,
      currency: 'gp',
      notes: "",
      weaponinfo : {
        //proficient: true,
        weapontype: "Simple",
        weaponrange: "Melee",
        range: "20 ft/60 ft",
        dietype: 'd20',
        numdice: 1,
        damagetype: 'Piercing',
        properties: "Finesse, Light, Thrown",
      },
      description: "Proficiency with a dagger allows you to add your proficiency bonus to the attack roll for any attack you make with it. "
    },
    {
      section: "Equipment",
      name: "Mace",
      weight: 4,
      quantity: 1,
      value: 5,
      currency: 'gp',
      notes: "",
    },
    {
      section: "Equipment",
      name: "Scale Mail",
      weight: 45,
      quantity: 1,
      value: 50,
      currency: 'gp',
      notes: "",
    },
    {
      section: "Backpack",
      name: "Blanket",
      weight: 3,
      quantity: 1,
      value: 5,
      currency: 'sp',
      notes: "",
    },
    {
      section: "Backpack",
      name: "Block of Incense",
      weight: 0,
      quantity: 2,
      value: 0,
      currency: 'gp',
      notes: "",
    },
    {
      section: "Backpack",
      name: "Candle",
      weight: 0,
      quantity: 10,
      value: 1,
      currency: 'sp',
      notes: "",
    },
    {
      section: "Backpack",
      name: "Vestments",
      weight: 0,
      quantity: 1,
      value: 0,
      currency: 'gp',
      notes: "",
    },
    {
      section: "Backpack",
      name: "Waterskin",
      weight: 5,
      quantity: 2,
      value: 2,
      currency: 'sp',
      notes: "",
    },
  ]);




  return ( 
    <div className="inventoryMenu characterInventoryAreaSection">
      <div className="inventoryMenuHeader">
        <div className="weightSection">{totalweight} lb</div>
        <div className='inventoryHeaderButtonSection'>
          <Button variant='secondary' size='sm' ref={moneytarget} onClick={() => toggleMoneyMenu()}>Money</Button>
          <Overlay ref={moneymenuref} target={moneytarget.current} show={showmoneymenu} placement="bottom">
            <div className='moneyMenu'>
              <span>Money</span>
              <table>
                <tbody>
                  <tr>
                    <td>Platinum</td>
                    <td><input type="number" size="5" value={money.pp} onChange={(e) => setMoney({...money, pp: Number(e.target.value)})}></input></td>
                  </tr>
                  <tr>
                    <td>Gold</td>
                    <td><input type="number" size="5" value={money.gp} onChange={(e) => setMoney({...money, gp: Number(e.target.value)})}></input></td>
                  </tr>
                  <tr>
                    <td>Electrum</td>
                    <td><input type="number" size="5" value={money.ep} onChange={(e) => setMoney({...money, ep: Number(e.target.value)})}></input></td>
                  </tr>
                  <tr>
                    <td>Silver</td>
                    <td><input type="number" size="5" value={money.sp} onChange={(e) => setMoney({...money, sp: Number(e.target.value)})}></input></td>
                  </tr>
                  <tr>
                    <td>Copper</td>
                    <td><input type="number" size="5" value={money.cp} onChange={(e) => setMoney({...money, cp: Number(e.target.value)})}></input></td>
                  </tr>
                  <tr>
                    <td colSpan={2}><Button onClick={() => setCharacterMoney(playercharacterid, money)}>Save</Button></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Overlay>
          <Button variant='secondary' size='sm' ref={managetarget} onClick={() => toggleManageInventory()}>Manage Inventory</Button>
          <Overlay target={managetarget.current} show={showmanageinventory} placement='bottom'>
            <div className='manageInventoryOverlay'>
              <ManageInventory addItem={addItem} setShowManageInventory={setShowManageInventory} managetarget={managetarget}></ManageInventory>
            </div>
          </Overlay>
        </div>
      </div>
      <div className="inventoryTablesSection">
        {sections.map((section, index) => <InventorySection key={index} sectionname={section.sectionname} name={section.sectionname} setItems={setItems} items={items.filter((item) => (item.section === section.sectionname))} setSectionWeight={() => setSectionWeight()} removeItem={() => removeItem()}></InventorySection>)}
      </div>
    </div>
  );
}

export default InventoryMenu;