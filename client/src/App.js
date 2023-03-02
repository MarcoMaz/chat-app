import React from 'react';
import './App.css';

const URL_SERVER = 'http://localhost:8000';

import socketIO from 'socket.io-client';
const socket = socketIO.connect(URL_SERVER);

import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';

function App() {
  console.log('socket', socket);

  return (
    <div className="App">
      <div className="Chat">
        <Header />
        <Main />
        <Footer />
      </div>
    </div>
  );
}

export default App;
