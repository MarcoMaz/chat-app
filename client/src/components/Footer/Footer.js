import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import './Footer.css';

import InputText from '../InputText/InputText';
import SendButton from '../SendButton/SendButton';

const Footer = ({ socket }) => {
  const [message, setMessage] = useState('');
  const [userName, setUserName] = useState('');
  const [chatApp, setChatApp] = useState('');

  console.log('chatApp = ', chatApp);

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

  const sendSocketMessage = (socket, message, userName) => {
    socket.emit('message', {
      text: message,
      id: `${socket.id}${Math.random()}`,
      socketID: socket.id,
      userName: userName
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
    setChatApp(textValue);
    sessionStorage.setItem('chatApp', chatApp);
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
