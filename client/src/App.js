import React, { useState } from 'react';
import './App.css';

import socketIO from 'socket.io-client';

const SERVER_PORT = 8000;

const socket = socketIO.connect(`http://localhost:${SERVER_PORT}`);

import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';

function App() {
  const [messages, setMessages] = useState([]);

  return (
    <div className="App">
      <div className="Chat">
        <Header />
        <Main socket={socket} messages={messages} setMessages={setMessages} />
        <Footer socket={socket} />
      </div>
    </div>
  );
}

export default App;
