import { useState, useEffect } from 'react';
import GameLogMessage from './GameLogMessage';

function GameLog() {

  const [logmessages, setLogMessages] = useState([
    {
      id: 0,
      character: "Jerome",
      type: "Attack Roll",
      text: "This is an attack roll",
    },
    {
      id: 1,
      character: "Jerome",
      type: "Attack Roll",
      text: "This is an attack roll",
    },
    {
      id: 2,
      character: "Jerome",
      type: "Attack Roll",
      text: "This is an attack roll",
    },
    {
      id: 3,
      character: "Jerome",
      type: "Attack Roll",
      text: "This is an attack roll",
    },
  ]);

  /*
  useEffect(() => {  
    getLog();
    }, []
  );


  const getLog = () => {
    fetch(`http://localhost:9000/getcharacterinfo?infotype=log`)
    .then(res => res.json())
    .then(res => setLogMessages(res));
  }
  */
  return ( 
    <div className="gameLogInnerBox">
      {logmessages.map((message) => <GameLogMessage key={message.id} character={message.character} type={message.type} text={message.text}/>)}
    </div>
  );
}

export default GameLog;