import React, { useEffect, useState } from 'react';
import { Stack, Button } from 'react-bootstrap';
import ManualDiceRollButton from './ManualDiceRollButton';

function ManualDiceRoller ({setRollResults}) {
  const [oldbuttonvals, setOldButtonVals] = useState({
    d20: 0,
    d12: 0,
    d10: 0,
    d8: 0,
    d6: 0,
    d4: 0,
  })

  const [buttonvals, setButtonVals] = useState([
    {
      die: 20,
      val: 0,
    },
    {
      die: 12,
      val: 0,
    },
    {
      die: 10,
      val: 0,
    },
    {
      die: 8,
      val: 0,
    },
    {
      die: 6,
      val: 0,
    },
    {
      die: 4,
      val: 0,
    },
  ])


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
    console.log("buttonvals");
    console.log(buttonvals); 
    }, [buttonvals]
  )
  
  /*
  const handleChange = (e) => {
    setButtonVals({...buttonvals, e.target.type: e.target.value});
  }
  */

  const resetButtons = () => {
    /*
    setButtonVals({
      d20: 0,
      d12: 0,
      d10: 0,
      d8: 0,
      d6: 0,
      d4: 0,
    })*/
    setButtonVals([
      {
        die: 20,
        val: 0,
      },
      {
        die: 12,
        val: 0,
      },
      {
        die: 10,
        val: 0,
      },
      {
        die: 8,
        val: 0,
      },
      {
        die: 6,
        val: 0,
      },
      {
        die: 4,
        val: 0,
      },
    ]);
  }

  // This whole function is disgusting
  const updateButtons = (die, val, sign) => {
    /*
    let buttonvalue = buttonvals[`${die}`] ?? 0; 
    if (sign === 'plus') {
      buttonvalue++;
    } else if (sign === 'minus' && buttonvalue > 0) {
      buttonvalue--;
    }
    */
    let newval = val;
    // This handles adding or subtracting incrementally
    if (sign === 'plus') {
      newval++;
    } else if (sign === 'minus' && newval > 0) {
      newval--;
    }
    // This creates a new array of all of the buttons that aren't the button we pushed
    let temparray = buttonvals.filter((buttonval) => buttonval.die !== die);
    console.log(temparray);
    // This adds back in the new value of the button that we pushed
    temparray = [...temparray, {die: die, val: newval}];
    // We need to sort the array because the previous line breaks the order, and we need the correct order so that things render right
    temparray.sort((a, b) => b.die - a.die);
    setButtonVals(temparray);
    /*
    switch (die) {
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
    */
    //addLogEntry(`Health: ${currenthealth} -> ${newhealth}`);
    //document.getElementById("currentHealth").value = newhealth;
  }

  const manualRoll = () => {
    let name = 'Manual';
    let rolltype = "Manual";
    console.log("buttonvals");
    let buttonvalssend = JSON.stringify(buttonvals);
    //fetch(`http://localhost:9000/rollcheck?checkmode=multi&name=${name}&rolltype=${rolltype}&mod=0&d20num=${buttonvals[buttonvals.findIndex((buttonval) => buttonval.die === 20)].val}&d12num=${buttonvals[buttonvals.findIndex((buttonval) => buttonval.die === 12)].val}&d10num=${buttonvals[buttonvals.findIndex((buttonval) => buttonval.die === 10)].val}&d8num=${buttonvals[buttonvals.findIndex((buttonval) => buttonval.die === 8)].val}&d6num=${buttonvals[buttonvals.findIndex((buttonval) => buttonval.die === 6)].val}&d4num=${buttonvals[buttonvals.findIndex((buttonval) => buttonval.die === 4)].val}`)
      fetch(`http://localhost:9000/rollcheck?checkmode=multi&name=${name}&rolltype=${rolltype}&mod=0&rollstodo=${buttonvalssend}`)
        .then(res => res.json())
        .then(res => setRollResults(res));
  }

  return ( 
    <div className="manualDiceRollSection frontElement">
      <Stack className="charManualDiceRollButtons" direction="vertical" gap={1}>
        {buttonvals.map((buttonval) => <ManualDiceRollButton key={buttonval.die} die={buttonval.die} value={buttonval.val} updateFunction={updateButtons}></ManualDiceRollButton>)}
      </Stack>
      <Stack className="rightHealthSection" direction="vertical" gap={1}>
        <Button variant='secondary' size='sm' onClick={() => manualRoll()}>Roll</Button>
        <Button variant='secondary' size='sm' onClick={() => resetButtons()}>Reset</Button>
      </Stack>
    </div>
      
  );
}

export default ManualDiceRoller;

/*
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

*/