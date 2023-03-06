import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import './Footer.css';

import Typing from '../Typing/Typing';
import InputText from '../InputText/InputText';
import SendButton from '../SendButton/SendButton';

const Footer = ({ socket, isUserTyping, chatAppName }) => {
  const [message, setMessage] = useState('');
  const [userName, setUserName] = useState('');
  const [chatHeaderAppName, setChatHeaderAppName] = useState('');

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

  const handleChange = (e) => {
    setMessage(e.target.value);
    e.target.value !== '' ? handleTyping() : handleStopTyping();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleMessage(e);
  };

  const handleMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      const commandRegex = /\s?(\/nick|\/think|\/highlight|\/countdown)\s*(.*)/;
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
            case '/highlight':
              handleHighlightCommand(textValue);
              break;
            case '/countdown':
              handleCountdownCommand(textValue);
              break;
            default:
              console.log('--> Unknown command');
          }
        }
      } else if (message.trim() === '/oops') {
        handleOopsCommand();
      } else if (message.includes('(smile)')) {
        handleSmileCommand();
      } else if (message.includes('(wink)')) {
        handleWinkCommand();
      } else if (message.trim() === '/fadelast') {
        handleFadeLastCommand();
      } else {
        sendSocketMessage(socket, message, userName);
      }
    }
    setMessage('');
    handleStopTyping();
  };

  const sendSocketMessage = (socket, message, userName, additionalClassName) => {
    socket.emit('message', {
      text: message,
      id: `${socket.id}${Math.random()}`,
      socketID: socket.id,
      userName: userName,
      additionalClassName: additionalClassName
    });
  };

  const handleNickCommand = (textValue) => {
    setChatHeaderAppName(textValue);
    sessionStorage.setItem('chatAppName', chatHeaderAppName);
    socket.emit('chatAppName', { chatAppName: textValue, userName: userName });
  };

  const handleThinkCommand = (textValue) => {
    sendSocketMessage(socket, textValue, userName, '-thinking');
  };

  const handleHighlightCommand = (textValue) => {
    sendSocketMessage(socket, textValue, userName, '-highlight');
  };

  const handleCountdownCommand = (textValue) => {
    const [countdown, url] = textValue.split(' ');

    socket.emit('countdownMessage', {
      countdown: Number(countdown),
      url: url,
      chatAppName: textValue,
      userName: userName
    });
  };

  const handleOopsCommand = () => {
    socket.emit('removeLastMessage');
  };

  const handleSmileCommand = () => {
    const smileRegex = /\(smile\)/g;
    const textWithEmoji = message.replace(smileRegex, '😀');

    socket.emit('smile', { text: textWithEmoji, userName: userName });
  };

  const handleWinkCommand = () => {
    const winkRegex = /\(wink\)/g;
    const textWithEmoji = message.replace(winkRegex, '😉');

    socket.emit('wink', { text: textWithEmoji, userName: userName });
  };

  const handleFadeLastCommand = () => {
    socket.emit('fadeLastMessage');
  };

  const handleTyping = () => {
    socket.emit('typing', { userName: userName });
  };

  const handleStopTyping = () => {
    socket.emit('stopTyping', { userName: userName });
  };

  return (
    <footer className="Footer">
      {isUserTyping && <Typing userName={userName} chatAppName={chatAppName} />}
      <InputText value={message} onChange={handleChange} onKeyDown={handleKeyDown} />
      <SendButton handleMessage={handleMessage} isDisabled={message} />
    </footer>
  );
};

Footer.propTypes = {
  socket: PropTypes.object.isRequired,
  chatAppName: PropTypes.string,
  isUserTyping: PropTypes.bool.isRequired,
  setIsUserTyping: PropTypes.func
};

export default Footer;
