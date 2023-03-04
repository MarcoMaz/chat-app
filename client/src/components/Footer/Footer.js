import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import './Footer.css';

import InputText from '../InputText/InputText';
import SendButton from '../SendButton/SendButton';

const Footer = ({ socket, setMessages }) => {
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
      } else {
        sendSocketMessage(socket, message, userName);
      }
    }
    setMessage('');
  };

  // Todo: Fix this logic
  const handleNickCommand = (textValue) => {
    setChatAppName(textValue);
    sessionStorage.setItem('chatAppName', textValue);
    socket.emit('chatAppName', { chatAppName: textValue, userName: userName });
  };

  const handleThinkCommand = (textValue) => {
    sendSocketMessage(socket, textValue, userName, chatAppName, '-highlight');
  };

  const handleOopsCommand = () => {
    setMessages((prevMessages) => prevMessages.slice(0, -1));
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
  socket: PropTypes.object.isRequired,
  setMessages: PropTypes.func.isRequired
};

export default Footer;
