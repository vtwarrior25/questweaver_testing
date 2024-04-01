import { useState, useEffect, useContext} from "react";
import TurnOrderItem from "./TurnOrderItem";
import { Button } from 'react-bootstrap';
import { URLContext, PlayerCharacterContext, DMContext} from "./Contexts";
import { getcharacterinfo, getTurnOrder } from "../lib/getcharacterinfo";
import { removeTurn, updateTurn, clearTurnOrder} from '../lib/turnorder'

function TurnOrder() {
  const isDM = useContext(DMContext);

  const [turnorder, setTurnOrder] = useState([
    {
      name: "Jerome",
      initiative: 17,
      currentturn: false,
    },
    {
      name: "Dylan",
      initiative: 15,
      currentturn: false,
    },
    {
      name: "Greg",
      initiative: 15,
      currentturn: true,
    },
    {
      name: "Rebecca",
      initiative: 14,
      currentturn: false,
    },
    {
      name: "Jauffre",
      initiative: 12,
      currentturn: false,
    },
    {
      name: "Erica",
      initiative: 11,
      currentturn: false,
    },
  ]);

  //const [currentturn, setCurrentTurn] = useState(0);

  const url = useContext(URLContext);
  const playercharacterid = useContext(PlayerCharacterContext);

  const changeTurn = (mode) => {
    let turnordercopy = [...turnorder];
    let turnorderlength = turnorder.length;
    if (turnordercopy.findIndex((turn) => turn.currentturn === true) === null) {
      turnordercopy[0].currentturn = true;
    }
    let newturn = turnordercopy.findIndex((turn) => turn.currentturn === true);
    if (mode === "next") {
      newturn = (newturn + 1) % turnorderlength;
    } else if (mode === "prev") {
      newturn = (newturn - 1 + turnorderlength) % turnorderlength;
    }
    //setCurrentTurn(newturn);
    for (let turn of turnordercopy) {
      turn.currentturn = false;
    }
    turnordercopy[newturn].currentturn = true;
    setTurnOrder([...turnordercopy]);
    updateTurn(turnordercopy[newturn].name)
    .catch(error => console.error("Error changing current turn: " + error));
    console.log(newturn);
  }

  useEffect(() => {  
    getTurnOrderClient();
    setInterval(() => {
      getTurnOrderClient(); 
      console.log("Getting turn order");
    }, 1500);
    }, []
  );


  const getTurnOrderClient = () => {
    getTurnOrder(playercharacterid)
    .then(result => setTurnOrder([...result].sort((a,b) => {console.log(`sortmode a=${a.initiative} b=${b.initiative}`);return b.initiative - a.initiative})))
    .catch(error => console.error("Error setting turn order " + error));
  }

  const removeTurnOrderItem = (nametoremove, initiative) => {
    setTurnOrder(turnorder.filter((turn) => turn.name !== nametoremove || turn.initiative !== initiative))
    removeTurn(nametoremove)
    .catch((error) => {
      console.error("Error clearing turn order: " + error);
    });
  }

  const clearTurnOrder = () => {
    setTurnOrder([]);
    clearTurnOrder()
    .catch((error) => {
      console.error("Error clearing turn order: " + error);
    });
  }
  
  if (isDM) {
    return ( 
      <div className="turnOrderBox frontElement">
        <div className="turnOrderList">
          {turnorder && turnorder.map((turn, index) => <TurnOrderItem key={index} name={turn.name} initiative={turn.initiative} currentturn={turn.currentturn}  removeItem={removeTurnOrderItem}/>)}
        {/* currentturn={index === currentturn?true:false} */}
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
  } else {
    return ( 
      <div className="turnOrderBox frontElement">
        <div className="turnOrderList">
          {turnorder && turnorder.map((turn, index) => <TurnOrderItem key={index} name={turn.name} initiative={turn.initiative} currentturn={index === currentturn?true:false} removeItem={removeTurnOrderItem}/>)}
        </div>
      </div>
    );
  }
}

export default TurnOrder;