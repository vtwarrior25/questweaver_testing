import { Button } from 'react-bootstrap';

function TurnOrderItem({name, initiative, removeItem}) {
  return ( 
    <div className="turnOrderItem">
      <div className="turnOrderItemName">
        {name} - {initiative}
      </div>
      <Button variant="tertiary" size="sm" className="turnOrderItemRemove" onClick={() => removeItem(name, initiative)}>X</Button>
    </div>
  );
}

export default TurnOrderItem;