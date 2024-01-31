import { Button } from 'react-bootstrap';

function TurnOrderItem({name, initiative}) {
  return ( 
    <div className="turnOrderItem">
      <div className="turnOrderItemName">
        {name} - {initiative}
      </div>
      <Button variant="tertiary" size="sm" className="turnOrderItemRemove">X</Button>
    </div>
  );
}

export default TurnOrderItem;