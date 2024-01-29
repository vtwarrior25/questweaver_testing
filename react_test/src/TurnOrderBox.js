import { useState, useEffect } from "react";
import TurnOrderItem from "./TurnOrderItem";
import { Button } from 'react-bootstrap';

function TurnOrder() {
  const [turnorder, setTurnOrder] = useState([
    /*
    {
      id: 0,
      name: "Jerome",
      initiative: 17,
    },
    {
      id: 1,
      name: "Dylan",
      initiative: 15,
    },
    {
      id: 2,
      name: "Greg",
      initiative: 15,
    },
    {
      id: 3,
      name: "Rebecca",
      initiative: 14,
    },
    {
      id: 4,
      name: "Jauffre",
      initiative: 12,
    },
    {
      id: 5,
      name: "Erica",
      initiative: 11,
    },
    */
  ]);

  const [currentturn, setCurrentTurn] = useState(0);

/*
  const sortTurnOrder = () => {
    let sortedturnorder = turnorder;
    sortedturnorder.sort((a,b) => {
      return a.initiative -  b.initiative;
    });
    setTurnOrder(sortedturnorder);
  }
*/

  useEffect(() => {  
    getTurnOrder();
    }, []
  )


  const getTurnOrder = () => {
    fetch(`http://localhost:9000/getcharacterinfo?infotype=turnorder`)
    .then(res => res.json())
    .then(res => setTurnOrder([...res].sort((a,b) => {console.log(`sortmode a=${a.initiative} b=${b.initiative}`);return a.initiative - b.initiative})));
  }

  

  return ( 
    <div className="turnOrderBox frontElement">
      <div className="turnOrderList">
        {turnorder.map((turn) => <TurnOrderItem key={turn.id} name={turn.name} initiative={turn.initiative}/>)}
      </div>
      <div className="turnOrderButtons">
        <div className="turnOrderControlButtons">
          <Button variant="secondary" size="sm">Prev</Button>
          <Button variant="secondary" size="sm">Next</Button>
        </div>
        <Button variant="secondary" size="sm">Clear</Button>
      </div>
    </div>
  );
}

export default TurnOrder;