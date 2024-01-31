import { Button } from 'react-bootstrap';

function ManualDiceRollButton({die, value, updateFunction}) {
  return ( 
    <Button className="manualDiceRollButton" variant='secondary' size='sm' onClick={() => updateFunction(die, value, "plus")} onContextMenu={(e) => {e.preventDefault(); updateFunction(die, value, 'minus')}}>
      <span>d{die}</span>
      <span>{value}</span>
    </Button>
  );
}

export default ManualDiceRollButton;