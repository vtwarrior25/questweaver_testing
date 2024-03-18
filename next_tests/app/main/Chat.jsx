import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import ChatMessage from './ChatMessage';


function Chat() {
  const [chattextbox, setChatTextBox] = useState("");

  const [chatmessages, setChatMessages] = useState([
    {
      character: "Jerome",
      text: "This is a test message in chat",
    },
    {
      character: "Jerome",
      text: "This is a test message in chat",
    },
    {
      character: "Jerome",
      text: "This is a test message in chat",
    },
  ]);
/*
  useEffect(() => {  
    getChat();
    }, []
  );
*/

  useEffect(() => {
    
  }, [chatmessages]
  );

  const handleChange = (e) => {
    setChatTextBox(e.target.value);
    console.log(`chattextbox${chattextbox}`);
  }

  const sendChatMessage = () => {
    var newmessage = {
      id: "beans",
      character: "Jerome", // TODO figure out how we will store user data, this will need to grab the name of the character of the current user
      text: chattextbox,
    }
    setChatMessages([...chatmessages, newmessage]);
  }

/*
  const getChat = () => {
    fetch(`http://localhost:9000/getcharacterinfo?infotype=chat`)
    .then(res => res.json())
    .then(res => setChatMessages(res));
  }
*/
  return ( 
    <div className="chatInnerBox">
      <div className="chatMessageArea">
        {chatmessages && chatmessages.length > 0 && chatmessages.map((message, index) => <ChatMessage key={index} character={message.character} text={message.text}/>)}
      </div>
      <div className="chatEntryArea">
        <textarea className='chatTextEntry' onChange={(e) => handleChange(e)}></textarea>
        <div className="chatButtons">
          <Button variant="secondary" size="sm" onClick={() => {sendChatMessage()}}>Chat</Button>
          <Button variant="secondary" size="sm">Lore</Button>
        </div>
      </div>
    </div>
  );
}

export default Chat;