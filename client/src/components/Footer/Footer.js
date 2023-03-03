import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import './Footer.css';

import InputText from '../InputText/InputText';
import SendButton from '../SendButton/SendButton';

const Footer = ({ socket }) => {
  const [message, setMessage] = useState('');
  const [userName, setUserName] = useState('');
  const [chatAppName, setChatAppName] = useState('');

  console.log('chatAppName = ', chatAppName);

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

  useEffect(() => {
    const storedChatAppName = sessionStorage.getItem('chatAppName');
    if (storedChatAppName) setChatAppName(storedChatAppName);

    const handleStorageChange = (event) => {
      if (event.key === 'chatAppName') setChatAppName(event.newValue);
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleStorageEvent = (event) => {
    if (event.key === 'userName' && !event.newValue) {
      const newUserName = `User ${Math.floor(Math.random() * 10000)}`;
      setUserName(newUserName);
      sessionStorage.setItem('userName', newUserName);
    }
  };

  const sendSocketMessage = (socket, message, userName, chatApp) => {
    socket.emit('message', {
      text: message,
      id: `${socket.id}${Math.random()}`,
      socketID: socket.id,
      userName: userName,
      chatApp: chatApp
    });
  };

  const handleMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      const commandRegex = /\s?(\/nick|\/think|\/oops)\s*(.*)/;
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
              console.log('--> think');
              break;
            case '/oops':
              console.log('--> oops');
              break;
            default:
              console.log('--> Unknown command');
          }
        }
      } else {
        sendSocketMessage(socket, message, userName);
      }
    }
    setMessage('');
  };

  const handleNickCommand = (textValue) => {
    setChatAppName(textValue);
    sessionStorage.setItem('chatAppName', chatAppName);
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <footer className="Footer">
      <InputText value={message} onChange={handleChange} />
      <SendButton handleMessage={handleMessage} />
    </footer>
  );
};

Footer.propTypes = {
  socket: PropTypes.object.isRequired
};

export default Footer;
