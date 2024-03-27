function GameLogMessage({character, type, text}) {
  return ( 
    <div className="gameLogMessage">
      <span className="gameLogCharacter">{character + " - "}</span>
      <span className="gameLogType">{type + "\n"}</span>
      <span className="gameLogText">{text}</span>
    </div>
  );
}

export default GameLogMessage;