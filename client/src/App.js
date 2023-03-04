import React, { useEffect, useState } from 'react';
import './App.css';

import socketIO from 'socket.io-client';

const SERVER_PORT = 8000;

const socket = socketIO.connect(`http://localhost:${SERVER_PORT}`);

import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';

function App() {
  const [messages, setMessages] = useState([]);
  const [chatAppName, setChatAppName] = useState('');

  useEffect(() => {
    socket.on('chatAppNameResponse', (data) => {
      if (data.userName !== sessionStorage.getItem('userName')) setChatAppName(data.chatAppName);
    });
  }, [socket]);

  return (
    <div className="App">
      <div className="Chat">
        {chatAppName && <Header chatAppName={chatAppName} />}
        <Main socket={socket} messages={messages} setMessages={setMessages} />
        <Footer socket={socket} />
      </div>
    </div>
  );
}

export default App;
