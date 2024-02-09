import { Button, ButtonGroup } from 'react-bootstrap';

function ManualDiceRollButton({die, value, updateFunction, nice}) {

if (nice === true) {
  return ( 
    <ButtonGroup className="manualDiceRollButtonGroup" variant='secondary' size='sm'>
      <Button className="manualDiceRollIncrement" variant="danger" onClick={() => updateFunction(die, value, "minus")}>-</Button>
      <Button disabled={true}>
        <div className='manualDiceRollButtonInner'>
          <span>d{die}</span>
          <span>{value}</span>
        </div>
      </Button>
      <Button className="manualDiceRollIncrement" variant="success" onClick={() => updateFunction(die, value, "plus")}>+</Button>
    </ButtonGroup>
  );
} else {
  return ( 
    <Button className="manualDiceRollButton" variant='secondary' size='sm' onClick={() => updateFunction(die, value, "plus")} onContextMenu={(e) => {e.preventDefault(); updateFunction(die, value, 'minus')}}>
      <b>d{die}</b>
      <span>{value}</span>
    </Button>
  );
}
}

export default ManualDiceRollButton;