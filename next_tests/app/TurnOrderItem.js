import { Button } from 'react-bootstrap';

function TurnOrderItem({name, initiative, currentturn, removeItem}) {
  return ( 
    <div className={`turnOrderItem ${currentturn?"currentTurn":"Not"}`}>
      <div className="turnOrderItemName">
        {name} - {initiative}
      </div>
      <Button variant="tertiary" size="sm" className="turnOrderItemRemove" onClick={() => removeItem(name, initiative)}>X</Button>
    </div>
  );
}

export default TurnOrderItem;