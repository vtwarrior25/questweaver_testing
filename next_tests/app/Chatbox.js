import { useEffect, useState } from 'react';
import { Tabs, Tab } from "react-bootstrap";
import Chat from './Chat';
import GameLog from './GameLog';

function Chatbox() {

  return ( 
    <div className="chatBox frontElement">
      <Tabs defaultActiveKey="chat" className="chatTabs">
        <Tab eventKey="chat" title="Chat">
          <Chat></Chat>
        </Tab>
        <Tab eventKey="log" title="Log">
          <GameLog></GameLog>
        </Tab>
      </Tabs>
    </div>
  );
}

export default Chatbox;