import React, { useEffect, useState } from 'react';
import { Stack, Button, ButtonGroup} from 'react-bootstrap';
import ManualDiceRollButton from './ManualDiceRollButton';

function ManualDiceRoller ({setRollResults, vertical, nice}) {
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

  useEffect(() => {
    console.log("buttonvals");
    console.log(buttonvals); 
    }, [buttonvals]
  )
  

  const resetButtons = () => {
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
    // The fact that we need to sort the array is really dumb, but we must do what must be done
    temparray.sort((a, b) => b.die - a.die);
    setButtonVals(temparray);
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
    <div className={`manualDiceRollSection ${vertical===true?"verticalManualRollSection":"horizontalManualRollSection"} frontElement`}>
      <ButtonGroup vertical={vertical}>
        {buttonvals.map((buttonval) => <ManualDiceRollButton key={buttonval.die} die={buttonval.die} value={buttonval.val} updateFunction={updateButtons} nice={nice}></ManualDiceRollButton>)}
      </ButtonGroup>
      <ButtonGroup vertical={vertical} size='sm'>
        <Button variant='secondary' onClick={() => manualRoll()}>Roll</Button>
        <Button variant='secondary' onClick={() => resetButtons()}>Reset</Button>
      </ButtonGroup>
    </div>
      
  );
}

export default ManualDiceRoller;