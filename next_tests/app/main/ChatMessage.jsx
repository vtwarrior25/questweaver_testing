function ChatMessage({character, text}) {
  return (
    <div className="chatMessage">
      <div className="chatMessageCharacter">{character}</div>
      <div className="chatMessageText">{text}</div>
    </div>
  );
}

export default ChatMessage;