import { useState } from 'react';
function ChatMessage({name, content, time, gamelogtag}) {
  const [showDropdown, setShowDropdown] = useState(false);

  if (gamelogtag === 'Lore') {
    return (
      <div className="chatMessage loreMessage">
        <span className="chatMessageCharacter">{name + ": "}</span>
        <span className="chatMessageText">{content}</span>
      </div>
    );
  } else {
    return (
      <div className="chatMessage">
        <span className="chatMessageCharacter">{name + ": "}</span>
        <span className="chatMessageText">{content}</span>
      </div>
    );
  }
    /*
  if (gamelogtag === 'Lore') {
    return (
      <div className="chatMessage loreMessage">
        <div className="chatMessageCharacter">{name}</div>
        <div className="chatMessageText">{content}</div>
      </div>
    );
  } else {
    return (
      <div className="chatMessage">
        <div className="chatMessageCharacter">{name}</div>
        <div className="chatMessageText">{content}</div>
      </div>
    );
  }
  */
}

export default ChatMessage;