import React, { useEffect, useState } from 'react';
import { Stack, Button } from 'react-bootstrap';

function HealthSection () {
  const [healthval, setHealthVal] = useState({
    currenthealth: 11,
    maxhealth: 22,
  })

  useEffect(() => {  
      getHealth();
    }, [healthval.health]
  )

  const setHealth = () => {
    setHealthVal({});
  }

  const getHealth = () => {
    fetch(`http://localhost:9000/getcharacterinfo?infotype=health`)
    .then(res => res.json())
    .then(res => setHealthVal(res));
  }

  return ( 
    <div className="healthSection">
      <Stack className="leftHealthSection" direction="vertical" gap={2}>
        <span>Hit Points</span>
        <Button variant='secondary' size='sm'>Heal</Button>
        <input type='number' size="4"></input>
        <Button variant='secondary' size='sm'>Damage</Button>
      </Stack>
      <Stack className="rightHealthSection" direction="horizontal">
        <div>
          <label for="currenthealth">Current</label>
          <input name="currenthealth" type="number" size="4" defaultValue={healthval.currenthealth}></input>
        </div>
        <div>
          <label for="maxhealth">Max</label>
          <input name="maxhealth" type="number" size="4" value={healthval.maxhealth}></input>
        </div>
      </Stack>
    </div>
      
  );
}

export default HealthSection;