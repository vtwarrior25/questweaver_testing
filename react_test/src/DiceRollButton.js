import React, {useState} from "react";
import Button from 'react-bootstrap/Button';

//import io from 'socket.io-client';
//const socket = io.connect('http://localhost:4000');


function DiceRollButton ({name, rolltype, die, num, mod, setRollResults}) {
  const [rolldata, setRollData] = useState({
      rolls: [],
      rollstring: "",
      rolltotal: "",
      basestring: "",
      name: "",
      rolltype: "",
    })


  /*
  const rollDice = () => {
    socket.emit('rolldice', this.state.data);
  }
  */

  const callCheckAPI = () => {
    fetch(`http://localhost:9000/rollcheck?name=${name}&rolltype=${rolltype}&die=${die}&num=${num}&mod=${mod}`)
        .then(res => res.json())
        .then(res => setRollData(res))
        .then(setRollResults(rolldata))
        .then(console.log(rolldata));
  }
  
    //console.log(`rollstring = ${this.state.checkResponse.rollstring}`)
  return (
    <>
      <Button variant='secondary' size='sm' onClick={callCheckAPI}>{mod}</Button>
    </>
  );
}


export default DiceRollButton;