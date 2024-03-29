import { useState } from 'react';

function GameLogMessage({character, type, text, time}) {
  const [showDropdown, setShowDropdown] = useState(false);
  return ( 
    <div className="gameLogMessage" onClick={() => setShowDropdown(!showDropdown)}>
      <span className="gameLogCharacter">{character + " - "}</span>
      <span className="gameLogType">{type + "\n"}</span>
      {showDropdown &&
      <div className='gameLogMessageDropdown'>
        <span className='gameLogTime'>{time} - </span>
        <span className="gameLogText">{text}</span>
      </div>
      }
    </div>
  );
}

export default GameLogMessage;