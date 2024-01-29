import React, { useEffect, useState } from 'react';
import { Stack, Button } from 'react-bootstrap';

function ManualDiceRoller () {
  const [buttonvals, setButtonVals] = useState({
    d20: 0,
    d12: 0,
    d10: 0,
    d8: 0,
    d6: 0,
    d4: 0,
  })


/*
  useEffect(() => {  
      getHealth();
    }, []
  )  
  
  useEffect(() => {
      setHealth();
    }, [healthval.currenthealth]
  )
  */
  useEffect(() => {
    console.log(`buttonvals ${buttonvals}`); 
    }, [buttonvals]
  )
  
  /*
  const handleChange = (e) => {
    setButtonVals({...buttonvals, e.target.type: e.target.value});
  }
  */

  const resetButtons = () => {
    setButtonVals({
      d20: 0,
      d12: 0,
      d10: 0,
      d8: 0,
      d6: 0,
      d4: 0,
    })
  }

  const updateButtons = (type, sign) => {
    var buttonvalue = buttonvals[`${type}`] ?? 0; 
    if (sign === 'plus') {
      buttonvalue++;
    } else if (sign === 'minus' && buttonvalue > 0) {
      buttonvalue--;
    }
    switch (type) {
      case 'd20':
        setButtonVals({...buttonvals, d20:buttonvalue});
        break;
      case 'd12':
        setButtonVals({...buttonvals, d12:buttonvalue});
        break;
      case 'd10':
        setButtonVals({...buttonvals, d10:buttonvalue});
        break;
      case 'd8':
        setButtonVals({...buttonvals, d8:buttonvalue});
        break;
      case 'd6':
        setButtonVals({...buttonvals, d6:buttonvalue});
        break;
      case 'd4':
        setButtonVals({...buttonvals, d4:buttonvalue});
        break;
      default:
        break;
    }
    //addLogEntry(`Health: ${currenthealth} -> ${newhealth}`);
    //document.getElementById("currentHealth").value = newhealth;
  }

  const callCheckAPI = () => {
    let name = 'Manual';
    let rolltype = "Manual";
    let mod = 0;
    /*
    fetch(`http://localhost:9000/rollcheck?name=${name}&rolltype=${rolltype}&die=${die}&num=${num}&mod=${mod}`)
        .then(res => res.json())
        .then(res => setRollData(res))
        .then(setRollResults(rolldata))
        .then(console.log(rolldata));
    */
  }

  return ( 
    <div className="manualDiceRollSection frontElement">
      <Stack className="charManualDiceRollButtons" direction="vertical" gap={1}>
        <Button className="manualDiceRollButton" variant='secondary' size='sm' onClick={(e) => updateButtons('d20', 'plus')} onContextMenu={(e) => {e.preventDefault(); updateButtons('d20', 'minus')}}>
          <span>d20</span>
          <span>{buttonvals.d20}</span>
        </Button>
        <Button className="manualDiceRollButton" variant='secondary' size='sm' onClick={(e) => updateButtons('d12', 'plus')} onContextMenu={(e) => {e.preventDefault(); updateButtons('d12', 'minus')}}>
          <span>d12</span>
          <span>{buttonvals.d12}</span>
        </Button>
        <Button className="manualDiceRollButton" variant='secondary' size='sm' onClick={(e) => updateButtons('d10', 'plus')} onContextMenu={(e) => {e.preventDefault(); updateButtons('d10', 'minus')}}>
          <span>d10</span>
          <span>{buttonvals.d10}</span>
        </Button>
        <Button className="manualDiceRollButton" variant='secondary' size='sm' onClick={(e) => updateButtons('d8', 'plus')} onContextMenu={(e) => {e.preventDefault(); updateButtons('d8', 'minus')}}>
          <span>d8</span>
          <span>{buttonvals.d8}</span>
        </Button>
        <Button className="manualDiceRollButton" variant='secondary' size='sm' onClick={(e) => updateButtons('d6', 'plus')} onContextMenu={(e) => {e.preventDefault(); updateButtons('d6', 'minus')}}>
          <span>d6</span>
          <span>{buttonvals.d6}</span>
        </Button>
        <Button className="manualDiceRollButton" variant='secondary' size='sm' onClick={(e) => updateButtons('d4', 'plus')} onContextMenu={(e) => {e.preventDefault(); updateButtons('d4', 'minus')}}>
          <span>d4</span>
          <span>{buttonvals.d4}</span>
        </Button>
      </Stack>
      <Stack className="rightHealthSection" direction="vertical" gap={1}>
        <Button variant='secondary' size='sm'>Roll</Button>
        <Button variant='secondary' size='sm' onClick={() => resetButtons()}>Reset</Button>
      </Stack>
    </div>
      
  );
}

export default ManualDiceRoller;