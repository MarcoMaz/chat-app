import PropTypes from 'prop-types';
import { useState } from 'react';

import './Footer.css';

import InputText from '../InputText/InputText';
import SendButton from '../SendButton/SendButton';

const Footer = ({ socket }) => {
  const [message, setMessage] = useState('');

  console.log('message', message);

  const handleMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      socket.emit('message', {
        text: message,
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id
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
