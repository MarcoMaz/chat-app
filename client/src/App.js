/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import './App.css';

import socketIO from 'socket.io-client';

const SERVER_PORT = 8000;

const socket = socketIO.connect(`http://localhost:${SERVER_PORT}`);

import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Countdown from './components/Countdown/Countdown';
import Modal from './components/Modal/Modal';

function App() {
  const [messages, setMessages] = useState([]);
  const [chatAppName, setChatAppName] = useState('');
  const [isUserTyping, setIsUserTyping] = useState(false);

  const [countdownTime, setCountdownTime] = useState(10);
  const [countdownActive, setCountdownActive] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState('');

  useEffect(() => {
    socket.on('chatAppNameResponse', (data) => {
      if (data.userName !== sessionStorage.getItem('userName')) setChatAppName(data.chatAppName);
    });
    socket.on('typingResponse', (data) => {
      if (data.userName !== sessionStorage.getItem('userName')) setIsUserTyping(true);
    });
    socket.on('stopTypingResponse', (data) => {
      if (data.userName !== sessionStorage.getItem('userName')) setIsUserTyping(false);
    });

    socket.on('countdownMessageResponse', (data) => {
      console.log('data.url', data.url);

      setCountdownActive(true);
      setCountdownTime(data.countdown);
      setRedirectUrl(data.url);
    });
  }, [socket, setIsUserTyping]);

  useEffect(() => {
    let interval;
    if (countdownActive) {
      interval = setInterval(() => {
        setCountdownTime((prevTime) => prevTime - 1);
      }, 1000);
    }
    if (countdownTime === 0) {
      clearInterval(interval);
      setCountdownActive(false);
      window.location.href = redirectUrl;
    }
    return () => clearInterval(interval);
  }, [countdownActive, countdownTime, redirectUrl]);

  return (
    <div className="App">
      {countdownActive && <Modal />}
      <div className="Chat">
        {chatAppName && <Header chatAppName={chatAppName} />}
        <Main socket={socket} messages={messages} setMessages={setMessages} />
        <Footer socket={socket} isUserTyping={isUserTyping} setIsUserTyping={setIsUserTyping} />
      </div>
      {countdownActive && <Countdown countdownTime={countdownTime} />}
    </div>
  );
}

export default App;
