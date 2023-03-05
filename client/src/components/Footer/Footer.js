import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import './Footer.css';

import Typing from '../Typing/Typing';
import InputText from '../InputText/InputText';
import SendButton from '../SendButton/SendButton';

const Footer = ({ socket, isUserTyping }) => {
  const [message, setMessage] = useState('');
  const [userName, setUserName] = useState('');
  const [chatAppName, setChatAppName] = useState('');

  useEffect(() => {
    window.addEventListener('storage', handleStorageEvent);

    const storedUserName = sessionStorage.getItem('userName');

    if (storedUserName) {
      setUserName(storedUserName);
    } else {
      const newUserName = `User ${Math.floor(Math.random() * 10000)}`;
      setUserName(newUserName);
      sessionStorage.setItem('userName', newUserName);
    }

    return () => {
      window.removeEventListener('storage', handleStorageEvent);
    };
  }, []);

  const handleStorageEvent = (event) => {
    if (event.key === 'userName' && !event.newValue) {
      const newUserName = `User ${Math.floor(Math.random() * 10000)}`;
      setUserName(newUserName);
      sessionStorage.setItem('userName', newUserName);
    }
  };

  const sendSocketMessage = (socket, message, userName, isThinking) => {
    socket.emit('message', {
      text: message,
      id: `${socket.id}${Math.random()}`,
      socketID: socket.id,
      userName: userName,
      isThinking: isThinking
    });
  };

  const handleMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      const commandRegex = /\s?(\/nick|\/think)\s*(.*)/;
      const match = message.match(commandRegex);

      if (match) {
        const command = match[1];
        const textValue = match[2];

        if (textValue !== null && textValue !== undefined && textValue.trim() === '') {
          sendSocketMessage(socket, message, userName);
        } else {
          switch (command) {
            case '/nick':
              handleNickCommand(textValue);
              break;
            case '/think':
              handleThinkCommand(textValue);
              break;
            default:
              console.log('--> Unknown command');
          }
        }
      } else if (message.trim() === '/oops') {
        handleOopsCommand();
      } else if (message.trim() === '(smile)') {
        socket.emit('smile', { text: '😀', userName: userName });
      } else if (message.trim() === '(wink)') {
        socket.emit('wink', { text: '😉', userName: userName });
      } else {
        sendSocketMessage(socket, message, userName);
      }
    }
    setMessage('');
    socket.emit('stopTyping', { userName: userName });
  };

  const handleNickCommand = (textValue) => {
    setChatAppName(textValue);
    sessionStorage.setItem('chatAppName', chatAppName);
    socket.emit('chatAppName', { chatAppName: textValue, userName: userName });
  };

  const handleThinkCommand = (textValue) => {
    sendSocketMessage(socket, textValue, userName, '-thinking');
  };

  const handleOopsCommand = () => {
    socket.emit('removeLastMessage');
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
    if (e.target.value !== '') socket.emit('typing', { userName: userName });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleMessage(e);
    }
  };

  return (
    <footer className="Footer">
      {isUserTyping && <Typing userName={userName} />}
      <InputText value={message} onChange={handleChange} onKeyDown={handleKeyDown} />
      <SendButton handleMessage={handleMessage} isDisabled={message} />
    </footer>
  );
};

Footer.propTypes = {
  socket: PropTypes.object.isRequired,
  isUserTyping: PropTypes.bool.isRequired,
  setIsUserTyping: PropTypes.func
};

export default Footer;
