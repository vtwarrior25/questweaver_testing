import { useState, useEffect, useContext} from 'react';
import { Button } from 'react-bootstrap';
import ChatMessage from './ChatMessage';
import { getAllChatMessages, addToGameLog } from '../lib/chatandlog';
import { PlayerNameContext, PlayerCharacterContext } from './Contexts';


function Chat() {
  const playername = useContext(PlayerNameContext);
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
    
  }, []
  );

  useEffect(() => {
    
  })

  const handleChange = (e) => {
    setChatTextBox(e.target.value);
    console.log(`chattextbox${chattextbox}`);
  }

  const sendChatMessage = () => {
    if (chattextbox !== "") {
      var newmessage = {
        name: playername,
        gamelogtag: "Chat",
        content: chattextbox,
      }
      setChatMessages([...chatmessages, newmessage]);
      addToGameLog(playercharacterid, "Chat", chattextbox);
    }
  }

  const sendLoreMessage = () => {
    if (chattextbox !== "") {
      var newmessage = {
        name: playername,
        gamelogtag: "Lore",
        content: chattextbox,
      }
      setChatMessages([...chatmessages, newmessage]);
      addToGameLog(playercharacterid, "Lore", chattextbox);
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
      <div className="chatMessageArea">
        {chatmessages && chatmessages.length > 0 && chatmessages.map((message, index) => <ChatMessage key={index} name={message.name} content={message.content} gamelogtag={message.gamelogtag}/>)}
      </div>
      <div className="chatEntryArea">
        <textarea className='chatTextEntry' onChange={(e) => handleChange(e)}></textarea>
        <div className="chatButtons">
          <Button variant="secondary" size="sm" onClick={() => {sendChatMessage()}}>Chat</Button>
          <Button variant="secondary" size="sm" onClick={() => {sendLoreMessage()}}>Lore</Button>
        </div>
      </div>
    </div>
  );
}

export default Chat;