import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import './Footer.css';

import InputText from '../InputText/InputText';
import SendButton from '../SendButton/SendButton';

const Footer = ({ socket }) => {
  const [message, setMessage] = useState('');
  const [userName, setUserName] = useState('');

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

  const handleMessage = (e) => {
    const commandRegex = /\s?(\/nick|\/think|\/oops)\s*(.*)/;
    const match = message.match(commandRegex);

    if (match) {
      // console.log('match[0]:', match[0], ' - match[1]: ', match[1], ' - match[2]:', match[2]);

      // const command = match[1];
      const textValue = match[2];
      console.log(textValue);
      // TODO: check if text value is not empty
    }

    e.preventDefault();
    if (message.trim()) {
      socket.emit('message', {
        text: message,
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
        userName: userName
      });
    }
    setMessage('');
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
