import { useState, useEffect, useContext } from 'react';
import { Button } from 'react-bootstrap';
import ChatMessage from './ChatMessage';
import { getAllChatMessages, addToGameLog } from '../lib/chatandlog';
import {PlayerCharacterContext, CharacterInfoContext } from './Contexts';


function Chat() {
  const characterinfo = useContext(CharacterInfoContext);
  const playercharacterid = useContext(PlayerCharacterContext);
  const [chattextbox, setChatTextBox] = useState("");

  const [chatmessages, setChatMessages] = useState([
    {
      gamelogtag: "Chat",
      name: "Jerome",
      content: "This is a test message in chat",
    },
    {
      gamelogtag: "Chat",
      name: "Jerome",
      content: "This is a test message in chat",
    },
    {
      gamelogtag: "Chat",
      name: "Jerome",
      content: "This is a test message in chat",
    },
  ]);
/*
  useEffect(() => {  
    getChat();
    }, []
  );
*/

  useEffect(() => {
    getAllChatMessages(0)
    .then((result) => {
      console.log(result);
      setChatMessages([...result]);
    });
    setInterval(() => {
      getAllChatMessages(0)
        .then((result) => {
      //console.log(result);
        setChatMessages([...result]);
      });
    }, 1500);
  }, []
  );

  const handleChange = (e) => {
    setChatTextBox(e.target.value);
    console.log(`chattextbox${chattextbox}`);
  }

  const sendChatMessage = () => {
    if (chattextbox !== "") {
      var newmessage = {
        name: characterinfo.name,
        gamelogtag: "Chat",
        content: chattextbox,
      }
      setChatMessages([...chatmessages, newmessage]);
      addToGameLog(playercharacterid, "Chat", chattextbox);
      setChatTextBox("");
    }
  }

  const sendLoreMessage = () => {
    if (chattextbox !== "") {
      var newmessage = {
        name: characterinfo.name,
        gamelogtag: "Lore",
        content: chattextbox,
      }
      setChatMessages([...chatmessages, newmessage]);
      addToGameLog(playercharacterid, "Lore", chattextbox);
      setChatTextBox("");
    }
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
      <div className="chatMessageArea chatLogInnerBox">
        {chatmessages && chatmessages.length > 0 && chatmessages.map((message, index) => <ChatMessage key={index} name={message.name} content={message.content} time={message.timeadded} gamelogtag={message.gamelogtag}/>)}
      </div>
      <div className="chatEntryArea">
        <textarea className='chatTextEntry' value={chattextbox} onChange={(e) => handleChange(e)}></textarea>
        <div className="chatButtons">
          <Button variant="secondary" size="sm" onClick={() => {sendChatMessage()}}>Chat</Button>
          <Button variant="secondary" size="sm" onClick={() => {sendLoreMessage()}}>Lore</Button>
        </div>
      </div>
    </div>
  );
}

export default Chat;