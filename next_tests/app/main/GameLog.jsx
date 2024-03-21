import { useState, useEffect } from 'react';
import GameLogMessage from './GameLogMessage';
import { getAllGameLog } from '../lib/chatandlog';


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

  
  useEffect(() => {  
    getLog();
    }, []
  );


  const getLog = () => {
    getAllGameLog()
    .then((result) => {
      console.log("moment");
      setLogMessages([...result]);
      console.log(result);
    })
    .catch((error) => {
      console.error("Error retrieving game log" + error);
    });
  }
  
  return ( 
    <div className="gameLogInnerBox">
      {logmessages && logmessages.length > 0 && logmessages.map((message, index) => <GameLogMessage key={index} character={message.character} type={message.type} text={message.text}/>)}
    </div>
  );
}

export default GameLog;