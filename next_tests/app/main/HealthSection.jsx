import React, { useEffect, useState, useContext } from 'react';
import { Stack, Button } from 'react-bootstrap';
import { getcharacterinfo } from '../lib/getcharacterinfo';
import { setCharacterHealth } from '@/app/lib/sethealth'
import { PlayerCharacterContext } from './Contexts';

function HealthSection () {
  const playercharacterid = useContext(PlayerCharacterContext);

  const [healthval, setHealthVal] = useState({
    currenthealth: 11,
    maxhealth: 22
  })

  const [healthmod, setHealthMod] = useState(0);


  const getHealth = () => {
    getcharacterinfo(playercharacterid, 'health')
    .then(results => setHealthVal({...results}));
  }

  const setHealth = () => {
    console.log('sethealth');
    setCharacterHealth(playercharacterid, healthval.currenthealth)
    .then(results => console.log(results));
    //fetch(`http://localhost:9000/sendcharacterinfo?infotype=health&currenthealth=${healthval.currenthealth}`);
  }

  useEffect(() => {  
      getHealth();
    }, []
  ); 

  useEffect(() => {
      setHealth();
    }, [healthval]
  );

  useEffect(() => {
    console.log(`healthmod ${healthmod}`); 
    }, [healthmod]
  );

  const handleChange = (e) => {
    console.log(`healthmod ${healthmod}`);
    setHealthMod(e.target.value);
    console.log(`healthmod ${healthmod}`);
  }

  const updateHealth = (option) => {
    /*let newhealthobj = {
      currenthealth: healthval.currenthealth,
      maxhealth: healthval.maxhealth
    }*/
    let currenthealth = Number(healthval.currenthealth);
    let newhealth = 0;
    if (option === 'heal') {
      newhealth = Number(currenthealth) + Number(healthmod);
      console.log(`${newhealth} = ${currenthealth} + ${healthmod}`)
    } else if (option === 'damage') {
      console.log(`${newhealth} = ${currenthealth} - ${healthmod}`)
      newhealth = Number(currenthealth) - Number(healthmod);
    } else {
      throw "Shit's fucked brothers!";
    }
    //newhealthobj.currenthealth = newhealth;
    setHealthVal({...healthval, currenthealth: newhealth});
    console.log("Current Health: " + currenthealth + "  HealthMod: " + healthmod + " NewHealth: " + newhealth);
    //addLogEntry(`Health: ${currenthealth} -> ${newhealth}`);
    //document.getElementById("currentHealth").value = newhealth;
  }



  return ( 
    <div className="healthSection frontElement">
      <Stack className="leftHealthSection" direction="vertical" gap={2}>
        <Button variant='secondary' size='sm' onClick={() => updateHealth('heal')} >Heal</Button>
        <input className="healthSectionInput" type='number' size="4" name="changehealth" onChange={(e) => handleChange(e)}></input>
        <Button variant='secondary' size='sm' onClick={() => updateHealth('damage')} >Damage</Button>
      </Stack>
      <div className="rightHealthSection">
        <span className='characterSheetSectionTitle'>Hit Points</span>
        <Stack direction="horizontal" gap={1}>
          <div className="healthBox">
            <label htmlFor="currenthealth">Current</label>
            <input className="healthSectionInput" name="currenthealth" type="number" size="4" value={healthval.currenthealth} onChange={(e) => setHealthVal({...healthval, currenthealth: e.target.value})}></input>
          </div>
          <div className="healthBox">
            <label htmlFor="maxhealth">Max</label>
            <input className="healthSectionInput" name="maxhealth" type="number" size="4" readOnly={true} value={healthval.maxhealth}></input>
          </div>
        </Stack>
      </div>
      
    </div>
      
  );
}

export default HealthSection;