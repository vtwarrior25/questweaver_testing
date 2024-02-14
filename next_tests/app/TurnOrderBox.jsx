import { useState, useEffect, useContext} from "react";
import TurnOrderItem from "./TurnOrderItem";
import { Button } from 'react-bootstrap';
import { URLContext } from "./Contexts";

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

  const url = useContext(URLContext);

  const changeTurn = (mode) => {
    let turnorderlength = turnorder.length;
    let newturn = currentturn;
    if (mode === "next") {
      newturn = (newturn + 1) % turnorderlength;
    } else if (mode === "prev") {
      newturn = (newturn - 1 + turnorderlength) % turnorderlength;
    }
    setCurrentTurn(newturn);
    console.log(newturn);
  }

  useEffect(() => {  
    getTurnOrder();
    }, []
  )


  const getTurnOrder = () => {
    fetch(`http://localhost:3000/api/getcharacterinfo?infotype=turnorder`)
    .then(res => res.json())
    .then(res => setTurnOrder([...res].sort((a,b) => {console.log(`sortmode a=${a.initiative} b=${b.initiative}`);return b.initiative - a.initiative})));
  }

  const removeTurnOrderItem = (nametoremove, initiative) => {
    setTurnOrder(turnorder.filter((turn) => turn.name !== nametoremove || turn.initiative !== initiative))
  }
  

  return ( 
    <div className="turnOrderBox frontElement">
      <div className="turnOrderList">
        {turnorder && turnorder.map((turn, index) => <TurnOrderItem key={index} name={turn.name} initiative={turn.initiative} currentturn={index === currentturn?true:false} removeItem={removeTurnOrderItem}/>)}
      </div>
      <div className="turnOrderButtons">
        <div className="turnOrderControlButtons">
          <Button variant="secondary" size="sm" onClick={() => changeTurn("prev")}>Prev</Button>
          <Button variant="secondary" size="sm" onClick={() => changeTurn("next")}>Next</Button>
        </div>
        <Button variant="secondary" size="sm">Clear</Button>
      </div>
    </div>
  );
}

export default TurnOrder;