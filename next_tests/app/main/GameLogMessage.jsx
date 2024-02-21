function GameLogMessage({character, type, text}) {
  return ( 
    <div className="gameLogMessage">
      <div className="gameLogCharacter">{character}</div>
      <div className="gameLogType">{type}</div>
      <div className="gameLogText">{text}</div>
    </div>
  );
}

export default GameLogMessage;